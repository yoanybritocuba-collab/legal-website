import { Scale, MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Columna 1: Logo y descripción */}
          <div>
            <div className="flex items-center gap-3">
              <Scale className="h-8 w-8 text-gold" />
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-playfair)] text-lg font-bold">
                  LOIDA AZULES
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] uppercase tracking-[0.3em] text-gold">
                  Abogada
                </span>
              </div>
            </div>
            <p className="mt-4 font-[family-name:var(--font-inter)] text-sm text-gray-300">
              Justicia y excelencia legal a tu servicio. Más de 15 años defendiendo tus derechos.
            </p>
          </div>

          {/* Columna 2: Contacto (TODOS EJECUTABLES) */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-gold mb-4">
              Contacto
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-inter)] text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <a 
                  href="https://maps.google.com/?q=C/Bailén+92+Entlo.+3a+esc.+izqda,+08009+Barcelona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  C/ Bailén 92 Entlo. 3a esc. izqda<br />08009 Barcelona
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a 
                  href="tel:+34604173477" 
                  className="hover:text-gold transition-colors"
                >
                  +34 604 173 477
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a 
                  href="mailto:loyanzules@icab.cat" 
                  className="hover:text-gold transition-colors break-all"
                >
                  loyanzules@icab.cat
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horario */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-gold mb-4">
              Horario
            </h3>
            <ul className="space-y-3 font-[family-name:var(--font-inter)] text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <p>Lunes a Viernes: 9:00 - 14:00</p>
                  <p className="mt-1">16:00 - 19:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 4: Enlaces */}
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-gold mb-4">
              Enlaces
            </h3>
            <ul className="space-y-2 font-[family-name:var(--font-inter)] text-sm">
              {["Inicio", "Servicios", "Sobre Mi", "Testimonios", "Contacto"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-300 hover:text-gold transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mapa */}
        <div className="mt-12">
          <div className="h-64 w-full bg-gray-800 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.086274645686!2d2.169936315424072!3d41.39067667926292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a2f7c8b7b7b7%3A0x8b7b7b7b7b7b7b7b!2sC%2F%20Bail%C3%A9n%2C%2092%2C%2008009%20Barcelona!5e0!3m2!1ses!2ses!4v1647884523456!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className="opacity-80 hover:opacity-100 transition-opacity"
            ></iframe>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center font-[family-name:var(--font-inter)] text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Loida Azules Suárez. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">Ilustre Colegio de la Abogacía de Barcelona - ICAB</p>
        </div>
      </div>
    </footer>
  )
}