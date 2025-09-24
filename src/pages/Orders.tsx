import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ArrowLeft, Package, IndianRupee, Calendar, MapPin, Phone, Mail, User } from 'lucide-react';
import { getOrders, OrderDetails } from '@/lib/razorpay';

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedOrders = getOrders();
    setOrders(savedOrders);
    setIsLoading(false);
  }, []);

  const getStatusColor = (status: OrderDetails['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-500';
      case 'shipped':
        return 'bg-blue-500';
      case 'delivered':
        return 'bg-emerald-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  const getStatusText = (status: OrderDetails['status']) => {
    switch (status) {
      case 'paid':
        return 'Paid';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading orders...</p>
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
          My Orders
        </h1>
      </div>

      <div className="px-6 py-6 pb-32 max-w-4xl mx-auto">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <Button onClick={() => navigate('/marketplace')} variant="outline">
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <LuxuryCard key={order.orderId} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Order #{order.orderId.slice(-8)}</h3>
                    <p className="text-sm text-muted-foreground">
                      Placed on {order.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Items Ordered</h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm">
                              <IndianRupee size={12} className="text-accent" />
                              <span className="font-medium text-accent">
                                {(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Customer & Shipping Info */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Customer Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-primary" />
                        <span>{order.customerName}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail size={14} className="mr-2 text-primary" />
                        <span>{order.customerEmail}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone size={14} className="mr-2 text-primary" />
                        <span>{order.customerPhone}</span>
                      </div>
                      <div className="flex items-start">
                        <MapPin size={14} className="mr-2 text-primary mt-0.5" />
                        <div>
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Payment ID: {order.paymentId || 'N/A'}
                    </div>
                    <div className="flex items-center text-lg font-semibold">
                      <IndianRupee size={18} className="text-accent" />
                      <span className="font-bold text-accent">
                        {order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </LuxuryCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
