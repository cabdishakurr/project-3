import { useQuery } from 'react-query';
import { fetchOrders, updateOrder } from '../services/orderService';
import { OdooOrder } from '../types/odoo';

export const useOrders = () => {
  const { data: orders, isLoading, error, refetch } = useQuery<OdooOrder[]>(
    'orders',
    fetchOrders,
    {
      refetchInterval: 30000, // Refetch every 30 seconds
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: (error) => {
        console.error('Error fetching orders:', error);
      }
    }
  );

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateOrder(orderId, status);
      await refetch();
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  };

  return {
    orders: orders || [],
    isLoading,
    error,
    updateOrderStatus,
    refetch
  };
};