import { ArrowRight, Shield, Award, Clock } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-lawyer.jpg"
          alt="Oficina de abogados profesional"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/70" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="grid w-full gap-12 pt-20 lg:grid-cols-2 lg:items-center lg:pt-0">
          <div className="animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
              <Shield className="h-4 w-4 text-gold" />
              <span className="font-[family-name:var(--font-inter)] text-xs font-medium tracking-wider text-gold uppercase">
                Defensora de tus derechos
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl text-balance">
              Justicia y{" "}
              <span className="text-gold">Excelencia</span>{" "}
              Legal a tu Servicio
            </h1>

            <p className="mt-6 max-w-xl font-[family-name:var(--font-inter)] text-lg leading-relaxed text-primary-foreground/70">
              Con dedicacion y experiencia, brindo asesoria legal integral para proteger tus intereses. 
              Cada caso es unico y merece una atencion personalizada.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#agendar"
                className="group inline-flex items-center justify-center gap-2 rounded-sm bg-gold px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-navy transition-all duration-300 hover:bg-gold/90 hover:shadow-xl hover:shadow-gold/20"
              >
                Agendar Consulta Gratuita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-sm border border-primary-foreground/20 px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-medium text-primary-foreground transition-all duration-300 hover:border-gold/50 hover:text-gold"
              >
                Ver Servicios
              </a>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-6">
              {[
                { icon: Award, value: "15+", label: "Anos de Experiencia" },
                { icon: Shield, value: "500+", label: "Casos Ganados" },
                { icon: Clock, value: "24h", label: "Respuesta Rapida" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <stat.icon className="mx-auto mb-2 h-5 w-5 text-gold sm:mx-0" />
                  <div className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-primary-foreground sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="font-[family-name:var(--font-inter)] text-xs text-primary-foreground/50">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="animate-slide-in-right relative">
              <div className="absolute -inset-4 rounded-2xl bg-gold/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-2xl border border-gold/20">
                <Image
                  src="/images/hero-lawyer.jpg"
                  alt="Abogada profesional"
                  width={600}
                  height={700}
                  className="h-[600px] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
