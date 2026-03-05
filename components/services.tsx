"use client"

import { Scale, Gavel, Users, Building2, FileText, ShieldCheck, ChevronRight } from "lucide-react"
import ScrollAnimation from "./scroll-animation"

const services = [
  {
    icon: Scale,
    title: "Derecho Civil",
    description: "Contratos, obligaciones, propiedad y todo tipo de litigios civiles. Protección integral de tus derechos patrimoniales.",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: Gavel,
    title: "Derecho Penal",
    description: "Defensa penal efectiva. Representación en todas las etapas del proceso, desde la investigación hasta el juicio oral.",
    color: "text-red-600",
    bgColor: "bg-red-100",
  },
  {
    icon: Users,
    title: "Derecho Familiar",
    description: "Divorcios, custodia, pensiones alimenticias y adopciones. Soluciones sensibles para momentos delicados.",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Building2,
    title: "Derecho Mercantil",
    description: "Constitución de sociedades, contratos comerciales y resolución de conflictos empresariales.",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    icon: FileText,
    title: "Derecho Laboral",
    description: "Despidos injustificados, prestaciones laborales y negociaciones colectivas. Defendemos tus derechos como trabajador.",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    icon: ShieldCheck,
    title: "Asesoría Integral",
    description: "Consultoría legal preventiva para personas y empresas. Anticipamos problemas para que no tengas que enfrentarlos.",
    color: "text-gold",
    bgColor: "bg-yellow-100",
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
              Cada área del derecho requiere un enfoque especializado. Ofrecemos soluciones jurídicas a la medida de tus necesidades.
            </p>
          </div>
        </ScrollAnimation>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ScrollAnimation key={index}>
              <div className="service-card group relative overflow-hidden rounded-xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-gold/5 to-transparent transition-all duration-300 group-hover:scale-150" />

                <div className={`relative mb-6 inline-flex rounded-xl ${service.bgColor} p-4`}>
                  <service.icon className={`h-8 w-8 ${service.color}`} />
                </div>

                <h3 className="relative font-[family-name:var(--font-playfair)] text-xl font-bold text-navy">
                  {service.title}
                </h3>
                <p className="relative mt-3 font-[family-name:var(--font-inter)] text-gray-600">
                  {service.description}
                </p>

                <div className="relative mt-6">
                  <a
                    href="#agendar"
                    className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-navy transition-all duration-300 group-hover:text-gold"
                  >
                    Consultar
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation>
          <div className="relative mt-20 overflow-hidden rounded-2xl bg-navy p-12 text-center">
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
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <div className="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-gold">500+</span>
                  <span className="ml-2 text-white">Casos exitosos</span>
                </div>
                <div className="rounded-lg bg-white/10 px-6 py-3 backdrop-blur-sm">
                  <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-gold">15+</span>
                  <span className="ml-2 text-white">Años experiencia</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}