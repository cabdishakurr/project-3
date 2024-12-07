import { useState, useCallback } from 'react';
import { Order } from '../types';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Order[]>([]);

  const addNotification = useCallback((order: Order) => {
    setNotifications(prev => [order, ...prev]);
  }, []);

  const removeNotification = useCallback((orderId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== orderId));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification
  };
};