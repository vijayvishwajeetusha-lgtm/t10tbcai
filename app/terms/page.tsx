import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">Last updated: January 2026</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using the T10 Tennis Ball Cricket Association of India (T10TBCAI) website and services, you
                accept and agree to be bound by the terms and provisions of this agreement.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Registration and Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                Players must meet the age and eligibility criteria specified for each tournament. All information
                provided during registration must be accurate and complete. False information may result in
                disqualification.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Tournament Rules</h2>
              <p className="text-muted-foreground mb-4">
                All players must adhere to the official rules and regulations of the tournament. The decision of the
                umpires and tournament officials is final. Any form of cheating, misconduct, or unsportsmanlike behavior
                will result in immediate disqualification.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                Registration fees are non-refundable once the registration is confirmed. Payment must be completed
                through the designated payment gateway. T10TBCAI is not responsible for any payment issues arising from
                third-party payment processors.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                All content on this website, including text, graphics, logos, and images, is the property of T10TBCAI and is
                protected by copyright laws. Unauthorized use is prohibited.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                T10TBCAI shall not be liable for any injuries sustained during tournaments or events. Participants are
                advised to have appropriate insurance coverage. T10TBCAI is not responsible for any loss or damage to
                personal belongings.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                T10TBCAI reserves the right to modify these terms at any time. Continued use of our services after changes
                constitutes acceptance of the new terms.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                For any questions regarding these terms, please contact us at legal@cricketindia.com or call +91 98765
                43210.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
