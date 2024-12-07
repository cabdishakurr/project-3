import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Product } from '../types';

const SPREADSHEET_ID = process.env.VITE_GOOGLE_SHEETS_ID || '';
const CLIENT_EMAIL = process.env.VITE_GOOGLE_SHEETS_CLIENT_EMAIL || '';
const PRIVATE_KEY = process.env.VITE_GOOGLE_SHEETS_PRIVATE_KEY || '';

let cachedProducts: Product[] | null = null;
let lastFetch: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getProductsFromSheet = async (): Promise<Product[]> => {
  // Return cached products if they exist and are not expired
  if (cachedProducts && Date.now() - lastFetch < CACHE_DURATION) {
    return cachedProducts;
  }

  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
    await doc.useServiceAccountAuth({
      client_email: CLIENT_EMAIL,
      private_key: PRIVATE_KEY,
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const products: Product[] = rows.map((row) => ({
      id: row.id,
      name: row.name,
      price: parseFloat(row.price),
      description: row.description,
      image: row.image,
      categoryId: row.categoryId,
      preparationTime: parseInt(row.preparationTime),
    }));

    // Update cache
    cachedProducts = products;
    lastFetch = Date.now();

    return products;
  } catch (error) {
    console.error('Failed to fetch products from Google Sheets:', error);
    throw error;
  }
};