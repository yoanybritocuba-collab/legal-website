"use client"

import { useState, useMemo } from "react"
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { format, addDays, isSameDay, isWeekend } from "date-fns"
import { es } from "date-fns/locale"
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const serviceTypes = [
  { id: "civil", label: "Derecho Civil", duration: "45 min" },
  { id: "penal", label: "Derecho Penal", duration: "60 min" },
  { id: "familiar", label: "Derecho Familiar", duration: "45 min" },
  { id: "mercantil", label: "Derecho Mercantil", duration: "45 min" },
  { id: "laboral", label: "Derecho Laboral", duration: "45 min" },
  { id: "consulta", label: "Consulta General", duration: "30 min" },
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

export function AppointmentBooking() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [appointmentId, setAppointmentId] = useState("")

  const availableDays = useMemo(() => generateAvailableDays(), [])

  const simulatedBusy = useMemo(() => {
    const busy = new Set<string>()
    timeSlots.forEach((slot) => {
      if (Math.random() > 0.65) busy.add(slot)
    })
    return busy
  }, [selectedDate])

  const generateToken = async (appointmentId: string, email: string) => {
    try {
      const response = await fetch('/api/generate-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appointmentId, email })
      });
      
      const data = await response.json();
      if (data.success) {
        return data.token;
      }
      return null;
    } catch (error) {
      console.error('Error generando token:', error);
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      alert("Por favor completa todos los campos")
      return
    }

    setIsLoading(true)

    try {
      // 1. Guardar la cita básica
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

      const docRef = await addDoc(collection(db, "appointments"), appointmentData)
      setAppointmentId(docRef.id)

      // 2. Generar token de edición
      const token = await generateToken(docRef.id, formData.email);
      
      // 3. Actualizar el documento con el token
      await updateDoc(doc(db, "appointments", docRef.id), {
        editToken: token,
        tokenExpires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 días
      });

      // 4. URL de edición
      const editUrl = `https://legal-website-6035a.web.app/editar-cita/${docRef.id}?token=${token}`;

      // 5. Actualizar con los campos de correo
      await updateDoc(doc(db, "appointments", docRef.id), {
        to: [formData.email],
        message: {
          subject: "Confirmación de cita - Loida Azules",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0A1A2F;">¡Cita Confirmada!</h2>
              <p>Hola <strong>${formData.name}</strong>,</p>
              <p>Tu cita ha sido agendada exitosamente:</p>
              <div style="background-color: #F5F7FA; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Fecha:</strong> ${selectedDate?.toLocaleDateString()}</p>
                <p><strong>Hora:</strong> ${selectedTime} hrs</p>
                <p><strong>Servicio:</strong> ${serviceTypes.find(s => s.id === selectedService)?.label}</p>
                <p><strong>Motivo:</strong> ${formData.message || "No especificado"}</p>
              </div>
              <p>¿Necesitas modificar tu cita?</p>
              <p>
                <a href="${editUrl}" 
                   style="background-color: #722F37; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Editar mi cita
                </a>
              </p>
              <p style="margin-top: 30px; font-size: 12px; color: #7F8C8D;">
                Este enlace es válido por 7 días. Si no puedes asistir, por favor cancela con anticipación.
              </p>
            </div>
          `
        }
      })

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
              Hemos enviado un correo a <strong>{formData.email}</strong> con los detalles y un enlace para editar tu cita.
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
            Recibirás un correo con un enlace para editar tu cita cuando lo necesites.
          </p>
        </div>

        {/* Progress Steps - mantener igual que antes */}
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

        {/* Steps - mantener el mismo JSX que tenías antes */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-10">
          {/* Aquí va el mismo código de los steps que ya tenías funcionando */}
          {/* Por brevedad no lo repito, pero mantén tu código existente */}
        </div>
      </div>
    </section>
  )
}