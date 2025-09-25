import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { X, ArrowRight, Clock, IndianRupee, MapPin, Star, Heart } from 'lucide-react';
import { useTransportComparison } from '@/contexts/TransportComparisonContext';
import { TransportOption, TrainOption, BusOption, FlightOption } from '@/types/Transport';

const getModeIcon = (mode: string) => {
  switch (mode) {
    case "train": return "🚄";
    case "bus": return "🚌";
    case "flight": return "✈️";
    default: return "🚗";
  }
};

export const TransportComparisonModal = () => {
  const { compareItems, removeFromCompare, clearCompare, openCompareModal, setOpenCompareModal } = useTransportComparison();

  if (!openCompareModal || compareItems.length === 0) return null;

  const getPrice = (option: TransportOption) => {
    if (option.mode === "train") {
      return (option as TrainOption).classes[0]?.price || "₹0";
    } else if (option.mode === "bus") {
      return (option as BusOption).price;
    } else if (option.mode === "flight") {
      return (option as FlightOption).price;
    }
    return "₹0";
  };

  const getOperatorName = (option: TransportOption) => {
    if (option.mode === "train") {
      return (option as TrainOption).trainName;
    } else if (option.mode === "bus") {
      return (option as BusOption).operator;
    } else if (option.mode === "flight") {
      return (option as FlightOption).airline;
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold">Compare Routes</h2>
            <Badge variant="secondary" className="text-xs">
              {compareItems.length} items
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearCompare}
              className="text-xs"
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOpenCompareModal(false)}
              className="p-1"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compareItems.map((option) => (
              <LuxuryCard key={option.id} className="p-4 relative">
                {/* Remove Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFromCompare(option.id)}
                  className="absolute top-2 right-2 p-1 h-auto text-muted-foreground hover:text-destructive"
                >
                  <X size={14} />
                </Button>

                {/* Route Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getModeIcon(option.mode)}</span>
                    <h3 className="font-semibold text-sm">{getOperatorName(option)}</h3>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{option.from}</span>
                    <ArrowRight size={10} className="mx-1" />
                    <span>{option.to}</span>
                  </div>
                </div>

                {/* Key Details */}
                <div className="space-y-3">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Price</span>
                    <div className="flex items-center">
                      <IndianRupee size={12} className="text-accent" />
                      <span className="font-semibold text-accent text-sm">{getPrice(option)}</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Duration</span>
                    <div className="flex items-center">
                      <Clock size={12} className="text-muted-foreground mr-1" />
                      <span className="text-sm font-medium">{option.duration}</span>
                    </div>
                  </div>

                  {/* Distance */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Distance</span>
                    <div className="flex items-center">
                      <MapPin size={12} className="text-muted-foreground mr-1" />
                      <span className="text-sm font-medium">{option.distance}</span>
                    </div>
                  </div>

                  {/* Departure */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Departure</span>
                    <span className="text-sm font-medium">{option.departure}</span>
                  </div>

                  {/* Arrival */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Arrival</span>
                    <span className="text-sm font-medium">{option.arrival}</span>
                  </div>

                  {/* Stops */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Stops</span>
                    <span className="text-sm font-medium">{option.stops}</span>
                  </div>

                  {/* Mode-specific details */}
                  {option.mode === "train" && (option as TrainOption).classes && (
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Classes</span>
                      <div className="flex flex-wrap gap-1">
                        {(option as TrainOption).classes.slice(0, 2).map((cls, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cls.class}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {option.mode === "bus" && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Bus Type</span>
                      <Badge variant="outline" className="text-xs">
                        {(option as BusOption).busType}
                      </Badge>
                    </div>
                  )}

                  {option.mode === "flight" && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Aircraft</span>
                      <Badge variant="outline" className="text-xs">
                        {(option as FlightOption).aircraft}
                      </Badge>
                    </div>
                  )}

                  {/* Amenities */}
                  {option.amenities && (
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">Amenities</span>
                      <div className="flex flex-wrap gap-1">
                        {option.amenities.slice(0, 3).map((amenity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {option.amenities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{option.amenities.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Book Button */}
                <Button 
                  size="sm" 
                  className="w-full mt-4 bg-primary hover:bg-primary-light text-xs"
                >
                  Book Now
                </Button>
              </LuxuryCard>
            ))}
          </div>

          {/* Empty slots for visual balance */}
          {compareItems.length < 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 3 - compareItems.length }).map((_, index) => (
                <LuxuryCard key={`empty-${index}`} className="p-4 border-dashed border-2 border-muted-foreground/30">
                  <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <div className="text-4xl mb-2">+</div>
                    <p className="text-sm">Add more routes to compare</p>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

