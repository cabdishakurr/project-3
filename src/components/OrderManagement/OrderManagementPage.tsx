import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { KitchenDisplay } from './KitchenDisplay';
import { OrderStats } from './OrderStats';
import { MenuEditor } from '../MenuManagement/MenuEditor';
import { CompanyInfoForm } from '../CompanySettings/CompanyInfoForm';
import { OrderFilters } from './OrderFilters';
import { Order, Product } from '../../types';
import { products as initialProducts } from '../../data/products';
import { useOrder } from '../../hooks/useOrder';

export const OrderManagementPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kitchen' | 'menu' | 'settings'>('kitchen');
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { orders, updateOrderStatus } = useOrder();

  const filteredOrders = selectedCategory
    ? orders.filter(order =>
        order.items.some(item => item.categoryId === selectedCategory)
      )
    : orders;

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    };
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kitchen Display System</h1>
            <p className="text-gray-600">Monitor orders and manage menu items</p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('kitchen')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'kitchen'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              Kitchen Display
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('menu')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'menu'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              Menu Management
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'settings'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              <Settings size={20} />
            </motion.button>
          </div>
        </div>

        <OrderStats orders={filteredOrders} />

        {activeTab === 'kitchen' && (
          <>
            <OrderFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <KitchenDisplay
              orders={filteredOrders}
              onUpdateStatus={updateOrderStatus}
            />
          </>
        )}

        {activeTab === 'menu' && (
          <MenuEditor
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

        {activeTab === 'settings' && <CompanyInfoForm />}
      </div>
    </div>
  );
};