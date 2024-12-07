import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Save } from 'lucide-react';
import { useSystemConfig } from '../../hooks/useSystemConfig';

export const SystemConfig: React.FC = () => {
  const { config } = useSystemConfig();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="text-purple-500" size={24} />
        <h2 className="text-xl font-semibold">System Settings</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Webhook Integration</h3>
          <p className="text-sm text-gray-600">
            Status: {config.webhook?.enabled ? 'Enabled' : 'Disabled'}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Odoo Integration</h3>
          <p className="text-sm text-gray-600">
            Status: {config.odoo?.enabled ? 'Enabled' : 'Disabled'}
          </p>
        </div>
      </div>
    </div>
  );
};