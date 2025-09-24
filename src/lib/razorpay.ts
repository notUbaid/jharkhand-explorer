import { config } from '@/config/environment';

// Global Razorpay interface
declare global {
  interface Window {
    Razorpay: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

// Razorpay configuration
const RAZORPAY_CONFIG = {
  keyId: config.razorpay.keyId,
  currency: config.payment.currency,
  name: config.app.name,
  image: '/assets/Logo.jpg',
  theme: {
    color: '#059669'
  }
};

// Load Razorpay script with retry mechanism
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Razorpay script')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.defer = true; // Add defer to prevent blocking
    
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    
    script.onerror = (error) => {
      console.error('Failed to load Razorpay script:', error);
      // Clean up failed script
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      reject(new Error('Failed to load Razorpay script'));
    };
    
    // Add to head instead of body to prevent layout issues
    document.head.appendChild(script);
  });
};

// Validate Razorpay configuration
export const validateRazorpayConfig = () => {
  const errors: string[] = [];
  
  // Check if key ID is valid (starts with rzp_test_ or rzp_live_)
  if (!RAZORPAY_CONFIG.keyId || !RAZORPAY_CONFIG.keyId.startsWith('rzp_')) {
    errors.push('Invalid Razorpay Key ID format');
  }
  
  if (!RAZORPAY_CONFIG.currency) {
    errors.push('Currency not specified');
  }
  
  if (errors.length > 0) {
    console.error('Razorpay Configuration Errors:', errors);
    return false;
  }
  
  return true;
};

// Create Razorpay options without order_id (client-side only)
export const createRazorpayOptions = (
  amount: number,
  description: string,
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  },
  notes?: Record<string, string>
) => {
  // Validate configuration
  if (!validateRazorpayConfig()) {
    throw new Error('Invalid Razorpay configuration');
  }

  // Validate amount
  if (amount < config.payment.minAmount || amount > config.payment.maxAmount) {
    throw new Error(`Amount must be between ₹${config.payment.minAmount} and ₹${config.payment.maxAmount}`);
  }

  // Debug logging
  console.log('Creating Razorpay options with:', {
    keyId: RAZORPAY_CONFIG.keyId,
    amount: amount * 100,
    currency: RAZORPAY_CONFIG.currency,
    description,
    customerDetails
  });

  return {
    key: RAZORPAY_CONFIG.keyId,
    amount: Math.round(amount * 100), // Convert to paise and round to avoid decimal issues
    currency: RAZORPAY_CONFIG.currency,
    name: RAZORPAY_CONFIG.name,
    description: description,
    image: RAZORPAY_CONFIG.image,
    // Don't include order_id - let Razorpay handle it
    prefill: {
      name: customerDetails.name,
      email: customerDetails.email,
      contact: customerDetails.phone,
    },
    notes: notes || {},
    theme: RAZORPAY_CONFIG.theme,
    modal: {
      ondismiss: function() {
        console.log('Payment modal dismissed by user');
      }
    },
    // Add retry configuration
    retry: {
      enabled: true,
      max_count: 3
    }
  };
};

// Process payment with proper error handling
export const processRazorpayPayment = async (
  amount: number,
  description: string,
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  },
  notes?: Record<string, string>,
  onSuccess?: (response: any) => void, // eslint-disable-line @typescript-eslint/no-explicit-any
  onError?: (error: any) => void // eslint-disable-line @typescript-eslint/no-explicit-any
): Promise<{ success: boolean; paymentId?: string; orderId?: string; error?: string }> => {
  try {
    // Load Razorpay script
    await loadRazorpayScript();

    // Create options
    const options = createRazorpayOptions(amount, description, customerDetails, notes);

    // Create Razorpay instance with proper handlers
    const razorpay = new window.Razorpay({
      ...options,
      handler: function (response: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        console.log('Payment successful:', response);
        
        if (onSuccess) {
          onSuccess(response);
        }
        
        return response;
      },
      modal: {
        ...options.modal,
        ondismiss: function() {
          console.log('Payment modal dismissed');
          if (onError) {
            onError(new Error('Payment cancelled by user'));
          }
        }
      }
    });

    // Create and open Razorpay instance
    razorpay.open();

    return { success: true };
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error('Razorpay payment error:', error);
    
    if (onError) {
      onError(error);
    }
    
    return { 
      success: false, 
      error: error.message || 'Payment failed. Please try again.' 
    };
  }
};

// Test Razorpay connection
export const testRazorpayConnection = async (): Promise<boolean> => {
  try {
    await loadRazorpayScript();
    return window.Razorpay !== undefined;
  } catch (error) {
    console.error('Razorpay connection test failed:', error);
    return false;
  }
};