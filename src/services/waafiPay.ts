import axios from 'axios';

interface WaafiPayResponse {
  success: boolean;
  paymentUrl?: string;
  transactionId?: string;
  error?: string;
}

export const initializeWaafiPay = async (
  amount: number,
  description: string,
  accountNo: string
): Promise<WaafiPayResponse> => {
  try {
    const requestId = Math.floor(Math.random() * 10000000000).toString();
    const timestamp = new Date().toISOString();
    
    const payload = {
      schemaVersion: "1.0",
      requestId: requestId,
      timestamp: timestamp,
      channelName: "WEB",
      serviceName: "API_PREAUTHORIZE",
      serviceParams: {
        merchantUid: "M0911988",
        apiUserId: "1004328",
        apiKey: "API-1618808470AHX",
        paymentMethod: "MWALLET_ACCOUNT",
        payerInfo: {
          accountNo: accountNo
        },
        transactionInfo: {
          referenceId: Date.now().toString(),
          invoiceId: `INV-${Date.now()}`,
          amount: amount.toFixed(2),
          currency: "USD",
          description: description
        }
      }
    };

    const response = await axios({
      url: "https://api.waafipay.net/asm",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: payload
    });

    if (response.data && response.data.responseCode === "2001") {
      return {
        success: true,
        transactionId: response.data.params.transactionId,
        paymentUrl: response.data.params.paymentUrl
      };
    } else {
      return {
        success: false,
        error: response.data.responseMsg || 'Payment initialization failed'
      };
    }
  } catch (error) {
    console.error('WaafiPay initialization failed:', error);
    return {
      success: false,
      error: 'Payment initialization failed'
    };
  }
};