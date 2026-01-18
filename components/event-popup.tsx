"use client"

import { useState, useEffect } from "react"
import { X, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { upcomingEvents } from "@/lib/data"
import Image from "next/image"

export function EventPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!isOpen) return null

  const event = upcomingEvents[0]

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="flex items-center justify-center gap-3 lg:gap-6 w-full h-full max-h-[90vh]">
        {/* Left Poster */}
        <div className="hidden lg:block flex-shrink-0 w-48 lg:w-200 xl:w-120 h-full max-h-[85vh] relative rounded-xl overflow-hidden shadow-2xl">
          <Image src="/cricket-poster-left.jpg" alt="Cricket Tournament Left Poster" fill className="object-cover" />
        </div>

        {/* Center Content */}
        <div className="relative bg-background rounded-2xl shadow-2xl w-full max-w-lg lg:max-w-xl overflow-hidden animate-in zoom-in-95 duration-300">
          {/* Header Image */}
          <div className="relative h-44 lg:h-48 bg-gradient-to-br from-primary to-accent">
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="text-center text-primary-foreground">
                <div className="text-lg lg:text-xl font-bold leading-tight">
                  3RD SENIOR T10 TENNIS BALL CRICKET CHAMPIONSHIP, DHANBAD 2026, MEN'S & WOMEN'S
                </div>
                <div className="text-xs lg:text-sm tracking-wider mt-2">UPCOMING EVENT</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 transition-colors"
              aria-label="Close popup"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">{event.title}</h3>
            <p className="text-muted-foreground text-sm lg:text-base mb-6">{event.description}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm lg:text-base">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-foreground">{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm lg:text-base">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-foreground">{event.location}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" asChild>
                <a href="/register">Register Now</a>
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>

        {/* Right Poster */}
        <div className="hidden lg:block flex-shrink-0 w-48 lg:w-200 xl:w-120 h-full max-h-[85vh] relative rounded-xl overflow-hidden shadow-2xl">
          <Image src="/cricket-poster-right.jpg" alt="Cricket Tournament Right Poster" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
