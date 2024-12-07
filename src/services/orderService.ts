import { odooApi } from './api/odooApi';
import { OdooOrder } from '../types/odoo';

export const fetchOrders = async (): Promise<OdooOrder[]> => {
  try {
    const response = await odooApi.get('/send_request', {
      model: 'pos.order',
      fields: ['name', 'id', 'amount_total', 'date_order', 'state', 'pos_reference', 'lines']
    });

    return response.data.map((order: any) => ({
      id: order.id.toString(),
      name: order.name || `Order #${order.id}`,
      date: order.date_order || new Date().toISOString(),
      total: order.amount_total || 0,
      status: mapOrderStatus(order.state || 'draft'),
      reference: order.pos_reference || '',
      items: mapOrderLines(order.lines || [])
    }));
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return [];
  }
};

export const updateOrder = async (orderId: string, status: string): Promise<void> => {
  try {
    await odooApi.put('/send_request', {
      model: 'pos.order',
      id: parseInt(orderId),
      values: {
        state: mapStatusToOdoo(status)
      }
    });
  } catch (error) {
    console.error('Failed to update order:', error);
    throw error;
  }
};

const mapOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'draft': 'pending',
    'paid': 'processing',
    'done': 'completed',
    'cancel': 'failed'
  };
  return statusMap[status] || 'pending';
};

const mapStatusToOdoo = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'draft',
    'processing': 'paid',
    'completed': 'done',
    'failed': 'cancel'
  };
  return statusMap[status] || 'draft';
};

const mapOrderLines = (lines: any[]): any[] => {
  return lines.map(line => ({
    id: Array.isArray(line) ? line[0].toString() : line.id?.toString() || '',
    name: Array.isArray(line) ? line[1] : line.product_id?.[1] || 'Unknown Product',
    quantity: Array.isArray(line) ? line[2] : line.qty || 1,
    price: Array.isArray(line) ? line[3] : line.price_unit || 0
  }));
};