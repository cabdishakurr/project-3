import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <X size={24} />
          </button>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const Modal: React.FC<{ children: React.ReactNode }> = useCallback(
    ({ children }) => (
      <ModalComponent isOpen={isOpen} onClose={closeModal}>
        {children}
      </ModalComponent>
    ),
    [isOpen]
  );

  return { Modal, openModal, closeModal, isOpen };
};