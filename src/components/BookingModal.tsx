import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, IndianRupee, User, Mail, Phone, CreditCard, Loader2 } from 'lucide-react';
import { BookingItem } from '@/hooks/useBooking';
import { processRazorpayPayment } from '@/lib/razorpay';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingItems: BookingItem[];
  onSuccess?: (bookingId: string) => void;
}

export const BookingModal = ({ isOpen, onClose, bookingItems, onSuccess }: BookingModalProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    bookingDate: '',
    bookingTime: '',
    specialRequests: '',
    rentalDays: 1,
    rentalHours: 1
  });

  // Calculate total amount with proper handling of NaN values and rental duration
  const totalAmount = bookingItems.reduce((sum, item) => {
    const price = isNaN(item.price) ? 0 : item.price;
    let quantity = item.quantity;
    
    // For rentals, multiply by days or hours based on duration
    if (item.type === 'rental') {
      if (item.duration?.includes('Day')) {
        quantity = item.quantity * formData.rentalDays;
      } else if (item.duration?.includes('Hour')) {
        quantity = item.quantity * formData.rentalHours;
      }
    }
    
    return sum + (price * quantity);
  }, 0);

  // Check if this is a free booking
  const isFreeBooking = totalAmount === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.bookingDate) {
      alert(t('common.pleaseFillRequiredFields'));
      return;
    }

    setIsLoading(true);

    try {
      const bookingId = `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      if (isFreeBooking) {
        // Handle free booking without payment
        console.log('Free booking confirmed:', bookingId);
        alert(t('common.freeBookingConfirmed'));
        
        if (onSuccess) {
          onSuccess(bookingId);
        }
        
        onClose();
        
        // Reset form
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          bookingDate: '',
          bookingTime: '',
          specialRequests: '',
          rentalDays: 1,
          rentalHours: 1
        });
      } else {
        // Handle paid booking with Razorpay
        const result = await processRazorpayPayment(
          totalAmount,
          `Booking #${bookingId}`,
          {
            name: formData.customerName,
            email: formData.customerEmail,
            phone: formData.customerPhone
          },
          {
            booking_id: bookingId,
            booking_date: formData.bookingDate,
            items: bookingItems.map(item => `${item.title} (${item.quantity}x)`).join(', '),
            special_requests: formData.specialRequests || 'None'
          },
          (response) => {
            // Payment successful
            console.log('Payment successful:', response);
            alert(t('common.bookingConfirmed').replace('{paymentId}', response.razorpay_payment_id));
            
            if (onSuccess) {
              onSuccess(response.razorpay_payment_id || bookingId);
            }
            
            onClose();
            
            // Reset form
            setFormData({
              customerName: '',
              customerEmail: '',
              customerPhone: '',
              bookingDate: '',
              bookingTime: '',
              specialRequests: '',
              rentalDays: 1,
              rentalHours: 1
            });
          },
          (error) => {
            // Payment failed or cancelled
            console.error('Payment error:', error);
            alert(t('common.paymentFailed'));
          }
        );

        if (!result.success) {
          alert(result.error || t('common.paymentFailed'));
        }
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert(t('common.bookingFailed'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    {isFreeBooking ? (
                      <Calendar className="text-primary" size={20} />
                    ) : (
                      <CreditCard className="text-primary" size={20} />
                    )}
                    {isFreeBooking ? t('common.completeYourFreeBooking') : t('common.completeYourBooking')}
                  </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Summary */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h3 className="font-semibold mb-3">{t('common.bookingSummary')}</h3>
            <div className="space-y-2">
              {bookingItems.map((item, index) => {
                let displayQuantity = item.quantity;
                let displayDuration = item.duration;
                
                // For rentals, show calculated duration and quantity
                if (item.type === 'rental') {
                  if (item.duration?.includes('Day')) {
                    displayQuantity = item.quantity * formData.rentalDays;
                    displayDuration = `${formData.rentalDays} Day${formData.rentalDays > 1 ? 's' : ''}`;
                  } else if (item.duration?.includes('Hour')) {
                    displayQuantity = item.quantity * formData.rentalHours;
                    displayDuration = `${formData.rentalHours} Hour${formData.rentalHours > 1 ? 's' : ''}`;
                  }
                }
                
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </Badge>
                      <span className="font-medium">{item.title}</span>
                      {displayQuantity > 1 && (
                        <span className="text-muted-foreground">x{displayQuantity}</span>
                      )}
                      {displayDuration && (
                        <span className="text-muted-foreground text-xs">({displayDuration})</span>
                      )}
                    </div>
                    <div className="flex items-center">
                      <IndianRupee size={12} className="text-accent" />
                      <span className="font-medium">
                        {isNaN(item.price) ? '0' : (item.price * displayQuantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div className="border-t pt-2 mt-2">
                        <div className="flex items-center justify-between font-semibold">
                          <span>{t('common.total')}:</span>
                  <div className="flex items-center">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="text-lg text-accent">
                      {isFreeBooking ? '0' : totalAmount.toLocaleString()}
                    </span>
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
                        {t('common.customerDetails')}
                      </h4>
              
              <div>
                <Label htmlFor="customerName">{t('common.fullName')} *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="customerEmail">{t('common.emailAddress')} *</Label>
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
                <Label htmlFor="customerPhone">{t('common.phoneNumber')} *</Label>
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
                        {t('common.bookingDetails')}
                      </h4>
              
              <div>
                <Label htmlFor="bookingDate">{t('common.bookingDate')} *</Label>
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
                <Label htmlFor="bookingTime">{t('common.preferredTime')}</Label>
                <Input
                  id="bookingTime"
                  type="time"
                  value={formData.bookingTime}
                  onChange={(e) => handleInputChange('bookingTime', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">{t('common.specialRequests')}</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder={t('common.anySpecialRequirements')}
                  rows={3}
                />
              </div>

              {/* Rental Duration Fields - Only show for rental bookings */}
              {bookingItems.some(item => item.type === 'rental') && (
                <>
                  {bookingItems.some(item => item.duration?.includes('Day')) && (
                    <div>
                      <Label htmlFor="rentalDays">Number of Days</Label>
                      <Input
                        id="rentalDays"
                        type="number"
                        min="1"
                        max="30"
                        value={formData.rentalDays}
                        onChange={(e) => handleInputChange('rentalDays', parseInt(e.target.value) || 1)}
                        className="mt-1"
                      />
                    </div>
                  )}
                  
                  {bookingItems.some(item => item.duration?.includes('Hour')) && (
                    <div>
                      <Label htmlFor="rentalHours">Number of Hours</Label>
                      <Input
                        id="rentalHours"
                        type="number"
                        min="1"
                        max="24"
                        value={formData.rentalHours}
                        onChange={(e) => handleInputChange('rentalHours', parseInt(e.target.value) || 1)}
                        className="mt-1"
                      />
                    </div>
                  )}
                </>
              )}
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
                          {t('common.processing')}
                        </>
                      ) : isFreeBooking ? (
                        <>
                          <Calendar className="mr-2" size={20} />
                          {t('common.confirmFreeBooking')}
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
