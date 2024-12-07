import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';

const BASE_URL = 'https://a.miigsolution.so';
const API_KEY = '892a1d54-ac8f-4327-b9be-606f07bbbc2d';
const DB_NAME = 'bitnami_odoo';
const USERNAME = 'abdishakur';
const PASSWORD = 'Moha@4248';

class OdooApi {
  private axiosInstance: AxiosInstance;
  private sessionId: string | null = null;
  private authPromise: Promise<void> | null = null;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY
      }
    });

    // Configure axios-retry
    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: (retryCount) => {
        return retryCount * 1000; // Wait 1s, 2s, 3s between retries
      },
      retryCondition: (error) => {
        // Retry on network errors or 5xx errors
        return axiosRetry.isNetworkOrIdempotentRequestError(error) ||
               (error.response?.status ?? 0) >= 500;
      }
    });

    // Add response interceptor for handling auth errors
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error is due to authentication and we haven't tried to retry yet
        if ((error.response?.status === 401 || error.response?.status === 403) && 
            !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.authenticate();
            // Update the request headers with new session
            originalRequest.headers['Cookie'] = `session_id=${this.sessionId}`;
            return this.axiosInstance(originalRequest);
          } catch (authError) {
            return Promise.reject(authError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async authenticate(): Promise<void> {
    // If authentication is already in progress, wait for it
    if (this.authPromise) {
      return this.authPromise;
    }

    this.authPromise = (async () => {
      try {
        const response = await this.axiosInstance.get('/odoo_connect', {
          params: {
            db: DB_NAME,
            login: USERNAME,
            password: PASSWORD
          }
        });

        if (!response.data?.session_id) {
          throw new Error('No session ID received from authentication');
        }

        this.sessionId = response.data.session_id;
      } catch (error) {
        console.error('Authentication failed:', error);
        throw new Error('Authentication failed');
      } finally {
        this.authPromise = null;
      }
    })();

    return this.authPromise;
  }

  private async ensureAuthenticated(): Promise<void> {
    if (!this.sessionId) {
      await this.authenticate();
    }
  }

  async get(endpoint: string, params?: any) {
    await this.ensureAuthenticated();
    return this.axiosInstance.get(endpoint, {
      params,
      headers: {
        Cookie: `session_id=${this.sessionId}`
      }
    });
  }

  async post(endpoint: string, data?: any) {
    await this.ensureAuthenticated();
    return this.axiosInstance.post(endpoint, data, {
      headers: {
        Cookie: `session_id=${this.sessionId}`
      }
    });
  }

  async put(endpoint: string, data?: any) {
    await this.ensureAuthenticated();
    return this.axiosInstance.put(endpoint, data, {
      headers: {
        Cookie: `session_id=${this.sessionId}`
      }
    });
  }
}

export const odooApi = new OdooApi();