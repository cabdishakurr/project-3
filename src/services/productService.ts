import { odooApi } from './api/odooApi';
import { Product } from '../types';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await odooApi.get('/send_request', {
      model: 'product.product',
      fields: ['name', 'id', 'list_price', 'description', 'image_1920', 'pos_categ_id']
    });

    if (!Array.isArray(response.data)) {
      console.error('Unexpected response format:', response.data);
      return [];
    }

    return response.data.map((product: any) => ({
      id: product.id.toString(),
      name: product.name || '',
      price: product.list_price || 0,
      description: product.description || '',
      image: product.image_1920 ? `data:image/png;base64,${product.image_1920}` : '',
      categoryId: product.pos_categ_id?.[0]?.toString() || '',
      preparationTime: 10 // Default preparation time
    }));
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error; // Let react-query handle the error
  }
};