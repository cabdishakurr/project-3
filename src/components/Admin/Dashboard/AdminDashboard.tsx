import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import { OrderStats } from '../../OrderManagement/OrderStats';
import { useOrder } from '../../../hooks/useOrder';

export const AdminDashboard: React.FC = () => {
  const { orders } = useOrder();

  const stats = [
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Total Revenue',
      value: `$${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Active Customers',
      value: '124',
      icon: Users,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Growth Rate',
      value: '+12.5%',
      icon: TrendingUp,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-xl font-semibold">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <OrderStats orders={orders} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          {/* Recent orders list */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Popular Items</h2>
          {/* Popular items list */}
        </div>
      </div>
    </div>
  );
};