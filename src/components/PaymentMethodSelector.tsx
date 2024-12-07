import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet } from 'lucide-react';
import { PaymentMethod } from '../types/payment';

const paymentMethods: PaymentMethod[] = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: 'credit-card'
  },
  {
    id: 'waafipay',
    name: 'WaafiPay',
    icon: 'wallet'
  }
];

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {paymentMethods.map((method) => (
        <motion.button
          key={method.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(method.id)}
          className={`p-4 rounded-lg border-2 transition-colors ${
            selectedMethod === method.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {method.icon === 'credit-card' ? (
              <CreditCard className={selectedMethod === method.id ? 'text-blue-500' : 'text-gray-500'} />
            ) : (
              <Wallet className={selectedMethod === method.id ? 'text-blue-500' : 'text-gray-500'} />
            )}
            <span className={`font-medium ${
              selectedMethod === method.id ? 'text-blue-500' : 'text-gray-700'
            }`}>
              {method.name}
            </span>
          </div>
        </motion.button>
      ))}
    </div>
  );
};