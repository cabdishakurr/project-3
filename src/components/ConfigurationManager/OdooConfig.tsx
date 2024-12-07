import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Link, Key, Database, Save } from 'lucide-react';
import { useSystemConfig } from '../../hooks/useSystemConfig';

export const OdooConfig: React.FC = () => {
  const { config, updateConfig } = useSystemConfig();
  const [formData, setFormData] = useState({
    apiUrl: config.odoo?.apiUrl || '',
    database: config.odoo?.database || '',
    username: config.odoo?.username || '',
    password: config.odoo?.password || '',
    enabled: config.odoo?.enabled || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      odoo: formData
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Server className="text-green-500" size={24} />
        <h2 className="text-xl font-semibold">Odoo Integration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Link size={16} />
              Odoo API URL
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
            <div className="flex items-center gap-2">
              <Key size={16} />
              Username
            </div>
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
            <div className="flex items-center gap-2">
              <Key size={16} />
              Password
            </div>
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

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="enabled"
            checked={formData.enabled}
            onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
            className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
          />
          <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
            Enable Odoo Integration
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
        Save Odoo Configuration
      </motion.button>
    </form>
  );
};