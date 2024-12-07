import React from 'react';
import { Cart } from './Cart';
import { PaymentForm } from './PaymentForm';

interface PaymentPageProps {
  cart: any[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  total: number;
  onSubmit: (details: any) => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  cart,
  onUpdateQuantity,
  onRemove,
  total,
  onSubmit
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Order</h2>
          <Cart
            items={cart}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
            total={total}
            showProceedButton={false}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
          <PaymentForm total={total} onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};