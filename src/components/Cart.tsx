import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartItem } from '../types';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  total: number;
  showProceedButton?: boolean;
  onProceed?: () => void;
}

export const Cart: React.FC<CartProps> = ({
  items,
  onUpdateQuantity,
  onRemove,
  total,
  showProceedButton = true,
  onProceed
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus size={20} />
              </motion.button>
              <motion.span
                key={item.quantity}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-8 text-center font-medium"
              >
                {item.quantity}
              </motion.span>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus size={20} />
              </motion.button>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemove(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-full"
            >
              <Trash2 size={20} />
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t pt-4 mt-4"
      >
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <motion.span
            key={total}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="text-xl font-bold"
          >
            ${total.toFixed(2)}
          </motion.span>
        </div>
        {showProceedButton && onProceed && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onProceed}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Proceed to Payment
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};