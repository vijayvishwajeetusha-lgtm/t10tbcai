import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-background rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-background rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-background rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
            Ready to Begin Your Cricket Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Register now for the upcoming T10 Tennis Ball Cricket Championship 2026 and showcase your talent on the biggest
            stage.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold gap-2">
                Register Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
