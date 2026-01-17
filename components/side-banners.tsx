"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

export function SideBanners() {
  const [leftVisible, setLeftVisible] = useState(true)
  const [rightVisible, setRightVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Left Banner */}
      {leftVisible && (
        <div
          className={`fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-all duration-500 ${
            scrolled ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="relative">
            <button
              onClick={() => setLeftVisible(false)}
              className="absolute -right-2 -top-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-primary transition-colors z-10"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-32 bg-card rounded-r-lg shadow-lg overflow-hidden border-r-4 border-primary">
              <Image
                src="/placeholder.svg?height=400&width=128"
                alt="Tournament Poster"
                width={128}
                height={400}
                className="w-full h-auto"
              />
              <div className="p-2 bg-primary text-primary-foreground text-center">
                <p className="text-xs font-bold">REGISTER NOW</p>
                <p className="text-[10px]">Limited Seats!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right Banner */}
      {rightVisible && (
        <div
          className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden xl:block transition-all duration-500 ${
            scrolled ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
          }`}
        >
          <div className="relative">
            <button
              onClick={() => setRightVisible(false)}
              className="absolute -left-2 -top-2 w-6 h-6 bg-foreground text-background rounded-full flex items-center justify-center hover:bg-primary transition-colors z-10"
              aria-label="Close banner"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-32 bg-card rounded-l-lg shadow-lg overflow-hidden border-l-4 border-accent">
              <Image
                src="/placeholder.svg?height=400&width=128"
                alt="Championship Poster"
                width={128}
                height={400}
                className="w-full h-auto"
              />
              <div className="p-2 bg-accent text-accent-foreground text-center">
                <p className="text-xs font-bold">MARCH 2026</p>
                <p className="text-[10px]">Don't Miss!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
