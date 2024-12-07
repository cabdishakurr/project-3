import { useState, useEffect } from 'react';

interface SystemConfig {
  webhook?: {
    endpointUrl: string;
    secretKey: string;
    enabled: boolean;
    retryAttempts: number;
  };
  odoo?: {
    apiUrl: string;
    database: string;
    username: string;
    password: string;
    enabled: boolean;
  };
}

const CONFIG_KEY = 'system_config';

export const useSystemConfig = () => {
  const [config, setConfig] = useState<SystemConfig>(() => {
    const savedConfig = localStorage.getItem(CONFIG_KEY);
    return savedConfig ? JSON.parse(savedConfig) : {};
  });

  const updateConfig = (newConfig: Partial<SystemConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      localStorage.setItem(CONFIG_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    config,
    updateConfig,
  };
};