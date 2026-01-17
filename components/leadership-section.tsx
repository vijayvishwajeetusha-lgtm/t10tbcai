"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { leadershipTeam, stateSecretaries } from "@/lib/data"

export function LeadershipSection() {
  const [currentLeader, setCurrentLeader] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLeader((prev) => (prev + 1) % leadershipTeam.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-3">
            Our Leadership
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet The Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated individuals leading cricket development across India
          </p>
        </div>

        {/* Main Leadership Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {leadershipTeam.map((leader, index) => (
            <div
              key={index}
              className={`group relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 ${
                isVisible ? "animate-slide-in-up opacity-100" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={leader.image || "/placeholder.svg"}
                  alt={leader.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                <span className="inline-block px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full mb-2">
                  {leader.position}
                </span>
                <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                <p className="text-background/80 text-sm">{leader.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* State Secretaries Carousel */}
        <div className="bg-muted rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-center mb-8">State Secretaries</h3>
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {stateSecretaries.map((secretary, index) => (
                <div key={index} className="flex-shrink-0 w-48 snap-center">
                  <div className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="relative h-48">
                      <Image
                        src={secretary.image || "/placeholder.svg"}
                        alt={secretary.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h4 className="font-semibold text-foreground">{secretary.name}</h4>
                      <p className="text-sm text-muted-foreground">{secretary.state}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
