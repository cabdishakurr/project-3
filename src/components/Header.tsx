import React from 'react';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, Settings, ChevronLeft, Shield } from 'lucide-react';
import { useCompanyInfo } from '../hooks/useCompanyInfo';

interface HeaderProps {
  currentStep: string;
  onStepChange: (step: string) => void;
  cartItemsCount?: number;
  onAdminClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onStepChange,
  cartItemsCount = 0,
  onAdminClick
}) => {
  const { companyInfo } = useCompanyInfo();
  const isHome = currentStep === 'products';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {!isHome && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onStepChange('products')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft size={20} />
                <span className="text-sm font-medium">Back to Home</span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStepChange('products')}
              className="flex items-center gap-2"
            >
              {companyInfo.logo ? (
                <img src={companyInfo.logo} alt={companyInfo.name} className="h-8" />
              ) : (
                <ShoppingBag className="text-blue-500" size={24} />
              )}
              <span className="text-xl font-bold">{companyInfo.name}</span>
            </motion.button>
          </div>

          <div className="flex items-center gap-4">
            {currentStep !== 'products' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStepChange('products')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Home size={20} />
                <span>Home</span>
              </motion.button>
            )}

            {onAdminClick && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onAdminClick}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Shield size={20} />
                <span>Admin</span>
              </motion.button>
            )}

            {currentStep === 'products' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStepChange('tracking')}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <ShoppingBag size={20} />
                <span>Order Tracking</span>
              </motion.button>
            )}

            {cartItemsCount > 0 && currentStep === 'products' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onStepChange('payment')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <ShoppingBag size={20} />
                <span>Cart ({cartItemsCount})</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};