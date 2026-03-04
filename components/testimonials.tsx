"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Maria Fernandez",
    role: "Caso Civil",
    text: "Gracias a su dedicacion y profesionalismo, logre resolver mi caso de propiedad que llevaba anos sin solucion. Su conocimiento del derecho civil es excepcional.",
    rating: 5,
  },
  {
    name: "Carlos Rodriguez",
    role: "Caso Laboral",
    text: "Me ayudo a obtener la indemnizacion que me correspondia despues de un despido injustificado. Todo el proceso fue transparente y me mantuve informado en cada paso.",
    rating: 5,
  },
  {
    name: "Ana Patricia Gomez",
    role: "Caso Familiar",
    text: "En un momento tan dificil como mi proceso de divorcio, encontre en ella no solo una gran abogada sino una persona empatica que me guio con profesionalismo.",
    rating: 5,
  },
  {
    name: "Roberto Sanchez",
    role: "Caso Mercantil",
    text: "La constitucion de mi empresa fue mucho mas sencilla gracias a su asesoria. Ahora cuento con toda la documentacion legal en orden para operar con tranquilidad.",
    rating: 5,
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonios" className="bg-navy py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Testimonios
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl text-balance">
            Lo que Dicen Nuestros Clientes
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="mx-auto max-w-3xl">
            <div className="relative rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur sm:p-12">
              <Quote className="absolute left-6 top-6 h-12 w-12 text-gold/20 sm:left-8 sm:top-8" />

              <div className="relative">
                <div className="flex gap-1">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>

                <blockquote className="mt-6 font-[family-name:var(--font-inter)] text-lg leading-relaxed text-primary-foreground/90 sm:text-xl">
                  &ldquo;{testimonials[current].text}&rdquo;
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 font-[family-name:var(--font-playfair)] text-lg font-bold text-gold">
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <div className="font-[family-name:var(--font-inter)] text-sm font-semibold text-primary-foreground">
                      {testimonials[current].name}
                    </div>
                    <div className="font-[family-name:var(--font-inter)] text-xs text-primary-foreground/50">
                      {testimonials[current].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all hover:border-gold hover:text-gold"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-gold" : "w-2 bg-primary-foreground/20"
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 text-primary-foreground/60 transition-all hover:border-gold hover:text-gold"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
