'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [isWorkingHours, setIsWorkingHours] = useState(true);
  const [isClient, setIsClient] = useState(false);

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
  const message = encodeURIComponent("Hola, necesito información sobre una consulta legal.");

  const openWhatsApp = () => {
    if (!isWorkingHours) {
      alert('Horario de atención: Lunes a Viernes 9:00-14:00 y 16:00-19:00');
      return;
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      const whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        window.location.href = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
      }, 500);
    } else {
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  if (!isClient) return null;

  if (!isWorkingHours) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          disabled
          className="bg-gray-400 text-white p-4 rounded-full shadow-lg cursor-not-allowed opacity-50"
          aria-label="WhatsApp no disponible fuera de horario"
        >
          <MessageCircle size={24} />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={openWhatsApp}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center cursor-pointer"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
}