'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [showMessage, setShowMessage] = useState(false);
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  useEffect(() => {
    const checkHours = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hour + minutes / 60;

      if (day >= 1 && day <= 5) {
        const isMorning = currentTime >= 9 && currentTime < 14;
        const isAfternoon = currentTime >= 16 && currentTime < 19;
        setIsWorkingHours(isMorning || isAfternoon);
      } else {
        setIsWorkingHours(false);
      }
    };

    checkHours();
    const interval = setInterval(checkHours, 60000);
    const timer = setTimeout(() => setShowMessage(true), 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const phoneNumber = "34604173477"; // Número sin el +
  const message = encodeURIComponent("Hola, necesito información sobre una consulta legal.");

  const openWhatsApp = () => {
    if (!isWorkingHours) {
      alert('Horario de atención: Lunes a Viernes 9:00-14:00 y 16:00-19:00');
      return;
    }

    // Detectar si es dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      // Para Android, usamos un intent que especifica el paquete de WhatsApp normal [citation:2][citation:4]
      // Esto evita que se abra WhatsApp Business
      
      // Primero intentamos abrir WhatsApp normal directamente
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
      
      // Crear un enlace temporal y hacer clic en él
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Si no funciona después de 1 segundo, usamos la URL alternativa [citation:10]
      setTimeout(() => {
        // Esta URL a veces abre la app normal si está instalada [citation:8]
        window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
      }, 1000);
      
    } else {
      // Para escritorio: usa WhatsApp Web
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  if (!isWorkingHours) {
    return (
      <div className="fixed bottom-30 right-6 z-50">
        <div className="relative">
          <button
            disabled
            className="bg-gray-400 text-white p-4 rounded-full shadow-lg cursor-not-allowed opacity-50"
          >
            <MessageCircle size={24} />
          </button>
          <div className="absolute bottom-16 right-0 bg-white text-navy text-sm p-3 rounded-lg shadow-lg w-48 text-center">
            ⏰ Lunes a Viernes<br />9:00-14:00 y 16:00-19:00
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-30 right-6 z-50">
      <div className="relative">
        {showMessage && (
          <div className="absolute bottom-16 right-0 bg-white text-navy text-sm p-3 rounded-lg shadow-lg w-48 text-center animate-pulse">
            💬 ¿Necesitas ayuda?
          </div>
        )}
        <button
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
}