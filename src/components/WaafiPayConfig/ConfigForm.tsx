import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Key } from 'lucide-react';
import { WaafiPayConfig } from '../../types';

interface ConfigFormProps {
  config: WaafiPayConfig;
  onSave: (config: WaafiPayConfig) => void;
}

export const ConfigForm: React.FC<ConfigFormProps> = ({ config, onSave }) => {
  const [formData, setFormData] = useState(config);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Key className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">WaafiPay Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Merchant UID
          </label>
          <input
            type="text"
            value={formData.merchantUid}
            onChange={(e) => setFormData({ ...formData, merchantUid: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API Key
          </label>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            API User ID
          </label>
          <input
            type="text"
            value={formData.apiUserId}
            onChange={(e) => setFormData({ ...formData, apiUserId: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSaving}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg ${
            isSaving
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white transition-colors`}
        >
          <Save size={20} />
          {isSaving ? 'Saving...' : 'Save Configuration'}
        </motion.button>
      </div>
    </form>
  );
};