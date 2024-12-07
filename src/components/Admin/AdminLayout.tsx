import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, ShoppingBag, BarChart3, Store, Webhook, Database, Globe } from 'lucide-react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar currentPage={currentPage} onPageChange={onPageChange} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};