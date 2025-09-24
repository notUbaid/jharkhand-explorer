import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LuxuryCard } from '@/components/ui/luxury-card';
import { X, ArrowRight, Clock, IndianRupee, MapPin, Star, Heart, Users, Fuel, Battery, Car, Bike } from 'lucide-react';

interface RentalVehicle {
  id: number;
  type: string;
  model: string;
  pricePerDay: string;
  pricePerHour: string;
  seats: number;
  fuelType: string;
  image: string;
  pickupLocation: string;
  available: boolean;
  features: string[];
  mileage: string;
  engineCapacity: string;
  isEco?: boolean;
}

interface RentalComparisonModalProps {
  compareItems: RentalVehicle[];
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
  openCompareModal: boolean;
  setOpenCompareModal: (open: boolean) => void;
}

const getVehicleIcon = (type: string) => {
  if (type.includes("Car") || type.includes("SUV") || type.includes("Hatchback") || type.includes("Sedan")) {
    return <Car size={16} className="text-blue-600" />;
  } else if (type.includes("Bike") || type.includes("Motorcycle") || type.includes("Scooter")) {
    return <Bike size={16} className="text-green-600" />;
  }
  return <Car size={16} className="text-gray-600" />;
};

export const RentalComparisonModal: React.FC<RentalComparisonModalProps> = ({
  compareItems,
  removeFromCompare,
  clearCompare,
  openCompareModal,
  setOpenCompareModal
}) => {
  if (!openCompareModal || compareItems.length === 0) return null;

  const getPrice = (vehicle: RentalVehicle) => {
    return vehicle.pricePerDay;
  };

  const getFuelIcon = (fuelType: string) => {
    if (fuelType === "Electric") {
      return <Battery size={16} className="text-green-600" />;
    }
    return <Fuel size={16} className="text-orange-600" />;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-foreground">Compare Rental Vehicles</h2>
            <Badge variant="secondary" className="text-xs">
              {compareItems.length} vehicles
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
              className="p-2"
            >
              <X size={16} />
            </Button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compareItems.map((vehicle) => (
              <LuxuryCard key={vehicle.id} className="p-0 overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/2] bg-muted">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.model}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  
                  {vehicle.isEco && (
                    <Badge className="absolute top-2 left-2 bg-success text-success-foreground text-xs">
                      🌱 Eco
                    </Badge>
                  )}
                  
                  <button
                    onClick={() => removeFromCompare(vehicle.id)}
                    className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90 transition-colors"
                    title="Remove from comparison"
                  >
                    <X size={12} />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {getVehicleIcon(vehicle.type)}
                        <h3 className="font-semibold text-foreground text-sm">{vehicle.model}</h3>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mb-1">
                        <MapPin size={10} className="mr-1" />
                        {vehicle.pickupLocation}
                      </div>
                    </div>
                  </div>
                  
                  {/* Key Details */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Price/Day:</span>
                      <span className="font-medium text-primary">{vehicle.pricePerDay}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Price/Hour:</span>
                      <span className="font-medium text-primary">{vehicle.pricePerHour}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Seats:</span>
                      <div className="flex items-center">
                        <Users size={10} className="mr-1" />
                        <span className="font-medium">{vehicle.seats}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Fuel:</span>
                      <div className="flex items-center">
                        {getFuelIcon(vehicle.fuelType)}
                        <span className="font-medium ml-1">{vehicle.fuelType}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Mileage:</span>
                      <span className="font-medium">{vehicle.mileage}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Engine:</span>
                      <span className="font-medium">{vehicle.engineCapacity}</span>
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-3">
                    <h4 className="text-xs font-medium text-foreground mb-1">Features:</h4>
                    <div className="flex flex-wrap gap-1">
                      {vehicle.features.slice(0, 3).map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                          {feature}
                        </Badge>
                      ))}
                      {vehicle.features.length > 3 && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          +{vehicle.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={vehicle.available ? "default" : "destructive"} 
                      className="text-xs"
                    >
                      {vehicle.available ? "Available" : "Unavailable"}
                    </Badge>
                    <Button size="sm" className="text-xs h-6 px-2">
                      Book Now
                    </Button>
                  </div>
                </div>
              </LuxuryCard>
            ))}
          </div>
          
          {/* Comparison Summary */}
          {compareItems.length > 1 && (
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-3">Quick Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Cheapest Option</p>
                  <p className="text-lg font-bold text-primary">
                    {compareItems.reduce((cheapest, current) => {
                      const cheapestPrice = parseInt(cheapest.pricePerDay.replace(/[₹,]/g, ''));
                      const currentPrice = parseInt(current.pricePerDay.replace(/[₹,]/g, ''));
                      return currentPrice < cheapestPrice ? current : cheapest;
                    }).model}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Most Seats</p>
                  <p className="text-lg font-bold text-primary">
                    {compareItems.reduce((most, current) => 
                      current.seats > most.seats ? current : most
                    ).model}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">Eco Options</p>
                  <p className="text-lg font-bold text-primary">
                    {compareItems.filter(v => v.isEco).length} vehicles
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
