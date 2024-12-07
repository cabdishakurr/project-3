import { useQuery } from 'react-query';
import { fetchProducts } from '../services/productService';
import { Product } from '../types';

export const useProducts = () => {
  const { data: products, isLoading, error, refetch } = useQuery<Product[]>(
    'products',
    fetchProducts,
    {
      refetchInterval: 300000, // Refetch every 5 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 300000, // Consider data stale after 5 minutes
      onError: (error) => {
        console.error('Error fetching products:', error);
      }
    }
  );

  return {
    products: products || [],
    isLoading,
    error,
    refetch
  };
};