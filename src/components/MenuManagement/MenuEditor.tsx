import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Product, Category } from '../../types';
import { categories } from '../../data/categories';

interface MenuEditorProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const MenuEditor: React.FC<MenuEditorProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const initialProduct = {
    name: '',
    price: 0,
    description: '',
    image: '',
    categoryId: '',
    preparationTime: 5,
  };

  const [formData, setFormData] = useState(initialProduct);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct({ ...editingProduct, ...formData });
      setEditingProduct(null);
    } else {
      onAddProduct(formData);
      setIsAdding(false);
    }
    setFormData(initialProduct);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Menu Items</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Item
        </motion.button>
      </div>

      {(isAdding || editingProduct) && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preparation Time (minutes)
              </label>
              <input
                type="number"
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingProduct(null);
                setFormData(initialProduct);
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {editingProduct ? 'Update' : 'Add'} Item
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="font-medium">${product.price.toFixed(2)}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingProduct(product);
                      setFormData(product);
                    }}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit2 size={20} />
                  </button>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};