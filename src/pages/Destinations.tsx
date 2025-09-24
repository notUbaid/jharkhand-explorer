import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useFavorites } from "@/contexts/FavoritesContext";
import { destinations } from "@/data/destinations";
import { 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Phone, 
  IndianRupee,
  Navigation,
  Eye,
  Heart,
  Ticket,
  Accessibility,
  Camera,
  Mountain,
  Building2,
  Church,
  Palette,
  Zap,
  Pickaxe,
  Utensils
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const categoryIcons = {
  Nature: Mountain,
  Historic: Building2,
  Religious: Church,
  Cultural: Palette,
  Adventure: Zap,
  Mining: Pickaxe,
};

// Coordinates for destinations (approximate)
const destinationCoordinates: Record<string, {lat: number, lng: number}> = {
  "Betla National Park": { lat: 23.8856, lng: 84.1924 },
  "Netarhat": { lat: 23.4973, lng: 84.2623 },
  "Patratu Valley": { lat: 23.5747, lng: 85.2732 },
  "Hundru Falls": { lat: 23.4510, lng: 85.6675 },
  "Lodh Falls": { lat: 23.4000, lng: 85.3000 },
  "Topchanchi Lake": { lat: 23.8000, lng: 86.2000 },
  "Maithon Dam": { lat: 23.7667, lng: 86.7833 },
  "Usri Falls": { lat: 24.1833, lng: 86.3167 },
  "Palamu Fort": { lat: 23.8833, lng: 84.1833 },
  "Rock Garden (Ranchi)": { lat: 23.3441, lng: 85.3096 },
  "Jubilee Park": { lat: 22.8046, lng: 86.2029 },
  "Baba Baidyanath Temple": { lat: 24.4833, lng: 86.7000 },
  "Parasnath Hills / Shikharji": { lat: 23.9500, lng: 86.1167 },
  "Rajrappa Temple (Chhinnamastika Temple)": { lat: 23.6333, lng: 85.7167 },
  "Trikut Hills": { lat: 24.4833, lng: 86.7000 },
  "Dassam Falls": { lat: 23.3833, lng: 85.3167 },
  "Jonha Falls (Gautamdhara)": { lat: 23.3500, lng: 85.3000 },
  "Jharia Coalfields": { lat: 23.7500, lng: 86.4167 },
  "North Urimari Coal Mines": { lat: 23.8000, lng: 86.4000 },
  "Chutupalu Valley": { lat: 23.5000, lng: 85.2000 },
  "Tagore Hill": { lat: 23.3441, lng: 85.3096 },
  "Dimna Lake": { lat: 22.8046, lng: 86.2029 },
  // Additional cities and locations
  "Jagannath Temple": { lat: 23.3441, lng: 85.3096 },
  "Ranchi": { lat: 23.3441, lng: 85.3096 },
  "Jamshedpur": { lat: 22.8046, lng: 86.2029 },
  "Bokaro": { lat: 23.6693, lng: 86.1511 },
  "Dhanbad": { lat: 23.7957, lng: 86.4304 },
  "Giridih": { lat: 24.1833, lng: 86.3167 },
  "Dumka": { lat: 24.2667, lng: 87.2500 },
  "Pakur": { lat: 24.6333, lng: 87.8500 },
  "Godda": { lat: 24.8167, lng: 87.2167 },
  "Sahebganj": { lat: 25.2500, lng: 87.6500 },
  "Chatra": { lat: 24.2167, lng: 84.8667 },
  "Koderma": { lat: 24.4667, lng: 85.5167 },
  "Latehar": { lat: 23.7500, lng: 84.5000 },
  "Lohardaga": { lat: 23.4333, lng: 84.6833 },
  "Palamu": { lat: 23.8833, lng: 84.1833 },
  "Ramgarh": { lat: 23.6333, lng: 85.5167 },
  "Simdega": { lat: 22.6167, lng: 84.5167 },
  "West Singhbhum": { lat: 22.2500, lng: 85.3833 },
  "East Singhbhum": { lat: 22.8046, lng: 86.2029 },
  "Seraikela Kharsawan": { lat: 22.7167, lng: 85.9333 },
  "Khunti": { lat: 23.0833, lng: 85.2833 },
  "Gumla": { lat: 23.0500, lng: 84.5500 }
};


const restaurants = [
  {
    id: "rest02",
    name: "Mocha Café & Bar",
    location: "Lalpur, Ranchi",
    category: "Premium",
    rating: 4.9,
    image: "/src/assets/Food & Dining/[(Mocha Café-Bar)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Mocha Café-Bar)1].jpg",
      "/src/assets/Food & Dining/[(Mocha Café-Bar)2].jpg",
      "/src/assets/Food & Dining/[(Mocha Café-Bar)2](1).jpg"
    ],
    isHiddenGem: false,
    description: "Famous for desserts, continental, and coffee with great evening ambience & rooftop seating",
    priceRange: "~₹1,800 for two",
    cuisine: "Continental, Lebanese, Desserts, Coffee",
    contact: "+91 85398 10606",
    address: "501 A & B, 6th Floor, H-Square Building, Lalpur, Ranchi, Jharkhand 834001",
    tags: ["Non-veg", "Veg", "Premium", "Café / Bar", "Ambience"],
    goodToKnow: "Famous for desserts, continental, and coffee; Great evening ambience & rooftop seating; Live music nights occasionally",
    timings: "12:00 PM – 11:30 PM"
  },
  {
    id: "rest03",
    name: "Jashn The Restaurant",
    location: "Lalpur / Purulia Road, Ranchi",
    category: "Budget",
    rating: 4.4,
    image: "/src/assets/Food & Dining/[(Jashn the Restaurant)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Jashn the Restaurant)1].jpg",
      "/src/assets/Food & Dining/[(Jashn the Restaurant)2].jpg",
      "/src/assets/Food & Dining/[(Jashn the Resturant)3].jpg"
    ],
    isHiddenGem: false,
    description: "Great for North Indian, Chinese & biryani with rooftop seating & parking available",
    priceRange: "~₹500 for two",
    cuisine: "North Indian, Chinese, Biryani",
    contact: "+91 62035 31174",
    address: "Near Albert Compound, Purulia Road, Lalpur, Ranchi (near Kashyap Eye Hospital)",
    tags: ["Veg", "Non-veg", "Budget-Mid", "Family Friendly", "Rooftop Seating"],
    goodToKnow: "Great for North Indian, Chinese & biryani; Rooftop seating & parking available; Popular for group/family meals",
    timings: "11:30 AM – 11:00 PM"
  },
  {
    id: "rest04",
    name: "Barbeque Nation",
    location: "Circular Road / Lalpur, Ranchi",
    category: "Premium",
    rating: 4.4,
    image: "/src/assets/Food & Dining/[(Barbeque Nation)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Barbeque Nation)1].jpg",
      "/src/assets/Food & Dining/[(Barbeque Nation)2].jpg",
      "/src/assets/Food & Dining/[(Barbeque Nation)3].jpg"
    ],
    isHiddenGem: false,
    description: "Classic live grill buffet experience, very popular on weekends & holidays",
    priceRange: "~₹1,600 for two (buffet)",
    cuisine: "Buffet style, BBQ grills",
    contact: "080 6902 8767",
    address: "3rd Floor, Max Building (Opposite Pantaloons), Circular Road, Lalpur, Ranchi",
    tags: ["Non-veg", "Veg", "Premium", "Buffet", "Family Friendly"],
    goodToKnow: "Classic live grill buffet experience; Very popular on weekends & holidays; Offers corporate/group dining packages",
    timings: "12:00 PM – 11:00 PM"
  },
  {
    id: "rest05",
    name: "OONA — The One",
    location: "Kadru / New A.G. Colony, Ranchi",
    category: "Premium",
    rating: 4.3,
    image: "/src/assets/Food & Dining/[(Oona the One)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Oona the One)1].jpg",
      "/src/assets/Food & Dining/[(Oona the One)2].jpg",
      "/src/assets/Food & Dining/[(Oona the One)3].jpg"
    ],
    isHiddenGem: false,
    description: "Upscale ambience with diverse menu, ideal for dates & celebrations",
    priceRange: "~₹1,400 for two",
    cuisine: "North Indian, Chinese, Desserts",
    contact: "+91 77070 77888",
    address: "Samridhi Building, New A.G. Colony, Kadru, Ranchi, Jharkhand 834002",
    tags: ["Veg", "Non-veg", "Premium", "Fine Dining", "Family Friendly"],
    goodToKnow: "Upscale ambience with diverse menu; Ideal for dates & celebrations; Known for desserts & cocktails",
    timings: "12:00 PM – 10:45 PM"
  },
  {
    id: "rest06",
    name: "Kaveri Restaurant",
    location: "Hindpiri / Ashok Nagar, Ranchi",
    category: "Budget",
    rating: 4.2,
    image: "/src/assets/Food & Dining/[(Kaveri Restaurant)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Kaveri Restaurant)1].jpg",
      "/src/assets/Food & Dining/[(Kaveri Restaurant)2].jpg",
      "/src/assets/Food & Dining/[(Kaveri Restaurant)3].jpg"
    ],
    isHiddenGem: false,
    description: "Famous for pure veg thalis with quick service & budget-friendly prices",
    priceRange: "~₹400–₹600 for two",
    cuisine: "South Indian, North Indian, Snacks",
    contact: "+91 84092 11101",
    address: "Hindpiri / Ashok Nagar, Ranchi (multiple outlets, Hindpiri most popular)",
    tags: ["Veg", "Budget-Mid", "Thali", "Local Favourite"],
    goodToKnow: "Famous for pure veg thalis; Quick service & budget-friendly; Busy during lunch hours",
    timings: "10:00 AM – 10:00 PM"
  },
  {
    id: "rest07",
    name: "Oak Tavern Lounge",
    location: "Doranda / Bara Ghaghra, Ranchi",
    category: "Premium",
    rating: 4.1,
    image: "/src/assets/Food & Dining/[(Oak Tavern Lounge)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Oak Tavern Lounge)1].jpg",
      "/src/assets/Food & Dining/[(Oak Tavern Lounge)2].jpg",
      "/src/assets/Food & Dining/[(Oak Tavern Lounge)3].jpg"
    ],
    isHiddenGem: false,
    description: "Lounge ambience with drinks & kebabs, live music / DJ nights on weekends",
    priceRange: "~₹800 for two",
    cuisine: "Multi-cuisine, Lounge/Fine Dining",
    contact: "+91 99420 03511",
    address: "1st Floor, Abhi's Plaza, Bara Ghaghra Main Road, Doranda, Ranchi",
    tags: ["Veg", "Non-veg", "Mid-Premium", "Lounge & Bar"],
    goodToKnow: "Lounge ambience with drinks & kebabs; Live music / DJ nights on weekends; Needs table booking for peak times",
    timings: "12:00 PM – 11:00 PM"
  },
  {
    id: "rest08",
    name: "Zinnia Multi-Cuisine Restaurant",
    location: "Lalpur, Ranchi",
    category: "Mid-range",
    rating: 4.2,
    image: "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine)1].jpg",
      "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine)2].jpg",
      "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine)3].jpg"
    ],
    isHiddenGem: false,
    description: "Popular family restaurant with diverse menu and good service & well-maintained ambience",
    priceRange: "~₹700 for two",
    cuisine: "Multi-cuisine",
    contact: "+91 65122 20220",
    address: "Circular Road, Near Lalpur Chowk, Ranchi, Jharkhand 834001",
    tags: ["Veg", "Non-veg", "Mid-range", "Multi-cuisine"],
    goodToKnow: "Popular family restaurant with diverse menu; Good service & well-maintained ambience; Great for casual lunch or dinner",
    timings: "11:00 AM – 11:00 PM"
  },
  {
    id: "rest09",
    name: "Taste Ride Café & Restro",
    location: "Bariatu, Ranchi",
    category: "Budget",
    rating: 4.3,
    image: "/src/assets/Food & Dining/[(Taste Ride Café & Restro)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Taste Ride Café & Restro)1].jpg",
      "/src/assets/Food & Dining/[(Taste Ride Café & Restro)2].jpg",
      "/src/assets/Food & Dining/[(Taste Ride Café & Restro)3].jpg"
    ],
    isHiddenGem: false,
    description: "Famous among students & youngsters, known for fast food, shakes, Chinese & snacks",
    priceRange: "~₹400 for two",
    cuisine: "Fast food, Chinese, Snacks, Shakes",
    contact: "+91 94703 56789",
    address: "Bariatu Main Road, Opposite Sadar Hospital, Ranchi",
    tags: ["Veg", "Non-veg", "Budget", "Café & Fast Food"],
    goodToKnow: "Famous among students & youngsters; Known for fast food, shakes, Chinese & snacks; Pocket-friendly with cozy café vibes",
    timings: "10:00 AM – 10:00 PM"
  },
  {
    id: "rest10",
    name: "Kailash Pure Veg",
    location: "Deoghar",
    category: "Budget",
    rating: 4.5,
    image: "/src/assets/Food & Dining/[(Kailash Pure veg)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Kailash Pure veg)1].jpg",
      "/src/assets/Food & Dining/[(Kailash Pure veg)2].jpg",
      "/src/assets/Food & Dining/[(Kailash Pure veg)3].jpg"
    ],
    isHiddenGem: true,
    description: "Pure veg restaurant serving local specialties, popular for thalis & sweets",
    priceRange: "~₹200–₹400 for two",
    cuisine: "Pure vegetarian, Thalis, Sweets",
    contact: "+91 93342 87654",
    address: "Tower Chowk, Deoghar, Jharkhand 814112",
    tags: ["Veg", "Budget", "Thali", "Family Friendly"],
    goodToKnow: "Pure veg restaurant serving local specialties; Popular for thalis & sweets; Hygienic & family-friendly environment",
    timings: "9:00 AM – 10:00 PM"
  },
  {
    id: "rest11",
    name: "Dine X Divine",
    location: "Deoghar",
    category: "Budget",
    rating: 4.2,
    image: "/src/assets/Food & Dining/[(Dine x Divine)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Dine x Divine)1].jpg",
      "/src/assets/Food & Dining/[(Dine x Divine)2].jpg",
      "/src/assets/Food & Dining/[(Dine x Divine )3].jpg"
    ],
    isHiddenGem: false,
    description: "Good spot for families and travelers with North Indian & Chinese specialties",
    priceRange: "~₹300–₹600 for two",
    cuisine: "North Indian, Chinese",
    contact: "+91 94701 11223",
    address: "Near Castairs Town, Deoghar, Jharkhand 814112",
    tags: ["Veg", "Non-veg", "Budget-Mid", "Casual Dining"],
    goodToKnow: "Good spot for families and travelers; North Indian & Chinese specialties; Clean interiors and quick service",
    timings: "11:00 AM – 10:30 PM"
  },
  {
    id: "rest12",
    name: "Moon Brewery & Restaurant",
    location: "Bistupur, Jamshedpur",
    category: "Premium",
    rating: 4.6,
    image: "/src/assets/Food & Dining/[(Mokn Brewery and Restaurant)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Mokn Brewery and Restaurant)1].jpg",
      "/src/assets/Food & Dining/[(Moon Brewery and Restaurant)2].jpg",
      "/src/assets/Food & Dining/[(Moon Brewery and Restaurant)3].jpg"
    ],
    isHiddenGem: false,
    description: "Known for in-house brewery & fine dining with great ambience for nightlife & celebrations",
    priceRange: "~₹1,500 for two",
    cuisine: "Multi-cuisine, Brewery, Fine dining",
    contact: "+91 77638 12345",
    address: "Bistupur Main Road, Jamshedpur, Jharkhand 831001",
    tags: ["Veg", "Non-veg", "Premium", "Brewery & Multi-cuisine"],
    goodToKnow: "Known for in-house brewery & fine dining; Great ambience for nightlife & celebrations; Popular among young professionals",
    timings: "12:00 PM – 11:30 PM"
  },
  {
    id: "rest13",
    name: "Khana Khazana",
    location: "Bistupur, Jamshedpur",
    category: "Budget",
    rating: 4.3,
    image: "/src/assets/Food & Dining/[(Khana Khazana)1].jpg",
    images: [
      "/src/assets/Food & Dining/[(Khana Khazana)1].jpg",
      "/src/assets/Food & Dining/[(Khana Khazana)2].jpg",
      "/src/assets/Food & Dining/[(Khana Khazana)3].jpg"
    ],
    isHiddenGem: true,
    description: "Specializes in local Jharkhandi & Bihari cuisine with affordable meals and homely taste",
    priceRange: "~₹500 for two",
    cuisine: "Local Jharkhandi/Bihari cuisine",
    contact: "+91 65722 22333",
    address: "Bistupur Market, Jamshedpur, Jharkhand 831001",
    tags: ["Veg", "Non-veg", "Budget-Mid", "Local Cuisine"],
    goodToKnow: "Specializes in local Jharkhandi & Bihari cuisine; Affordable meals with homely taste; Popular with locals & repeat customers",
    timings: "11:00 AM – 10:30 PM"
  }
];

export default function Destinations() {
  const { t } = useTranslation();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get('tab');
    return tabParam === 'food' ? 'food' : 'spots';
  });
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFoodFilter, setSelectedFoodFilter] = useState("All");
  const [crossSearchResults, setCrossSearchResults] = useState<{
    restaurants: typeof restaurants;
    destinations: typeof destinations;
  }>({ restaurants: [], destinations: [] });
  const [sortByLocation, setSortByLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});
  const [isTransitioning, setIsTransitioning] = useState<Record<number, boolean>>({});
  const [restaurantImageIndices, setRestaurantImageIndices] = useState<Record<string, number>>({});
  const [restaurantIsTransitioning, setRestaurantIsTransitioning] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  // Favorite functions
  const toggleDestinationFavorite = (destination: typeof destinations[0]) => {
    if (isFavorite(destination.id.toString(), 'destination')) {
      removeFromFavorites(destination.id.toString(), 'destination');
    } else {
      addToFavorites({
        id: destination.id.toString(),
        type: 'destination',
        name: destination.name,
        description: destination.description,
        image: destination.images[0],
        location: destination.location,
        rating: destination.rating,
        category: destination.category
      });
    }
  };

  const toggleRestaurantFavorite = (restaurant: typeof restaurants[0]) => {
    if (isFavorite(restaurant.id.toString(), 'destination')) {
      removeFromFavorites(restaurant.id.toString(), 'destination');
    } else {
      addToFavorites({
        id: restaurant.id.toString(),
        type: 'destination',
        name: restaurant.name,
        description: restaurant.description,
        image: restaurant.image,
        location: restaurant.location,
        rating: restaurant.rating,
        category: restaurant.cuisine
      });
    }
  };

  // Location detection function
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Format distance for display
  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else if (distance < 10) {
      return `${distance.toFixed(1)}km`;
    } else {
      return `${Math.round(distance)}km`;
    }
  };

  // Handle URL parameter changes to update active tab
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'food') {
      setActiveTab('food');
    } else if (tabParam === 'spots') {
      setActiveTab('spots');
    }
  }, [searchParams]);

  // Image rotation effect with smooth sliding transitions for destinations
  useEffect(() => {
    const interval = setInterval(() => {
      destinations.forEach(dest => {
        if (dest.images && dest.images.length > 1) {
          // Start transition
          setIsTransitioning(prev => ({ ...prev, [dest.id]: true }));
          
          // After longer delay for smoother transition, change the image
          setTimeout(() => {
            setImageIndices(prev => ({
              ...prev,
              [dest.id]: ((prev[dest.id] || 0) + 1) % dest.images.length
            }));
            
            // End transition after longer slide completes
            setTimeout(() => {
              setIsTransitioning(prev => ({ ...prev, [dest.id]: false }));
            }, 2000);
          }, 1000);
        }
      });
    }, 8000); // Rotate every 8 seconds for slower, more elegant transitions

    return () => clearInterval(interval);
  }, []);

  // Image rotation effect for restaurants - smooth sliding transitions
  useEffect(() => {
    const interval = setInterval(() => {
      restaurants.forEach(restaurant => {
        if (restaurant.images && restaurant.images.length > 1) {
          // Start transition
          setRestaurantIsTransitioning(prev => ({ ...prev, [restaurant.id]: true }));
          
          // After longer delay for smoother transition, change the image
          setTimeout(() => {
            setRestaurantImageIndices(prev => ({
              ...prev,
              [restaurant.id]: ((prev[restaurant.id] || 0) + 1) % restaurant.images.length
            }));
            
            // End transition after longer slide completes
            setTimeout(() => {
              setRestaurantIsTransitioning(prev => ({ ...prev, [restaurant.id]: false }));
            }, 2000);
          }, 1000);
        }
      });
    }, 10000); // Rotate every 10 seconds for slower, more elegant transitions

    return () => clearInterval(interval);
  }, []);

  const categories = ["All", "Nature", "Historic", "Religious", "Cultural", "Adventure", "Mining"];
  const foodFilters = ["All", "Premium", "Mid-range", "Budget", "Pure Veg"];

  // Filter destinations based on selected category and search
  const filteredDestinations = destinations.filter(destination => {
    const matchesCategory = selectedCategory === "All" || destination.category === selectedCategory;
    const matchesSearch = searchValue === "" || 
      destination.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchValue.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      destination.tags.some(tag => tag.toLowerCase().includes(searchValue.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  // Sort destinations by location if enabled
  const sortedDestinations = sortByLocation && userLocation
    ? [...filteredDestinations].sort((a, b) => {
        const coordsA = destinationCoordinates[a.name];
        const coordsB = destinationCoordinates[b.name];
        
        // If both have coordinates, sort by distance
        if (coordsA && coordsB) {
          const distanceA = calculateDistance(userLocation.lat, userLocation.lng, coordsA.lat, coordsA.lng);
          const distanceB = calculateDistance(userLocation.lat, userLocation.lng, coordsB.lat, coordsB.lng);
          return distanceA - distanceB;
        }
        
        // If only one has coordinates, prioritize it
        if (coordsA && !coordsB) return -1;
        if (!coordsA && coordsB) return 1;
        
        // If neither has coordinates, maintain original order
        return 0;
      })
    : filteredDestinations;

  // Filter restaurants based on selected food filter
  const filteredRestaurants = restaurants.filter(restaurant => {
    if (selectedFoodFilter === "All") return true;
    
    switch (selectedFoodFilter) {
      case "Premium":
        return restaurant.category === "Premium";
      case "Mid-range":
        return restaurant.category === "Mid-range";
      case "Budget":
        return restaurant.category === "Budget";
      case "Pure Veg":
        return restaurant.tags.includes("Veg") && !restaurant.tags.includes("Non-veg");
      default:
        return true;
    }
  });

  const handleDestinationClick = (id: number) => {
    navigate(`/destinations/${id}`);
  };

  // Cross-page search functionality
  const handleCrossSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setCrossSearchResults({ restaurants: [], destinations: [] });
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Search restaurants
    const matchingRestaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(lowerSearchTerm) ||
      restaurant.location.toLowerCase().includes(lowerSearchTerm) ||
      restaurant.description.toLowerCase().includes(lowerSearchTerm) ||
      restaurant.cuisine.toLowerCase().includes(lowerSearchTerm) ||
      restaurant.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );

    // Search destinations
    const matchingDestinations = destinations.filter(destination => 
      destination.name.toLowerCase().includes(lowerSearchTerm) ||
      destination.location.toLowerCase().includes(lowerSearchTerm) ||
      destination.description.toLowerCase().includes(lowerSearchTerm) ||
      destination.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );

    setCrossSearchResults({
      restaurants: matchingRestaurants,
      destinations: matchingDestinations
    });
  };

  // Handle search value change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    handleCrossSearch(value);
  };

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
        <h1 className="text-2xl font-playfair font-bold text-center mb-4">
              {t("destinations.title")}
        </h1>
          </div>
          <div className="flex gap-2">
            <DarkModeToggle />
            <LanguageToggle />
          </div>
        </div>
        <SearchBar 
          value={searchValue}
          onChange={handleSearchChange}
          placeholder={t("destinations.searchPlaceholder")}
        />
      </div>

      <div className="px-6 mt-6 pb-32 relative z-10">
        {/* Cross-Search Results */}
        {searchValue && (crossSearchResults.restaurants.length > 0 || crossSearchResults.destinations.length > 0) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Search Results for "{searchValue}"
            </h3>
            
            {/* Restaurant Results */}
            {crossSearchResults.restaurants.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <Utensils className="mr-2" size={16} />
                    Restaurants ({crossSearchResults.restaurants.length})
                  </h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('food')}
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    View All Restaurants
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {crossSearchResults.restaurants.slice(0, 3).map((restaurant) => (
                    <LuxuryCard 
                      key={restaurant.id}
                      onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                      className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="aspect-[3/2] bg-muted overflow-hidden">
                          <img 
                            src={restaurant.images ? restaurant.images[0] : restaurant.image} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover object-center"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 ease-in-out" />
                        </div>
                        
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            Restaurant
                          </Badge>
                        </div>
                        
                        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                          <Star className="text-yellow-500" size={12} fill="currentColor" />
                          <span className="text-xs font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                          {restaurant.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {restaurant.location}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {restaurant.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-primary">
                            {restaurant.priceRange}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {restaurant.category}
                          </Badge>
                        </div>
                      </div>
                    </LuxuryCard>
                  ))}
                </div>
              </div>
            )}

            {/* Destination Results */}
            {crossSearchResults.destinations.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground flex items-center">
                    <MapPin className="mr-2" size={16} />
                    Tourist Spots ({crossSearchResults.destinations.length})
                  </h4>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab('spots')}
                    className="text-primary border-primary hover:bg-primary hover:text-white"
                  >
                    View All Spots
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {crossSearchResults.destinations.slice(0, 3).map((destination) => (
                    <LuxuryCard 
                      key={destination.id}
                      onClick={() => handleDestinationClick(destination.id)}
                      className="p-0 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="aspect-[3/2] bg-muted overflow-hidden relative">
                          <div className={`flex transition-transform duration-[2000ms] ease-in-out ${
                            isTransitioning[destination.id] ? '-translate-x-full' : 'translate-x-0'
                          }`}>
                            <div className="w-full h-full flex-shrink-0">
                              <img 
                                src={destination.images ? destination.images[imageIndices[destination.id] || 0] : destination.image} 
                                alt={destination.name}
                                className="w-full h-full object-cover object-center"
                              />
                            </div>
                            
                            {destination.images && destination.images.length > 1 && (
                              <div className="w-full h-full flex-shrink-0">
                                <img 
                                  src={destination.images[((imageIndices[destination.id] || 0) + 1) % destination.images.length]} 
                                  alt={destination.name}
                                  className="w-full h-full object-cover object-center"
                                />
                              </div>
                            )}
                          </div>
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 ease-in-out" />
                        </div>
                        
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">
                            Tourist Spot
                          </Badge>
                        </div>
                        
                        <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
                          <Star className="text-yellow-500" size={12} fill="currentColor" />
                          <span className="text-xs font-medium">{destination.rating}</span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                          {destination.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {destination.location}
                        </p>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {destination.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium text-primary">
                            {destination.category}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {destination.tags[0]}
                          </Badge>
                        </div>
                      </div>
                    </LuxuryCard>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          setSearchValue("");
          setCrossSearchResults({ restaurants: [], destinations: [] });
          // Update URL parameter when tab changes
          const newSearchParams = new URLSearchParams(searchParams);
          if (value === 'food') {
            newSearchParams.set('tab', 'food');
          } else {
            newSearchParams.delete('tab');
          }
          navigate(`/destinations?${newSearchParams.toString()}`, { replace: true });
        }} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="spots" className="font-medium">{t("destinations.touristSpots")}</TabsTrigger>
            <TabsTrigger value="food" className="font-medium">{t("destinations.foodDining")}</TabsTrigger>
          </TabsList>

          <TabsContent value="spots" className="space-y-6">
            {/* Filters */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="section-title">{t("destinations.categories")}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!sortByLocation) {
                      getCurrentLocation();
                    }
                    setSortByLocation(!sortByLocation);
                  }}
                  disabled={isGettingLocation}
                  className={sortByLocation ? "bg-primary text-primary-foreground" : ""}
                >
                  <MapPin size={14} className="mr-1" />
                  {isGettingLocation ? "Getting Location..." : 
                   sortByLocation ? t("destinations.locationOn") : t("destinations.sortByLocation")}
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category !== "All" && categoryIcons[category as keyof typeof categoryIcons] && (
                      <span className="mr-1">
                        {(() => {
                          const Icon = categoryIcons[category as keyof typeof categoryIcons];
                          return <Icon size={12} />;
                        })()}
                      </span>
                    )}
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Location Error Display */}
            {locationError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-center">
                  <MapPin size={16} className="text-red-500 mr-2" />
                  <p className="text-sm text-red-700">{locationError}</p>
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {sortedDestinations.length} destination{sortedDestinations.length !== 1 ? 's' : ''} found
              </p>
              {(selectedCategory !== "All" || searchValue !== "" || sortByLocation) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchValue("");
                    setSortByLocation(false);
                  }}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Destinations List */}
            {sortedDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {sortedDestinations.map((destination) => (
                <LuxuryCard 
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination.id)}
                  className="p-0 overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-[3/2] bg-muted overflow-hidden relative">
                      {/* Image Container with sliding animation */}
                      <div className={`flex transition-transform duration-[2000ms] ease-in-out ${
                        isTransitioning[destination.id] ? '-translate-x-full' : 'translate-x-0'
                      }`}>
                        {/* Current Image */}
                        <div className="w-full h-full flex-shrink-0">
                          <img 
                            src={destination.images ? destination.images[imageIndices[destination.id] || 0] : destination.image} 
                            alt={destination.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        
                        {/* Next Image (for sliding) */}
                        {destination.images && destination.images.length > 1 && (
                          <div className="w-full h-full flex-shrink-0">
                            <img 
                              src={destination.images[((imageIndices[destination.id] || 0) + 1) % destination.images.length]} 
                              alt={destination.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 ease-in-out" />
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDestinationFavorite(destination);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                    >
                      <Heart 
                        size={14} 
                        className={isFavorite(destination.id.toString(), 'destination') ? "text-red-500 fill-red-500" : "text-red-500"}
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground font-inter">
                            {destination.name}
                          </h3>
                          {destination.isHiddenGem && (
                            <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                              ✨ Hidden Gem
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {destination.location}
                          {sortByLocation && userLocation && destinationCoordinates[destination.name] && (
                            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              {formatDistance(calculateDistance(
                                userLocation.lat, 
                                userLocation.lng, 
                                destinationCoordinates[destination.name].lat, 
                                destinationCoordinates[destination.name].lng
                              ))}
                            </span>
                          )}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {destination.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {destination.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {destination.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                          {tag}
                        </Badge>
                      ))}
                      {destination.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-muted">
                          +{destination.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="text-accent fill-accent" size={14} />
                        <span className="text-sm font-medium ml-1">{destination.rating}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <IndianRupee size={12} className="mr-1" />
                        {destination.entryFee}
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Filter size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No destinations found</h3>
                  <p className="text-sm">
                    Try adjusting your filters or search terms
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchValue("");
                    setSortByLocation(false);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="food" className="space-y-6">
            {/* Food Filters */}
            <div className="space-y-4">
              <h3 className="section-title">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {foodFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFoodFilter === filter ? "default" : "outline"}
                    size="sm"
                    className="text-xs"
                    onClick={() => setSelectedFoodFilter(filter)}
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredRestaurants.length} restaurant{filteredRestaurants.length !== 1 ? 's' : ''} found
              </p>
              {selectedFoodFilter !== "All" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedFoodFilter("All")}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Restaurants List */}
            {filteredRestaurants.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {filteredRestaurants.map((restaurant) => (
                <LuxuryCard 
                  key={restaurant.id}
                  onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                  className="p-0 overflow-hidden"
                >
                  <div className="relative">
                    <div className="aspect-[3/2] bg-muted overflow-hidden relative">
                      {/* Image Container with sliding animation */}
                      <div className={`flex transition-transform duration-[2000ms] ease-in-out ${
                        restaurantIsTransitioning[restaurant.id] ? '-translate-x-full' : 'translate-x-0'
                      }`}>
                        {/* Current Image */}
                        <div className="w-full h-full flex-shrink-0">
                          <img 
                            src={restaurant.images ? restaurant.images[restaurantImageIndices[restaurant.id] || 0] : restaurant.image} 
                            alt={restaurant.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        
                        {/* Next Image (for sliding) */}
                        {restaurant.images && restaurant.images.length > 1 && (
                          <div className="w-full h-full flex-shrink-0">
                            <img 
                              src={restaurant.images[((restaurantImageIndices[restaurant.id] || 0) + 1) % restaurant.images.length]} 
                              alt={restaurant.name}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 ease-in-out" />
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDestinationFavorite(destination);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                    >
                      <Heart 
                        size={14} 
                        className={isFavorite(destination.id.toString(), 'destination') ? "text-red-500 fill-red-500" : "text-red-500"}
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground font-inter">
                            {restaurant.name}
                          </h3>
                          {restaurant.isHiddenGem && (
                            <Badge variant="secondary" className="bg-accent/10 text-accent text-xs">
                              ✨ Hidden Gem
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {restaurant.location}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {restaurant.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {restaurant.description}
                    </p>
                    
                    {/* Cuisine and Price */}
                    <div className="text-xs text-muted-foreground mb-2">
                      <div className="flex items-center mb-1">
                        <span className="font-medium">Cuisine:</span>
                        <span className="ml-1">{restaurant.cuisine}</span>
                      </div>
                      <div className="flex items-center">
                        <IndianRupee size={12} className="mr-1" />
                        <span>{restaurant.priceRange}</span>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {restaurant.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                          {tag}
                        </Badge>
                      ))}
                      {restaurant.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs bg-muted">
                          +{restaurant.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="text-accent fill-accent" size={14} />
                        <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone size={12} className="mr-1" />
                        {restaurant.contact}
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Filter size={48} className="mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
                  <p className="text-sm">
                    Try adjusting your filters
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedFoodFilter("All")}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}