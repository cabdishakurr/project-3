export interface WebhookOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  note?: string;
}

export interface WebhookOrder {
  id: string;
  source: 'odoo' | 'external';
  reference: string;
  date: string;
  items: WebhookOrderItem[];
  total: number;
  customer?: {
    name: string;
    phone?: string;
    email?: string;
  };
  status: 'pending' | 'processing' | 'completed' | 'failed';
  metadata?: Record<string, any>;
}