import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';
import { products } from '../data/products';

interface ProductListProps {
  categoryId: string | null;
  onAddToCart: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ categoryId, onAddToCart }) => {
  const filteredProducts = categoryId
    ? products.filter(product => product.categoryId === categoryId)
    : products;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
          <div className="relative overflow-hidden group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onAddToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};