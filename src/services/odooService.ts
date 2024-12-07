import axios from 'axios';
import { OdooOrder } from '../types/odoo';

const ODOO_BASE_URL = 'https://a.miigsolution.so';
const ODOO_DB = 'bitnami_odoo';
const ODOO_USERNAME = 'abdishakur';
const ODOO_PASSWORD = 'Moha@4248';
const API_KEY = '892a1d54-ac8f-4327-b9be-606f07bbbc2d';

let sessionId: string | null = null;

const authenticate = async (): Promise<string> => {
  try {
    const authResponse = await axios.get(`${ODOO_BASE_URL}/odoo_connect`, {
      params: {
        db: ODOO_DB,
        login: ODOO_USERNAME,
        password: ODOO_PASSWORD
      }
    });

    if (!authResponse.data.session_id) {
      throw new Error('Authentication failed: No session ID received');
    }

    sessionId = authResponse.data.session_id;
    return sessionId;
  } catch (error: any) {
    console.error('Authentication failed:', error.response?.data || error.message);
    throw new Error('Authentication failed');
  }
};

const getAuthenticatedHeaders = async () => {
  if (!sessionId) {
    await authenticate();
  }

  return {
    'api-key': API_KEY,
    'Cookie': `session_id=${sessionId}`,
    'Content-Type': 'application/json'
  };
};

export const fetchPosOrders = async (): Promise<OdooOrder[]> => {
  try {
    const headers = await getAuthenticatedHeaders();

    const ordersResponse = await axios.get(`${ODOO_BASE_URL}/send_request`, {
      headers,
      params: {
        model: 'pos.order'
      }
    });

    if (!Array.isArray(ordersResponse.data)) {
      console.error('Unexpected response format:', ordersResponse.data);
      return [];
    }

    return ordersResponse.data.map((order: any) => ({
      id: order.id.toString(),
      name: order.name || `Order #${order.id}`,
      date: order.date_order || new Date().toISOString(),
      total: order.amount_total || 0,
      status: mapOdooStatus(order.state || 'draft'),
      reference: order.pos_reference || '',
      items: (order.lines || []).map((line: any) => ({
        id: Array.isArray(line) ? line[0].toString() : line.id?.toString() || '',
        name: Array.isArray(line) ? line[1] : line.product_id?.[1] || 'Unknown Product',
        quantity: Array.isArray(line) ? line[2] : line.qty || 1,
        price: Array.isArray(line) ? line[3] : line.price_unit || 0
      }))
    }));
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Session expired, clear the session ID and retry once
      sessionId = null;
      return fetchPosOrders();
    }
    console.error('Failed to fetch POS orders:', error.response?.data || error.message);
    return [];
  }
};

export const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
  try {
    const headers = await getAuthenticatedHeaders();

    await axios.put(
      `${ODOO_BASE_URL}/send_request`,
      {
        model: 'pos.order',
        id: parseInt(orderId),
        values: {
          state: mapToOdooStatus(status)
        }
      },
      { headers }
    );
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Session expired, clear the session ID and retry once
      sessionId = null;
      return updateOrderStatus(orderId, status);
    }
    console.error('Failed to update order status:', error.response?.data || error.message);
    throw new Error('Failed to update order status');
  }
};

const mapOdooStatus = (status: string): string => {
  switch (status) {
    case 'draft': return 'pending';
    case 'paid': return 'processing';
    case 'done': return 'completed';
    case 'cancel': return 'failed';
    default: return 'pending';
  }
};

const mapToOdooStatus = (status: string): string => {
  switch (status) {
    case 'pending': return 'draft';
    case 'processing': return 'paid';
    case 'completed': return 'done';
    case 'failed': return 'cancel';
    default: return 'draft';
  }
};