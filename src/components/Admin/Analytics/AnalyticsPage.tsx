import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { LineChart } from './LineChart';
import { SalesChart } from './SalesChart';
import { useOrder } from '../../../hooks/useOrder';

export const AnalyticsPage: React.FC = () => {
  const { orders } = useOrder();

  const metrics = [
    {
      label: 'Average Order Value',
      value: `$${(orders.reduce((sum, order) => sum + order.total, 0) / orders.length || 0).toFixed(2)}`,
      change: '+12.3%',
      icon: DollarSign,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Order Completion Rate',
      value: '94.2%',
      change: '+4.3%',
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Average Preparation Time',
      value: '12.5 min',
      change: '-2.1%',
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-lg">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              whileHover={{ y: -2 }}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${metric.color}`} />
                </div>
                <span className={`text-sm ${
                  metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold">{metric.value}</p>
              <p className="text-sm text-gray-500">{metric.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>
          <LineChart />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <SalesChart />
        </div>
      </div>
    </div>
  );
};