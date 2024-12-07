import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Loader } from 'lucide-react';
import { initializeWaafiPay } from '../services/waafiPay';

interface WaafiPayCheckoutProps {
  total: number;
  onPaymentComplete: (details: { transactionId: string }) => void;
}

export const WaafiPayCheckout: React.FC<WaafiPayCheckoutProps> = ({
  total,
  onPaymentComplete
}) => {
  const [accountNo, setAccountNo] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    if (!accountNo) {
      setError('Please enter your account number');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await initializeWaafiPay(
        total,
        description || 'Payment for order',
        accountNo
      );

      if (result.success && result.transactionId) {
        onPaymentComplete({ transactionId: result.transactionId });
        if (result.paymentUrl) {
          window.location.href = result.paymentUrl;
        }
      } else {
        setError(result.error || 'Payment failed. Please try again.');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="text-blue-500" size={24} />
        <h2 className="text-xl font-semibold">WaafiPay Checkout</h2>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-sm text-blue-800">
          Amount to pay: <span className="font-bold">${total.toFixed(2)}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Number
          </label>
          <input
            type="text"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value.replace(/\D/g, ''))}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="252612XXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Payment description"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {loading ? (
            <>
              <Loader className="animate-spin" size={20} />
              Processing...
            </>
          ) : (
            'Pay with WaafiPay'
          )}
        </motion.button>
      </div>
    </div>
  );
};