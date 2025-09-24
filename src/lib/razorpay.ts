import Razorpay from 'razorpay';

// Razorpay configuration
const RAZORPAY_KEY_ID = process.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1DP5mmOlF5G5ag'; // Replace with your actual key
const RAZORPAY_KEY_SECRET = process.env.VITE_RAZORPAY_KEY_SECRET || 'your_secret_key'; // Replace with your actual secret

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

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create payment order');
  }
};

// Verify payment signature
export const verifyPaymentSignature = (orderId: string, paymentId: string, signature: string): boolean => {
  try {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');
    
    return expectedSignature === signature;
  } catch (error) {
    console.error('Error verifying payment signature:', error);
    return false;
  }
};

// Process payment
export const processPayment = async (
  amount: number,
  orderDetails: Omit<OrderDetails, 'orderId' | 'paymentId' | 'status' | 'createdAt'>
): Promise<PaymentDetails> => {
  try {
    // Create Razorpay order
    const order = await createRazorpayOrder(amount);
    
    // For client-side integration, we'll return the order details
    // The actual payment will be handled by Razorpay's client-side SDK
    return {
      amount,
      currency: 'INR',
      orderId: order.id,
      paymentId: '', // Will be filled after payment
      signature: '', // Will be filled after payment
      status: 'pending',
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error('Payment processing failed');
  }
};

// Save order to localStorage (in a real app, this would be sent to a backend)
export const saveOrder = (orderDetails: OrderDetails): void => {
  try {
    const existingOrders = JSON.parse(localStorage.getItem('jharkhand-orders') || '[]');
    existingOrders.push(orderDetails);
    localStorage.setItem('jharkhand-orders', JSON.stringify(existingOrders));
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

// Get orders from localStorage
export const getOrders = (): OrderDetails[] => {
  try {
    const orders = JSON.parse(localStorage.getItem('jharkhand-orders') || '[]');
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
    localStorage.setItem('jharkhand-orders', JSON.stringify(updatedOrders));
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};
