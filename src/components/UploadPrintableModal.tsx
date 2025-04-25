import React from "react";
import UploadPrintableResource from "./UploadPrintableResource";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UploadPrintableModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl text-red-600 hover:text-red-800"
        >
          ✖
        </button>
        <UploadPrintableResource />
      </div>
    </div>
  );
};

export default UploadPrintableModal;
