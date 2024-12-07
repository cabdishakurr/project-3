import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Globe, Webhook } from 'lucide-react';
import { CompanyInfoForm } from '../CompanySettings/CompanyInfoForm';
import { GoogleSheetsConfig } from './GoogleSheetsConfig';
import { WebSocketConfig } from './WebSocketConfig';
import { WebhookConfig } from './WebhookConfig';

type ConfigTab = 'company' | 'sheets' | 'websocket' | 'webhook';

export const SystemConfigPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ConfigTab>('company');

  const tabs = [
    { id: 'company', label: 'Company Info', icon: Database },
    { id: 'sheets', label: 'Google Sheets', icon: Database },
    { id: 'websocket', label: 'WebSocket', icon: Globe },
    { id: 'webhook', label: 'Webhook', icon: Webhook }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">System Configuration</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto">
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
        {activeTab === 'company' && <CompanyInfoForm />}
        {activeTab === 'sheets' && <GoogleSheetsConfig />}
        {activeTab === 'websocket' && <WebSocketConfig />}
        {activeTab === 'webhook' && <WebhookConfig />}
      </div>
    </div>
  );
};