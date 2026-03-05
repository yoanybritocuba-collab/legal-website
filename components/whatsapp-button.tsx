'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Mostrar tooltip después de 3 segundos
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "34604173477";
  const message = encodeURIComponent("Hola, necesito información sobre una consulta legal.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const openWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  if (!isClient) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Tooltip flotante */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 bg-white text-navy text-sm py-2 px-3 rounded-lg shadow-lg whitespace-nowrap">
            💬 ¿Necesitas ayuda?
            <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
          </div>
        )}

        {/* Efecto de ondas de radio (tres capas) */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }} />
        
        {/* Botón principal */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            relative bg-green-500 text-white p-4 rounded-full shadow-lg 
            transition-all duration-300 flex items-center justify-center
            ${isHovered ? 'scale-110 shadow-xl' : 'scale-100 shadow-md'}
          `}
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={24} />
        </a>
      </div>
    </div>
  );
}