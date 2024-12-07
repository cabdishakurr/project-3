import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Power } from 'lucide-react';

export const WebSocketConfig: React.FC = () => {
  const [config, setConfig] = useState({
    websocketUrl: localStorage.getItem('WEBSOCKET_URL') || 'ws://localhost:3000'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('WEBSOCKET_URL', config.websocketUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">WebSocket Configuration</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <div className="flex items-center gap-2">
            <Power size={16} />
            WebSocket Server URL
          </div>
        </label>
        <input
          type="url"
          value={config.websocketUrl}
          onChange={(e) => setConfig({ ...config, websocketUrl: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="ws://your-websocket-server:port"
          required
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Save WebSocket Configuration
      </motion.button>
    </form>
  );
};