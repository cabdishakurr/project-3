import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export const IntegrationsConfig: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-indigo-500" size={24} />
        <h2 className="text-xl font-semibold">Additional Integrations</h2>
      </div>

      <p className="text-gray-600">
        Configure additional third-party integrations and services here.
      </p>
    </div>
  );
};