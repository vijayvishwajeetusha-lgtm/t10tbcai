import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground">Last updated: January 2026</p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect personal information that you provide during registration, including name, email address,
                phone number, date of birth, Aadhaar number, and address. We also collect information about your cricket
                playing history and preferences.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">Your information is used to:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Process tournament registrations</li>
                <li>Communicate tournament updates and schedules</li>
                <li>Verify player identity and eligibility</li>
                <li>Generate receipts and maintain records</li>
                <li>Improve our services</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell or rent your personal information to third parties. We may share information with state
                secretaries for administrative purposes and with payment processors for transaction handling.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate security measures to protect your personal information. However, no method of
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Cookies</h2>
              <p className="text-muted-foreground mb-4">
                Our website uses cookies to enhance user experience. You can control cookie preferences through your
                browser settings.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to access, correct, or delete your personal information. Contact us at
                privacy@cricketindia.com for any data-related requests.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this privacy policy periodically. Any changes will be posted on this page with an updated
                revision date.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
