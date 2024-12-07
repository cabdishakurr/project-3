import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Loader2, XCircle, Timer, Printer } from 'lucide-react';
import { Order } from '../../types';
import { calculateStageTime } from '../../utils/orderUtils';
import { OrderReceipt } from '../Receipt/OrderReceipt';
import { useModal } from '../../hooks/useModal';

interface OrderStageCardProps {
  orders: Order[];
  status: Order['status'];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const statusConfig = {
  pending: {
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    label: 'Pending Orders',
    action: {
      label: 'Start Preparing',
      nextStatus: 'processing' as const,
      buttonColor: 'bg-blue-500 hover:bg-blue-600'
    }
  },
  processing: {
    icon: Loader2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    label: 'Processing',
    action: {
      label: 'Complete Order',
      nextStatus: 'completed' as const,
      buttonColor: 'bg-green-500 hover:bg-green-600'
    }
  },
  completed: {
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    label: 'Completed'
  },
  failed: {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    label: 'Failed'
  }
};

export const OrderStageCard: React.FC<OrderStageCardProps> = ({
  orders,
  status,
  onUpdateStatus
}) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  const { Modal, openModal, closeModal } = useModal();
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const handlePrintReceipt = (order: Order) => {
    setSelectedOrder(order);
    openModal();
  };

  return (
    <>
      <div className={`${config.bgColor} rounded-lg p-4 border ${config.borderColor}`}>
        <div className="flex items-center gap-2 mb-4">
          <Icon className={`${config.color}`} />
          <h3 className={`font-semibold ${config.color}`}>{config.label}</h3>
          <span className="ml-auto bg-white px-2 py-1 rounded-full text-sm font-medium">
            {orders.length}
          </span>
        </div>

        <div className="space-y-3">
          {orders.map((order) => {
            const stageTime = calculateStageTime(order);
            const isOverdue = stageTime > 15; // 15 minutes threshold

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-3 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium">Order #{order.id.slice(-4)}</span>
                  <div className={`flex items-center gap-1 ${
                    isOverdue ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    <Timer size={16} />
                    <span className="text-sm">{stageTime}m</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="text-gray-500">{item.preparationTime}m</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  {config.action && (
                    <button
                      onClick={() => onUpdateStatus(order.id, config.action!.nextStatus)}
                      className={`flex-1 py-2 text-white rounded-lg text-sm transition-colors ${config.action.buttonColor}`}
                    >
                      {config.action.label}
                    </button>
                  )}
                  <button
                    onClick={() => handlePrintReceipt(order)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Printer size={18} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Modal>
        {selectedOrder && (
          <div className="print-receipt">
            <OrderReceipt order={selectedOrder} />
          </div>
        )}
      </Modal>
    </>
  );
};