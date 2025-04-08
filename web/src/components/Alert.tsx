import React from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react';

export type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  title: string;
  message: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

const getIcon = (type: AlertType) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-12 h-12 text-emerald-400" />;
    case 'error':
      return <XCircle className="w-12 h-12 text-red-400" />;
    case 'warning':
      return <AlertTriangle className="w-12 h-12 text-amber-400" />;
    default:
      return <Info className="w-12 h-12 text-blue-400" />;
  }
};

const getColors = (type: AlertType) => {
  switch (type) {
    case 'success':
      return {
        bg: 'bg-gray-900/95',
        border: 'border-emerald-500/50',
        button: 'bg-emerald-500 hover:bg-emerald-600',
      };
    case 'error':
      return {
        bg: 'bg-gray-900/95',
        border: 'border-red-500/50',
        button: 'bg-red-500 hover:bg-red-600',
      };
    case 'warning':
      return {
        bg: 'bg-gray-900/95',
        border: 'border-amber-500/50',
        button: 'bg-amber-500 hover:bg-amber-600',
      };
    default:
      return {
        bg: 'bg-gray-900/95',
        border: 'border-blue-500/50',
        button: 'bg-blue-500 hover:bg-blue-600',
      };
  }
};

export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  isOpen,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
}) => {
  if (!isOpen) return null;

  const colors = getColors(type);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className={`relative w-full max-w-md p-6 ${colors.bg} ${colors.border} border rounded-xl shadow-2xl`}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="flex flex-col items-center text-center">
          <div className="mb-4">
            {getIcon(type)}
          </div>
          
          <h3 className="text-xl font-bold text-gray-100 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-400 mb-6">
            {message}
          </p>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            {onConfirm && (
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`px-4 py-2 ${colors.button} text-gray-100 rounded-lg transition-colors`}
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportable alert function
export function sendAlert(type: string, title: string, message: string) {
    // Logic to trigger alert goes here
    console.log(`Alert: ${type} - ${title} - ${message}`);
}

