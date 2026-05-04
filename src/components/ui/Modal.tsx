import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = { sm: 'max-w-sm', md: 'max-w-md', lg: 'max-w-lg' };

  const modalContent = (
    <div className="fixed inset-0 z-999999 flex items-center justify-center p-4">
      {/* Fondo oscuro opaco */}
      <div 
        className="fixed inset-0 backdrop-blur-sm pointer-events-auto z-999999" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Modal */}
      <div className={`relative bg-white rounded-3xl shadow-2xl w-full ${sizes[size]} z-1000000 pointer-events-auto animate-in fade-in zoom-in duration-200`}>
        {title && (
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="font-black text-[#204E59] text-lg">{title}</h3>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all duration-200 hover:scale-110"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
