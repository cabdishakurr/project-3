import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Artisan Coffee',
    price: 4.99,
    description: 'Freshly roasted premium coffee beans',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=400',
    categoryId: 'coffee'
  },
  {
    id: '2',
    name: 'Croissant',
    price: 3.49,
    description: 'Buttery, flaky French pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&h=400',
    categoryId: 'pastries'
  },
  {
    id: '3',
    name: 'Margherita Pizza',
    price: 12.99,
    description: 'Classic Italian pizza with fresh basil',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&h=400',
    categoryId: 'pizza'
  },
  {
    id: '4',
    name: 'Caesar Salad',
    price: 8.99,
    description: 'Fresh romaine lettuce with Caesar dressing',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=400&h=400',
    categoryId: 'salads'
  }
];