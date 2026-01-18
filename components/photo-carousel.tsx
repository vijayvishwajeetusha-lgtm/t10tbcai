"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { galleryImages } from "@/lib/data"

export function PhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            Tournament Moments
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Capturing Glory</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Relive the most memorable moments from our tournaments
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Main Image */}
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-background text-xl md:text-2xl font-bold">{image.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-foreground" />
          </button>

          {/* Thumbnails */}
          <div className="flex justify-center gap-2 mt-6 overflow-x-auto pb-2">
            {galleryImages.slice(0, 6).map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-primary ring-offset-2 scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.title} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
