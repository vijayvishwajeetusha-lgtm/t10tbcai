"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:t10tennisballcricket2023@gmail.com"
                className="flex items-center gap-1 hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">t10tennisballcricket2023@gmail.com</span>
              </a>
              <a href="tel:+91 94157 01006, 79052 51534" className="flex items-center gap-1 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">+91 94157 01006, 79052 51534</span>
              </a>
              <span className="hidden md:flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Kashi Vidyapith Block, Shivdaspur, Manduadih, Varanasi, Uttar Pradesh - 221103</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background border-b border-border shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.jpg" alt="T10TBCAI" width={50} height={50} className="w-12 h-12 object-contain" />
              <div className="hidden sm:block">
                <h1 className="font-bold text-foreground text-lg leading-tight">T10 TENNIS BALL CRICKET</h1>
                <p className="text-muted-foreground text-xs">ASSOCIATION OF INDIA</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
                About Us
              </Link>
              <Link href="/members" className="text-foreground hover:text-primary transition-colors font-medium">
                Association Members
              </Link>
              <Link href="/gallery" className="text-foreground hover:text-primary transition-colors font-medium">
                Gallery
              </Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors font-medium">
                Contact Us
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/register">
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Register Now</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="gap-2 bg-transparent">
                  <User className="h-4 w-4" />
                  Login
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border animate-in slide-in-from-top-2">
              <div className="flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/members"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Association Members
                </Link>
                <Link
                  href="/gallery"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gallery
                </Link>
                <Link
                  href="/contact"
                  className="text-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <div className="flex gap-3 pt-3 border-t border-border">
                  <Link href="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-accent text-accent-foreground">Register</Button>
                  </Link>
                  <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
