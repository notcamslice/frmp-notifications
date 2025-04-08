import React, { useState, useEffect } from 'react';
import { Notification, NotificationType } from './components/Notification';
import { EmergencyAlert, EmergencyType } from './components/EmergencyAlert';

// Declare global interface for FiveM NUI
declare global {
  interface Window {
    invokeNative: (native: string, ...args: any[]) => void;
  }
}

function App() {
  const [notifications, setNotifications] = useState<{
    type: NotificationType;
    title: string;
    message: string;
    id: number;
  }[]>([]);

  const [emergencyAlerts, setEmergencyAlerts] = useState<{
    type: EmergencyType;
    code: string;
    location: string;
    description: string;
    id: number;
  }[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;

      if (data.type === 'notification') {
        addNotification(
          data.notificationType as NotificationType,
          data.title,
          data.message
        );
      } else if (data.type === 'emergency') {
        addEmergencyAlert(
          data.alertType as EmergencyType,
          data.code,
          data.location,
          data.description
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const addNotification = (
    type: NotificationType,
    title: string,
    message: string
  ) => {
    const newNotification = {
      type,
      title,
      message,
      id: Date.now(),
    };

    setNotifications((prev) => [...prev, newNotification]);

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const addEmergencyAlert = (
    type: EmergencyType,
    code: string,
    location: string,
    description: string
  ) => {
    const newAlert = {
      type,
      code,
      location,
      description,
      id: Date.now(),
    };

    setEmergencyAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => {
      removeEmergencyAlert(newAlert.id);
    }, 15000);
  };

  const removeEmergencyAlert = (id: number) => {
    setEmergencyAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const handleEmergencyResponse = (id: number) => {
    // Send response back to FiveM client
    window.invokeNative('sendNuiMessage', JSON.stringify({
      type: 'emergencyResponse',
      id: id
    }));
    removeEmergencyAlert(id);
  };

  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="fixed top-4 right-4 space-y-4 z-40 pointer-events-auto">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
      </div>

      <div className="fixed top-4 right-4 space-y-4 z-40 pointer-events-auto">
        {emergencyAlerts.map((alert) => (
          <EmergencyAlert
            key={alert.id}
            {...alert}
            onRespond={() => handleEmergencyResponse(alert.id)}
            onClose={() => removeEmergencyAlert(alert.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;