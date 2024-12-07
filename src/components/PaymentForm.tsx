import React, { useState } from 'react';
import { PaymentMethodSelector } from './PaymentMethodSelector';
import { CreditCardForm } from './CreditCardForm';
import { WaafiPayCheckout } from './WaafiPayCheckout';
import { PaymentDetails } from '../types/payment';

interface PaymentFormProps {
  total: number;
  onSubmit: (details: PaymentDetails) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ total, onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleCreditCardSubmit = (details: { cardHolder: string; lastFourDigits: string }) => {
    onSubmit({
      method: 'card',
      ...details
    });
  };

  const handleWaafiPaySubmit = (details: { transactionId: string }) => {
    onSubmit({
      method: 'waafipay',
      transactionId: details.transactionId
    });
  };

  return (
    <div className="max-w-md mx-auto">
      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onSelect={setPaymentMethod}
      />
      
      {paymentMethod === 'card' ? (
        <CreditCardForm total={total} onSubmit={handleCreditCardSubmit} />
      ) : (
        <WaafiPayCheckout total={total} onPaymentComplete={handleWaafiPaySubmit} />
      )}
    </div>
  );
};