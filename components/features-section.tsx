"use client"

import { useRef, useEffect, useState } from "react"
import { Shield, Trophy, Users, Globe, Medal, Target } from "lucide-react"

const features = [
  {
    icon: Trophy,
    title: "National Tournaments",
    description: "Participate in prestigious tournaments across all states of India",
  },
  {
    icon: Users,
    title: "Player Development",
    description: "Professional coaching and training programs for aspiring cricketers",
  },
  {
    icon: Shield,
    title: "Fair Play",
    description: "Strict adherence to BCCI guidelines and interT10 Tennis Ball Cricket standards",
  },
  {
    icon: Globe,
    title: "Pan-India Reach",
    description: "Active presence in all 28 states with dedicated state secretaries",
  },
  {
    icon: Medal,
    title: "Recognition",
    description: "Awards and certificates for outstanding performers and teams",
  },
  {
    icon: Target,
    title: "Talent Scouting",
    description: "Platform for talented players to get noticed by professional teams",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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
    <section ref={sectionRef} className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Offer</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of cricketers who have benefited from our programs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-primary-foreground/10 backdrop-blur rounded-xl p-6 hover:bg-primary-foreground/20 transition-all duration-300 ${
                isVisible ? "animate-scale-in opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="h-7 w-7 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-primary-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
