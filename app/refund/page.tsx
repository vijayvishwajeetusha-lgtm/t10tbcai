import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function RefundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Refund & Return Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">Last updated: January 2026</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Registration Fee Refunds</h2>
              <p className="text-muted-foreground mb-4">
                Registration fees are generally non-refundable once the payment is confirmed. However, refunds may be
                considered in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Tournament cancellation by T10TBCAI</li>
                <li>Medical emergencies (with valid documentation)</li>
                <li>Double payment due to technical errors</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Refund Process</h2>
              <p className="text-muted-foreground mb-4">
                To request a refund, submit your request via email to refunds@cricketindia.com within 7 days of
                registration. Include your receipt number, registered email, and reason for the refund request.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Processing Time</h2>
              <p className="text-muted-foreground mb-4">
                Approved refunds will be processed within 7-14 business days. The refund will be credited to the
                original payment method used during registration.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Cancellation Policy</h2>
              <p className="text-muted-foreground mb-4">
                If you need to cancel your registration before the tournament, please notify us at least 15 days prior.
                Cancellations made:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>15+ days before: 75% refund</li>
                <li>7-14 days before: 50% refund</li>
                <li>Less than 7 days: No refund</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Tournament Postponement</h2>
              <p className="text-muted-foreground mb-4">
                If a tournament is postponed, your registration will automatically be transferred to the new date. If
                you cannot attend the rescheduled date, a full refund will be provided.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Contact for Refunds</h2>
              <p className="text-muted-foreground mb-4">
                For refund-related queries, contact our support team at refunds@cricketindia.com or call +91 94157 01006, 79052 51534
                during office hours.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
