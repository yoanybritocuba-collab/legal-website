'use client';

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { Calendar, Clock, User, Mail, Phone, FileText, Save, ArrowLeft } from 'lucide-react';

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00",
];

export default function EditarCita() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [loading, setLoading] = useState(true);
  const [validando, setValidando] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cita, setCita] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const validarToken = async () => {
      if (!id || !token) {
        setError('Enlace inválido');
        setValidando(false);
        return;
      }

      try {
        const docRef = doc(db, 'appointments', id as string);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          setError('Cita no encontrada');
          setValidando(false);
          return;
        }

        const data = docSnap.data();
        
        // Verificar token
        if (data.editToken !== token) {
          setError('Token de edición inválido');
          setValidando(false);
          return;
        }

        // Verificar expiración
        if (data.tokenExpires && new Date(data.tokenExpires) < new Date()) {
          setError('El enlace ha expirado (válido por 7 días)');
          setValidando(false);
          return;
        }

        setCita({
          id: docSnap.id,
          ...data
        });
        setValidando(false);
      } catch (error) {
        setError('Error al validar el enlace');
        setValidando(false);
      } finally {
        setLoading(false);
      }
    };

    validarToken();
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const docRef = doc(db, 'appointments', id as string);
      await updateDoc(docRef, {
        nombre: cita.nombre,
        email: cita.email,
        telefono: cita.telefono,
        fecha: cita.fecha,
        hora: cita.hora,
        motivo: cita.motivo
      });
      
      setSuccess(true);
    } catch (error) {
      alert('Error al actualizar la cita');
    } finally {
      setSaving(false);
    }
  };

  if (loading || validando) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-burgundy border-t-transparent mx-auto"></div>
          <p className="mt-4 text-text-light">Validando acceso...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <h1 className="text-2xl font-bold text-burgundy mb-4">Error</h1>
          <p className="text-text-light mb-6">{error}</p>
          <Link href="/" className="text-navy-deep hover:text-burgundy underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-stone flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold-classic/10">
            <Save className="h-8 w-8 text-gold-classic" />
          </div>
          <h1 className="text-2xl font-bold text-navy-deep mb-4">¡Cambios Guardados!</h1>
          <p className="text-text-light mb-6">Tu cita ha sido actualizada correctamente.</p>
          <Link href="/" className="text-navy-deep hover:text-burgundy underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone py-12">
      <div className="max-w-3xl mx-auto px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-navy-deep hover:text-burgundy mb-6">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-navy-deep to-burgundy px-6 py-8 text-white">
            <h1 className="text-3xl font-bold">Editar mi Cita</h1>
            <p className="text-gold-classic mt-2">Modifica los datos que necesites</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-navy-deep mb-1">
                  <User className="h-4 w-4 text-burgundy" />
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={cita.nombre}
                  onChange={(e) => setCita({...cita, nombre: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold-classic"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-navy-deep mb-1">
                  <Mail className="h-4 w-4 text-burgundy" />
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={cita.email}
                  onChange={(e) => setCita({...cita, email: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold-classic"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-navy-deep mb-1">
                  <Phone className="h-4 w-4 text-burgundy" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  required
                  value={cita.telefono}
                  onChange={(e) => setCita({...cita, telefono: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold-classic"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-navy-deep mb-1">
                  <Calendar className="h-4 w-4 text-burgundy" />
                  Fecha
                </label>
                <input
                  type="date"
                  required
                  value={cita.fecha}
                  onChange={(e) => setCita({...cita, fecha: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold-classic"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-navy-deep mb-1">
                  <Clock className="h-4 w-4 text-burgundy" />
                  Hora
                </label>
                <select
                  required
                  value={cita.hora}
                  onChange={(e) => setCita({...cita, hora: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold-classic"
                >
                  <option value="">Selecciona una hora</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time} hrs</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-navy-deep mb-1">
                  <FileText className="h-4 w-4 text-burgundy" />
                  Motivo de la consulta
                </label>
                <textarea
                  required
                  rows={4}
                  value={cita.motivo}
                  onChange={(e) => setCita({...cita, motivo: e.target.value})}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-gold-classic"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-burgundy text-white py-3 px-6 rounded-lg hover:bg-navy-deep transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>Guardando...</>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Guardar Cambios
                  </>
                )}
              </button>
              
              <Link
                href="/"
                className="flex-1 bg-stone text-navy-deep py-3 px-6 rounded-lg hover:bg-border transition-colors text-center"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-text-light mt-4">
          * Los cambios se guardarán inmediatamente. El enlace de edición es válido por 7 días.
        </p>
      </div>
    </div>
  );
}