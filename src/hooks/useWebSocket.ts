import { useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { Order } from '../types';

export const useWebSocket = (onNewOrder: (order: Order) => void) => {
  const connectWebSocket = useCallback(() => {
    const socket = io(import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:3000');

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('newOrder', (order: Order) => {
      onNewOrder(order);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [onNewOrder]);

  useEffect(() => {
    const cleanup = connectWebSocket();
    return cleanup;
  }, [connectWebSocket]);
};