"use client"

import { Scale, Gavel, Users, Building2, FileText, ShieldCheck, ChevronRight } from "lucide-react"
import ScrollAnimation from "./scroll-animation"

const services = [
  {
    icon: Scale,
    title: "Derecho Civil",
    description: "Contratos, obligaciones, propiedad y todo tipo de litigios civiles.",
    color: "text-blue-600",
  },
  {
    icon: Gavel,
    title: "Derecho Penal",
    description: "Defensa penal efectiva en todas las etapas del proceso.",
    color: "text-red-600",
  },
  {
    icon: Users,
    title: "Derecho Familiar",
    description: "Divorcios, custodia, pensiones alimenticias y adopciones.",
    color: "text-green-600",
  },
  {
    icon: Building2,
    title: "Derecho Mercantil",
    description: "Constitución de sociedades y resolución de conflictos empresariales.",
    color: "text-purple-600",
  },
  {
    icon: FileText,
    title: "Derecho Laboral",
    description: "Despidos, prestaciones y negociaciones colectivas.",
    color: "text-orange-600",
  },
  {
    icon: ShieldCheck,
    title: "Asesoría Integral",
    description: "Consultoría legal preventiva para personas y empresas.",
    color: "text-gold",
  },
]

export function Services() {
  return (
    <section id="servicios" className="bg-gradient-to-b from-gray-50 to-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center">
            <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Áreas de Práctica
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy sm:text-4xl lg:text-5xl text-balance">
              Servicios Legales Especializados
            </h2>
            <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-lg text-gray-600">
              Cada área del derecho requiere un enfoque especializado. Ofrecemos soluciones jurídicas a la medida.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollAnimation key={index}>
              <div className="group relative bg-white rounded-xl p-8 shadow-lg hover-lift cursor-pointer">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/5 transition-all duration-300 group-hover:scale-150" />

                <div className={`relative mb-6 inline-flex rounded-xl p-4 bg-navy/5`}>
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>

                <h3 className="relative font-[family-name:var(--font-playfair)] text-xl font-bold text-navy">
                  {service.title}
                </h3>
                <p className="relative mt-3 font-[family-name:var(--font-inter)] text-gray-600">
                  {service.description}
                </p>

                <a
                  href="#agendar"
                  className="relative mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-navy group-hover:text-gold transition-colors"
                >
                  Consultar
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Banner */}
        <ScrollAnimation>
          <div className="relative mt-20 overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-light p-12 text-center">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gold/10" />
            <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-gold/10" />
            
            <div className="relative">
              <Scale className="mx-auto h-16 w-16 text-gold/50" />
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                Loida Azules Suárez
              </h3>
              <p className="mx-auto mt-4 max-w-2xl font-[family-name:var(--font-inter)] text-lg text-gray-300">
                defendiendo tus derechos
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}