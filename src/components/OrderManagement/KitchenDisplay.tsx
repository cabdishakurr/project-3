import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Timer } from 'lucide-react';
import { Order } from '../../types';
import { calculateStageTime } from '../../utils/orderUtils';
import { OrderStageCard } from './OrderStageCard';
import { useOdooOrders } from '../../hooks/useOdooOrders';

interface KitchenDisplayProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export const KitchenDisplay: React.FC<KitchenDisplayProps> = ({
  orders: localOrders,
  onUpdateStatus,
}) => {
  const { orders: odooOrders, isLoading, error, updateStatus } = useOdooOrders();

  // Combine local and Odoo orders
  const allOrders = [...localOrders, ...(odooOrders || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const pendingOrders = allOrders.filter(order => order.status === 'pending');
  const processingOrders = allOrders.filter(order => order.status === 'processing');
  const completedOrders = allOrders.filter(order => order.status === 'completed');

  const handleStatusUpdate = async (orderId: string, status: Order['status']) => {
    const isOdooOrder = odooOrders?.some(order => order.id === orderId);
    if (isOdooOrder) {
      await updateStatus(orderId, status);
    } else {
      onUpdateStatus(orderId, status);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Failed to load Odoo orders. Please check your connection and try again.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <OrderStageCard
        orders={pendingOrders}
        status="pending"
        onUpdateStatus={handleStatusUpdate}
      />
      <OrderStageCard
        orders={processingOrders}
        status="processing"
        onUpdateStatus={handleStatusUpdate}
      />
      <OrderStageCard
        orders={completedOrders}
        status="completed"
        onUpdateStatus={handleStatusUpdate}
      />
    </div>
  );
};