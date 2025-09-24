import { useState, useEffect } from 'react';

// Global Razorpay interface
declare global {
  interface Window {
    Razorpay: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

// Booking types
export interface BookingItem {
  id: string;
  type: 'experience' | 'tourguide' | 'event' | 'package' | 'rental' | 'stay';
  title: string;
  price: number;
  quantity: number;
  date?: string;
  time?: string;
  duration?: string;
  location?: string;
  image?: string;
  metadata?: Record<string, any>;
}

export interface BookingDetails {
  items: BookingItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  specialRequests?: string;
  bookingId: string;
  paymentId?: string;
  status: 'pending' | 'paid' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

// Razorpay configuration
const RAZORPAY_CONFIG = {
  keyId: 'rzp_test_RLUAMPaeE93MzD',
  currency: 'INR',
  name: 'Jharkhand Explorer',
  image: '/assets/Logo.jpg',
  theme: {
    color: '#059669'
  }
};

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      console.log('Razorpay script loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      reject(new Error('Failed to load Razorpay script'));
    };
    document.body.appendChild(script);
  });
};

// Generate Razorpay options
export const generateRazorpayOptions = (
  amount: number,
  orderId: string,
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  },
  bookingDetails: {
    items: BookingItem[];
    bookingDate: string;
    specialRequests?: string;
  }
) => {
  return {
    key: RAZORPAY_CONFIG.keyId,
    amount: amount * 100, // Amount in paise
    currency: RAZORPAY_CONFIG.currency,
    name: RAZORPAY_CONFIG.name,
    description: `Booking #${orderId}`,
    image: RAZORPAY_CONFIG.image,
    // Remove order_id to avoid server-side requirement
    handler: function (response: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.log('Payment successful:', response);
      return response;
    },
    prefill: {
      name: customerDetails.name,
      email: customerDetails.email,
      contact: customerDetails.phone,
    },
    notes: {
      booking_id: orderId,
      booking_date: bookingDetails.bookingDate,
      items: bookingDetails.items.map(item => `${item.title} (${item.quantity}x)`).join(', '),
      special_requests: bookingDetails.specialRequests || 'None'
    },
    theme: RAZORPAY_CONFIG.theme,
    modal: {
      ondismiss: function() {
        console.log('Payment modal dismissed');
      }
    }
  };
};

// Save booking to localStorage
export const saveBooking = (bookingDetails: BookingDetails): void => {
  try {
    const existingBookings = JSON.parse(localStorage.getItem('jharkhand-bookings') || '[]');
    existingBookings.push(bookingDetails);
    localStorage.setItem('jharkhand-bookings', JSON.stringify(existingBookings));
  } catch (error) {
    console.error('Error saving booking:', error);
  }
};

// Get bookings from localStorage
export const getBookings = (): BookingDetails[] => {
  try {
    const bookings = JSON.parse(localStorage.getItem('jharkhand-bookings') || '[]');
    return bookings.map((booking: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
      ...booking,
      createdAt: new Date(booking.createdAt)
    }));
  } catch (error) {
    console.error('Error loading bookings:', error);
    return [];
  }
};

// Update booking status
export const updateBookingStatus = (bookingId: string, status: BookingDetails['status']): void => {
  try {
    const bookings = getBookings();
    const updatedBookings = bookings.map(booking =>
      booking.bookingId === bookingId ? { ...booking, status } : booking
    );
    localStorage.setItem('jharkhand-bookings', JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('Error updating booking status:', error);
  }
};

// Process payment
export const processPayment = async (
  bookingItems: BookingItem[],
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  },
  bookingDate: string,
  specialRequests?: string
): Promise<{ success: boolean; bookingId?: string; paymentId?: string; error?: string }> => {
  try {
    // Load Razorpay script
    await loadRazorpayScript();

    // Calculate total amount
    const totalAmount = bookingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Generate booking ID
    const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create booking details
    const bookingDetails: Omit<BookingDetails, 'bookingId' | 'paymentId' | 'status' | 'createdAt'> = {
      items: bookingItems,
      totalAmount,
      customerName: customerDetails.name,
      customerEmail: customerDetails.email,
      customerPhone: customerDetails.phone,
      bookingDate,
      specialRequests
    };

    // Generate Razorpay options
    const options = generateRazorpayOptions(
      totalAmount,
      bookingId,
      customerDetails,
      { items: bookingItems, bookingDate, specialRequests }
    );

    // Override handler to handle payment success
    options.handler = function (response: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      console.log('Payment successful:', response);
      
      // Save booking with payment details
      const finalBookingDetails: BookingDetails = {
        ...bookingDetails,
        bookingId: response.razorpay_order_id || bookingId, // Use Razorpay order ID or fallback to our booking ID
        paymentId: response.razorpay_payment_id,
        status: 'paid',
        createdAt: new Date()
      };

      saveBooking(finalBookingDetails);
      
      // Show success message
      alert(`Booking confirmed! Payment ID: ${response.razorpay_payment_id}`);
      
      return response;
    };

    // Override modal dismiss handler
    options.modal.ondismiss = function() {
      console.log('Payment modal dismissed');
    };

    // Create Razorpay instance and open payment modal
    const rzp = new window.Razorpay(options);
    rzp.open();

    return { success: true, bookingId };
  } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    console.error('Payment error:', error);
    return { success: false, error: error.message || 'Payment failed. Please try again.' };
  }
};

// Hook for booking management
export const useBooking = () => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedBookings = getBookings();
    setBookings(savedBookings);
  }, []);

  const createBooking = async (
    bookingItems: BookingItem[],
    customerDetails: {
      name: string;
      email: string;
      phone: string;
    },
    bookingDate: string,
    specialRequests?: string
  ) => {
    setIsLoading(true);
    try {
      const result = await processPayment(bookingItems, customerDetails, bookingDate, specialRequests);
      if (result.success) {
        // Refresh bookings
        const updatedBookings = getBookings();
        setBookings(updatedBookings);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const getBookingById = (bookingId: string) => {
    return bookings.find(booking => booking.bookingId === bookingId);
  };

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
    const updatedBookings = getBookings();
    setBookings(updatedBookings);
  };

  return {
    bookings,
    isLoading,
    createBooking,
    getBookingById,
    cancelBooking
  };
};
