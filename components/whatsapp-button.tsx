'use client';

import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const [isClient, setIsClient] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const phoneNumber = "34604173477";
  const message = "Hola%20necesito%20información%20sobre%20una%20consulta%20legal.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (!isClient) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          bg-green-500 text-white p-4 rounded-full shadow-lg 
          transition-all duration-300 flex items-center justify-center
          ${isHovered ? 'opacity-100 scale-110' : 'opacity-80 scale-100'}
        `}
        aria-label="Contactar por WhatsApp"
        style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}