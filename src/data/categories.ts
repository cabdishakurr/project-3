import { Category } from '../types';
import { Coffee, Croissant, Pizza, Salad, IceCream, Sandwich } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'coffee',
    name: 'Coffee & Tea',
    icon: 'Coffee'
  },
  {
    id: 'pastries',
    name: 'Pastries',
    icon: 'Croissant'
  },
  {
    id: 'pizza',
    name: 'Pizza',
    icon: 'Pizza'
  },
  {
    id: 'salads',
    name: 'Salads',
    icon: 'Salad'
  },
  {
    id: 'desserts',
    name: 'Desserts',
    icon: 'IceCream'
  },
  {
    id: 'sandwiches',
    name: 'Sandwiches',
    icon: 'Sandwich'
  }
];