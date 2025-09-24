import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ArrowLeft, ShoppingCart, IndianRupee, MapPin, Phone, Mail, User, CreditCard, CheckCircle } from 'lucide-react';
import { saveOrder, OrderDetails, OrderItem, generateRazorpayOptions } from '@/lib/razorpay';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: {
      street: '',
      city: '',
      state: 'Jharkhand',
      pincode: ''
    }
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const validateForm = () => {
    const { customerName, customerEmail, customerPhone, shippingAddress } = formData;
    
    if (!customerName.trim()) {
      alert('Please enter your name');
      return false;
    }
    
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      alert('Please enter a valid email address');
      return false;
    }
    
    if (!customerPhone.trim() || customerPhone.length < 10) {
      alert('Please enter a valid phone number');
      return false;
    }
    
    if (!shippingAddress.street.trim()) {
      alert('Please enter your street address');
      return false;
    }
    
    if (!shippingAddress.city.trim()) {
      alert('Please enter your city');
      return false;
    }
    
    if (!shippingAddress.pincode.trim() || shippingAddress.pincode.length !== 6) {
      alert('Please enter a valid 6-digit pincode');
      return false;
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // Convert cart items to order items
      const orderItems: OrderItem[] = items.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: parseFloat(item.product.price.replace(/[₹,]/g, '')),
        quantity: item.quantity,
        image: item.product.image
      }));

      // Generate order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Create order details
      const orderDetails: Omit<OrderDetails, 'orderId' | 'paymentId' | 'status' | 'createdAt'> = {
        items: orderItems,
        totalAmount: totalPrice,
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress
      };

      // Generate Razorpay options
      const options = generateRazorpayOptions(
        totalPrice,
        orderId,
        {
          name: formData.customerName,
          email: formData.customerEmail,
          phone: formData.customerPhone
        },
        formData.shippingAddress
      );

      // Override handler to handle payment success
      options.handler = function (response: any) {
        // Payment successful
        const finalOrderDetails: OrderDetails = {
          ...orderDetails,
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          status: 'paid',
          createdAt: new Date()
        };
        
        saveOrder(finalOrderDetails);
        setPaymentSuccess(true);
        clearCart();
        
        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/orders');
        }, 3000);
      };

      // Override modal dismiss handler
      options.modal.ondismiss = function() {
        setIsProcessing(false);
      };

      // Create Razorpay instance and open payment modal
      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to your cart to proceed with checkout.</p>
          <Button onClick={() => navigate('/marketplace')} variant="outline">
            <ArrowLeft className="mr-2" size={16} />
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-4">Payment Successful!</h1>
          <p className="text-muted-foreground mb-6">Your order has been placed successfully. You will be redirected to your orders page shortly.</p>
          <Button onClick={() => navigate('/orders')} variant="outline">
            View Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/marketplace')}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Marketplace
          </Button>
          <LanguageToggle />
        </div>
        <h1 className="text-2xl font-playfair font-bold text-center">
          Checkout
        </h1>
      </div>

      <div className="px-6 py-6 pb-32 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Summary */}
          <div className="space-y-6">
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <ShoppingCart className="mr-2" size={20} />
                Order Summary
              </h2>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <IndianRupee size={14} className="text-accent" />
                        <span className="font-bold text-accent">
                          {(parseFloat(item.product.price.replace(/[₹,]/g, '')) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount:</span>
                  <div className="flex items-center">
                    <IndianRupee size={18} className="text-accent" />
                    <span className="font-bold text-accent text-xl">
                      {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </LuxuryCard>
          </div>

          {/* Checkout Form */}
          <div className="space-y-6">
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <User className="mr-2" size={20} />
                Customer Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Full Name *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => handleInputChange('customerName', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="customerEmail">Email Address *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <Label htmlFor="customerPhone">Phone Number *</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => handleInputChange('customerPhone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
            </LuxuryCard>

            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <MapPin className="mr-2" size={20} />
                Shipping Address
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="street">Street Address *</Label>
                  <Textarea
                    id="street"
                    value={formData.shippingAddress.street}
                    onChange={(e) => handleInputChange('shippingAddress.street', e.target.value)}
                    placeholder="Enter your street address"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.shippingAddress.city}
                      onChange={(e) => handleInputChange('shippingAddress.city', e.target.value)}
                      placeholder="Enter your city"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={formData.shippingAddress.pincode}
                      onChange={(e) => handleInputChange('shippingAddress.pincode', e.target.value)}
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.shippingAddress.state}
                    onChange={(e) => handleInputChange('shippingAddress.state', e.target.value)}
                    placeholder="Enter your state"
                    disabled
                  />
                </div>
              </div>
            </LuxuryCard>

            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2" size={20} />
                  Pay ₹{totalPrice.toLocaleString()}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
