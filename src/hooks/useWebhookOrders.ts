import { useState, useEffect } from 'react';
import { WebhookOrder } from '../types/webhook';
import { onWebhookOrder } from '../services/webhookHandler';
import { fetchOdooOrders } from '../services/odooService';
import { useQuery } from 'react-query';

export const useWebhookOrders = () => {
  const [webhookOrders, setWebhookOrders] = useState<WebhookOrder[]>([]);

  // Fetch Odoo orders periodically
  const { data: odooOrders } = useQuery('odooOrders', fetchOdooOrders, {
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    // Subscribe to webhook orders
    const unsubscribe = onWebhookOrder((order) => {
      setWebhookOrders(prev => [order, ...prev]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Combine webhook orders and Odoo orders
  const allOrders = [...webhookOrders, ...(odooOrders || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return {
    orders: allOrders,
    webhookOrders,
    odooOrders
  };
};