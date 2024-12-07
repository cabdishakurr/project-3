import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';

interface CreditCardFormProps {
  total: number;
  onSubmit: (details: { cardHolder: string; lastFourDigits: string }) => void;
}

export const CreditCardForm: React.FC<CreditCardFormProps> = ({ total, onSubmit }) => {
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      cardHolder,
      lastFourDigits: cardNumber.slice(-4),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">Credit Card Details</h2>
      </div>
      
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Amount to pay: <span className="font-bold">${total.toFixed(2)}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Holder Name
          </label>
          <input
            type="text"
            required
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <input
            type="text"
            required
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              required
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="MM/YY"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              required
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123"
            />
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-6"
        >
          Pay ${total.toFixed(2)}
        </motion.button>
      </form>
    </div>
  );
};