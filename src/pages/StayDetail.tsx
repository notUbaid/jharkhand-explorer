import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/BookingModal";
import { useStayComparison } from "@/contexts/StayComparisonContext";
import { MapPin, Star, IndianRupee, Users, Wifi, AirVent, Car, Utensils, Bath, ArrowLeft, GitCompare, ChevronLeft, ChevronRight, Clock, Calendar, Building, Heart } from "lucide-react";
import { getStayById } from "@/data/stays";
import { BookingItem } from "@/hooks/useBooking";

export default function StayDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [stay] = useState(() => getStayById(id || "1"));
  const { addToCompare, removeFromCompare, isInCompare, canAddMore } = useStayComparison();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    document.title = `${stay?.name} • ${t("common.discoverJharkhand")}`;
    // Scroll to top when component mounts or stay changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [stay?.name, id, t]);

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    console.log('Booking successful:', bookingId);
    // You can add additional success handling here
  };

  const handleCompareToggle = () => {
    if (!stay) return;
    
    if (isInCompare(stay.id)) {
      removeFromCompare(stay.id);
    } else if (canAddMore) {
      addToCompare(stay);
    }
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, [stay?.images]);

  if (!stay) {
    return (
      <div className="pb-24 min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Building size={48} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Stay not found</h2>
          <Button onClick={() => navigate('/stays')}>{t("common.backToStays")}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate('/stays')}>
            <ArrowLeft size={14} className="mr-1" /> {t("common.back")}
          </Button>
          <Badge variant="secondary">{stay.category}</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">{stay.name}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">{stay.location}</p>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Stay Images Gallery */}
        <div className="space-y-3 relative">
          <div className="relative">
            {/* Left scroll button */}
            {canScrollLeft && (
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollLeft}
              >
                <ChevronLeft size={20} />
              </Button>
            )}
            
            {/* Right scroll button */}
            {canScrollRight && (
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollRight}
              >
                <ChevronRight size={20} />
              </Button>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {stay.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-[32rem] h-96 bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${stay.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )) || (
                <div className="flex-shrink-0 w-[32rem] h-96 bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={stay.image || "/placeholder.svg"} 
                    alt={`${stay.name} view`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stay Info */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-primary" />
              <div>
                <div className="text-muted-foreground text-xs">Check-in</div>
                <div className="font-semibold">{stay.checkIn}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-primary" />
              <div>
                <div className="text-muted-foreground text-xs">Check-out</div>
                <div className="font-semibold">{stay.checkOut}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2 text-primary" />
              <div>
                <div className="text-muted-foreground text-xs">Capacity</div>
                <div className="font-semibold">2-4 guests</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-muted">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="text-accent fill-accent" size={16} />
                <span className="text-lg font-semibold ml-2">{stay.rating}</span>
                <span className="text-muted-foreground ml-1">rating</span>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <IndianRupee size={20} className="text-accent" />
                  <span className="text-2xl font-bold text-accent">{stay.price}</span>
                </div>
                <div className="text-sm text-muted-foreground">{t("common.perNight")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{stay.description}</p>
        </section>

        {/* Highlights Section */}
        {stay.highlights && (
          <section>
            <h2 className="font-medium text-foreground mb-2">{t("common.highlights")}</h2>
            <div className="flex flex-wrap gap-2">
              {stay.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Amenities Section */}
        {stay.amenities && (
          <section>
            <h2 className="font-medium text-foreground mb-2">{t("common.amenities")}</h2>
            <div className="flex flex-wrap gap-2">
              {stay.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Facilities Section */}
        {stay.facilities && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Room Facilities</h2>
            <div className="flex flex-wrap gap-2">
              {stay.facilities.map((facility, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {facility}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Best For Section */}
        {stay.bestFor && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Best For</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{stay.bestFor}</p>
          </section>
        )}

        {/* Nearby Attractions Section */}
        {stay.nearbyAttractions && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Nearby Attractions</h2>
            <div className="flex flex-wrap gap-2">
              {stay.nearbyAttractions.map((attraction, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {attraction}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Travel Tips Section */}
        {stay.travelTips && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Travel Tips</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{stay.travelTips}</p>
          </section>
        )}

        {/* Accessibility Section */}
        {stay.accessibility && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Accessibility</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{stay.accessibility}</p>
          </section>
        )}

        {/* Contact Information */}
        <section>
          <h2 className="font-medium text-foreground mb-2">Contact Information</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <MapPin size={14} className="mr-2" />
              {stay.address}
            </div>
            <div className="flex items-center">
              <Building size={14} className="mr-2" />
              {stay.contact}
            </div>
          </div>
        </section>

        {/* Cancellation Policy */}
        {stay.cancellationPolicy && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Cancellation Policy</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{stay.cancellationPolicy}</p>
          </section>
        )}
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pb-4">
          <Button variant="outline">
            <Heart size={16} className="mr-1" /> Add to Favorites
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCompareToggle}
            className={isInCompare(stay?.id || 0) ? "bg-primary text-primary-foreground" : ""}
          >
            <GitCompare size={16} className="mr-1" /> 
            {isInCompare(stay?.id || 0) ? t("common.removeFromCompare") : t("common.compare")}
          </Button>
          <Button className="bg-primary hover:bg-primary-light" onClick={handleBookNow}>
            {t("common.bookNow")}
          </Button>
        </div>
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bookingItems={stay ? [{
          id: stay.id.toString(),
          type: 'stay',
          title: stay.name,
          price: parseFloat(stay.price.replace(/[₹,]/g, '')),
          quantity: 1,
          duration: '1 Night',
          location: stay.location,
          image: stay.images[0],
          metadata: {
            category: stay.category,
            rating: stay.rating,
            amenities: stay.amenities
          }
        }] : []}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}