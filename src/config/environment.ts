// Environment configuration for Jharkhand Explorer
// This file helps validate environment variables and provides fallbacks

export const config = {
  // Razorpay configuration
  razorpay: {
    keyId: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_RLUAMPaeE93MzD',
    keySecret: import.meta.env.VITE_RAZORPAY_KEY_SECRET || 'uJyWNmb704GUA2Hx1ahqYKyf',
  },
  
  // App configuration
  app: {
    name: 'Jharkhand Explorer',
    version: '1.0.0',
    description: 'Premium tourism platform for exploring Jharkhand, India',
  },
  
  // Payment configuration
  payment: {
    currency: 'INR',
    minAmount: 1, // Minimum amount in rupees
    maxAmount: 100000, // Maximum amount in rupees
  },
  
  // Storage configuration
  storage: {
    cartKey: 'jharkhand-cart',
    ordersKey: 'jharkhand-orders',
    favoritesKey: 'jharkhand-favorites',
  }
};

// Validate critical environment variables
export const validateEnvironment = () => {
  const warnings: string[] = [];
  
  // Only warn if no key is provided at all, not if using the provided test key
  if (!config.razorpay.keyId) {
    warnings.push('Razorpay Key ID not configured. Please set VITE_RAZORPAY_KEY_ID in your environment variables.');
  }
  
  if (!config.razorpay.keySecret) {
    warnings.push('Razorpay Key Secret not configured. Please set VITE_RAZORPAY_KEY_SECRET in your environment variables.');
  }
  
  if (warnings.length > 0) {
    console.warn('Environment Configuration Warnings:', warnings);
  }
  
  return warnings.length === 0;
};

// Check if running in production
export const isProduction = import.meta.env.PROD;

// Check if running in development
export const isDevelopment = import.meta.env.DEV;
