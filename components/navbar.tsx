"use client"

import { useState, useEffect } from "react"
import { Menu, X, Scale } from "lucide-react"  // Scale es el icono de balanza (abogado)

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Sobre Mi", href: "#sobre-mi" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "Contacto", href: "#contacto" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            {/* Scale es el icono de balanza - símbolo de abogado */}
            <Scale className="h-8 w-8 text-gold" />
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-playfair)] text-lg font-bold tracking-wide text-primary-foreground">
                LOIDA AZULES
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-gold">
                Abogada
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-[family-name:var(--font-inter)] text-sm font-medium text-primary-foreground/80 transition-colors duration-300 hover:text-gold"
              >
                {link.label}
              </a>
            ))}

            <a
              href="/admin.html"
              className="font-[family-name:var(--font-inter)] text-sm font-medium text-primary-foreground/80 transition-colors duration-300 hover:text-gold"
            >
              Admin
            </a>

            <a
              href="#agendar"
              className="rounded-sm bg-gold px-6 py-2.5 font-[family-name:var(--font-inter)] text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg"
            >
              Agendar Cita
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-primary-foreground md:hidden"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="bg-navy/98 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-1 px-4 pb-6 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-sm px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-primary-foreground/80 transition-colors hover:bg-primary-foreground/5 hover:text-gold"
              >
                {link.label}
              </a>
            ))}

            <a
              href="/admin.html"
              onClick={() => setIsOpen(false)}
              className="rounded-sm px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-primary-foreground/80 transition-colors hover:bg-primary-foreground/5 hover:text-gold"
            >
              Admin
            </a>

            <a
              href="#agendar"
              onClick={() => setIsOpen(false)}
              className="mt-3 rounded-sm bg-gold px-6 py-3 text-center font-[family-name:var(--font-inter)] text-sm font-semibold text-navy"
            >
              Agendar Cita
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}