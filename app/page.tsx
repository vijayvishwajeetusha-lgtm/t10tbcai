"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { PhotoCarousel } from "@/components/photo-carousel"
import { LeadershipSection } from "@/components/leadership-section"
import { FeaturesSection } from "@/components/features-section"
import { CTASection } from "@/components/cta-section"
import { SideBanners } from "@/components/side-banners"
import { EventPopup } from "@/components/event-popup"
import { initializeStorage } from "@/lib/storage"

export default function HomePage() {
  useEffect(() => {
    initializeStorage()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <PhotoCarousel />
        <LeadershipSection />
        <CTASection />
      </main>
      <Footer />
      <SideBanners />
      <EventPopup />
    </div>
  )
}
