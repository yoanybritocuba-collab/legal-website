"use client"

import { ArrowDown, Scale } from "lucide-react"

export function Hero() {
  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden parallax"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/images/hero-lawyer.jpg')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-transparent to-navy/80" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-2 backdrop-blur-sm mb-8">
          <Scale className="h-4 w-4 text-gold" />
          <span className="font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-wider text-gold">
            Loida Azules Suárez
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl text-balance">
          Justicia y Excelencia Legal
          <span className="block text-gold">a tu Servicio</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-inter)] text-lg text-gray-200 sm:text-xl">
          Con más de 15 años de experiencia, brindo asesoría legal integral para proteger tus intereses. 
          Cada caso es único y merece una atención personalizada.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToServices}
            className="group relative overflow-hidden rounded-sm bg-gold px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/20"
          >
            <span className="relative z-10">Conoce mis servicios</span>
            <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
          </button>

          <a
            href="#agendar"
            className="rounded-sm border-2 border-white/30 px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all duration-300 hover:border-gold hover:bg-white/10"
          >
            Agenda tu consulta
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold">15+</div>
            <div className="mt-2 font-[family-name:var(--font-inter)] text-sm text-gray-200">Años de Experiencia</div>
          </div>
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold">500+</div>
            <div className="mt-2 font-[family-name:var(--font-inter)] text-sm text-gray-200">Casos Ganados</div>
          </div>
          <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
            <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold">24h</div>
            <div className="mt-2 font-[family-name:var(--font-inter)] text-sm text-gray-200">Respuesta Rápida</div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce">
          <ArrowDown className="h-6 w-6 text-white/60" />
        </div>
      </div>
    </section>
  )
}