"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "./mode-toggle"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Career Quiz", href: "/quiz" },
    { name: "Streams", href: "/streams" },
    { name: "Career Paths", href: "/career-paths" },
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CareerCompass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <ModeToggle />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 px-4 text-foreground/80 hover:bg-muted rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
