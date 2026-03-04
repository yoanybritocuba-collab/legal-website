import { Phone, ArrowRight } from "lucide-react"

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gold py-16 lg:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,26,62,0.05),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy sm:text-3xl lg:text-4xl text-balance">
              ¿Necesitas Asesoria Legal?
            </h2>
            <p className="mt-3 max-w-xl font-[family-name:var(--font-inter)] text-base text-navy/70">
              La primera consulta es sin compromiso. Evaluamos tu caso y te orientamos sobre la mejor estrategia legal.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href="#agendar"
              className="group inline-flex items-center justify-center gap-2 rounded-sm bg-navy px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-primary-foreground transition-all hover:bg-navy-light hover:shadow-xl"
            >
              Agendar Consulta
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+525512345678"
              className="inline-flex items-center justify-center gap-2 rounded-sm border-2 border-navy px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-navy transition-all hover:bg-navy hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" />
              Llamar Ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
