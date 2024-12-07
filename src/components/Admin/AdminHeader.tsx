import React from 'react';
import { Settings, Bell, User, Store } from 'lucide-react';
import { useCompanyInfo } from '../../hooks/useCompanyInfo';

export const AdminHeader: React.FC = () => {
  const { companyInfo } = useCompanyInfo();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold">{companyInfo.name} Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};