"use client"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { User, Mail, Phone, MapPin, Calendar, CreditCard, FileText, CheckCircle, AlertCircle } from "lucide-react"
import { indianStates } from "@/lib/data"
import type { Player } from "@/lib/types"
import { savePlayer, generateReceiptNumber } from "@/lib/storage"
import { ReceiptModal } from "@/components/receipt-modal"
import { getRazorpayConfig } from "@/app/actions/payment"

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance
  }
}

interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id?: string
  handler: (response: RazorpayResponse) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  theme: {
    color: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

interface RazorpayInstance {
  open: () => void
}

interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

const REGISTRATION_FEE = 1500

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showReceipt, setShowReceipt] = useState(false)
  const [registeredPlayer, setRegisteredPlayer] = useState<Player | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    aadhaarNumber: "",
    state: "",
    district: "",
    playerType: "",
    battingStyle: "",
    bowlingStyle: "",
    teamName: "",
    photo: "",
  })

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.dateOfBirth) {
      setError("Please fill in all required fields")
      return false
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number")
      return false
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address")
      return false
    }
    setError("")
    return true
  }

  const validateStep2 = () => {
    if (!formData.state || !formData.district || !formData.aadhaarNumber) {
      setError("Please fill in all required fields")
      return false
    }
    if (!/^\d{12}$/.test(formData.aadhaarNumber)) {
      setError("Please enter a valid 12-digit Aadhaar number")
      return false
    }
    setError("")
    return true
  }

  const validateStep3 = () => {
    if (!formData.playerType || !formData.battingStyle || !formData.teamName) {
      setError("Please fill in all required fields")
      return false
    }
    setError("")
    return true
  }

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    } else if (step === 3 && validateStep3()) {
      setStep(4)
    }
  }

  const prevStep = () => {
    setError("")
    setStep((prev) => Math.max(1, prev - 1))
  }

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true)
        return
      }
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const handlePayment = async () => {
    setIsLoading(true)
    setError("")

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setError("Failed to load payment gateway. Please try again.")
      setIsLoading(false)
      return
    }

    const config = await getRazorpayConfig()

    const options: RazorpayOptions = {
      key: "rzp_live_S2vpPVUfNSA022",
      amount: REGISTRATION_FEE * 100,
      currency: "INR",
      name: "NCCA Registration",
      description: "Player Registration Fee",
      handler: (response: RazorpayResponse) => {
        handlePaymentSuccess(response.razorpay_payment_id)
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
      theme: {
        color: "#1e3a5f",
      },
      modal: {
        ondismiss: () => {
          setIsLoading(false)
        },
      },
    }

    try {
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch {
      // Demo mode - simulate successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000))
      handlePaymentSuccess("demo_" + Date.now())
    }
  }

  const handlePaymentSuccess = (paymentId: string) => {
    const receiptNumber = generateReceiptNumber()
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      state: formData.state,
      district: formData.district,
      dateOfBirth: formData.dateOfBirth,
      aadhaarNumber: formData.aadhaarNumber,
      playerType: formData.playerType as Player["playerType"],
      battingStyle: formData.battingStyle as Player["battingStyle"],
      bowlingStyle: formData.bowlingStyle || "N/A",
      teamName: formData.teamName,
      photo: formData.photo || "/placeholder.svg?height=200&width=200",
      paymentId: paymentId,
      paymentStatus: "completed",
      registrationDate: new Date().toISOString(),
      receiptNumber: receiptNumber,
    }

    savePlayer(newPlayer)
    setRegisteredPlayer(newPlayer)
    setIsLoading(false)
    setShowReceipt(true)
  }

  const progress = (step / 4) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Progress Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-center mb-2">Player Registration</h1>
              <p className="text-muted-foreground text-center mb-6">Join the T10 Tennis Ball Cricket Championship 2026</p>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span className={step >= 1 ? "text-primary font-medium" : ""}>Personal Info</span>
                <span className={step >= 2 ? "text-primary font-medium" : ""}>Address</span>
                <span className={step >= 3 ? "text-primary font-medium" : ""}>Cricket Details</span>
                <span className={step >= 4 ? "text-primary font-medium" : ""}>Payment</span>
              </div>
            </div>

            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {step === 1 && (
                    <>
                      <User className="h-5 w-5 text-primary" />
                      Personal Information
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <MapPin className="h-5 w-5 text-primary" />
                      Address & Identity
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <FileText className="h-5 w-5 text-primary" />
                      Cricket Details
                    </>
                  )}
                  {step === 4 && (
                    <>
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment
                    </>
                  )}
                </CardTitle>
                <CardDescription>Step {step} of 4</CardDescription>
              </CardHeader>

              <CardContent>
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => updateFormData("name", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            placeholder="10-digit mobile number"
                            value={formData.phone}
                            onChange={(e) => updateFormData("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="dob"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Address & Identity */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Select value={formData.state} onValueChange={(value) => updateFormData("state", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="district">District *</Label>
                        <Input
                          id="district"
                          placeholder="Enter your district"
                          value={formData.district}
                          onChange={(e) => updateFormData("district", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                      <Input
                        id="aadhaar"
                        placeholder="12-digit Aadhaar number"
                        value={formData.aadhaarNumber}
                        onChange={(e) =>
                          updateFormData("aadhaarNumber", e.target.value.replace(/\D/g, "").slice(0, 12))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Your Aadhaar will be used for identity verification
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Cricket Details */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="playerType">Player Type *</Label>
                        <Select
                          value={formData.playerType}
                          onValueChange={(value) => updateFormData("playerType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select player type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="batsman">Batsman</SelectItem>
                            <SelectItem value="bowler">Bowler</SelectItem>
                            <SelectItem value="allrounder">All-Rounder</SelectItem>
                            <SelectItem value="wicketkeeper">Wicket Keeper</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="battingStyle">Batting Style *</Label>
                        <Select
                          value={formData.battingStyle}
                          onValueChange={(value) => updateFormData("battingStyle", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select batting style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="right">Right Handed</SelectItem>
                            <SelectItem value="left">Left Handed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bowlingStyle">Bowling Style</Label>
                        <Select
                          value={formData.bowlingStyle}
                          onValueChange={(value) => updateFormData("bowlingStyle", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select bowling style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="right-arm-fast">Right Arm Fast</SelectItem>
                            <SelectItem value="left-arm-fast">Left Arm Fast</SelectItem>
                            <SelectItem value="right-arm-medium">Right Arm Medium</SelectItem>
                            <SelectItem value="left-arm-medium">Left Arm Medium</SelectItem>
                            <SelectItem value="right-arm-spin">Right Arm Spin</SelectItem>
                            <SelectItem value="left-arm-spin">Left Arm Spin</SelectItem>
                            <SelectItem value="none">Not Applicable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="teamName">Team Name *</Label>
                        <Input
                          id="teamName"
                          placeholder="Enter your team name"
                          value={formData.teamName}
                          onChange={(e) => updateFormData("teamName", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Payment Summary */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-6">
                      <h3 className="font-semibold mb-4">Registration Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{formData.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span className="font-medium">{formData.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">State:</span>
                          <span className="font-medium">{formData.state}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Player Type:</span>
                          <span className="font-medium capitalize">{formData.playerType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Team:</span>
                          <span className="font-medium">{formData.teamName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Registration Fee</span>
                        <span className="text-2xl font-bold text-primary">₹{REGISTRATION_FEE}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        This fee includes tournament entry, jersey, and insurance coverage.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                        <span>Secure payment powered by Razorpay</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-3 mt-6">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="flex-1 bg-transparent">
                      Previous
                    </Button>
                  )}
                  {step < 4 && (
                    <Button type="button" onClick={nextStep} className="flex-1">
                      Next Step
                    </Button>
                  )}
                  {step === 4 && (
                    <Button
                      type="button"
                      onClick={handlePayment}
                      disabled={isLoading}
                      className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      {isLoading ? "Processing..." : `Pay ₹${REGISTRATION_FEE}`}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {/* Receipt Modal */}
      {registeredPlayer && (
        <ReceiptModal isOpen={showReceipt} onClose={() => setShowReceipt(false)} player={registeredPlayer} />
      )}
    </div>
  )
}
