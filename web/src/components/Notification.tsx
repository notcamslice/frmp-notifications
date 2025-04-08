import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface NotificationProps {
  type: NotificationType;
  title: string;
  message: string;
  onClose?: () => void;
}

const getIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircle2 className="w-6 h-6 text-emerald-400" />;
    case 'error':
      return <XCircle className="w-6 h-6 text-red-400" />;
    case 'warning':
      return <AlertCircle className="w-6 h-6 text-amber-400" />;
    default:
      return <Info className="w-6 h-6 text-blue-400" />;
  }
};

const getColors = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'bg-gray-900/90 border-emerald-500/50';
    case 'error':
      return 'bg-gray-900/90 border-red-500/50';
    case 'warning':
      return 'bg-gray-900/90 border-amber-500/50';
    default:
      return 'bg-gray-900/90 border-blue-500/50';
  }
};

export const Notification: React.FC<NotificationProps> = ({
  type,
  title,
  message,
  onClose,
}) => {
  return (
    <div
      className={`w-80 transform transition-all duration-500 ease-in-out
        ${getColors(type)} border rounded-lg shadow-lg
        animate-slide-in hover:scale-102 cursor-pointer`}
      onClick={onClose}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon(type)}</div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-100">{title}</p>
            <p className="mt-1 text-sm text-gray-400">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exportable notification function
export function sendNotification(type: NotificationType, title: string, message: string) {
    // Logic to trigger notification goes here
    console.log(`Notification: ${type} - ${title} - ${message}`);
}

