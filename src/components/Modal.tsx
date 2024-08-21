import React from "react";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isVisible, onClose, children }: ModalProps) {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="w-[600px] flex flex-col">
        <button className="text-white text-lg place-self-end" onClick={onClose}>
          X
        </button>
        <div className="bg-white p-2 rounded-lg flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
