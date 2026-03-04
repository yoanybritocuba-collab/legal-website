import { CheckCircle } from "lucide-react"
import Image from "next/image"

const achievements = [
  "Maestria en Derecho Corporativo",
  "Certificada en Mediacion y Arbitraje",
  "Miembro del Ilustre Colegio de Abogados",
  "Especialista en Litigios Complejos",
  "Consultora Legal Internacional",
]

export function About() {
  return (
    <section id="sobre-mi" className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-72 w-72 rounded-2xl bg-gold/10" />
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/about-lawyer.jpg"
                alt="Abogada en su oficina"
                width={600}
                height={700}
                className="h-[550px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-xl bg-navy p-6 shadow-xl">
              <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-gold">
                15+
              </div>
              <div className="font-[family-name:var(--font-inter)] text-xs text-primary-foreground/70">
                Anos de experiencia<br />defendiendo tus derechos
              </div>
            </div>
          </div>

          <div>
            <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-gold">
              Conoceme
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground sm:text-4xl text-balance">
              Comprometida con la Justicia y tus Derechos
            </h2>
            <p className="mt-6 font-[family-name:var(--font-inter)] text-base leading-relaxed text-muted-foreground">
              Con mas de 15 anos de trayectoria en el ambito juridico, me he dedicado a brindar 
              representacion legal de excelencia. Mi enfoque combina un profundo conocimiento del 
              derecho con una atencion personalizada que garantiza los mejores resultados para 
              cada uno de mis clientes.
            </p>
            <p className="mt-4 font-[family-name:var(--font-inter)] text-base leading-relaxed text-muted-foreground">
              Creo firmemente que el acceso a la justicia es un derecho fundamental, y trabajo 
              incansablemente para asegurar que cada persona reciba la defensa que merece.
            </p>

            <div className="mt-8 space-y-3">
              {achievements.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-[family-name:var(--font-inter)] text-sm text-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#agendar"
              className="mt-10 inline-flex items-center rounded-sm bg-navy px-8 py-4 font-[family-name:var(--font-inter)] text-sm font-semibold text-primary-foreground transition-all duration-300 hover:bg-navy-light hover:shadow-lg"
            >
              Agenda tu Consulta
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
