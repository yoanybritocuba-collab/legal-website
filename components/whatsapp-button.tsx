'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [showMessage, setShowMessage] = useState(false);
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  useEffect(() => {
    // Verificar horario laboral
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

    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const phoneNumber = "34604173477";
  const message = "Hola, necesito información sobre una consulta legal.";

  // Detectar si es móvil o escritorio
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof window !== 'undefined' ? window.navigator.userAgent : ''
  );

  // Elegir la URL correcta según el dispositivo
  const whatsappUrl = isMobile
    ? `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    : `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = (e: React.MouseEvent) => {
    if (!isWorkingHours) {
      e.preventDefault();
      alert('Solo atendemos en horario laboral: Lunes a Viernes 9:00-14:00 y 16:00-19:00');
    }
  };

  if (!isWorkingHours) {
    return (
      <div className="fixed bottom-30 right-6 z-50">
        <div className="relative">
          <button
            disabled
            className="bg-gray-400 text-white p-4 rounded-full shadow-lg cursor-not-allowed opacity-50"
            aria-label="WhatsApp no disponible fuera de horario"
          >
            <MessageCircle size={24} />
          </button>
          <div className="absolute bottom-16 right-0 bg-white text-navy text-sm p-3 rounded-lg shadow-lg w-48 text-center">
            ⏰ Horario de atención:<br />
            Lunes a Viernes<br />
            9:00 - 14:00 y 16:00 - 19:00
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
            💬 ¿Necesitas ayuda?<br />
            Escríbenos por WhatsApp
          </div>
        )}
        <a
          href={whatsappUrl}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
}