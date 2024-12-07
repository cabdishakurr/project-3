import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Order } from '../types';

interface OrderNotificationProps {
  order: Order;
  onClose: () => void;
}

export const OrderNotification: React.FC<OrderNotificationProps> = ({ order, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-md z-50"
      >
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Bell className="text-blue-500" size={20} />
          </div>
          <div>
            <h3 className="font-medium">New Order #{order.id.slice(-4)}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {order.items.length} items • ${order.total.toFixed(2)}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};