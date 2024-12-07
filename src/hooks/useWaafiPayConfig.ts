import { useState } from 'react';
import { WaafiPayConfig } from '../types';

export const useWaafiPayConfig = () => {
  const [config, setConfig] = useState<WaafiPayConfig>({
    merchantUid: '',
    apiKey: '',
    apiUserId: ''
  });

  const saveConfig = async (newConfig: WaafiPayConfig) => {
    // In a real app, this would save to a backend
    setConfig(newConfig);
    return Promise.resolve();
  };

  return {
    config,
    saveConfig
  };
};