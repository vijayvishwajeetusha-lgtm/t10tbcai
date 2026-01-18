"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { leadershipTeam, stateSecretaries } from "@/lib/data"
import { Mail, Phone, MapPin } from "lucide-react"

export default function MembersPage() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[300px] overflow-hidden">
          <Image src="/cricket-team-celebration-trophy.jpg" alt="Our Team" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">Association Members</h1>
              <p className="text-xl text-primary-foreground/90">Meet the team behind NCCA</p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section ref={sectionRef} className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                Leadership
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Executive Committee</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Our dedicated leaders driving cricket excellence across India
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {leadershipTeam.map((leader, index) => (
                <div
                  key={index}
                  className={`group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${
                    isVisible ? "animate-slide-in-up opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                  </div>
                  <div className="p-6 text-center">
                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-2">
                      {leader.position}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{leader.name}</h3>
                    <p className="text-muted-foreground text-sm">{leader.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* State Secretaries */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-3">
                Regional Team
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">State Secretaries</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                Our representatives managing cricket operations across all states
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stateSecretaries.map((secretary, index) => (
                <div
                  key={index}
                  className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={secretary.image || "/placeholder.svg"}
                      alt={secretary.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{secretary.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{secretary.state}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Get in Touch with Our Team</h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Have questions about registrations, tournaments, or partnerships? Our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:t10tennisballcricket2023@gmail.com"
                className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-6 py-3 rounded-lg transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>t10tennisballcricket2023@gmail.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 px-6 py-3 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>+91 94157 01006, 79052 51534</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
