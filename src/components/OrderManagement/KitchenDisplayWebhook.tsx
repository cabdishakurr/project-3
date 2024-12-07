import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { KitchenDisplay } from './KitchenDisplay';
import { OrderStats } from './OrderStats';
import { OrderFilters } from './OrderFilters';
import { useWebhookOrders } from '../../hooks/useWebhookOrders';

export const KitchenDisplayWebhook: React.FC = () => {
  const { orders, webhookOrders, odooOrders } = useWebhookOrders();

  return (
    <div className="space-y-6">
      {/* Order Source Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <img src="/odoo-icon.png" alt="Odoo" className="w-6 h-6" />
            <h3 className="font-medium">Odoo Orders</h3>
          </div>
          <p className="text-2xl font-bold">{odooOrders?.length || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-blue-500" />
            <h3 className="font-medium">Webhook Orders</h3>
          </div>
          <p className="text-2xl font-bold">{webhookOrders.length}</p>
        </div>
      </div>

      <OrderStats orders={orders} />
      
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b pb-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      Order #{order.id.slice(-4)}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {order.source}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.name}</span>
                    <span className="text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};