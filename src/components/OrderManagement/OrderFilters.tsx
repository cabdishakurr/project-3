import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { categories } from '../../data/categories';

interface OrderFiltersProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export const OrderFilters: React.FC<OrderFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter size={20} className="text-gray-500" />
        <h3 className="font-medium">Filter Orders</h3>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelectCategory(null)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap ${
            selectedCategory === null
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          All Orders
        </motion.button>
        {categories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(category.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};