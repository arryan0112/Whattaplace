"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
      <div className="container-responsive py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">
              whattaplace
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Find a Place
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              Host Your Space
            </a>
            <a
              href="#"
              className="text-foreground hover:text-primary transition-all duration-300 hover:scale-105 font-medium"
            >
              How it Works
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Button className="hidden sm:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-300">
              Get in Touch
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden touch-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border animate-slide-up">
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium touch-target"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find a Place
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium touch-target"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Host Your Space
              </a>
              <a
                href="#"
                className="text-foreground hover:text-primary transition-colors font-medium touch-target"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How it Works
              </a>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:hidden">
                Get in Touch
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
