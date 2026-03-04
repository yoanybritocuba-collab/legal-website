import { Scale, MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer id="contacto" className="bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-gold" />
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-playfair)] text-lg font-bold tracking-wide text-primary-foreground">
                  ABOGADA
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-gold">
                  Servicios Legales
                </span>
              </div>
            </div>
            <p className="mt-6 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-primary-foreground/60">
              Comprometidos con la excelencia juridica y la defensa de tus derechos. Tu confianza es nuestra mayor responsabilidad.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-base font-bold text-primary-foreground">
              Enlaces Rapidos
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Inicio", href: "#inicio" },
                { label: "Servicios", href: "#servicios" },
                { label: "Sobre Mi", href: "#sobre-mi" },
                { label: "Testimonios", href: "#testimonios" },
                { label: "Agendar Cita", href: "#agendar" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-[family-name:var(--font-inter)] text-sm text-primary-foreground/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-base font-bold text-primary-foreground">
              Servicios
            </h4>
            <ul className="mt-4 space-y-3">
              {[
                "Derecho Civil",
                "Derecho Penal",
                "Derecho Familiar",
                "Derecho Mercantil",
                "Derecho Laboral",
              ].map((service) => (
                <li key={service}>
                  <span className="font-[family-name:var(--font-inter)] text-sm text-primary-foreground/60">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-base font-bold text-primary-foreground">
              Contacto
            </h4>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="font-[family-name:var(--font-inter)] text-sm text-primary-foreground/60">
                  Av. Reforma 123, Col. Centro,<br />Ciudad de Mexico, CDMX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-gold" />
                <a href="tel:+525512345678" className="font-[family-name:var(--font-inter)] text-sm text-primary-foreground/60 transition-colors hover:text-gold">
                  +52 55 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-gold" />
                <a href="mailto:contacto@abogada.com" className="font-[family-name:var(--font-inter)] text-sm text-primary-foreground/60 transition-colors hover:text-gold">
                  contacto@abogada.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="font-[family-name:var(--font-inter)] text-sm text-primary-foreground/60">
                  Lun - Vie: 9:00 - 18:00<br />Sab: 9:00 - 13:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="mt-16 border-t border-primary-foreground/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-4">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/10"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 text-primary-foreground/50 transition-colors group-hover:text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/10"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 text-primary-foreground/50 transition-colors group-hover:text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/10"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 text-primary-foreground/50 transition-colors group-hover:text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </a>

              {/* TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/10"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5 text-primary-foreground/50 transition-colors group-hover:text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.42a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.85z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-primary-foreground/15 transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/10"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4 text-primary-foreground/50 transition-colors group-hover:text-gold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <p className="font-[family-name:var(--font-inter)] text-sm text-primary-foreground/40">
              &copy; {new Date().getFullYear()} Abogada. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
