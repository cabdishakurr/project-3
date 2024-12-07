import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Key, FileSpreadsheet } from 'lucide-react';

export const GoogleSheetsConfig: React.FC = () => {
  const [config, setConfig] = useState({
    spreadsheetId: localStorage.getItem('GOOGLE_SHEETS_ID') || '',
    clientEmail: localStorage.getItem('GOOGLE_SHEETS_CLIENT_EMAIL') || '',
    privateKey: localStorage.getItem('GOOGLE_SHEETS_PRIVATE_KEY') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('GOOGLE_SHEETS_ID', config.spreadsheetId);
    localStorage.setItem('GOOGLE_SHEETS_CLIENT_EMAIL', config.clientEmail);
    localStorage.setItem('GOOGLE_SHEETS_PRIVATE_KEY', config.privateKey);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <FileSpreadsheet className="text-green-600" size={24} />
        <h2 className="text-xl font-semibold">Google Sheets Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Database size={16} />
              Spreadsheet ID
            </div>
          </label>
          <input
            type="text"
            value={config.spreadsheetId}
            onChange={(e) => setConfig({ ...config, spreadsheetId: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your Google Sheets ID"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Key size={16} />
              Client Email
            </div>
          </label>
          <input
            type="email"
            value={config.clientEmail}
            onChange={(e) => setConfig({ ...config, clientEmail: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="service-account@project.iam.gserviceaccount.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <div className="flex items-center gap-2">
              <Key size={16} />
              Private Key
            </div>
          </label>
          <textarea
            value={config.privateKey}
            onChange={(e) => setConfig({ ...config, privateKey: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            placeholder="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
            required
          />
        </div>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Save Google Sheets Configuration
      </motion.button>
    </form>
  );
};