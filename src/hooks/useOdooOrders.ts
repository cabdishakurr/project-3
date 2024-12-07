import { useState } from 'react';
import { useQuery } from 'react-query';
import { fetchPosOrders, updateOrderStatus } from '../services/odooService';
import { OdooOrder } from '../types/odoo';

export const useOdooOrders = () => {
  const [orders, setOrders] = useState<OdooOrder[]>([]);

  const { data, isLoading, error, refetch } = useQuery(
    'odooOrders',
    fetchPosOrders,
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      onSuccess: (data) => {
        setOrders(data);
      },
      retry: 3, // Retry up to 3 times on failure
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: true, // Refetch when window regains focus
      onError: (error) => {
        console.error('Error fetching orders:', error);
      }
    }
  );

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      await refetch(); // Refresh orders after update
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  };

  return {
    orders: orders || [], // Ensure we always return an array
    isLoading,
    error,
    updateStatus: handleStatusUpdate,
    refetch
  };
};