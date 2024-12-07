import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Settings,
  Users,
  BarChart3,
  Store,
  Webhook,
  Database,
  Globe
} from 'lucide-react';

interface AdminSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentPage, onPageChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Order Management', icon: ShoppingBag },
    { id: 'menu', label: 'Menu Management', icon: Store },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'integrations', label: 'Integrations', icon: Webhook },
    { id: 'system', label: 'System Config', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                {item.label}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};