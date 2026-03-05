'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [showMessage, setShowMessage] = useState(false);
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  useEffect(() => {
    // Verificar si está dentro del horario laboral
    const checkHours = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = domingo, 1 = lunes, ..., 5 = viernes, 6 = sábado
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const currentTime = hour + minutes / 60;

      // Lunes a viernes (1-5)
      if (day >= 1 && day <= 5) {
        // Mañana: 9:00 - 14:00
        // Tarde: 16:00 - 19:00
        const isMorning = currentTime >= 9 && currentTime < 14;
        const isAfternoon = currentTime >= 16 && currentTime < 19;
        setIsWorkingHours(isMorning || isAfternoon);
      } else {
        setIsWorkingHours(false); // Fines de semana
      }
    };

    checkHours();
    const interval = setInterval(checkHours, 60000); // Revisar cada minuto

    // Mostrar mensaje después de 5 segundos
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const phoneNumber = "34604173477"; // Sin el +
  const message = "Hola, necesito información sobre una consulta legal.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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