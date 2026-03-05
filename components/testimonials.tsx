"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import Image from "next/image"
import ScrollAnimation from "./scroll-animation"

const testimonials = [
  {
    name: "María Fernández",
    role: "Caso Civil",
    content: "Gracias a su dedicación y profesionalismo, logré resolver mi caso de propiedad que llevaba años sin solución. Su conocimiento del derecho civil es excepcional.",
    rating: 5,
    image: "/images/testimonial-1.jpg",
  },
  {
    name: "Carlos Rodríguez",
    role: "Caso Penal",
    content: "En un momento difícil, su defensa penal fue impecable. Obtuvimos un resultado favorable que cambió mi vida. La recomiendo ampliamente.",
    rating: 5,
    image: "/images/testimonial-2.jpg",
  },
  {
    name: "Ana Martínez",
    role: "Derecho Familiar",
    content: "Su sensibilidad y conocimiento en derecho familiar hicieron que un proceso difícil fuera llevadero. Logramos un acuerdo justo para ambas partes.",
    rating: 5,
    image: "/images/testimonial-3.jpg",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonios" className="bg-gradient-to-b from-gray-50 to-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center">
            <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Testimonios
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy sm:text-4xl lg:text-5xl text-balance">
              Lo que Dicen Nuestros Clientes
            </h2>
          </div>
        </ScrollAnimation>

        <div className="relative mt-16">
          {/* Decoración */}
          <div className="absolute -left-4 -top-4 h-40 w-40 rounded-full bg-gold/5 blur-2xl" />
          <div className="absolute -bottom-4 -right-4 h-40 w-40 rounded-full bg-navy/5 blur-2xl" />

          {/* Carrusel */}
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 p-8 md:p-12">
                  <div className="flex flex-col items-center text-center">
                    {/* Comillas decorativas */}
                    <Quote className="h-12 w-12 text-gold/20" />

                    {/* Estrellas */}
                    <div className="mt-4 flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                      ))}
                    </div>

                    {/* Testimonio */}
                    <p className="mt-6 font-[family-name:var(--font-inter)] text-lg text-gray-700 md:text-xl">
                      "{testimonial.content}"
                    </p>

                    {/* Autor */}
                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="text-left">
                        <div className="font-[family-name:var(--font-playfair)] text-lg font-bold text-navy">
                          {testimonial.name}
                        </div>
                        <div className="font-[family-name:var(--font-inter)] text-sm text-gold">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gold hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-lg transition-all hover:bg-gold hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Indicadores */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === current ? "w-8 bg-gold" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}