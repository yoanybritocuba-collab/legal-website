"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { format, addDays, isSameDay, isWeekend } from "date-fns"
import { es } from "date-fns/locale"

const serviceTypes = [
  { id: "civil", label: "Derecho Civil", duration: "45 min", icon: "Scale" },
  { id: "penal", label: "Derecho Penal", duration: "60 min", icon: "Gavel" },
  { id: "familiar", label: "Derecho Familiar", duration: "45 min", icon: "Users" },
  { id: "mercantil", label: "Derecho Mercantil", duration: "45 min", icon: "Building2" },
  { id: "laboral", label: "Derecho Laboral", duration: "45 min", icon: "FileText" },
  { id: "consulta", label: "Consulta General", duration: "30 min", icon: "ShieldCheck" },
]

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
]

function generateAvailableDays() {
  const days: Date[] = []
  let current = new Date()
  while (days.length < 14) {
    current = addDays(current, 1)
    if (!isWeekend(current)) {
      days.push(new Date(current))
    }
  }
  return days
}

function getSmartSuggestion(service: string): string {
  const suggestions: Record<string, string> = {
    civil: "Para casos civiles, recomendamos la primera consulta por la manana para revisar documentacion con calma.",
    penal: "Los casos penales requieren atencion urgente. Priorizamos horarios tempranos para actuar con rapidez.",
    familiar: "Entendemos la sensibilidad de los casos familiares. Ofrecemos un ambiente privado y confidencial.",
    mercantil: "Para consultas mercantiles, le sugerimos traer documentos de la empresa para una asesoria mas eficiente.",
    laboral: "Reuna sus recibos de nomina y contrato laboral para aprovechar al maximo la consulta.",
    consulta: "La primera consulta es gratuita. Evaluaremos su caso y le orientaremos sobre los pasos a seguir.",
  }
  return suggestions[service] || suggestions.consulta
}

export function AppointmentBooking() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const availableDays = useMemo(() => generateAvailableDays(), [])

  const simulatedBusy = useMemo(() => {
    const busy = new Set<string>()
    timeSlots.forEach((slot) => {
      if (Math.random() > 0.65) busy.add(slot)
    })
    return busy
  }, [selectedDate])

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section id="agendar" className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border border-gold/20 bg-card p-12 shadow-xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
              <CheckCircle className="h-10 w-10 text-gold" />
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground sm:text-3xl">
              Cita Agendada Exitosamente
            </h3>
            <p className="mt-4 font-[family-name:var(--font-inter)] text-muted-foreground">
              Hemos recibido tu solicitud para el{" "}
              <span className="font-semibold text-foreground">
                {selectedDate && format(selectedDate, "EEEE d 'de' MMMM", { locale: es })}
              </span>{" "}
              a las{" "}
              <span className="font-semibold text-foreground">{selectedTime} hrs</span>.
              Te enviaremos un correo de confirmacion a {formData.email}.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false)
                setStep(1)
                setSelectedService("")
                setSelectedDate(null)
                setSelectedTime("")
                setFormData({ name: "", email: "", phone: "", message: "" })
              }}
              className="mt-8 rounded-sm bg-navy px-8 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-primary-foreground transition-all hover:bg-navy-light"
            >
              Agendar Otra Cita
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="agendar" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-gold">
            Sistema de Citas Inteligente
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Agenda tu Consulta
          </h2>
          <p className="mt-4 font-[family-name:var(--font-inter)] text-base text-muted-foreground">
            Nuestro sistema inteligente te guia paso a paso para encontrar el mejor horario disponible.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mx-auto mt-12 flex max-w-md items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-[family-name:var(--font-inter)] text-sm font-bold transition-all duration-300 ${
                  s === step
                    ? "bg-gold text-navy shadow-lg shadow-gold/30"
                    : s < step
                    ? "bg-navy text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`mx-2 h-0.5 w-12 transition-all duration-300 sm:w-20 ${
                    s < step ? "bg-navy" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-md justify-between px-1">
          {["Servicio", "Fecha", "Hora", "Datos"].map((label) => (
            <span key={label} className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground">
              {label}
            </span>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground">
                Selecciona el tipo de consulta
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-all duration-300 ${
                      selectedService === service.id
                        ? "border-gold bg-gold/5 shadow-md"
                        : "border-border hover:border-gold/30 hover:bg-secondary"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        selectedService === service.id ? "bg-gold/20" : "bg-muted"
                      }`}
                    >
                      <FileText className={`h-5 w-5 ${selectedService === service.id ? "text-gold" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-inter)] text-sm font-semibold text-foreground">
                        {service.label}
                      </div>
                      <div className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground">
                        Duracion: {service.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedService && (
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-gold/20 bg-gold/5 p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-foreground/80">
                    {getSmartSuggestion(selectedService)}
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => step < 4 && setStep(2)}
                  disabled={!selectedService}
                  className="inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-primary-foreground transition-all hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Select Date */}
          {step === 2 && (
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground">
                Selecciona una fecha
              </h3>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">
                Mostrando los proximos dias habiles disponibles
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {availableDays.map((day) => (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`flex flex-col items-center rounded-lg border p-4 transition-all duration-300 ${
                      selectedDate && isSameDay(selectedDate, day)
                        ? "border-gold bg-gold/5 shadow-md"
                        : "border-border hover:border-gold/30 hover:bg-secondary"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-inter)] text-xs uppercase text-muted-foreground">
                      {format(day, "EEE", { locale: es })}
                    </span>
                    <span className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold text-foreground">
                      {format(day, "d")}
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground">
                      {format(day, "MMM", { locale: es })}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-foreground transition-all hover:bg-secondary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atras
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate}
                  className="inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-primary-foreground transition-all hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Select Time */}
          {step === 3 && (
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground">
                Selecciona un horario
              </h3>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-muted-foreground">
                {selectedDate && format(selectedDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}
              </p>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gold/20 ring-1 ring-gold/40" />
                    <span className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-muted" />
                    <span className="font-[family-name:var(--font-inter)] text-xs text-muted-foreground">Ocupado</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                  {timeSlots.map((time) => {
                    const isBusy = simulatedBusy.has(time)
                    return (
                      <button
                        key={time}
                        onClick={() => !isBusy && setSelectedTime(time)}
                        disabled={isBusy}
                        className={`flex items-center justify-center gap-2 rounded-lg border p-3 font-[family-name:var(--font-inter)] text-sm transition-all duration-300 ${
                          isBusy
                            ? "cursor-not-allowed border-border bg-muted/50 text-muted-foreground line-through opacity-50"
                            : selectedTime === time
                            ? "border-gold bg-gold/10 font-semibold text-foreground shadow-md"
                            : "border-border text-foreground hover:border-gold/30 hover:bg-secondary"
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        {time}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-foreground transition-all hover:bg-secondary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atras
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedTime}
                  className="inline-flex items-center gap-2 rounded-sm bg-navy px-8 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-primary-foreground transition-all hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Contact Details */}
          {step === 4 && (
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-foreground">
                Completa tus datos
              </h3>

              <div className="mt-2 rounded-lg border border-gold/20 bg-gold/5 p-4">
                <div className="flex flex-wrap gap-4 font-[family-name:var(--font-inter)] text-sm text-foreground/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gold" />
                    {selectedDate && format(selectedDate, "d MMM yyyy", { locale: es })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold" />
                    {selectedTime} hrs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-gold" />
                    {serviceTypes.find((s) => s.id === selectedService)?.label}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-foreground">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-foreground">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Correo Electronico
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-foreground">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
                    placeholder="+52 000 000 0000"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-foreground">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Breve Descripcion del Caso
                  </label>
                  <input
                    type="text"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-foreground outline-none transition-colors focus:border-gold focus:ring-1 focus:ring-gold/30"
                    placeholder="Describe brevemente tu situacion"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-foreground transition-all hover:bg-secondary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atras
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="inline-flex items-center gap-2 rounded-sm bg-gold px-10 py-3 font-[family-name:var(--font-inter)] text-sm font-bold text-navy transition-all hover:bg-gold/90 hover:shadow-lg hover:shadow-gold/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Confirmar Cita
                  <CheckCircle className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
