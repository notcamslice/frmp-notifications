import React from 'react';
import { Siren, Flame, Heart, Shield, MapPin } from 'lucide-react';

export type EmergencyType = 'police' | 'fire' | 'ems';

interface EmergencyAlertProps {
  type: EmergencyType;
  code: string;
  location: string;
  description: string;
  id: number;
  onRespond?: () => void;
  onClose?: () => void;
}

const getIcon = (type: EmergencyType) => {
  switch (type) {
    case 'police':
      return <Shield className="w-8 h-8 text-blue-400" />;
    case 'fire':
      return <Flame className="w-8 h-8 text-red-400" />;
    case 'ems':
      return <Heart className="w-8 h-8 text-emerald-400" />;
  }
};

const getColors = (type: EmergencyType) => {
  switch (type) {
    case 'police':
      return {
        bg: 'bg-gray-900/90',
        border: 'border-blue-500/50',
        button: 'bg-blue-500 hover:bg-blue-600',
        flash: 'animate-pulse-blue'
      };
    case 'fire':
      return {
        bg: 'bg-gray-900/90',
        border: 'border-red-500/50',
        button: 'bg-red-500 hover:bg-red-600',
        flash: 'animate-pulse-red'
      };
    case 'ems':
      return {
        bg: 'bg-gray-900/90',
        border: 'border-emerald-500/50',
        button: 'bg-emerald-500 hover:bg-emerald-600',
        flash: 'animate-pulse-emerald'
      };
  }
};

export const EmergencyAlert: React.FC<EmergencyAlertProps> = ({
  type,
  code,
  location,
  description,
  onRespond,
  onClose,
}) => {
  const colors = getColors(type);

  return (
    <div
      className={`w-96 transform transition-all duration-500 ease-in-out
        ${colors.bg} ${colors.border} border-2 rounded-lg shadow-2xl
        animate-slide-in`}
    >
      <div className="p-4">
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 ${colors.flash}`}>
            <div className="p-2 rounded-lg bg-gray-950/50">
              {getIcon(type)}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Siren className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-sm font-bold text-red-400">
                  {type.toUpperCase()} - {code}
                </span>
              </div>
              <span className="text-xs text-gray-500">Just now</span>
            </div>
            <div className="flex items-start gap-1 mb-2">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-sm font-medium text-gray-300">{location}</p>
            </div>
            <p className="text-sm text-gray-400 mb-3">{description}</p>
            <div className="flex justify-end gap-2">
              {onClose && (
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-100 rounded-lg transition-colors"
                >
                  Ignore
                </button>
              )}
              {onRespond && (
                <button
                  onClick={onRespond}
                  className={`px-3 py-1.5 text-sm ${colors.button} text-gray-100 rounded-lg transition-colors`}
                >
                  Respond
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};