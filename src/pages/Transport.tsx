import { useState, useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { BookingModal } from "@/components/BookingModal";
import { TransportOption, TrainOption, BusOption, FlightOption, City } from "@/types/Transport";
import { getAllTransportRoutes } from "@/data/transportData";
import { useTransportComparison } from "@/contexts/TransportComparisonContext";
import { TransportComparisonModal } from "@/components/TransportComparisonModal";
import { RentalComparisonModal } from "@/components/RentalComparisonModal";
import { BookingItem } from "@/hooks/useBooking";
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
  Calendar,
  Star,
  Heart,
  GitCompare,
  Filter,
  SortAsc,
  SortDesc,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Clock as ClockIcon,
  DollarSign,
  Route,
  Navigation,
  Bookmark,
  History,
  Settings,
  List,
  Grid
} from "lucide-react";

// Combined routes for easy access (will be updated with state)
const longDistanceOptions: TransportOption[] = [];
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
    image: "/assets/rentals/Tata Nexon EV.avif",
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
    image: "/assets/rentals/MG ZS EV.jpg",
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
    image: "/assets/rentals/OLA S1 EV.jpg",
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
    image: "/assets/rentals/Chetak EV.webp",
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
    image: "/assets/rentals/Honda Activa 6G.avif",
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
    image: "/assets/rentals/Suzuki Access 125.avif",
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
    image: "/assets/rentals/TVS Jupiter.avif",
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
    image: "/assets/rentals/Hero Splendor Plus.avif",
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
    image: "/assets/rentals/Bajaj Pulsar 150.avif",
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
    image: "/assets/rentals/KTM Duke 200.jpg",
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
    image: "/assets/rentals/Royal Enfield Classic 350.avif",
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
    image: "/assets/rentals/Maruti Swift.avif",
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
    image: "/assets/rentals/Hyundai i20.avif",
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
    image: "/assets/rentals/Tata Tiago.avif",
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
    image: "/assets/rentals/Honda City.avif",
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
    image: "/assets/rentals/Toyota Camry.avif",
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
    image: "/assets/rentals/Mercedes-Benz C-Class.avif",
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
    image: "/assets/rentals/Hyundai Creta.webp",
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
    image: "/assets/rentals/Mahindra XUV700.webp",
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
    image: "/assets/rentals/BMW X1.avif",
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
    image: "/assets/rentals/Mahindra Thar.avif",
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
    image: "/assets/rentals/Force Gurkha.avif",
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
    image: "/assets/rentals/Mahindra Bolero.avif",
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
    image: "/assets/rentals/Maruti Eeco.avif",
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
    image: "/assets/rentals/Tempo Traveller.webp",
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
    image: "/assets/rentals/Toyota Innova Crysta.jpg",
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
  const { compareItems, addToCompare, removeFromCompare, isInCompare, canAddMore, setOpenCompareModal } = useTransportComparison();
  
  // Rental comparison state
  const [rentalCompareItems, setRentalCompareItems] = useState<typeof rentalVehicles>([]);
  const [openRentalCompareModal, setOpenRentalCompareModal] = useState(false);
  
  // Booking state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof rentalVehicles[0] | null>(null);
  const [rentalType, setRentalType] = useState<'hourly' | 'daily'>('daily');

  const addToRentalCompare = (vehicle: typeof rentalVehicles[0]) => {
    if (rentalCompareItems.length >= 3) {
      return; // Limit to 3 items
    }
    
    if (!rentalCompareItems.find(existing => existing.id === vehicle.id)) {
      setRentalCompareItems(prev => [...prev, vehicle]);
    }
  };

  const removeFromRentalCompare = (id: number) => {
    setRentalCompareItems(prev => prev.filter(item => item.id !== id));
  };

  const isInRentalCompare = (id: number) => {
    return rentalCompareItems.some(item => item.id === id);
  };

  const handleBookVehicle = (vehicle: typeof rentalVehicles[0], type: 'hourly' | 'daily') => {
    setSelectedVehicle(vehicle);
    setRentalType(type);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    console.log('Booking successful:', bookingId);
    // You can add additional success handling here
  };

  const canAddMoreRentals = rentalCompareItems.length < 3;

  // Search suggestions
  const getSearchSuggestions = () => {
    if (!searchValue.trim()) return [];
    
    const suggestions: string[] = [];
    const searchTerm = searchValue.toLowerCase().trim();
    
    // Long distance suggestions
    if (activeTab === "long-distance") {
      // City suggestions
      const cities = [...new Set([
        ...transportData.trainRoutes.map(r => r.from),
        ...transportData.trainRoutes.map(r => r.to),
        ...transportData.busRoutes.map(r => r.from),
        ...transportData.busRoutes.map(r => r.to),
        ...transportData.flightRoutes.map(r => r.from),
        ...transportData.flightRoutes.map(r => r.to)
      ])];
      
      cities.forEach(city => {
        if (city.toLowerCase().includes(searchTerm) && !suggestions.includes(city)) {
          suggestions.push(city);
        }
      });
      
      // Route suggestions
      const routes = [
        ...transportData.trainRoutes.map(r => `${r.from} to ${r.to}`),
        ...transportData.busRoutes.map(r => `${r.from} to ${r.to}`),
        ...transportData.flightRoutes.map(r => `${r.from} to ${r.to}`)
      ];
      
      routes.forEach(route => {
        if (route.toLowerCase().includes(searchTerm) && !suggestions.includes(route)) {
          suggestions.push(route);
        }
      });
      
      // Operator suggestions
      transportData.trainRoutes.forEach(route => {
        const trainOption = route as TrainOption;
        if (trainOption.trainName.toLowerCase().includes(searchTerm) && !suggestions.includes(trainOption.trainName)) {
          suggestions.push(trainOption.trainName);
        }
      });
      
      transportData.busRoutes.forEach(route => {
        const busOption = route as BusOption;
        if (busOption.operator.toLowerCase().includes(searchTerm) && !suggestions.includes(busOption.operator)) {
          suggestions.push(busOption.operator);
        }
      });
      
      transportData.flightRoutes.forEach(route => {
        const flightOption = route as FlightOption;
        if (flightOption.airline.toLowerCase().includes(searchTerm) && !suggestions.includes(flightOption.airline)) {
          suggestions.push(flightOption.airline);
        }
      });
    }
    
    // Rental suggestions
    if (activeTab === "rentals") {
      rentalVehicles.forEach(vehicle => {
        if (vehicle.model.toLowerCase().includes(searchTerm) && !suggestions.includes(vehicle.model)) {
          suggestions.push(vehicle.model);
        }
        if (vehicle.type.toLowerCase().includes(searchTerm) && !suggestions.includes(vehicle.type)) {
          suggestions.push(vehicle.type);
        }
        if (vehicle.pickupLocation.toLowerCase().includes(searchTerm) && !suggestions.includes(vehicle.pickupLocation)) {
          suggestions.push(vehicle.pickupLocation);
        }
        vehicle.features.forEach(feature => {
          if (feature.toLowerCase().includes(searchTerm) && !suggestions.includes(feature)) {
            suggestions.push(feature);
          }
        });
      });
    }
    
    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };
  const [activeTab, setActiveTab] = useState("long-distance");
  const [searchValue, setSearchValue] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState(t("common.all"));
  const [selectedFuelType, setSelectedFuelType] = useState(t("common.all"));
  const [selectedRentalPriceRange, setSelectedRentalPriceRange] = useState(t("common.all"));
  const [selectedMode, setSelectedMode] = useState(t("common.all"));
  const [selectedFromCity, setSelectedFromCity] = useState(t("common.all"));
  const [selectedToCity, setSelectedToCity] = useState(t("common.all"));
  const [selectedPriceRange, setSelectedPriceRange] = useState(t("common.all"));
  const [selectedDuration, setSelectedDuration] = useState(t("common.all"));
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  
  // Pagination and lazy loading states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasLoadedExtended, setHasLoadedExtended] = useState(false);
  
  // Load core data initially
  const coreData = useMemo(() => getAllTransportRoutes(), []);
  const [transportData, setTransportData] = useState(coreData);

  // Lazy load extended data when needed
  const loadExtendedData = useCallback(async () => {
    if (hasLoadedExtended) return;
    
    setIsLoadingMore(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const extendedData = transportData.generateExtendedRoutes();
      setTransportData(prev => ({
        ...prev,
        cities: [...prev.cities, ...transportData.extendedCities],
        trainRoutes: [...prev.trainRoutes, ...extendedData.trainRoutes],
        busRoutes: [...prev.busRoutes, ...extendedData.busRoutes],
        flightRoutes: [...prev.flightRoutes, ...extendedData.flightRoutes]
      }));
      setHasLoadedExtended(true);
    } catch (error) {
      console.error('Error loading extended data:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasLoadedExtended, transportData]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedMode("All");
    setSelectedFromCity("All");
    setSelectedToCity("All");
    setSelectedPriceRange("All");
    setSelectedDuration("All");
    setSortBy("price");
    setSortOrder("asc");
    setSearchValue("");
    setShowAdvancedFilters(false);
    setCurrentPage(1); // Reset to first page
  };

  // Reset rental filters
  const resetRentalFilters = () => {
    setSelectedVehicleType("All");
    setSelectedFuelType("All");
    setSelectedRentalPriceRange("All");
    setSearchValue("");
  };

  // Toggle favorite
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  // Add to recent searches
  const addToRecentSearches = (search: string) => {
    if (search && !recentSearches.includes(search)) {
      setRecentSearches(prev => [search, ...prev.slice(0, 4)]);
    }
  };


  const vehicleTypes = ["All", "Scooter", "EV Scooter", "Motorcycle", "Car", "SUV", "Off-Road", "Commercial", "EV"];
  const modes = ["All", "train", "bus", "flight"];
  const priceRanges = ["All", "Under ₹1K", "₹1K-3K", "₹3K-5K", "Above ₹5K"];
  const durations = ["All", "Under 5h", "5h-10h", "10h-15h", "Above 15h"];
  const sortOptions = ["price", "duration", "departure", "popularity"];

  // Enhanced search functions
  const enhancedSearchLongDistance = (option: TransportOption) => {
    if (!searchValue.trim()) return true;
    
    const searchTerm = searchValue.toLowerCase().trim();
    
    // Basic route search
    const matchesFrom = option.from.toLowerCase().includes(searchTerm);
    const matchesTo = option.to.toLowerCase().includes(searchTerm);
    const matchesRoute = `${option.from} to ${option.to}`.toLowerCase().includes(searchTerm);
    
    // Mode-specific search
    let matchesModeSpecific = false;
    if (option.mode === "train") {
      const trainOption = option as TrainOption;
      matchesModeSpecific = 
        trainOption.trainName.toLowerCase().includes(searchTerm) ||
        trainOption.trainNumber.toLowerCase().includes(searchTerm) ||
        trainOption.classes.some(cls => cls.class.toLowerCase().includes(searchTerm));
    } else if (option.mode === "bus") {
      const busOption = option as BusOption;
      matchesModeSpecific = 
        busOption.operator.toLowerCase().includes(searchTerm) ||
        busOption.busType.toLowerCase().includes(searchTerm) ||
        busOption.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm));
    } else if (option.mode === "flight") {
      const flightOption = option as FlightOption;
      matchesModeSpecific = 
        flightOption.airline.toLowerCase().includes(searchTerm) ||
        flightOption.aircraft.toLowerCase().includes(searchTerm) ||
        flightOption.amenities.some(amenity => amenity.toLowerCase().includes(searchTerm));
    }
    
    // Duration and price search
    const matchesDuration = option.duration.toLowerCase().includes(searchTerm);
    let matchesPrice = false;
    if (option.mode === "train") {
      const trainOption = option as TrainOption;
      matchesPrice = trainOption.classes.some(cls => cls.price.toLowerCase().includes(searchTerm));
    } else if (option.mode === "bus") {
      matchesPrice = (option as BusOption).price.toLowerCase().includes(searchTerm);
    } else if (option.mode === "flight") {
      matchesPrice = (option as FlightOption).price.toLowerCase().includes(searchTerm);
    }
    
    return matchesFrom || matchesTo || matchesRoute || matchesModeSpecific || matchesDuration || matchesPrice;
  };

  const enhancedSearchRentals = (vehicle: typeof rentalVehicles[0]) => {
    if (!searchValue.trim()) return true;
    
    const searchTerm = searchValue.toLowerCase().trim();
    
    // Basic vehicle search
    const matchesModel = vehicle.model.toLowerCase().includes(searchTerm);
    const matchesType = vehicle.type.toLowerCase().includes(searchTerm);
    const matchesLocation = vehicle.pickupLocation.toLowerCase().includes(searchTerm);
    
    // Feature search
    const matchesFeatures = vehicle.features.some((feature: string) => 
      feature.toLowerCase().includes(searchTerm)
    );
    
    // Fuel type and specs search
    const matchesFuelType = vehicle.fuelType.toLowerCase().includes(searchTerm);
    const matchesEngine = vehicle.engineCapacity.toLowerCase().includes(searchTerm);
    const matchesMileage = vehicle.mileage.toLowerCase().includes(searchTerm);
    
    // Price search
    const matchesPricePerDay = vehicle.pricePerDay.toLowerCase().includes(searchTerm);
    const matchesPricePerHour = vehicle.pricePerHour.toLowerCase().includes(searchTerm);
    
    // Availability search
    const matchesAvailability = vehicle.available ? 
      (searchTerm.includes('available') || searchTerm.includes('book')) : 
      (searchTerm.includes('unavailable') || searchTerm.includes('booked'));
    
    return matchesModel || matchesType || matchesLocation || matchesFeatures || 
           matchesFuelType || matchesEngine || matchesMileage || 
           matchesPricePerDay || matchesPricePerHour || matchesAvailability;
  };

  // Filter rental vehicles
  const filteredRentalVehicles = rentalVehicles.filter(vehicle => {
    const matchesVehicleType = selectedVehicleType === "All" || vehicle.type === selectedVehicleType;
    const matchesFuelType = selectedFuelType === "All" || vehicle.fuelType === selectedFuelType;
    const matchesSearch = enhancedSearchRentals(vehicle);
    
    // Price range filtering for rentals
    const vehiclePrice = parseInt(vehicle.pricePerDay.replace(/[₹,]/g, "")) || 0;
    const matchesPriceRange = selectedRentalPriceRange === "All" ||
      (selectedRentalPriceRange === "Under ₹1K" && vehiclePrice < 1000) ||
      (selectedRentalPriceRange === "₹1K-3K" && vehiclePrice >= 1000 && vehiclePrice <= 3000) ||
      (selectedRentalPriceRange === "₹3K-5K" && vehiclePrice > 3000 && vehiclePrice <= 5000) ||
      (selectedRentalPriceRange === "Above ₹5K" && vehiclePrice > 5000);
    
    return matchesVehicleType && matchesFuelType && matchesSearch && matchesPriceRange;
  });

  // Get current routes from state
  const currentRoutes = [...transportData.trainRoutes, ...transportData.busRoutes, ...transportData.flightRoutes];
  
  // Filter long distance options
  const filteredLongDistanceOptions = currentRoutes.filter(option => {
    // Enhanced search filter
    const matchesSearch = enhancedSearchLongDistance(option);
    
    // Mode filter
    const matchesMode = selectedMode === "All" || option.mode === selectedMode;
    
    // City filters - exact match required
    const matchesFromCity = selectedFromCity === "All" || option.from === selectedFromCity;
    const matchesToCity = selectedToCity === "All" || option.to === selectedToCity;
    
    // Price filter
    let optionPrice = "₹0";
    if (option.mode === "train") {
      const trainOption = option as TrainOption;
      optionPrice = trainOption.classes[0]?.price || "₹0";
    } else if (option.mode === "bus") {
      optionPrice = (option as BusOption).price;
    } else if (option.mode === "flight") {
      optionPrice = (option as FlightOption).price;
    }
    
    const priceValue = parseInt(optionPrice.replace(/[₹,]/g, "")) || 0;
    const matchesPriceRange = selectedPriceRange === t("common.all") ||
      (selectedPriceRange === "Under ₹1K" && priceValue < 1000) ||
      (selectedPriceRange === "₹1K-3K" && priceValue >= 1000 && priceValue <= 3000) ||
      (selectedPriceRange === "₹3K-5K" && priceValue > 3000 && priceValue <= 5000) ||
      (selectedPriceRange === "Above ₹5K" && priceValue > 5000);
    
    // Duration filter
    const durationHours = parseInt(option.duration.split("h")[0]) || 0;
    const matchesDuration = selectedDuration === t("common.all") ||
      (selectedDuration === "Under 5h" && durationHours < 5) ||
      (selectedDuration === "5h-10h" && durationHours >= 5 && durationHours <= 10) ||
      (selectedDuration === "10h-15h" && durationHours > 10 && durationHours <= 15) ||
      (selectedDuration === "Above 15h" && durationHours > 15);


    return matchesSearch && matchesMode && matchesFromCity && matchesToCity && matchesPriceRange && matchesDuration;
  });

  // Sort options
  const sortedOptions = [...filteredLongDistanceOptions].sort((a, b) => {
    // Get price based on transport mode
    let aPrice = "₹0";
    let bPrice = "₹0";

    if (a.mode === "train") {
      aPrice = (a as TrainOption).classes[0]?.price || "₹0";
    } else if (a.mode === "bus") {
      aPrice = (a as BusOption).price;
    } else if (a.mode === "flight") {
      aPrice = (a as FlightOption).price;
    }

    if (b.mode === "train") {
      bPrice = (b as TrainOption).classes[0]?.price || "₹0";
    } else if (b.mode === "bus") {
      bPrice = (b as BusOption).price;
    } else if (b.mode === "flight") {
      bPrice = (b as FlightOption).price;
    }

    let result = 0;
    switch (sortBy) {
      case "price": {
        result = parseInt(aPrice.replace(/[₹,]/g, "")) - parseInt(bPrice.replace(/[₹,]/g, ""));
        break;
      }
      case "duration": {
        const aDuration = parseInt(a.duration.split("h")[0]) || 0;
        const bDuration = parseInt(b.duration.split("h")[0]) || 0;
        result = aDuration - bDuration;
        break;
      }
      case "departure": {
        result = a.departure.localeCompare(b.departure);
        break;
      }
      case "popularity": {
        result = Math.random() - 0.5; // Random for demo
        break;
      }
      default: {
        result = 0;
        break;
      }
    }
    return sortOrder === "desc" ? -result : result;
  });

  // Pagination
  const totalPages = Math.ceil(sortedOptions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOptions = sortedOptions.slice(startIndex, endIndex);

  // Get unique cities for filters
  const fromCities = ["All", ...new Set(currentRoutes.map(option => option.from))];
  const toCities = ["All", ...new Set(currentRoutes.map(option => option.to))];

  // Filter cities based on selected from city for better UX
  const filteredToCities = selectedFromCity === "All"
    ? toCities
    : ["All", ...new Set(currentRoutes
        .filter(option => option.from === selectedFromCity)
        .map(option => option.to))];


  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMode, selectedFromCity, selectedToCity, selectedPriceRange, selectedDuration, sortBy, sortOrder, searchValue]);

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-playfair font-bold text-center mb-2">
              {t("transport.title")}
            </h1>
            <p className="text-center text-primary-foreground/80 text-sm">
              Find the perfect way to travel across India
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              {viewMode === "grid" ? <List size={16} /> : <Grid size={16} />}
            </Button>
            <div className="flex gap-2">
              <LanguageToggle />
              <DarkModeToggle />
            </div>
          </div>
        </div>
        
        {/* Enhanced Search Bar */}
        <div className="relative">
          <SearchBar 
            value={searchValue}
            onChange={(value) => {
              setSearchValue(value);
              addToRecentSearches(value);
            }}
            placeholder="Search destinations, routes, operators, train numbers, airlines, amenities..."
          />
          
          {/* Recent Searches Dropdown */}
          {recentSearches.length > 0 && searchValue === "" && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50">
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-2 flex items-center">
                  <History size={12} className="mr-1" />
                  Recent Searches
                </p>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchValue(search)}
                    className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded flex items-center"
                  >
                    <Search size={12} className="mr-2 text-muted-foreground" />
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Search Suggestions Dropdown */}
          {searchValue.trim() && getSearchSuggestions().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-lg shadow-lg z-50">
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-2 flex items-center">
                  <Search size={12} className="mr-1" />
                  Suggestions
                </p>
                <div className="space-y-1">
                  {getSearchSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchValue(suggestion);
                        addToRecentSearches(suggestion);
                      }}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded text-foreground"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="px-6 mt-6 pb-32 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted">
            <TabsTrigger value="long-distance" className="font-medium">Long Distance</TabsTrigger>
            <TabsTrigger value="rentals" className="font-medium">Rentals</TabsTrigger>
          </TabsList>

          <TabsContent value="long-distance" className="space-y-6">
            {/* Popular Routes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground flex items-center">
                  <TrendingUp size={16} className="mr-2" />
                  Popular Routes
                </h3>
                <Badge variant="secondary" className="text-xs">
                  Most Booked
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {transportData.popularRoutes.slice(0, 8).map((route, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedFromCity(route.from);
                      setSelectedToCity(route.to);
                      setSelectedMode(route.mode);
                    }}
                    className="h-auto p-3 flex flex-col items-center text-xs hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      {getModeIcon(route.mode)}
                      <span className="font-medium">{route.from}</span>
                      <ArrowRight size={10} />
                      <span className="font-medium">{route.to}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={10} className="text-yellow-500" />
                      <span className="text-muted-foreground">{route.popularity}%</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>


            {/* Advanced Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-xs"
                >
                  {showAdvancedFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {showAdvancedFilters ? "Hide" : "Show"} Filters
                </Button>
              </div>
              
              {showAdvancedFilters && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                  {/* Mode Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Travel Mode</label>
                    <div className="flex flex-wrap gap-2">
                      {modes.map((mode) => (
                        <Button
                          key={mode}
                          variant={selectedMode === mode ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedMode(mode)}
                          className="text-xs"
                        >
                          {mode !== "All" && getModeIcon(mode)}
                          <span className={mode !== "All" ? "ml-2" : ""}>{mode === "All" ? "All Modes" : mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* City Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">From City</label>
                      <select
                        value={selectedFromCity}
                        onChange={(e) => {
                          setSelectedFromCity(e.target.value);
                          setSelectedToCity("All"); // Reset to city when from city changes
                        }}
                        className="w-full p-2 border rounded-md bg-background text-foreground"
                      >
                        {fromCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">To City</label>
                      <select
                        value={selectedToCity}
                        onChange={(e) => setSelectedToCity(e.target.value)}
                        className="w-full p-2 border rounded-md bg-background text-foreground"
                      >
                        {filteredToCities.map((city) => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Price and Duration Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Price Range</label>
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((range) => (
                          <Button
                            key={range}
                            variant={selectedPriceRange === range ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedPriceRange(range)}
                            className="text-xs"
                          >
                            {range}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">Duration</label>
                      <div className="flex flex-wrap gap-2">
                        {durations.map((duration) => (
                          <Button
                            key={duration}
                            variant={selectedDuration === duration ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedDuration(duration)}
                            className="text-xs"
                          >
                            {duration}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Sort By</label>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => (
                        <Button
                          key={option}
                          variant={sortBy === option ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSortBy(option)}
                          className="text-xs"
                        >
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </Button>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                        className="text-xs"
                        title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
                      >
                        {sortOrder === "asc" ? <SortAsc size={12} /> : <SortDesc size={12} />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  {sortedOptions.length} routes found
                </p>
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    <Heart size={10} className="mr-1 text-red-500" />
                    {favorites.length} favorites
                  </Badge>
                )}
                {compareItems.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setOpenCompareModal(true)}
                    className="text-xs h-6 px-2"
                  >
                    <Star size={10} className="mr-1" />
                    Compare ({compareItems.length})
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="text-xs"
                >
                  <X size={12} className="mr-1" />
                  Clear Filters
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="text-xs"
                >
                  {viewMode === "grid" ? <List size={12} /> : <Grid size={12} />}
                  {viewMode === "grid" ? "List" : "Grid"}
                </Button>
              </div>
            </div>

            {/* Long Distance Options */}
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
              {paginatedOptions.length > 0 ? (
                paginatedOptions.map((option) => (
                  <LuxuryCard key={option.id} className={`${viewMode === "list" ? "p-4" : "p-4"} hover:shadow-lg transition-shadow`}>
                    <div className={`${viewMode === "list" ? "flex items-center justify-between mb-3" : "space-y-3"}`}>
                      <div className={`${viewMode === "list" ? "flex items-center space-x-3" : "flex items-center space-x-3"}`}>
                        {getModeIcon(option.mode)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {option.mode === "train" ? (option as TrainOption).trainName :
                             option.mode === "bus" ? (option as BusOption).operator :
                             option.mode === "flight" ? (option as FlightOption).airline : ""}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <span>{option.from}</span>
                            <ArrowRight size={12} className="mx-2" />
                            <span>{option.to}</span>
                            {option.mode === "train" && (
                              <span className="ml-2 text-xs">({(option as TrainOption).trainNumber})</span>
                            )}
                            {option.mode === "flight" && (
                              <span className="ml-2 text-xs">({(option as FlightOption).flightNumber})</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={`${viewMode === "list" ? "flex items-center gap-2" : "flex items-center gap-2 mt-2"}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFavorite(option.id)}
                          className="p-1 h-auto"
                        >
                          <Heart 
                            size={16} 
                            className={favorites.includes(option.id) ? "text-red-500 fill-red-500" : "text-muted-foreground"} 
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (isInCompare(option.id)) {
                              removeFromCompare(option.id);
                            } else if (canAddMore) {
                              addToCompare(option);
                            }
                          }}
                          className={`p-1 h-auto ${isInCompare(option.id) ? "text-primary" : "text-muted-foreground"} ${!canAddMore && !isInCompare(option.id) ? "opacity-50 cursor-not-allowed" : ""}`}
                          disabled={!canAddMore && !isInCompare(option.id)}
                          title={isInCompare(option.id) ? "Remove from compare" : canAddMore ? "Add to compare" : "Compare limit reached (3 max)"}
                        >
                          <Star 
                            size={16} 
                            className={isInCompare(option.id) ? "fill-primary" : ""} 
                          />
                        </Button>
                        <div className="flex flex-col items-end space-y-1">
                          {option.mode === "train" && (option as TrainOption).classes[0] && (
                            <Badge variant="outline">{(option as TrainOption).classes[0].class}</Badge>
                          )}
                          {option.mode === "bus" && (
                            <Badge variant="outline">{(option as BusOption).busType}</Badge>
                          )}
                          {option.mode === "flight" && (
                            <Badge variant="outline">{(option as FlightOption).aircraft}</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Distance</p>
                        <p className="font-medium text-foreground">{option.distance}</p>
                      </div>
                    </div>

                    {/* Amenities */}
                    {option.amenities && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {option.amenities.map((amenity, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Days */}
                    {option.days && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Available Days:</p>
                        <div className="flex flex-wrap gap-1">
                          {option.days.map((day, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {day}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Route */}
                    {option.route && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Route:</p>
                        <p className="text-sm text-foreground">{option.route}</p>
                      </div>
                    )}

                    {/* Classes for trains */}
                    {option.mode === "train" && (option as TrainOption).classes && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-2">Available Classes:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {(option as TrainOption).classes.map((cls, index) => (
                            <div key={index} className="text-center p-2 bg-muted rounded">
                              <p className="text-xs font-medium">{cls.class}</p>
                              <p className="text-xs text-accent">{cls.price}</p>
                              <p className="text-xs text-muted-foreground">{cls.availability}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-2 bg-muted rounded">
                        <p className="text-xs text-muted-foreground">Stops</p>
                        <p className="text-sm font-medium">{option.stops}</p>
                      </div>
                      {option.mode === "bus" && (option as BusOption).luggage && (
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="text-xs text-muted-foreground">Luggage</p>
                          <p className="text-sm font-medium">{(option as BusOption).luggage}</p>
                        </div>
                      )}
                      {option.mode === "flight" && (option as FlightOption).baggage && (
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="text-xs text-muted-foreground">Baggage</p>
                          <p className="text-sm font-medium">{(option as FlightOption).baggage}</p>
                        </div>
                      )}
                      {option.mode === "train" && (option as TrainOption).meals && (
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="text-xs text-muted-foreground">Meals</p>
                          <p className="text-sm font-medium">{(option as TrainOption).meals}</p>
                        </div>
                      )}
                      {(option.mode === "bus" || option.mode === "flight") && (
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="text-xs text-muted-foreground">Boarding</p>
                          <p className="text-sm font-medium">
                            {option.mode === "bus" ? (option as BusOption).boarding : (option as FlightOption).boarding}
                          </p>
                        </div>
                      )}
                      {(option.mode === "bus" || option.mode === "flight") && (
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="text-xs text-muted-foreground">Drop-off</p>
                          <p className="text-sm font-medium">
                            {option.mode === "bus" ? (option as BusOption).dropoff : (option as FlightOption).dropoff}
                          </p>
                        </div>
                      )}
                      {option.mode === "flight" && (option as FlightOption).terminal && (
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="text-xs text-muted-foreground">Terminal</p>
                          <p className="text-sm font-medium">{(option as FlightOption).terminal}</p>
                        </div>
                      )}
                      {option.mode === "flight" && (option as FlightOption).gate && (
                        <div className="text-center p-2 bg-muted rounded">
                          <p className="text-xs text-muted-foreground">Gate</p>
                          <p className="text-sm font-medium">{(option as FlightOption).gate}</p>
                        </div>
                      )}
                    </div>

                    {/* Cancellation Policy */}
                    {option.cancellation && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Cancellation Policy:</p>
                        <p className="text-sm text-foreground">{option.cancellation}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IndianRupee size={16} className="text-accent" />
                        <span className="font-bold text-lg text-accent">
                          {option.mode === "train" ? (option as TrainOption).classes[0]?.price || "₹0" :
                           option.mode === "bus" ? (option as BusOption).price :
                           option.mode === "flight" ? (option as FlightOption).price : "₹0"}
                        </span>
                        <span className="text-sm text-muted-foreground ml-1">
                          {option.mode === "flight" ? "per person" : "per ticket"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Add to favorites or show details
                            toggleFavorite(option.id);
                          }}
                          className="text-xs"
                        >
                          <Bookmark size={12} className="mr-1" />
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-primary hover:bg-primary-light text-xs px-4"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </LuxuryCard>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No routes found matching your criteria.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={resetFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {sortedOptions.length > itemsPerPage && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedOptions.length)} of {sortedOptions.length} routes
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Load More Button for Extended Data */}
            {!hasLoadedExtended && !isLoadingMore && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={loadExtendedData}
                  className="px-6"
                >
                  Load More Cities & Routes
                </Button>
              </div>
            )}

            {/* Loading State */}
            {isLoadingMore && (
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Loading more routes...
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rentals" className="space-y-6">
            {/* Search Bar for Rentals */}
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Search Vehicles</h3>
              <SearchBar
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search by vehicle model, type, features, fuel type, location, price..."
                className="w-full"
              />
            </div>

            {/* Vehicle Type Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground">Vehicle Type</h3>
                <Badge variant="secondary" className="text-xs">
                  {filteredRentalVehicles.length} vehicles available
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {vehicleTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedVehicleType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVehicleType(type)}
                    className="text-xs"
                  >
                    {getVehicleIcon(type)}
                    <span className="ml-1">{type}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Additional Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fuel Type Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Fuel Type</label>
                <div className="flex flex-wrap gap-2">
                  {["All", "Electric", "Petrol", "Diesel"].map((fuel) => (
                    <Button
                      key={fuel}
                      variant={selectedFuelType === fuel ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedFuelType(fuel)}
                      className="text-xs"
                    >
                      {fuel === "Electric" && "⚡"}
                      {fuel === "Petrol" && "⛽"}
                      {fuel === "Diesel" && "🛢️"}
                      <span className={fuel !== "All" ? "ml-1" : ""}>{fuel}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Price Range (per day)</label>
                <div className="flex flex-wrap gap-2">
                  {["All", "Under ₹1K", "₹1K-3K", "₹3K-5K", "Above ₹5K"].map((range) => (
                    <Button
                      key={range}
                      variant={selectedRentalPriceRange === range ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRentalPriceRange(range)}
                      className="text-xs"
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats for Rentals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-lg font-bold text-primary">{filteredRentalVehicles.filter(v => v.isEco).length}</p>
                <p className="text-xs text-muted-foreground">Eco Vehicles</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-lg font-bold text-primary">{filteredRentalVehicles.filter(v => v.available).length}</p>
                <p className="text-xs text-muted-foreground">Available Now</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-lg font-bold text-primary">{filteredRentalVehicles.filter(v => v.type.includes("EV")).length}</p>
                <p className="text-xs text-muted-foreground">Electric</p>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <p className="text-lg font-bold text-primary">24/7</p>
                <p className="text-xs text-muted-foreground">Support</p>
              </div>
            </div>

            {/* Rental Vehicles */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Available Vehicles
              </h3>
              {rentalCompareItems.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setOpenRentalCompareModal(true)}
                  className="text-xs h-6 px-2"
                >
                  <GitCompare size={10} className="mr-1" />
                  Compare ({rentalCompareItems.length})
                </Button>
              )}
            </div>
            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6" : "space-y-4 mt-6"}>
              {filteredRentalVehicles.length > 0 ? (
                filteredRentalVehicles.map((vehicle) => (
                <LuxuryCard key={vehicle.id} className={`${viewMode === "list" ? "p-4" : "p-0"} overflow-hidden`}>
                  <div className={`${viewMode === "list" ? "flex items-center space-x-4" : "relative"}`}>
                    <div className={`${viewMode === "list" ? "w-32 h-20 flex-shrink-0" : "aspect-[3/2]"} bg-muted ${viewMode === "list" ? "rounded-lg" : ""}`}>
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.model}
                        className={`w-full h-full object-contain object-center ${viewMode === "list" ? "rounded-lg" : ""}`}
                      />
                    </div>
                    
                    {vehicle.isEco && (
                      <Badge className={`${viewMode === "list" ? "absolute top-2 left-2" : "absolute top-2 left-2"} bg-success text-success-foreground text-xs`}>
                        🌱 Eco
                      </Badge>
                    )}
                    {!vehicle.available && (
                      <div className={`${viewMode === "list" ? "absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg" : "absolute inset-0 bg-black/50 flex items-center justify-center"}`}>
                        <Badge variant="destructive" className="text-xs">Unavailable</Badge>
                      </div>
                    )}

                    {/* Compare Button */}
                    <div className={`${viewMode === "list" ? "absolute top-2 right-2" : "absolute top-2 right-2"} flex gap-1`}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isInRentalCompare(vehicle.id)) {
                            removeFromRentalCompare(vehicle.id);
                          } else {
                            addToRentalCompare(vehicle);
                          }
                        }}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all bg-white/20 text-white hover:bg-white/30 ${isInRentalCompare(vehicle.id) ? "bg-primary/80" : ""}`}
                        disabled={!canAddMoreRentals && !isInRentalCompare(vehicle.id)}
                        title={isInRentalCompare(vehicle.id) ? "Remove from compare" : canAddMoreRentals ? "Add to compare" : "Compare limit reached (3 max)"}
                      >
                        <GitCompare 
                          size={14} 
                          className={isInRentalCompare(vehicle.id) ? "fill-white" : ""} 
                        />
                      </button>
                    </div>
                  </div>
                  
                  <div className={`${viewMode === "list" ? "flex-1" : "p-4"}`}>
                    <div className={`${viewMode === "list" ? "flex items-center justify-between" : "flex items-start justify-between mb-2"}`}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getVehicleIcon(vehicle.type)}
                          <h3 className="font-semibold text-foreground text-sm">{vehicle.model}</h3>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <MapPin size={10} className="mr-1" />
                          {vehicle.pickupLocation}
                        </div>
                        <div className={`${viewMode === "list" ? "flex items-center gap-4" : "flex items-center gap-2"} text-xs text-muted-foreground`}>
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

                    <div className={`${viewMode === "list" ? "flex items-center justify-between" : "flex items-center justify-between"}`}>
                      <div className={`${viewMode === "list" ? "flex items-center space-x-4" : "flex flex-col"}`}>
                        <div className="flex items-center">
                          <IndianRupee size={14} className="text-accent" />
                          <span className="font-bold text-base text-accent">{vehicle.pricePerDay}</span>
                          <span className="text-xs text-muted-foreground ml-1">/day</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          or {vehicle.pricePerHour}/hr
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          disabled={!vehicle.available}
                          className="bg-primary hover:bg-primary-light text-xs px-2 py-1"
                          onClick={() => handleBookVehicle(vehicle, 'daily')}
                        >
                          Book Daily
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          disabled={!vehicle.available}
                          className="text-xs px-2 py-1"
                          onClick={() => handleBookVehicle(vehicle, 'hourly')}
                        >
                          Book Hourly
                        </Button>
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
              ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground mb-4">No vehicles found matching your criteria.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetRentalFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
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
      
      {/* Transport Comparison Modal */}
      <TransportComparisonModal />
      
      {/* Rental Comparison Modal */}
      <RentalComparisonModal 
        compareItems={rentalCompareItems}
        removeFromCompare={removeFromRentalCompare}
        clearCompare={() => setRentalCompareItems([])}
        openCompareModal={openRentalCompareModal}
        setOpenCompareModal={setOpenRentalCompareModal}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bookingItems={selectedVehicle ? [{
          id: selectedVehicle.id.toString(),
          type: 'rental',
          title: `${selectedVehicle.model} (${selectedVehicle.type})`,
          price: rentalType === 'daily' 
            ? parseFloat(selectedVehicle.pricePerDay.replace(/[₹,]/g, ''))
            : parseFloat(selectedVehicle.pricePerHour.replace(/[₹,]/g, '')),
          quantity: 1,
          duration: rentalType === 'daily' ? '1 Day' : '1 Hour',
          location: selectedVehicle.pickupLocation,
          image: selectedVehicle.image,
          metadata: {
            vehicleType: selectedVehicle.type,
            seats: selectedVehicle.seats,
            fuelType: selectedVehicle.fuelType,
            mileage: selectedVehicle.mileage,
            features: selectedVehicle.features,
            rentalType: rentalType,
            pricePerDay: selectedVehicle.pricePerDay,
            pricePerHour: selectedVehicle.pricePerHour
          }
        }] : []}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}
