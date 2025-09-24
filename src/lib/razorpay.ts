import { config, validateEnvironment } from '@/config/environment';

// Validate environment on import
validateEnvironment();

// Note: Razorpay server-side initialization should be done in your backend
// This file contains client-side utilities for payment processing

export interface PaymentDetails {
  amount: number;
  currency: string;
  orderId: string;
  paymentId: string;
  signature: string;
  status: 'success' | 'failed' | 'pending';
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderDetails {
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  orderId: string;
  paymentId?: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}

// Client-side Razorpay options generator
export const generateRazorpayOptions = (
  amount: number,
  orderId: string,
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  },
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  }
) => {
  return {
    key: config.razorpay.keyId,
    amount: amount * 100, // Amount in paise
    currency: config.payment.currency,
    name: config.app.name,
    description: `Order #${orderId}`,
    image: '/assets/Logo.jpg',
    order_id: orderId,
    handler: function (response: any) {
      // Payment successful callback
      console.log('Payment successful:', response);
      return response;
    },
    prefill: {
      name: customerDetails.name,
      email: customerDetails.email,
      contact: customerDetails.phone,
    },
    notes: {
      address: `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} - ${shippingAddress.pincode}`,
    },
    theme: {
      color: '#059669'
    },
    modal: {
      ondismiss: function() {
        console.log('Payment modal dismissed');
      }
    }
  };
};

// Save order to localStorage (in a real app, this would be sent to a backend)
export const saveOrder = (orderDetails: OrderDetails): void => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem(config.storage.ordersKey) || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem(config.storage.ordersKey, JSON.stringify(existingOrders));
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

// Get orders from localStorage
export const getOrders = (): OrderDetails[] => {
  try {
    const orders = JSON.parse(localStorage.getItem(config.storage.ordersKey) || '[]');
    return orders.map((order: any) => ({
      ...order,
      createdAt: new Date(order.createdAt)
    }));
  } catch (error) {
    console.error('Error loading orders:', error);
    return [];
  }
};

// Update order status
export const updateOrderStatus = (orderId: string, status: OrderDetails['status']): void => {
  try {
    const orders = getOrders();
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status } : order
    );
    localStorage.setItem(config.storage.ordersKey, JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};
