import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Globe, Webhook, Database, Server } from 'lucide-react';
import { WebhookConfig } from './WebhookConfig';
import { OdooConfig } from './OdooConfig';
import { SystemConfig } from './SystemConfig';
import { IntegrationsConfig } from './IntegrationsConfig';

type ConfigTab = 'webhook' | 'odoo' | 'system' | 'integrations';

export const ConfigurationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConfigTab>('webhook');

  const tabs = [
    { id: 'webhook', label: 'Webhook Settings', icon: Webhook },
    { id: 'odoo', label: 'Odoo Integration', icon: Server },
    { id: 'system', label: 'System Settings', icon: Settings },
    { id: 'integrations', label: 'Other Integrations', icon: Globe }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">System Configuration</h1>
        <p className="text-gray-600 mt-2">
          Manage all your system settings and integrations in one place
        </p>
      </div>

      <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
        {tabs.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(id as ConfigTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
              activeTab === id
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Icon size={20} />
            {label}
          </motion.button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {activeTab === 'webhook' && <WebhookConfig />}
        {activeTab === 'odoo' && <OdooConfig />}
        {activeTab === 'system' && <SystemConfig />}
        {activeTab === 'integrations' && <IntegrationsConfig />}
      </div>
    </div>
  );
};