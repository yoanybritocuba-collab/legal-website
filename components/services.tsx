"use client"

import { Scale, Users, Building2, FileText, Gavel, ShieldCheck } from "lucide-react"

const services = [
  {
    icon: Scale,
    title: "Derecho Civil",
    description:
      "Contratos, obligaciones, propiedad y todo tipo de litigios civiles. Proteccion integral de tus derechos patrimoniales.",
  },
  {
    icon: Gavel,
    title: "Derecho Penal",
    description:
      "Defensa penal efectiva. Representacion en todas las etapas del proceso, desde la investigacion hasta el juicio oral.",
  },
  {
    icon: Users,
    title: "Derecho Familiar",
    description:
      "Divorcios, custodia, pensiones alimenticias y adopciones. Soluciones sensibles para momentos delicados.",
  },
  {
    icon: Building2,
    title: "Derecho Mercantil",
    description:
      "Constitucion de sociedades, contratos comerciales y resolucion de conflictos empresariales.",
  },
  {
    icon: FileText,
    title: "Derecho Laboral",
    description:
      "Despidos injustificados, prestaciones laborales y negociaciones colectivas. Defendemos tus derechos como trabajador.",
  },
  {
    icon: ShieldCheck,
    title: "Asesoria Integral",
    description:
      "Consultoria legal preventiva para personas y empresas. Anticipamos problemas para que no tengas que enfrentarlos.",
  },
]

export function Services() {
  return (
    <section id="servicios" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Areas de Practica
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Servicios Legales Especializados
          </h2>
          <p className="mt-4 font-[family-name:var(--font-inter)] text-base leading-relaxed text-muted-foreground">
            Cada area del derecho requiere un enfoque especializado. 
            Ofrecemos soluciones juridicas a la medida de tus necesidades.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/5"
            >
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gold/5 transition-all duration-500 group-hover:scale-150" />
              
              <div className="relative">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-navy/5 transition-colors duration-300 group-hover:bg-gold/10">
                  <service.icon className="h-7 w-7 text-navy transition-colors duration-300 group-hover:text-gold" />
                </div>

                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 font-[family-name:var(--font-inter)] text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <a
                  href="#agendar"
                  className="mt-6 inline-flex items-center font-[family-name:var(--font-inter)] text-sm font-medium text-navy transition-colors duration-300 group-hover:text-gold"
                >
                  Consultar
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
