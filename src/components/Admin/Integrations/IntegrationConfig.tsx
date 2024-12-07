import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Link, Key, Database, Globe } from 'lucide-react';

interface IntegrationConfigProps {
  integration: {
    id: string;
    name: string;
    config?: any;
  };
  onSave: (config: any) => void;
  onCancel: () => void;
}

export const IntegrationConfig: React.FC<IntegrationConfigProps> = ({
  integration,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    enabled: integration.config?.enabled || false,
    ...(integration.id === 'webhook' ? {
      endpointUrl: integration.config?.endpointUrl || '',
      secretKey: integration.config?.secretKey || '',
      retryAttempts: integration.config?.retryAttempts || 3
    } : {}),
    ...(integration.id === 'odoo' ? {
      apiUrl: integration.config?.apiUrl || '',
      database: integration.config?.database || '',
      username: integration.config?.username || '',
      password: integration.config?.password || ''
    } : {})
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{integration.name} Configuration</h3>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 text-gray-400 hover:text-gray-500"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {integration.id === 'webhook' && (
          <>
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
          </>
        )}

        {integration.id === 'odoo' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Globe size={16} />
                  API URL
                </div>
              </label>
              <input
                type="url"
                value={formData.apiUrl}
                onChange={(e) => setFormData({ ...formData, apiUrl: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="http://your-odoo-server:8069"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <div className="flex items-center gap-2">
                  <Database size={16} />
                  Database Name
                </div>
              </label>
              <input
                type="text"
                value={formData.database}
                onChange={(e) => setFormData({ ...formData, database: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="odoo_db"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enabled"
            checked={formData.enabled}
            onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
            Enable Integration
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCancel}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Save Configuration
        </motion.button>
      </div>
    </form>
  );
};