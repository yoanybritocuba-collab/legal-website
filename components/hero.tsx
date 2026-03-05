"use client"

import { ArrowDown, Scale } from "lucide-react"

export function Hero() {
  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo con overlay */}
      <div className="absolute inset-0">
        <img 
          src="/images/hero-lawyer.jpg" 
          alt="Fondo" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy-deep/70 to-navy-deep/90"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 backdrop-blur-sm border border-gold-classic/30 mb-8">
          <Scale className="h-4 w-4 text-gold-classic" />
          <span className="font-[family-name:var(--font-inter)] text-xs font-medium uppercase tracking-wider text-white">
            Loida Azules Suárez · ICAB
          </span>
        </div>

        <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl text-balance">
          Justicia y Excelencia
          <span className="block text-gold-classic mt-2">a tu Servicio</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-inter)] text-lg text-gray-200 sm:text-xl">
          Con más de 15 años de experiencia, brindo asesoría legal integral para proteger tus intereses. 
          Cada caso es único y merece una atención personalizada.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToServices}
            className="group relative overflow-hidden rounded-sm bg-gold-classic px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-navy-deep transition-all duration-300 hover:bg-gold-classic/90 hover:shadow-lg hover:shadow-gold-classic/20 hover-lift"
          >
            <span className="relative z-10">Conoce mis servicios</span>
            <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
          </button>

          <a
            href="#agendar"
            className="rounded-sm border-2 border-gold-classic px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all duration-300 hover:bg-gold-classic hover:text-navy-deep hover:shadow-lg hover:shadow-gold-classic/20"
          >
            Agenda tu consulta
          </a>
        </div>

        {/* Estadísticas */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gold-classic/20">
            <div className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gold-classic">15+</div>
            <div className="mt-2 font-[family-name:var(--font-inter)] text-sm text-gray-200">Años de Experiencia</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gold-classic/20">
            <div className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gold-classic">500+</div>
            <div className="mt-2 font-[family-name:var(--font-inter)] text-sm text-gray-200">Casos Ganados</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-gold-classic/20">
            <div className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-gold-classic">24h</div>
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