import React from 'react';
import { motion } from 'framer-motion';

interface IntegrationStatusProps {
  status: 'active' | 'inactive' | 'error';
}

export const IntegrationStatus: React.FC<IntegrationStatusProps> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          label: 'Active'
        };
      case 'inactive':
        return {
          color: 'text-gray-500',
          bgColor: 'bg-gray-50',
          label: 'Inactive'
        };
      case 'error':
        return {
          color: 'text-red-500',
          bgColor: 'bg-red-50',
          label: 'Error'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`${config.bgColor} ${config.color} px-3 py-1 rounded-full text-sm font-medium`}
    >
      {config.label}
    </motion.div>
  );
};