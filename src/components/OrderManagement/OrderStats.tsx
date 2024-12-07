import React from 'react';
import { Clock, Utensils, Timer, AlertCircle } from 'lucide-react';
import { Order } from '../../types';
import { calculateAveragePreparationTime } from '../../utils/orderUtils';

interface OrderStatsProps {
  orders: Order[];
}

export const OrderStats: React.FC<OrderStatsProps> = ({ orders }) => {
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const processingOrders = orders.filter(order => order.status === 'processing').length;
  const avgPrepTime = calculateAveragePreparationTime(orders);
  
  // Calculate orders that are taking longer than expected
  const delayedOrders = orders.filter(order => {
    if (order.status !== 'completed' && order.stageTimes.pending?.start) {
      const startTime = new Date(order.stageTimes.pending.start).getTime();
      const currentTime = new Date().getTime();
      const totalPrepTime = order.items.reduce((total, item) => total + item.preparationTime, 0);
      return (currentTime - startTime) > (totalPrepTime * 60 * 1000); // Convert prep time to milliseconds
    }
    return false;
  }).length;

  const stats = [
    {
      label: 'Pending Orders',
      value: pendingOrders,
      icon: Clock,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'In Progress',
      value: processingOrders,
      icon: Utensils,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Avg Prep Time',
      value: `${avgPrepTime}m`,
      icon: Timer,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Delayed Orders',
      value: delayedOrders,
      icon: AlertCircle,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`${stat.color}`} size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className={`text-xl font-semibold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};