"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, Mail, AlertCircle, Shield } from "lucide-react"
import { login } from "@/lib/storage"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = login(email, password)

    if (user) {
      if (user.role === "general_secretary") {
        router.push("/dashboard/general")
      } else {
        router.push("/dashboard/state")
      }
    } else {
      setError("Invalid email or password. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            {/* Left Side - Image and Info */}
            <div className="hidden lg:block">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image src="/cricket-stadium-aerial.png" alt="Cricket Stadium" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-primary/30" />
                <div className="absolute bottom-8 left-8 right-8 text-primary-foreground">
                  <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                  <p className="text-primary-foreground/90 mb-6">
                    Access your dashboard to manage player registrations, view statistics, and oversee tournament
                    operations.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">Secure Admin Portal</p>
                      <p className="text-sm text-primary-foreground/80">For authorized personnel only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div>
              <Card className="shadow-xl border-0">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4">
                    <Lock className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Admin Login</CardTitle>
                  <CardDescription>Sign in to access your dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>
                        <strong>General Secretary:</strong> general@cricketindia.com / admin123
                      </p>
                      <p>
                        <strong>State Secretary:</strong> maharashtra@cricketindia.com / state123
                      </p>
                    </div>
                  </div>

                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Want to register as a player?{" "}
                    <Link href="/register" className="text-primary hover:underline font-medium">
                      Register Here
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
