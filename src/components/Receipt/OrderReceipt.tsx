import React from 'react';
import { motion } from 'framer-motion';
import { Printer } from 'lucide-react';
import { Order } from '../../types';
import { useCompanyInfo } from '../../hooks/useCompanyInfo';
import { formatDate, formatTime } from '../../utils/dateUtils';

interface OrderReceiptProps {
  order: Order;
}

export const OrderReceipt: React.FC<OrderReceiptProps> = ({ order }) => {
  const { companyInfo } = useCompanyInfo();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm print:shadow-none">
      {/* Company Info */}
      <div className="text-center mb-6">
        {companyInfo.logo && (
          <img
            src={companyInfo.logo}
            alt={companyInfo.name}
            className="h-16 mx-auto mb-3"
          />
        )}
        <h2 className="text-xl font-bold">{companyInfo.name}</h2>
        <p className="text-gray-600">{companyInfo.address}</p>
        <p className="text-gray-600">{companyInfo.phone}</p>
      </div>

      {/* Order Details */}
      <div className="border-t border-b py-4 mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span>Order #:</span>
          <span className="font-medium">{order.id.slice(-4)}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Date:</span>
          <span>{formatDate(order.date)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Time:</span>
          <span>{formatTime(order.date)}</span>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-center py-2">Qty</th>
              <th className="text-right py-2">Price</th>
              <th className="text-right py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-center py-2">{item.quantity}</td>
                <td className="text-right py-2">${item.price.toFixed(2)}</td>
                <td className="text-right py-2">
                  ${(item.quantity * item.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal:</span>
          <span>${(order.total / (1 + companyInfo.salesTax)).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax ({(companyInfo.salesTax * 100).toFixed(2)}%):</span>
          <span>
            ${(order.total - order.total / (1 + companyInfo.salesTax)).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2">
          <span>Total:</span>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mt-6 text-sm text-gray-600">
        <p>Paid with card ending in {order.paymentDetails.lastFourDigits}</p>
      </div>

      {/* Print Button - Hidden in print view */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePrint}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors print:hidden flex items-center justify-center gap-2"
      >
        <Printer size={20} />
        Print Receipt
      </motion.button>
    </div>
  );
};