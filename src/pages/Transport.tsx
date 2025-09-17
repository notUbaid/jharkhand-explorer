import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { LanguageToggle } from "@/components/LanguageToggle";
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
  // Electric Vehicles - Priority at Top
  {
    id: 1,
    type: "EV",
    model: "Tata Nexon EV",
    pricePerDay: "₹2,800",
    pricePerHour: "₹500",
    seats: 5,
    fuelType: "Electric",
    image: "/src/assets/rentals/Tata Nexon EV.avif",
    pickupLocation: "EV Hub",
    available: true,
    features: ["Zero Emission", "Fast Charging", "Smart Features"],
    mileage: "312 km/charge",
    engineCapacity: "Electric",
    isEco: true,
  },
  {
    id: 2,
    type: "EV",
    model: "MG ZS EV",
    pricePerDay: "₹3,500",
    pricePerHour: "₹650",
    seats: 5,
    fuelType: "Electric",
    image: "/src/assets/rentals/MG ZS EV.jpg",
    pickupLocation: "Premium EV Hub",
    available: true,
    features: ["Premium EV", "Long Range", "Advanced Tech"],
    mileage: "419 km/charge",
    engineCapacity: "Electric",
    isEco: true,
  },
  {
    id: 3,
    type: "EV Scooter",
    model: "OLA S1 EV",
    pricePerDay: "₹600",
    pricePerHour: "₹110",
    seats: 2,
    fuelType: "Electric",
    image: "/src/assets/rentals/OLA S1 EV.jpg",
    pickupLocation: "Eco Hub",
    available: true,
    features: ["Zero Emission", "Fast Charging", "Smart Features"],
    mileage: "181 km/charge",
    engineCapacity: "Electric",
    isEco: true,
  },
  {
    id: 4,
    type: "EV Scooter",
    model: "Chetak EV",
    pricePerDay: "₹550",
    pricePerHour: "₹100",
    seats: 2,
    fuelType: "Electric",
    image: "/src/assets/rentals/Chetak EV.webp",
    pickupLocation: "Green Zone",
    available: true,
    features: ["Silent Operation", "Low Maintenance", "Eco-Friendly"],
    mileage: "95 km/charge",
    engineCapacity: "Electric",
    isEco: true,
  },

  // Two-Wheelers
  {
    id: 5,
    type: "Scooter",
    model: "Honda Activa 6G",
    pricePerDay: "₹450",
    pricePerHour: "₹80",
    seats: 2,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Honda Activa 6G.avif",
    pickupLocation: "Ranchi Railway Station",
    available: true,
    features: ["Helmet Included", "Insurance Covered", "Easy to Ride"],
    mileage: "60 km/l",
    engineCapacity: "109cc",
  },
  {
    id: 6,
    type: "Scooter",
    model: "Suzuki Access 125",
    pricePerDay: "₹500",
    pricePerHour: "₹90",
    seats: 2,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Suzuki Access 125.avif",
    pickupLocation: "Airport",
    available: true,
    features: ["Digital Display", "Mobile Charging", "Storage Space"],
    mileage: "55 km/l",
    engineCapacity: "124cc",
  },
  {
    id: 7,
    type: "Scooter",
    model: "TVS Jupiter",
    pricePerDay: "₹420",
    pricePerHour: "₹75",
    seats: 2,
    fuelType: "Petrol",
    image: "/src/assets/rentals/TVS Jupiter.avif",
    pickupLocation: "City Center",
    available: true,
    features: ["Comfortable Ride", "Good Mileage", "Reliable"],
    mileage: "58 km/l",
    engineCapacity: "109cc",
  },
  {
    id: 8,
    type: "Motorcycle",
    model: "Hero Splendor Plus",
    pricePerDay: "₹400",
    pricePerHour: "₹70",
    seats: 2,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Hero Splendor Plus.avif",
    pickupLocation: "Budget Hub",
    available: true,
    features: ["Excellent Mileage", "Reliable Engine", "Low Cost"],
    mileage: "70 km/l",
    engineCapacity: "97cc",
  },
  {
    id: 9,
    type: "Motorcycle",
    model: "Bajaj Pulsar 150",
    pricePerDay: "₹650",
    pricePerHour: "₹120",
    seats: 2,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Bajaj Pulsar 150.avif",
    pickupLocation: "Sports Hub",
    available: true,
    features: ["Sporty Design", "Powerful Engine", "Digital Console"],
    mileage: "45 km/l",
    engineCapacity: "149cc",
  },
  {
    id: 10,
    type: "Motorcycle",
    model: "KTM Duke 200",
    pricePerDay: "₹800",
    pricePerHour: "₹150",
    seats: 2,
    fuelType: "Petrol",
    image: "/src/assets/rentals/KTM Duke 200.jpg",
    pickupLocation: "Adventure Zone",
    available: true,
    features: ["Racing DNA", "Advanced Suspension", "Premium Build"],
    mileage: "35 km/l",
    engineCapacity: "199cc",
  },
  {
    id: 11,
    type: "Motorcycle",
    model: "Royal Enfield Classic 350",
    pricePerDay: "₹900",
    pricePerHour: "₹170",
    seats: 2,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Royal Enfield Classic 350.avif",
    pickupLocation: "Heritage Zone",
    available: true,
    features: ["Classic Design", "Thumping Sound", "Comfortable"],
    mileage: "40 km/l",
    engineCapacity: "349cc",
  },

  // Cars - Hatchbacks
  {
    id: 12,
    type: "Car",
    model: "Maruti Swift",
    pricePerDay: "₹1,200",
    pricePerHour: "₹200",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Maruti Swift.avif",
    pickupLocation: "City Center",
    available: true,
    features: ["AC", "Power Steering", "Music System"],
    mileage: "23 km/l",
    engineCapacity: "1197cc",
  },
  {
    id: 13,
    type: "Car",
    model: "Hyundai i20",
    pricePerDay: "₹1,400",
    pricePerHour: "₹250",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Hyundai i20.avif",
    pickupLocation: "Premium Hub",
    available: true,
    features: ["Touchscreen", "Climate Control", "Safety Features"],
    mileage: "20 km/l",
    engineCapacity: "1197cc",
  },
  {
    id: 14,
    type: "Car",
    model: "Tata Tiago",
    pricePerDay: "₹1,100",
    pricePerHour: "₹180",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Tata Tiago.avif",
    pickupLocation: "Budget Center",
    available: true,
    features: ["Good Mileage", "Comfortable", "Value for Money"],
    mileage: "24 km/l",
    engineCapacity: "1199cc",
  },

  // Cars - Sedans
  {
    id: 15,
    type: "Car",
    model: "Honda City",
    pricePerDay: "₹2,000",
    pricePerHour: "₹350",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Honda City.avif",
    pickupLocation: "Executive Hub",
    available: true,
    features: ["Premium Interior", "Sunroof", "Advanced Safety"],
    mileage: "17 km/l",
    engineCapacity: "1498cc",
  },
  {
    id: 16,
    type: "Car",
    model: "Toyota Camry",
    pricePerDay: "₹4,500",
    pricePerHour: "₹800",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Toyota Camry.avif",
    pickupLocation: "Luxury Hub",
    available: true,
    features: ["Luxury Features", "Premium Sound", "Executive Comfort"],
    mileage: "15 km/l",
    engineCapacity: "2487cc",
  },
  {
    id: 17,
    type: "Car",
    model: "Mercedes-Benz C-Class",
    pricePerDay: "₹8,000",
    pricePerHour: "₹1,500",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Mercedes-Benz C-Class.avif",
    pickupLocation: "Ultra Luxury Hub",
    available: true,
    features: ["Luxury Brand", "Premium Features", "Executive Service"],
    mileage: "12 km/l",
    engineCapacity: "1991cc",
  },

  // SUVs
  {
    id: 18,
    type: "SUV",
    model: "Hyundai Creta",
    pricePerDay: "₹2,500",
    pricePerHour: "₹450",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Hyundai Creta.webp",
    pickupLocation: "SUV Hub",
    available: true,
    features: ["High Ground Clearance", "Spacious", "Modern Design"],
    mileage: "16 km/l",
    engineCapacity: "1497cc",
  },
  {
    id: 19,
    type: "SUV",
    model: "Mahindra XUV700",
    pricePerDay: "₹3,000",
    pricePerHour: "₹550",
    seats: 7,
    fuelType: "Diesel",
    image: "/src/assets/rentals/Mahindra XUV700.webp",
    pickupLocation: "Family Hub",
    available: true,
    features: ["7-Seater", "Powerful Engine", "Advanced Tech"],
    mileage: "14 km/l",
    engineCapacity: "2179cc",
  },
  {
    id: 20,
    type: "SUV",
    model: "BMW X1",
    pricePerDay: "₹5,500",
    pricePerHour: "₹1,000",
    seats: 5,
    fuelType: "Petrol",
    image: "/src/assets/rentals/BMW X1.avif",
    pickupLocation: "Premium SUV Hub",
    available: true,
    features: ["Luxury SUV", "Premium Brand", "Advanced Features"],
    mileage: "13 km/l",
    engineCapacity: "1998cc",
  },

  // Off-Road Vehicles
  {
    id: 21,
    type: "Off-Road",
    model: "Mahindra Thar",
    pricePerDay: "₹3,500",
    pricePerHour: "₹650",
    seats: 4,
    fuelType: "Diesel",
    image: "/src/assets/rentals/Mahindra Thar.avif",
    pickupLocation: "Adventure Hub",
    available: true,
    features: ["4WD", "Off-road Ready", "Adventure Package"],
    mileage: "12 km/l",
    engineCapacity: "2179cc",
  },
  {
    id: 22,
    type: "Off-Road",
    model: "Force Gurkha",
    pricePerDay: "₹2,800",
    pricePerHour: "₹500",
    seats: 5,
    fuelType: "Diesel",
    image: "/src/assets/rentals/Force Gurkha.avif",
    pickupLocation: "Rugged Hub",
    available: true,
    features: ["Military Grade", "Extreme Terrain", "Robust Build"],
    mileage: "11 km/l",
    engineCapacity: "2596cc",
  },

  // Commercial Vehicles
  {
    id: 23,
    type: "Commercial",
    model: "Mahindra Bolero",
    pricePerDay: "₹2,200",
    pricePerHour: "₹400",
    seats: 7,
    fuelType: "Diesel",
    image: "/src/assets/rentals/Mahindra Bolero.avif",
    pickupLocation: "Commercial Hub",
    available: true,
    features: ["Rugged", "High Capacity", "Reliable"],
    mileage: "15 km/l",
    engineCapacity: "2523cc",
  },
  {
    id: 24,
    type: "Commercial",
    model: "Maruti Eeco",
    pricePerDay: "₹1,500",
    pricePerHour: "₹250",
    seats: 7,
    fuelType: "Petrol",
    image: "/src/assets/rentals/Maruti Eeco.avif",
    pickupLocation: "Budget Commercial",
    available: true,
    features: ["Spacious", "Economical", "Easy to Drive"],
    mileage: "18 km/l",
    engineCapacity: "1197cc",
  },
  {
    id: 25,
    type: "Commercial",
    model: "Tempo Traveller",
    pricePerDay: "₹3,500",
    pricePerHour: "₹600",
    seats: 12,
    fuelType: "Diesel",
    image: "/src/assets/rentals/Tempo Traveller.webp",
    pickupLocation: "Group Travel Hub",
    available: true,
    features: ["12-Seater", "Group Travel", "Comfortable"],
    mileage: "10 km/l",
    engineCapacity: "2523cc",
  },
  {
    id: 26,
    type: "Commercial",
    model: "Toyota Innova Crysta",
    pricePerDay: "₹3,200",
    pricePerHour: "₹550",
    seats: 7,
    fuelType: "Diesel",
    image: "/src/assets/rentals/Toyota Innova Crysta.jpg",
    pickupLocation: "Family Travel Hub",
    available: true,
    features: ["Premium MPV", "Comfortable", "Reliable"],
    mileage: "13 km/l",
    engineCapacity: "2393cc",
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
    case "EV Scooter": return <Zap size={20} className="text-success" />;
    case "Motorcycle": return <Bike size={20} className="text-primary" />;
    case "Car": return <Car size={20} className="text-primary" />;
    case "SUV": return <Car size={20} className="text-primary" />;
    case "Off-Road": return <Car size={20} className="text-accent" />;
    case "Commercial": return <Car size={20} className="text-primary" />;
    case "EV": return <Zap size={20} className="text-success" />;
    case "Accessibility": return <Accessibility size={20} className="text-accent" />;
    default: return <Car size={20} className="text-primary" />;
  }
};

export default function Transport() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("long-distance");
  const [searchValue, setSearchValue] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("All");

  const vehicleTypes = ["All", "Scooter", "EV Scooter", "Motorcycle", "Car", "SUV", "Off-Road", "Commercial", "EV"];

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-playfair font-bold text-center mb-4">
              {t("transport.title")}
            </h1>
          </div>
          <LanguageToggle />
        </div>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder={t("transport.searchPlaceholder")}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {rentalVehicles.map((vehicle) => (
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
                    {!vehicle.available && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-xs">Unavailable</Badge>
                      </div>
                    )}
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
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Users size={8} className="mr-1" />
                            {vehicle.seats}
                          </div>
                          <div className="flex items-center">
                            {vehicle.fuelType === "Electric" ? (
                              <Battery size={8} className="mr-1" />
                            ) : (
                              <Fuel size={8} className="mr-1" />
                            )}
                            {vehicle.fuelType}
                          </div>
                          <div className="flex items-center">
                            <Clock size={8} className="mr-1" />
                            {vehicle.mileage}
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
                          +{vehicle.features.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <IndianRupee size={14} className="text-accent" />
                          <span className="font-bold text-base text-accent">{vehicle.pricePerDay}</span>
                          <span className="text-xs text-muted-foreground ml-1">/day</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          or {vehicle.pricePerHour}/hr
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!vehicle.available}
                        className="bg-primary hover:bg-primary-light text-xs px-3 py-1"
                      >
                        {vehicle.available ? "Book" : "Unavailable"}
                      </Button>
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