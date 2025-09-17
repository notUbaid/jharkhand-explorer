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
  Pickaxe
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
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(() => {
    const tabParam = searchParams.get('tab');
    return tabParam === 'food' ? 'food' : 'spots';
  });
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFoodFilter, setSelectedFoodFilter] = useState("All");
  const [sortByLocation, setSortByLocation] = useState(false);
  const [imageIndices, setImageIndices] = useState<Record<number, number>>({});
  const [isTransitioning, setIsTransitioning] = useState<Record<number, boolean>>({});
  const [restaurantImageIndices, setRestaurantImageIndices] = useState<Record<string, number>>({});
  const [restaurantIsTransitioning, setRestaurantIsTransitioning] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  // Handle URL parameter changes to update active tab
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'food') {
      setActiveTab('food');
    } else if (tabParam === 'spots') {
      setActiveTab('spots');
    }
  }, [searchParams]);

  // Image rotation effect with smooth crossfade transitions for destinations
  useEffect(() => {
    const interval = setInterval(() => {
      destinations.forEach(dest => {
        if (dest.images && dest.images.length > 1) {
          // Start transition
          setIsTransitioning(prev => ({ ...prev, [dest.id]: true }));
          
          // After a short delay, change the image
          setTimeout(() => {
            setImageIndices(prev => ({
              ...prev,
              [dest.id]: ((prev[dest.id] || 0) + 1) % dest.images.length
            }));
            
            // End transition after crossfade completes
            setTimeout(() => {
              setIsTransitioning(prev => ({ ...prev, [dest.id]: false }));
            }, 1000);
          }, 500);
        }
      });
    }, 8000); // Rotate every 8 seconds for slower, more elegant transition

    return () => clearInterval(interval);
  }, []);

  // Image rotation effect for restaurants - slow slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      restaurants.forEach(restaurant => {
        if (restaurant.images && restaurant.images.length > 1) {
          // Start transition
          setRestaurantIsTransitioning(prev => ({ ...prev, [restaurant.id]: true }));
          
          // After a longer delay for slower transition, change the image
          setTimeout(() => {
            setRestaurantImageIndices(prev => ({
              ...prev,
              [restaurant.id]: ((prev[restaurant.id] || 0) + 1) % restaurant.images.length
            }));
            
            // End transition after crossfade completes
            setTimeout(() => {
              setRestaurantIsTransitioning(prev => ({ ...prev, [restaurant.id]: false }));
            }, 2000); // Longer crossfade duration
          }, 1000); // Longer delay before image change
        }
      });
    }, 12000); // Rotate every 12 seconds for very slow, elegant slideshow

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
  const sortedDestinations = sortByLocation 
    ? [...filteredDestinations].sort((a, b) => a.location.localeCompare(b.location))
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
          onChange={setSearchValue}
          placeholder={t("destinations.searchPlaceholder")}
        />
      </div>

      <div className="px-6 mt-6 relative z-10">
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
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
                  onClick={() => setSortByLocation(!sortByLocation)}
                  className={sortByLocation ? "bg-primary text-primary-foreground" : ""}
                >
                  <MapPin size={14} className="mr-1" />
                  {sortByLocation ? t("destinations.locationOn") : t("destinations.sortByLocation")}
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
                    <div className="aspect-[3/2] bg-muted overflow-hidden">
                      {/* Current Image */}
                      <img 
                        src={destination.images ? destination.images[imageIndices[destination.id] || 0] : destination.image} 
                        alt={destination.name}
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                          isTransitioning[destination.id] ? 'opacity-0' : 'opacity-100'
                        }`}
                      />
                      
                      {/* Next Image (for crossfade) */}
                      {destination.images && destination.images.length > 1 && (
                        <img 
                          src={destination.images[((imageIndices[destination.id] || 0) + 1) % destination.images.length]} 
                          alt={destination.name}
                          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                            isTransitioning[destination.id] ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      )}
                      
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 ease-in-out" />
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to favorites logic here
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                    >
                      <Heart 
                        size={14} 
                        className="text-red-500"
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
                    <div className="aspect-[3/2] bg-muted overflow-hidden">
                      {/* Current Image */}
                      <img 
                        src={restaurant.images ? restaurant.images[restaurantImageIndices[restaurant.id] || 0] : restaurant.image} 
                        alt={restaurant.name}
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[3000ms] ease-in-out ${
                          restaurantIsTransitioning[restaurant.id] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                        }`}
                      />
                      
                      {/* Next Image (for crossfade) */}
                      {restaurant.images && restaurant.images.length > 1 && (
                        <img 
                          src={restaurant.images[((restaurantImageIndices[restaurant.id] || 0) + 1) % restaurant.images.length]} 
                          alt={restaurant.name}
                          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[3000ms] ease-in-out ${
                            restaurantIsTransitioning[restaurant.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                          }`}
                        />
                      )}
                      
                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 ease-in-out" />
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to favorites logic here
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                    >
                      <Heart 
                        size={14} 
                        className="text-red-500"
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