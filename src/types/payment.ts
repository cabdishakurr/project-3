export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface WaafiPayConfig {
  merchantUid: string;
  apiKey: string;
  returnUrl: string;
}

export interface PaymentDetails {
  method: string;
  cardHolder?: string;
  lastFourDigits?: string;
  transactionId?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'failed';