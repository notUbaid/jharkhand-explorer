import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { 
  Train,
  Bus,
  Plane,
  Car,
  Bike,
  Zap,
  MapPin,
  Clock,
  IndianRupee,
  Users,
  Fuel,
  Battery,
  Accessibility,
  ArrowRight,
  Calendar
} from "lucide-react";

const longDistanceOptions = [
  {
    id: 1,
    mode: "train",
    from: "Delhi",
    to: "Ranchi",
    operator: "Rajdhani Express",
    duration: "16h 30m",
    price: "₹2,100",
    departure: "5:50 PM",
    arrival: "10:20 AM",
    class: "3AC",
  },
  {
    id: 2,
    mode: "flight",
    from: "Mumbai",
    to: "Ranchi",
    operator: "IndiGo",
    duration: "2h 15m",
    price: "₹4,500",
    departure: "9:25 AM",
    arrival: "11:40 AM",
    class: "Economy",
  },
  {
    id: 3,
    mode: "bus",
    from: "Kolkata",
    to: "Jamshedpur",
    operator: "Volvo Sleeper",
    duration: "6h 45m",
    price: "₹800",
    departure: "11:00 PM",
    arrival: "5:45 AM",
    class: "AC Sleeper",
  },
];

const rentalVehicles = [
  {
    id: 1,
    type: "Scooter",
    model: "Honda Activa 6G",
    pricePerDay: "₹400",
    seats: 2,
    fuelType: "Petrol",
    image: "/placeholder.svg",
    pickupLocation: "Ranchi Railway Station",
    available: true,
    features: ["Helmet Included", "Insurance Covered"],
  },
  {
    id: 2,
    type: "Car",
    model: "Maruti Swift Dzire",
    pricePerDay: "₹1,200",
    seats: 5,
    fuelType: "Petrol",
    image: "/placeholder.svg",
    pickupLocation: "Airport",
    available: true,
    features: ["AC", "GPS Navigation", "Driver Available"],
  },
  {
    id: 3,
    type: "EV",
    model: "Tata Nexon EV",
    pricePerDay: "₹1,800",
    seats: 5,
    fuelType: "Electric",
    image: "/placeholder.svg",
    pickupLocation: "City Center",
    available: true,
    features: ["Zero Emission", "Fast Charging", "Smart Features"],
    isEco: true,
  },
  {
    id: 4,
    type: "Jeep",
    model: "Mahindra Thar",
    pricePerDay: "₹2,500",
    seats: 4,
    fuelType: "Diesel",
    image: "/placeholder.svg",
    pickupLocation: "Adventure Hub",
    available: false,
    features: ["4WD", "Off-road Ready", "Adventure Package"],
  },
  {
    id: 5,
    type: "Accessibility",
    model: "Modified Innova",
    pricePerDay: "₹2,000",
    seats: 6,
    fuelType: "Diesel",
    image: "/placeholder.svg",
    pickupLocation: "Medical Center",
    available: true,
    features: ["Wheelchair Accessible", "Trained Driver", "Medical Kit"],
    isAccessible: true,
  },
];

const getModeIcon = (mode: string) => {
  switch (mode) {
    case "train": return <Train size={20} className="text-primary" />;
    case "bus": return <Bus size={20} className="text-primary" />;
    case "flight": return <Plane size={20} className="text-primary" />;
    default: return <Car size={20} className="text-primary" />;
  }
};

const getVehicleIcon = (type: string) => {
  switch (type) {
    case "Scooter": return <Bike size={20} className="text-primary" />;
    case "EV": return <Zap size={20} className="text-success" />;
    case "Accessibility": return <Accessibility size={20} className="text-accent" />;
    default: return <Car size={20} className="text-primary" />;
  }
};

export default function Transport() {
  const [activeTab, setActiveTab] = useState("long-distance");
  const [searchValue, setSearchValue] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("All");

  const vehicleTypes = ["All", "Scooter", "Car", "EV", "Jeep", "Accessibility"];

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <h1 className="text-2xl font-playfair font-bold text-center mb-4">
          Transport
        </h1>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search routes, vehicles..."
        />
      </div>

      <div className="px-6 mt-6 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
            <TabsTrigger value="long-distance" className="font-medium">Long Distance</TabsTrigger>
            <TabsTrigger value="rentals" className="font-medium">Rentals</TabsTrigger>
          </TabsList>

          <TabsContent value="long-distance" className="space-y-6">
            {/* Mode Tabs */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Travel Mode</h3>
              <div className="flex space-x-2">
                {["train", "bus", "flight"].map((mode) => (
                  <Button key={mode} variant="outline" size="sm" className="flex items-center">
                    {getModeIcon(mode)}
                    <span className="ml-2 capitalize">{mode}s</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Long Distance Options */}
            <div className="space-y-4 mt-6">
              {longDistanceOptions.map((option) => (
                <LuxuryCard key={option.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getModeIcon(option.mode)}
                      <div>
                        <h3 className="font-semibold text-foreground">{option.operator}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{option.from}</span>
                          <ArrowRight size={12} className="mx-2" />
                          <span>{option.to}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">{option.class}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Departure</p>
                      <p className="font-medium text-foreground">{option.departure}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium text-foreground">{option.duration}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Arrival</p>
                      <p className="font-medium text-foreground">{option.arrival}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <IndianRupee size={16} className="text-accent" />
                      <span className="font-bold text-lg text-accent">{option.price}</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary-light">
                      Book Now
                    </Button>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rentals" className="space-y-6">
            {/* Vehicle Type Filters */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Vehicle Type</h3>
              <div className="flex flex-wrap gap-2">
                {vehicleTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedVehicleType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVehicleType(type)}
                    className="text-xs"
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Rental Vehicles */}
            <div className="space-y-4 mt-6">
              {rentalVehicles.map((vehicle) => (
                <LuxuryCard key={vehicle.id} className="p-0 overflow-hidden">
                  <div className="flex">
                    <div className="w-24 h-24 bg-muted flex-shrink-0 relative">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.model}
                        className="w-full h-full object-cover"
                      />
                      {vehicle.isEco && (
                        <Badge className="absolute top-1 left-1 bg-success text-success-foreground text-xs">
                          🌱 Eco
                        </Badge>
                      )}
                      {vehicle.isAccessible && (
                        <Badge className="absolute top-1 left-1 bg-accent text-accent-foreground text-xs">
                          ♿ Accessible
                        </Badge>
                      )}
                      {!vehicle.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Badge variant="destructive" className="text-xs">Unavailable</Badge>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getVehicleIcon(vehicle.type)}
                            <h3 className="font-semibold text-foreground">{vehicle.model}</h3>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-1">
                            <MapPin size={12} className="mr-1" />
                            {vehicle.pickupLocation}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Users size={10} className="mr-1" />
                              {vehicle.seats} seats
                            </div>
                            <div className="flex items-center">
                              {vehicle.fuelType === "Electric" ? (
                                <Battery size={10} className="mr-1" />
                              ) : (
                                <Fuel size={10} className="mr-1" />
                              )}
                              {vehicle.fuelType}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {vehicle.type}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {vehicle.features.slice(0, 2).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                            {feature}
                          </Badge>
                        ))}
                        {vehicle.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-muted">
                            +{vehicle.features.length - 2} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IndianRupee size={16} className="text-accent" />
                          <span className="font-bold text-lg text-accent">{vehicle.pricePerDay}</span>
                          <span className="text-sm text-muted-foreground ml-1">/day</span>
                        </div>
                        <Button 
                          size="sm" 
                          disabled={!vehicle.available}
                          className="bg-primary hover:bg-primary-light"
                        >
                          {vehicle.available ? "Book Now" : "Unavailable"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>

            {/* EV Promotion Banner */}
            <LuxuryCard className="mt-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
              <div className="text-center py-4">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="text-success mr-2" size={24} />
                  <h3 className="font-playfair font-semibold text-foreground">
                    Go Green with EV Rentals
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose electric vehicles for a sustainable travel experience
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-success">Zero</p>
                    <p className="text-xs text-muted-foreground">Emissions</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-success">20%</p>
                    <p className="text-xs text-muted-foreground">Discount</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-success">24/7</p>
                    <p className="text-xs text-muted-foreground">Support</p>
                  </div>
                </div>
              </div>
            </LuxuryCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}