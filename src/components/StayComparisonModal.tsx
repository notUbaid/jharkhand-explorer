import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { Star, IndianRupee, Users, MapPin, Wifi, Car, Utensils, AirVent, Bath, Building, X, ArrowRight } from 'lucide-react';
import { useStayComparison } from '@/contexts/StayComparisonContext';
import { useNavigate } from 'react-router-dom';

export const StayComparisonModal = () => {
  const { compareItems, removeFromCompare, clearCompare, openCompareModal, setOpenCompareModal } = useStayComparison();
  const navigate = useNavigate();

  const handleCompareNow = () => {
    if (compareItems.length === 2) {
      navigate('/stays/compare', { 
        state: { 
          stays: compareItems.map(stay => stay.id) 
        } 
      });
      setOpenCompareModal(false);
    }
  };

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={16} className="text-primary" />;
    if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car size={16} className="text-primary" />;
    if (amenityLower.includes('restaurant') || amenityLower.includes('food') || amenityLower.includes('dining')) return <Utensils size={16} className="text-primary" />;
    if (amenityLower.includes('ac') || amenityLower.includes('air')) return <AirVent size={16} className="text-primary" />;
    if (amenityLower.includes('pool') || amenityLower.includes('bath')) return <Bath size={16} className="text-primary" />;
    return <Building size={16} className="text-primary" />;
  };

  return (
    <Dialog open={openCompareModal} onOpenChange={setOpenCompareModal}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Compare Stays ({compareItems.length}/2)</span>
            <Button
              variant="outline"
              size="sm"
              onClick={clearCompare}
              disabled={compareItems.length === 0}
            >
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>

        {compareItems.length === 0 ? (
          <div className="text-center py-8">
            <Building size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No stays selected</h3>
            <p className="text-muted-foreground mb-4">Select up to 2 stays to compare</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {compareItems.map((stay, index) => (
                <LuxuryCard key={stay.id} className="p-4">
                  <div className="space-y-4">
                    {/* Stay Image */}
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={stay.images[0]} 
                        alt={stay.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Stay Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{stay.name}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCompare(stay.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin size={14} className="mr-1" />
                        {stay.location}
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{stay.category}</Badge>
                        <div className="flex items-center">
                          <Star size={14} className="text-accent fill-accent mr-1" />
                          <span className="font-medium">{stay.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users size={14} className="mr-1 text-muted-foreground" />
                          <span className="text-sm">2-4 guests</span>
                        </div>
                        <div className="flex items-center">
                          <IndianRupee size={14} className="text-accent" />
                          <span className="font-semibold text-accent">{stay.price}/night</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Amenities</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {stay.amenities.slice(0, 6).map((amenity, amenityIndex) => (
                          <div key={amenityIndex} className="flex items-center text-xs text-muted-foreground">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1 truncate">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Highlights</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {stay.highlights.slice(0, 3).map((highlight, highlightIndex) => (
                          <li key={highlightIndex} className="flex items-start">
                            <span className="mr-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>

            {/* Compare Button */}
            {compareItems.length === 2 && (
              <div className="flex justify-center pt-4 border-t">
                <Button 
                  onClick={handleCompareNow}
                  className="bg-primary hover:bg-primary/90"
                >
                  Compare Now
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            )}

            {/* Add More Message */}
            {compareItems.length < 2 && (
              <div className="text-center py-4 text-muted-foreground">
                <p>Select {2 - compareItems.length} more stay to compare</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
