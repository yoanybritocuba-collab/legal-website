'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [isClient, setIsClient] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    return () => clearInterval(interval);
  }, []);

  const phoneNumber = "34604173477";
  const message = "Hola%20necesito%20información%20sobre%20una%20consulta%20legal.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const openWhatsApp = () => {
    if (!isWorkingHours) {
      alert('Horario de atención: Lunes a Viernes 9:00-14:00 y 16:00-19:00');
      return;
    }
    window.open(whatsappUrl, '_blank');
  };

  if (!isClient) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Efecto de ondas de radio */}
        {showPulse && isWorkingHours && (
          <>
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
          </>
        )}
        
        {/* Botón principal */}
        <button
          onClick={openWhatsApp}
          className={`
            relative bg-green-500 text-white p-4 rounded-full shadow-lg 
            transition-all duration-300 flex items-center justify-center
            hover:scale-110 hover:opacity-100
            ${isWorkingHours ? 'opacity-100 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
          `}
          aria-label="Contactar por WhatsApp"
          disabled={!isWorkingHours}
        >
          <MessageCircle size={24} />
        </button>
      </div>
    </div>
  );
}