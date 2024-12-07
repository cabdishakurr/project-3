import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Webhook, Key, Link, Save } from 'lucide-react';
import { useSystemConfig } from '../../hooks/useSystemConfig';

export const WebhookConfig: React.FC = () => {
  const { config, updateConfig } = useSystemConfig();
  const [formData, setFormData] = useState({
    endpointUrl: config.webhook?.endpointUrl || '',
    secretKey: config.webhook?.secretKey || '',
    enabled: config.webhook?.enabled || false,
    retryAttempts: config.webhook?.retryAttempts || 3
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      webhook: formData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Webhook className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Webhook Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Link size={16} />
              Webhook Endpoint URL
            </div>
          </label>
          <input
            type="url"
            value={formData.endpointUrl}
            onChange={(e) => setFormData({ ...formData, endpointUrl: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://your-webhook-endpoint.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Key size={16} />
              Secret Key
            </div>
          </label>
          <input
            type="password"
            value={formData.secretKey}
            onChange={(e) => setFormData({ ...formData, secretKey: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your webhook secret key"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Retry Attempts
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.retryAttempts}
            onChange={(e) => setFormData({ ...formData, retryAttempts: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enabled"
            checked={formData.enabled}
            onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
            Enable Webhook Integration
          </label>
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
      >
        <Save size={20} />
        Save Webhook Configuration
      </motion.button>
    </form>
  );
};