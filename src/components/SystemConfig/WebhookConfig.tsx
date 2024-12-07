import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Webhook, Link } from 'lucide-react';

export const WebhookConfig: React.FC = () => {
  const [config, setConfig] = useState({
    webhookUrl: localStorage.getItem('WEBHOOK_URL') || 'https://hook.eu2.make.com/wabqbe1s4nje73efhcf9oxs2pj78smls'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('WEBHOOK_URL', config.webhookUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Webhook className="text-purple-500" size={24} />
        <h2 className="text-xl font-semibold">Webhook Configuration</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Link size={16} />
            Webhook URL
          </div>
        </label>
        <input
          type="url"
          value={config.webhookUrl}
          onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="https://your-webhook-url"
          required
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Save Webhook Configuration
      </motion.button>
    </form>
  );
};