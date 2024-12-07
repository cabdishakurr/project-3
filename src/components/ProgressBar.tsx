import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: 'products' | 'cart' | 'payment' | 'history';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { key: 'products', label: 'Products' },
    { key: 'cart', label: 'Cart' },
    { key: 'payment', label: 'Payment' },
    { key: 'history', label: 'History' }
  ];

  const getStepStatus = (stepKey: string) => {
    const stepIndex = steps.findIndex(s => s.key === stepKey);
    const currentIndex = steps.findIndex(s => s.key === currentStep);
    return stepIndex < currentIndex ? 'completed' : stepIndex === currentIndex ? 'current' : 'upcoming';
  };

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Progress line */}
        <motion.div
          className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2"
          initial={{ width: '0%' }}
          animate={{
            width: `${(steps.findIndex(s => s.key === currentStep) / (steps.length - 1)) * 100}%`
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(step.key);
            return (
              <div key={step.key} className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    status === 'completed'
                      ? 'bg-blue-500'
                      : status === 'current'
                      ? 'bg-blue-500'
                      : 'bg-white border-2 border-gray-200'
                  }`}
                  initial={false}
                  animate={{
                    scale: status === 'current' ? 1.2 : 1,
                    backgroundColor: status === 'completed' || status === 'current' ? '#3B82F6' : '#FFFFFF'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {status === 'completed' ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={status === 'current' ? 'text-white' : 'text-gray-500'}>
                      {index + 1}
                    </span>
                  )}
                </motion.div>
                <span className={`mt-2 text-sm font-medium ${
                  status === 'current' ? 'text-blue-500' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};