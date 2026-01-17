"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Eye, Heart, Award, Users, Globe, Calendar, Trophy } from "lucide-react"

const milestones = [
  { year: "2010", title: "Foundation", description: "T10TBCAI was established to promote cricket at grassroots level" },
  { year: "2015", title: "National Reach", description: "Expanded operations to all 28 states of India" },
  { year: "2018", title: "Digital Era", description: "Launched online registration and management systems" },
  { year: "2020", title: "10,000 Players", description: "Milestone of registering 10,000 players achieved" },
  { year: "2024", title: "Excellence Award", description: "Recognized for outstanding contribution to cricket" },
  { year: "2026", title: "Biggest Tournament", description: "Hosting the largest national championship ever" },
]

const values = [
  { icon: Heart, title: "Passion", description: "Love for the game drives everything we do" },
  { icon: Award, title: "Excellence", description: "Striving for the highest standards in cricket" },
  { icon: Users, title: "Inclusivity", description: "Cricket for everyone, regardless of background" },
  { icon: Globe, title: "Unity", description: "Bringing together players from across India" },
]

export default function AboutPage() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id))
          }
        })
      },
      { threshold: 0.2 },
    )

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] overflow-hidden">
          <Image src="/cricket-stadium-aerial.png" alt="Cricket Stadium" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">About T10TBCAI</h1>
              <p className="text-xl text-primary-foreground/90 max-w-2xl">
                Nurturing cricket talent and promoting the spirit of the game across India since 2010.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section id="mission" data-animate className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div
              className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${visibleSections.has("mission") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <div className="bg-card p-8 rounded-2xl shadow-lg border-l-4 border-primary">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Mission</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To identify, nurture, and promote cricket talent across India by organizing competitive tournaments,
                  providing training opportunities, and creating pathways for players to excel at national and
                  international levels.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-lg border-l-4 border-accent">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Our Vision</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To become the premier cricket development organization in India, known for discovering future
                  champions and fostering a culture of excellence, fair play, and sportsmanship in cricket.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section id="story" data-animate className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div
              className={`max-w-3xl mx-auto text-center transition-all duration-700 ${visibleSections.has("story") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            >
              <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Building Cricket Champions Since 2010</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The T10 Tennis Ball Cricket Association of India was founded with a simple yet powerful vision: to make
                quality cricket accessible to every aspiring cricketer in India. What started as a small initiative in
                Delhi has now grown into a nationwide movement, touching the lives of thousands of players.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over the years, we have organized hundreds of tournaments, trained countless players, and witnessed many
                of our alumni go on to represent state and national teams. Our commitment to excellence, fair play, and
                player development remains unwavering as we continue to write new chapters in Indian cricket history.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" data-animate className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-accent/20 text-accent text-sm font-medium rounded-full mb-3">
                Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Our Milestones</h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`flex gap-4 mb-8 transition-all duration-500 ${visibleSections.has("timeline") ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 my-2" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section id="values" data-animate className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full mb-3">
                What Drives Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold">Our Core Values</h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`bg-primary-foreground/10 backdrop-blur p-6 rounded-xl text-center transition-all duration-500 ${visibleSections.has("values") ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-primary-foreground/80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">15+</p>
                <p className="text-muted-foreground">Years of Excellence</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-8 w-8 text-accent" />
                </div>
                <p className="text-4xl font-bold text-accent mb-2">500+</p>
                <p className="text-muted-foreground">Tournaments Organized</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <p className="text-4xl font-bold text-primary mb-2">10,000+</p>
                <p className="text-muted-foreground">Players Registered</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
                <p className="text-4xl font-bold text-accent mb-2">28</p>
                <p className="text-muted-foreground">States Covered</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
