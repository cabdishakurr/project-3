import { useEffect } from 'react';

const orderSound = new Audio('/sounds/order-notification.mp3');

export const playOrderSound = () => {
  orderSound.currentTime = 0;
  orderSound.play().catch(error => {
    console.error('Error playing sound:', error);
  });
};