import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  count: number;
  onClick: () => void;
}

export const CartButton: React.FC<CartButtonProps> = ({ count, onClick }) => {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <button
            onClick={onClick}
            className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            <span>View Cart</span>
            <motion.span
              key={count}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              className="ml-2 bg-white text-blue-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
            >
              {count}
            </motion.span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};