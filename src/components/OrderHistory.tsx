import React from 'react';
import { Order } from '../types';
import { Clock, CheckCircle, Printer } from 'lucide-react';
import { OrderReceipt } from './Receipt/OrderReceipt';
import { useModal } from '../hooks/useModal';

interface OrderHistoryProps {
  orders: Order[];
  onBackToShopping: () => void;
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onBackToShopping }) => {
  const { Modal, openModal, closeModal } = useModal();
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);

  const handlePrintReceipt = (order: Order) => {
    setSelectedOrder(order);
    openModal();
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Order Tracking</h2>
          <button
            onClick={onBackToShopping}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Shopping
          </button>
        </div>
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No orders yet</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock size={20} className="text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <CheckCircle size={20} className="text-green-500" />
                      <span className="text-sm font-medium text-green-500">
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${order.total.toFixed(2)}</span>
                    <button
                      onClick={() => handlePrintReceipt(order)}
                      className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Printer size={20} />
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Paid with card ending in {order.paymentDetails.lastFourDigits}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
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