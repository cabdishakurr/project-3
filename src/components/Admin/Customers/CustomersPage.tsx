import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Mail, Phone, MapPin } from 'lucide-react';

export const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const customers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: '123 Main St, City',
      orders: 12,
      totalSpent: 458.99,
      lastOrder: '2024-02-20'
    },
    // Add more customer data as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customers</h1>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2"
        >
          <Download size={20} />
          Export
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter size={20} />
          Filter
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Order
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail size={16} className="mr-2" />
                      {customer.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Phone size={16} className="mr-2" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2" />
                      {customer.address}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{customer.orders}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">${customer.totalSpent.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};