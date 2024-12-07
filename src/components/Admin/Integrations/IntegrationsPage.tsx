import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, Webhook, Database, Globe } from 'lucide-react';
import { IntegrationStatus } from './IntegrationStatus';
import { useSystemConfig } from '../../../hooks/useSystemConfig';
import { IntegrationConfig } from './IntegrationConfig';

export const IntegrationsPage: React.FC = () => {
  const { config, updateConfig } = useSystemConfig();
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  const integrations = [
    {
      id: 'webhook',
      name: 'Webhook Integration',
      description: 'Send order notifications to external systems',
      icon: Webhook,
      status: config.webhook?.enabled ? 'active' : 'inactive',
      config: config.webhook
    },
    {
      id: 'odoo',
      name: 'Odoo Integration',
      description: 'Sync with Odoo ERP system',
      icon: Database,
      status: config.odoo?.enabled ? 'active' : 'inactive',
      config: config.odoo
    }
  ];

  const handleConfigUpdate = (integrationId: string, newConfig: any) => {
    updateConfig({ [integrationId]: newConfig });
    setSelectedIntegration(null);
  };

  const testIntegration = async (id: string) => {
    // Simulate testing the integration
    const success = Math.random() > 0.5;
    setTestResults({ ...testResults, [id]: success });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Integrations</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const isConfigured = integration.config && Object.keys(integration.config).length > 0;
          const testResult = testResults[integration.id];

          return (
            <div key={integration.id} className="bg-white rounded-lg shadow-sm p-6">
              {selectedIntegration === integration.id ? (
                <IntegrationConfig
                  integration={integration}
                  onSave={(config) => handleConfigUpdate(integration.id, config)}
                  onCancel={() => setSelectedIntegration(null)}
                />
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="p-3 rounded-lg bg-blue-50">
                        <Icon className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium">{integration.name}</h3>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                      </div>
                    </div>
                    <IntegrationStatus status={integration.status} />
                  </div>

                  <div className="mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                          isConfigured ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {isConfigured ? (
                            <Check className="h-3 w-3 text-green-500" />
                          ) : (
                            <X className="h-3 w-3 text-gray-400" />
                          )}
                        </div>
                        <span className="ml-3 text-sm">Configuration</span>
                      </div>

                      {testResult !== undefined && (
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center ${
                            testResult ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {testResult ? (
                              <Check className="h-3 w-3 text-green-500" />
                            ) : (
                              <X className="h-3 w-3 text-red-500" />
                            )}
                          </div>
                          <span className="ml-3 text-sm">Connection Test</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => testIntegration(integration.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                      >
                        Test Connection
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedIntegration(integration.id)}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Configure
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};