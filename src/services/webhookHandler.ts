import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { WebhookOrder } from '../types/webhook';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001;

type WebhookCallback = (order: WebhookOrder) => void;
const webhookCallbacks: WebhookCallback[] = [];

export const startWebhookServer = () => {
  app.post('/webhook/order', (req, res) => {
    const order = req.body as WebhookOrder;
    
    // Validate the webhook signature if provided
    const signature = req.headers['x-odoo-signature'];
    if (signature) {
      // Implement signature validation logic here
    }

    // Notify all registered callbacks
    webhookCallbacks.forEach(callback => callback(order));
    
    res.status(200).json({ message: 'Order received' });
  });

  app.listen(PORT, () => {
    console.log(`Webhook server listening on port ${PORT}`);
  });
};

export const onWebhookOrder = (callback: WebhookCallback) => {
  webhookCallbacks.push(callback);
  return () => {
    const index = webhookCallbacks.indexOf(callback);
    if (index > -1) {
      webhookCallbacks.splice(index, 1);
    }
  };
};