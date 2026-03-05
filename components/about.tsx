"use client"

import Image from "next/image"
import { CheckCircle, Scale, Award, Shield, Users, Clock } from "lucide-react"
import ScrollAnimation from "./scroll-animation"

const qualities = [
  { icon: Award, text: "Maestría en Derecho Corporativo" },
  { icon: Shield, text: "Certificada en Mediación y Arbitraje" },
  { icon: Users, text: "Miembro del Ilustre Colegio de Abogados" },
  { icon: Scale, text: "Especialista en Litigios Complejos" },
  { icon: Clock, text: "Consultora Legal Internacional" },
]

export function About() {
  return (
    <section id="sobre-mi" className="bg-gradient-to-b from-white to-gray-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Columna izquierda - Imagen */}
          <ScrollAnimation>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
              <div className="absolute -bottom-4 -right-4 h-72 w-72 rounded-full bg-navy/10 blur-3xl" />
              
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src="/images/about-lawyer.jpg"
                  alt="Abogada profesional"
                  width={600}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                
                {/* Tarjeta flotante de experiencia */}
                <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/95 p-6 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                      <Scale className="h-8 w-8 text-gold" />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy">15+</div>
                      <div className="font-[family-name:var(--font-inter)] text-sm text-gray-600">Años de experiencia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Columna derecha - Contenido */}
          <ScrollAnimation>
            <div className="space-y-6">
              <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-gold">
                Conóceme
              </span>
              
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-navy lg:text-5xl">
                Comprometida con la Justicia
                <span className="block text-gold">y tus Derechos</span>
              </h2>

              <div className="space-y-4 font-[family-name:var(--font-inter)] text-lg text-gray-600">
                <p>
                  Con más de 15 años de trayectoria en el ámbito jurídico, me he dedicado a brindar representación legal de excelencia. Mi enfoque combina un profundo conocimiento del derecho con una atención personalizada que garantiza los mejores resultados para cada uno de mis clientes.
                </p>
                <p>
                  Creo firmemente que el acceso a la justicia es un derecho fundamental, y trabajo incansablemente para asegurar que cada persona reciba la defensa que merece.
                </p>
              </div>

              {/* Lista de cualidades */}
              <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2">
                {qualities.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="rounded-full bg-gold/10 p-1">
                      <item.icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Botón CTA */}
              <div className="pt-6">
                <a
                  href="#agendar"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-navy px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all duration-300 hover:bg-navy-light"
                >
                  <span className="relative z-10">Agenda tu Consulta</span>
                  <div className="absolute inset-0 -translate-x-full transform bg-gold/20 transition-transform duration-300 group-hover:translate-x-0" />
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}