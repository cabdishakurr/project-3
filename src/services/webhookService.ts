import axios from 'axios';
import { Order } from '../types';

const WEBHOOK_URL = 'https://hook.eu2.make.com/wabqbe1s4nje73efhcf9oxs2pj78smls';

export const sendOrderToWebhook = async (order: Order) => {
  try {
    await axios.post(WEBHOOK_URL, order);
  } catch (error) {
    console.error('Failed to send order to webhook:', error);
    throw error;
  }
};