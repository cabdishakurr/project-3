import React from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/categories';
import { Coffee, Croissant, Pizza, Salad, IceCream, Sandwich } from 'lucide-react';

interface CategoryMenuProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const iconMap: Record<string, React.ComponentType> = {
  Coffee,
  Croissant,
  Pizza,
  Salad,
  IceCream,
  Sandwich
};

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8">
      <div className="flex gap-4 overflow-x-auto pb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectCategory(null)}
          className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg ${
            selectedCategory === null
              ? 'bg-blue-500 text-white'
              : 'bg-white hover:bg-gray-50'
          }`}
        >
          <span className="text-sm font-medium">All Items</span>
        </motion.button>

        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          return (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectCategory(category.id)}
              className={`flex flex-col items-center min-w-[100px] p-3 rounded-lg ${
                selectedCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              {Icon && <Icon className="mb-2" size={24} />}
              <span className="text-sm font-medium">{category.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};