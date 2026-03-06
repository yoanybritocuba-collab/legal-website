"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { format, addDays, isSameDay, isWeekend } from "date-fns"
import { es } from "date-fns/locale"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

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
    civil: "Para casos civiles, recomendamos la primera consulta por la mañana para revisar documentación con calma.",
    penal: "Los casos penales requieren atención urgente. Priorizamos horarios tempranos para actuar con rapidez.",
    familiar: "Entendemos la sensibilidad de los casos familiares. Ofrecemos un ambiente privado y confidencial.",
    mercantil: "Para consultas mercantiles, le sugerimos traer documentos de la empresa para una asesoría más eficiente.",
    laboral: "Reúna sus recibos de nómina y contrato laboral para aprovechar al máximo la consulta.",
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
  const [isLoading, setIsLoading] = useState(false)

  const availableDays = useMemo(() => generateAvailableDays(), [])

  const simulatedBusy = useMemo(() => {
    const busy = new Set<string>()
    timeSlots.forEach((slot) => {
      if (Math.random() > 0.65) busy.add(slot)
    })
    return busy
  }, [selectedDate])

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      alert("Por favor completa todos los campos")
      return
    }

    setIsLoading(true)

    try {
      // Guardar solo la cita, sin token ni correo
      const appointmentData = {
        nombre: formData.name,
        email: formData.email,
        telefono: formData.phone,
        fecha: selectedDate.toISOString().split('T')[0],
        hora: selectedTime,
        motivo: formData.message || "Sin descripción",
        servicio: serviceTypes.find(s => s.id === selectedService)?.label || selectedService,
        estado: "confirmada",
        fechaCreacion: new Date().toISOString(),
      }

      await addDoc(collection(db, "appointments"), appointmentData)

      // Mostrar solo el mensaje de éxito
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al guardar la cita:", error)
      alert("Hubo un error al agendar la cita. Por favor intenta de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="agendar" className="bg-stone py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="rounded-2xl border-2 border-gold-classic bg-white p-12 shadow-2xl transform scale-105 transition-all duration-500">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gold-classic/10">
              <CheckCircle className="h-12 w-12 text-gold-classic" />
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy-deep sm:text-4xl">
              ¡Cita Confirmada!
            </h3>
            <p className="mt-4 font-[family-name:var(--font-inter)] text-lg text-text-light">
              Tu cita ha sido agendada exitosamente. Te esperamos.
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
              className="mt-8 rounded-lg bg-navy-deep px-10 py-4 font-[family-name:var(--font-inter)] text-base font-semibold text-white transition-all hover:bg-burgundy"
            >
              Agendar Otra Cita
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="agendar" className="bg-stone py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-[family-name:var(--font-inter)] text-sm font-medium uppercase tracking-[0.2em] text-burgundy">
            Sistema de Citas Inteligente
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-navy-deep sm:text-4xl lg:text-5xl text-balance">
            Agenda tu Consulta
          </h2>
          <p className="mt-4 font-[family-name:var(--font-inter)] text-base text-text-light">
            Completa los pasos para agendar tu cita.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mx-auto mt-12 flex max-w-md items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-[family-name:var(--font-inter)] text-sm font-bold transition-all duration-300 ${
                  s === step
                    ? "bg-gold-classic text-navy-deep shadow-lg shadow-gold-classic/30"
                    : s < step
                    ? "bg-navy-deep text-white"
                    : "bg-stone text-text-light border border-border"
                }`}
              >
                {s < step ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`mx-2 h-0.5 w-12 transition-all duration-300 sm:w-20 ${
                    s < step ? "bg-navy-deep" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-md justify-between px-1">
          {["Servicio", "Fecha", "Hora", "Datos"].map((label) => (
            <span key={label} className="font-[family-name:var(--font-inter)] text-xs text-text-light">
              {label}
            </span>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-navy-deep">
                Selecciona el tipo de consulta
              </h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {serviceTypes.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={`flex items-center gap-4 rounded-lg border p-4 text-left transition-all duration-300 ${
                      selectedService === service.id
                        ? "border-gold-classic bg-gold-classic/5 shadow-md"
                        : "border-border hover:border-gold-classic/30 hover:bg-stone"
                    }`}
                  >
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        selectedService === service.id ? "bg-gold-classic/20" : "bg-stone"
                      }`}
                    >
                      <FileText className={`h-5 w-5 ${selectedService === service.id ? "text-gold-classic" : "text-text-light"}`} />
                    </div>
                    <div>
                      <div className="font-[family-name:var(--font-inter)] text-sm font-semibold text-navy-deep">
                        {service.label}
                      </div>
                      <div className="font-[family-name:var(--font-inter)] text-xs text-text-light">
                        Duración: {service.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {selectedService && (
                <div className="mt-6 flex items-start gap-3 rounded-lg border border-gold-classic/20 bg-gold-classic/5 p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold-classic" />
                  <p className="font-[family-name:var(--font-inter)] text-sm leading-relaxed text-text-light">
                    {getSmartSuggestion(selectedService)}
                  </p>
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedService}
                  className="inline-flex items-center gap-2 rounded-sm bg-navy-deep px-8 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-40"
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
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-navy-deep">
                Selecciona una fecha
              </h3>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-text-light">
                Mostrando los próximos días hábiles disponibles
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {availableDays.map((day) => (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    className={`flex flex-col items-center rounded-lg border p-4 transition-all duration-300 ${
                      selectedDate && isSameDay(selectedDate, day)
                        ? "border-gold-classic bg-gold-classic/5 shadow-md"
                        : "border-border hover:border-gold-classic/30 hover:bg-stone"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-inter)] text-xs uppercase text-text-light">
                      {format(day, "EEE", { locale: es })}
                    </span>
                    <span className="mt-1 font-[family-name:var(--font-playfair)] text-2xl font-bold text-navy-deep">
                      {format(day, "d")}
                    </span>
                    <span className="font-[family-name:var(--font-inter)] text-xs text-text-light">
                      {format(day, "MMM", { locale: es })}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-navy-deep transition-all hover:bg-stone"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atrás
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate}
                  className="inline-flex items-center gap-2 rounded-sm bg-navy-deep px-8 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-40"
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
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-navy-deep">
                Selecciona un horario
              </h3>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-text-light">
                {selectedDate && format(selectedDate, "EEEE d 'de' MMMM, yyyy", { locale: es })}
              </p>

              <div className="mt-6">
                <div className="mb-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gold-classic/20 ring-1 ring-gold-classic/40" />
                    <span className="font-[family-name:var(--font-inter)] text-xs text-text-light">Disponible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-border" />
                    <span className="font-[family-name:var(--font-inter)] text-xs text-text-light">Ocupado</span>
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
                            ? "cursor-not-allowed border-border bg-stone/50 text-text-light line-through opacity-50"
                            : selectedTime === time
                            ? "border-gold-classic bg-gold-classic/10 font-semibold text-navy-deep shadow-md"
                            : "border-border text-navy-deep hover:border-gold-classic/30 hover:bg-stone"
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
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-navy-deep transition-all hover:bg-stone"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atrás
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!selectedTime}
                  className="inline-flex items-center gap-2 rounded-sm bg-navy-deep px-8 py-3 font-[family-name:var(--font-inter)] text-sm font-semibold text-white transition-all hover:bg-burgundy disabled:cursor-not-allowed disabled:opacity-40"
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
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-navy-deep">
                Completa tus datos
              </h3>

              <div className="mt-2 rounded-lg border border-gold-classic/20 bg-gold-classic/5 p-4">
                <div className="flex flex-wrap gap-4 font-[family-name:var(--font-inter)] text-sm text-navy-deep">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-gold-classic" />
                    {selectedDate && format(selectedDate, "d MMM yyyy", { locale: es })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-gold-classic" />
                    {selectedTime} hrs
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-gold-classic" />
                    {serviceTypes.find((s) => s.id === selectedService)?.label}
                  </span>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-navy-deep">
                    <User className="h-4 w-4 text-burgundy" />
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-navy-deep outline-none transition-colors focus:border-gold-classic focus:ring-1 focus:ring-gold-classic/30"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-navy-deep">
                    <Mail className="h-4 w-4 text-burgundy" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-navy-deep outline-none transition-colors focus:border-gold-classic focus:ring-1 focus:ring-gold-classic/30"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-navy-deep">
                    <Phone className="h-4 w-4 text-burgundy" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-navy-deep outline-none transition-colors focus:border-gold-classic focus:ring-1 focus:ring-gold-classic/30"
                    placeholder="+34 604 173 477"
                  />
                </div>
                <div>
                  <label className="mb-1.5 flex items-center gap-2 font-[family-name:var(--font-inter)] text-sm font-medium text-navy-deep">
                    <FileText className="h-4 w-4 text-burgundy" />
                    Breve Descripción
                  </label>
                  <input
                    type="text"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-navy-deep outline-none transition-colors focus:border-gold-classic focus:ring-1 focus:ring-gold-classic/30"
                    placeholder="Describe brevemente tu situación"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3 font-[family-name:var(--font-inter)] text-sm font-medium text-navy-deep transition-all hover:bg-stone"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.phone || isLoading}
                  className="inline-flex items-center gap-2 rounded-sm bg-gold-classic px-10 py-3 font-[family-name:var(--font-inter)] text-sm font-bold text-navy-deep transition-all hover:bg-gold-classic/90 hover:shadow-lg hover:shadow-gold-classic/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isLoading ? (
                    <>Guardando...</>
                  ) : (
                    <>
                      Confirmar Cita
                      <CheckCircle className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}