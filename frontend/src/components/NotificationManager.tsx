import { useNotificationSystem } from '../hooks/useNotificationSystem';
import { NotificationPopup } from './NotificationPopup';

interface NotificationManagerProps {
  onViewVisualization: (id: string) => void;
}

export function NotificationManager({ onViewVisualization }: NotificationManagerProps) {
  const { notification, isVisible, closeNotification } = useNotificationSystem();

  if (!notification) return null;

  return (
    <NotificationPopup
      visualizationId={notification.visualizationId}
      solutionTitle={notification.solutionTitle}
      isVisible={isVisible}
      onClose={closeNotification}
      onViewVisualization={onViewVisualization}
    />
  );
}