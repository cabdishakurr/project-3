import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Loader, XCircle } from 'lucide-react';
import { OrderStatus } from '../types/payment';

interface OrderStatusDisplayProps {
  status: OrderStatus;
  date: string;
}

export const OrderStatusDisplay: React.FC<OrderStatusDisplayProps> = ({ status, date }) => {
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          label: 'Order Pending'
        };
      case 'processing':
        return {
          icon: Loader,
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          label: 'Processing'
        };
      case 'completed':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          label: 'Completed'
        };
      case 'failed':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          label: 'Failed'
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${config.bgColor} p-4 rounded-lg flex items-center gap-3`}
    >
      <Icon className={config.color} />
      <div>
        <p className={`font-medium ${config.color}`}>{config.label}</p>
        <p className="text-sm text-gray-600">
          {new Date(date).toLocaleDateString()} at {new Date(date).toLocaleTimeString()}
        </p>
      </div>
    </motion.div>
  );
};