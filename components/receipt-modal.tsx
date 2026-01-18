"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Download, Printer, Home } from "lucide-react"
import type { Player } from "@/lib/types"
import Link from "next/link"

interface ReceiptModalProps {
  isOpen: boolean
  onClose: () => void
  player: Player
}

export function ReceiptModal({ isOpen, onClose, player }: ReceiptModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    const content = receiptRef.current
    if (!content) return

    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    printWindow.document.write(`
      <html>
        <head>
          <title>Registration Receipt - ${player.receiptNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .receipt { max-width: 600px; margin: 0 auto; border: 2px solid #1e3a5f; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #1e3a5f; padding-bottom: 15px; margin-bottom: 15px; }
            .logo { font-size: 24px; font-weight: bold; color: #1e3a5f; }
            .receipt-number { background: #f0f0f0; padding: 10px; text-align: center; margin: 15px 0; }
            .details { margin: 15px 0; }
            .row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #eee; }
            .label { color: #666; }
            .value { font-weight: 600; }
            .amount { background: #1e3a5f; color: white; padding: 15px; text-align: center; margin: 15px 0; }
            .footer { text-align: center; font-size: 12px; color: #666; margin-top: 20px; }
            .success { color: green; text-align: center; font-weight: bold; margin: 15px 0; }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleDownload = () => {
    handlePrint()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            Registration Successful!
          </DialogTitle>
        </DialogHeader>

        <div ref={receiptRef} className="receipt">
          {/* Receipt Header */}
          <div className="header text-center border-b-2 border-primary pb-4 mb-4">
            <div className="flex justify-center mb-2">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">NCCA</span>
              </div>
            </div>
            <h2 className="logo text-xl font-bold text-primary">T10 Tennis Ball Cricket Association of India</h2>
            <p className="text-sm text-muted-foreground">Official Registration Receipt</p>
          </div>

          {/* Receipt Number */}
          <div className="receipt-number bg-muted p-3 rounded-lg text-center mb-4">
            <p className="text-sm text-muted-foreground">Receipt Number</p>
            <p className="text-xl font-bold text-primary">{player.receiptNumber}</p>
          </div>

          {/* Player Details */}
          <div className="details space-y-2">
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">Player Name</span>
              <span className="value font-semibold">{player.name}</span>
            </div>
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">Email</span>
              <span className="value font-semibold">{player.email}</span>
            </div>
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">Phone</span>
              <span className="value font-semibold">{player.phone}</span>
            </div>
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">State</span>
              <span className="value font-semibold">{player.state}</span>
            </div>
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">District</span>
              <span className="value font-semibold">{player.district}</span>
            </div>
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">Player Type</span>
              <span className="value font-semibold capitalize">{player.playerType}</span>
            </div>
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">Team</span>
              <span className="value font-semibold">{player.teamName}</span>
            </div>
            <div className="row flex justify-between py-2 border-b border-border">
              <span className="label text-muted-foreground">Registration Date</span>
              <span className="value font-semibold">
                {new Date(player.registrationDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Payment Info */}
          <div className="amount bg-primary text-primary-foreground p-4 rounded-lg text-center my-4">
            <p className="text-sm opacity-80">Amount Paid</p>
            <p className="text-3xl font-bold">₹1,500</p>
            <p className="text-xs opacity-80 mt-1">Payment ID: {player.paymentId}</p>
          </div>

          {/* Success Message */}
          <div className="success text-green-600 text-center font-semibold py-3 bg-green-50 rounded-lg">
            Payment Successful - Registration Confirmed
          </div>

          {/* Footer */}
          <div className="footer text-center text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
            <p>Thank you for registering with NCCA!</p>
            <p>For queries, contact: t10tennisballcricket2023@gmail.com | +91 94157 01006, 79052 51534</p>
            <p className="mt-2">This is a computer-generated receipt and does not require a signature.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={handlePrint} className="flex-1 gap-2 bg-transparent">
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload} className="flex-1 gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
        <Link href="/" className="block">
          <Button className="w-full gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}
