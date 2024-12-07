export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: string;
  preparationTime: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface OrderStageTime {
  start: string;
  end?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  stageTimes: {
    pending?: OrderStageTime;
    processing?: OrderStageTime;
    completed?: OrderStageTime;
    failed?: OrderStageTime;
  };
  paymentDetails: {
    cardHolder: string;
    lastFourDigits: string;
  };
}

export interface CompanyInfo {
  name: string;
  logo: string | null;
  address: string;
  phone: string;
  salesTax: number;
}

export interface WaafiPayConfig {
  merchantUid: string;
  apiKey: string;
  apiUserId: string;
}

export interface OrderStats {
  averagePreparationTime: number;
  ordersPerHour: number;
  completionRate: number;
}