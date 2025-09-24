import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, IndianRupee, User, Mail, Phone, CreditCard, Loader2 } from 'lucide-react';
import { BookingItem, useBooking } from '@/hooks/useBooking';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItems: BookingItem[];
  onSuccess?: (bookingId: string) => void;
}

export const BookingModal = ({ isOpen, onClose, bookingItems, onSuccess }: BookingModalProps) => {
  const { createBooking, isLoading } = useBooking();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    bookingTime: '',
    specialRequests: ''
  });

  const totalAmount = bookingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.bookingDate) {
      alert('Please fill in all required fields');
      return;
    }

    const result = await createBooking(
      bookingItems,
      {
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone
      },
      formData.bookingDate,
      formData.specialRequests
    );

    if (result.success && result.bookingId) {
      onSuccess?.(result.bookingId);
      onClose();
      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        bookingDate: '',
        bookingTime: '',
        specialRequests: ''
      });
    } else {
      alert(result.error || 'Booking failed. Please try again.');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="text-primary" size={20} />
            Complete Your Booking
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">Booking Summary</h3>
            <div className="space-y-2">
              {bookingItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.type}
                    </Badge>
                    <span className="font-medium">{item.title}</span>
                    {item.quantity > 1 && (
                      <span className="text-muted-foreground">x{item.quantity}</span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <IndianRupee size={12} className="text-accent" />
                    <span className="font-medium">{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex items-center justify-between font-semibold">
                  <span>Total:</span>
                  <div className="flex items-center">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="text-lg text-accent">{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <User size={16} />
                Customer Details
              </h4>
              
              <div>
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">Email Address *</Label>
                <Input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => handleInputChange('customerEmail', e.target.value)}
                  placeholder="Enter your email"
                  required
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
                  required
                />
              </div>
            </div>

            {/* Booking Details */}
            <div className="space-y-3">
              <h4 className="font-medium flex items-center gap-2">
                <Calendar size={16} />
                Booking Details
              </h4>
              
              <div>
                <Label htmlFor="bookingDate">Booking Date *</Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => handleInputChange('bookingDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <Label htmlFor="bookingTime">Preferred Time</Label>
                <Input
                  id="bookingTime"
                  type="time"
                  value={formData.bookingTime}
                  onChange={(e) => handleInputChange('bookingTime', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special requirements or requests..."
                  rows={3}
                />
              </div>
            </div>

            {/* Payment Button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2" size={20} />
                  Pay ₹{totalAmount.toLocaleString()}
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
