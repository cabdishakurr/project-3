import { useState } from 'react';
import { CartItem, Order } from '../types';

export const useOrder = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      items: [{
        id: '1',
        name: 'Artisan Coffee',
        price: 4.99,
        description: 'Freshly roasted premium coffee beans',
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&h=400',
        quantity: 2,
        categoryId: 'coffee',
        preparationTime: 5
      }],
      total: 9.98,
      date: new Date().toISOString(),
      status: 'pending',
      stageTimes: {
        pending: { start: new Date().toISOString() }
      },
      paymentDetails: {
        cardHolder: 'John Doe',
        lastFourDigits: '4242'
      }
    },
    {
      id: '2',
      items: [{
        id: '2',
        name: 'Croissant',
        price: 3.49,
        description: 'Buttery, flaky French pastry',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&h=400',
        quantity: 3,
        categoryId: 'pastries',
        preparationTime: 8
      }],
      total: 10.47,
      date: new Date().toISOString(),
      status: 'processing',
      stageTimes: {
        pending: { 
          start: new Date(Date.now() - 15 * 60000).toISOString(),
          end: new Date(Date.now() - 10 * 60000).toISOString()
        },
        processing: { 
          start: new Date(Date.now() - 10 * 60000).toISOString()
        }
      },
      paymentDetails: {
        cardHolder: 'Jane Smith',
        lastFourDigits: '1234'
      }
    },
    {
      id: '3',
      items: [{
        id: '3',
        name: 'Avocado Toast',
        price: 8.99,
        description: 'Sourdough bread with fresh avocado',
        image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=400&h=400',
        quantity: 1,
        categoryId: 'sandwiches',
        preparationTime: 10
      }],
      total: 8.99,
      date: new Date().toISOString(),
      status: 'completed',
      stageTimes: {
        pending: {
          start: new Date(Date.now() - 30 * 60000).toISOString(),
          end: new Date(Date.now() - 25 * 60000).toISOString()
        },
        processing: {
          start: new Date(Date.now() - 25 * 60000).toISOString(),
          end: new Date(Date.now() - 15 * 60000).toISOString()
        },
        completed: {
          start: new Date(Date.now() - 15 * 60000).toISOString(),
          end: new Date(Date.now() - 15 * 60000).toISOString()
        }
      },
      paymentDetails: {
        cardHolder: 'Alice Johnson',
        lastFourDigits: '5678'
      }
    }
  ]);
  const [step, setStep] = useState<'products' | 'cart' | 'payment' | 'history' | 'management' | 'config'>('products');

  const addToCart = (item: CartItem) => {
    setCart(current => {
      const existingItem = current.find(i => i.id === item.id);
      if (existingItem) {
        return current.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...current, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(current =>
      current.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const placeOrder = (paymentDetails: { cardHolder: string; lastFourDigits: string }) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: [...cart],
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'pending',
      stageTimes: {
        pending: { start: new Date().toISOString() }
      },
      paymentDetails
    };
    setOrders(current => [newOrder, ...current]);
    setCart([]);
    setStep('history');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(current => current.map(order => {
      if (order.id !== orderId) return order;

      const now = new Date().toISOString();
      const updatedStageTimes = { ...order.stageTimes };

      // End the current stage
      if (order.status && updatedStageTimes[order.status]) {
        updatedStageTimes[order.status] = {
          ...updatedStageTimes[order.status],
          end: now
        };
      }

      // Start the new stage
      updatedStageTimes[newStatus] = {
        start: now
      };

      return {
        ...order,
        status: newStatus,
        stageTimes: updatedStageTimes
      };
    }));
  };

  return {
    cart,
    orders,
    step,
    setStep,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    placeOrder,
    updateOrderStatus
  };
};