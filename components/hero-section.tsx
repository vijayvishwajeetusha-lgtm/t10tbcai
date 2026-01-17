"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Trophy, Users, MapPin } from "lucide-react"

const heroSlides = [
  {
    image: "/packed-cricket-stadium.png",
    title: "T10 Tennis Ball Cricket Championship 2026",
    subtitle: "Where Champions Rise",
    description: "Join the biggest cricket tournament in India",
  },
  {
    image: "/cricket-match-action-shot.jpg",
    title: "Showcase Your Talent",
    subtitle: "Play. Compete. Win.",
    description: "Register now and compete with the best",
  },
  {
    image: "/cricket-team-celebration-trophy.jpg",
    title: "Glory Awaits",
    subtitle: "Be Part of History",
    description: "Represent your state at the national level",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full mb-4 animate-slide-in-left">
            {heroSlides[currentSlide].subtitle}
          </span>
          <h1
            key={currentSlide}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight animate-slide-in-left animation-delay-100"
          >
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl text-background/90 mb-8 animate-slide-in-left animation-delay-200">
            {heroSlides[currentSlide].description}
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-in-left animation-delay-300">
            <Link href="/register">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                Register Now
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-background text-background hover:bg-background hover:text-foreground"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 hover:bg-background/40 rounded-full flex items-center justify-center text-background transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 hover:bg-background/40 rounded-full flex items-center justify-center text-background transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-accent w-8" : "bg-background/50 hover:bg-background/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-3 gap-4 text-primary-foreground">
            <div className="flex items-center justify-center gap-2">
              <Trophy className="h-6 w-6 text-accent" />
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-xs opacity-80">Tournaments</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-accent" />
              <div>
                <p className="text-2xl font-bold">10,000+</p>
                <p className="text-xs opacity-80">Players</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <MapPin className="h-6 w-6 text-accent" />
              <div>
                <p className="text-2xl font-bold">28</p>
                <p className="text-xs opacity-80">States</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
