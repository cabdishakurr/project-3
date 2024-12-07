export interface OdooOrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OdooCustomer {
  id: number;
  name: string;
}

export interface OdooOrder {
  id: string;
  name: string;
  date: string;
  total: number;
  status: string;
  reference: string;
  items: OdooOrderItem[];
  customer?: OdooCustomer;
}