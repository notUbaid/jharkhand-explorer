import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
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

const destinations = [
  {
    id: 1,
    name: "Betla National Park",
    location: "Palamu District",
    category: "Nature",
    rating: 4.5,
    image: "/placeholder.svg",
    isHiddenGem: true,
    description: "One of the finest wildlife reserves in Eastern India",
    entryFee: "₹30 per person",
    timings: "6:00 AM - 6:00 PM",
    contact: "+91-9876543210",
  },
  {
    id: 2,
    name: "Jagannath Temple",
    location: "Ranchi",
    category: "Religious",
    rating: 4.7,
    image: "/placeholder.svg",
    isHiddenGem: false,
    description: "Beautiful replica of the famous Puri Jagannath Temple",
    entryFee: "Free",
    timings: "5:00 AM - 9:00 PM",
    contact: "+91-9876543211",
  },
  {
    id: 3,
    name: "Netarhat Sunset Point",
    location: "Latehar District",
    category: "Nature",
    rating: 4.8,
    image: "/placeholder.svg",
    isHiddenGem: true,
    description: "Mesmerizing sunset views from the Queen of Chotanagpur",
    entryFee: "₹10 per person",
    timings: "24 hours",
    contact: "+91-9876543212",
  },
];

const restaurants = [
  {
    id: 1,
    name: "Tribal Thali House",
    location: "Ranchi",
    category: "Traditional",
    rating: 4.6,
    image: "/placeholder.svg",
    isHiddenGem: true,
    description: "Authentic tribal cuisine with organic ingredients",
    priceRange: "₹200-400",
    cuisine: "Tribal, Vegetarian",
    contact: "+91-9876543213",
  },
  {
    id: 2,
    name: "Forest Restaurant",
    location: "Jamshedpur",
    category: "Multi-cuisine",
    rating: 4.4,
    image: "/placeholder.svg",
    isHiddenGem: false,
    description: "Eco-friendly dining experience in natural surroundings",
    priceRange: "₹300-600",
    cuisine: "Indian, Continental",
    contact: "+91-9876543214",
  },
];

export default function Destinations() {
  const [activeTab, setActiveTab] = useState("spots");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortByLocation, setSortByLocation] = useState(false);
  const navigate = useNavigate();

  const categories = ["All", "Nature", "Historic", "Religious", "Cultural", "Adventure", "Mining"];
  const foodFilters = ["All", "Veg", "Non-Veg", "Budget-Friendly"];

  const handleDestinationClick = (id: number) => {
    navigate(`/destinations/${id}`);
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <h1 className="text-2xl font-playfair font-bold text-center mb-4">
          Explore Destinations
        </h1>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search destinations, restaurants..."
        />
      </div>

      <div className="px-6 -mt-2 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="spots" className="font-medium">Tourist Spots</TabsTrigger>
            <TabsTrigger value="food" className="font-medium">Food & Dining</TabsTrigger>
          </TabsList>

          <TabsContent value="spots" className="space-y-4">
            {/* Filters */}
            <div className="section-spacing space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="section-title">Categories</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortByLocation(!sortByLocation)}
                  className={sortByLocation ? "bg-primary text-primary-foreground" : ""}
                >
                  <MapPin size={14} className="mr-1" />
                  {sortByLocation ? "Location On" : "Sort by Location"}
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

            {/* Destinations List */}
            <div className="space-y-4">
              {destinations.map((destination) => (
                <LuxuryCard 
                  key={destination.id}
                  onClick={() => handleDestinationClick(destination.id)}
                  className="p-0 overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-24 h-24 bg-muted flex-shrink-0">
                      <img 
                        src={destination.image} 
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-playfair font-semibold text-foreground">
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
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="food" className="space-y-4">
            {/* Food Filters */}
            <div className="section-spacing space-y-4">
              <h3 className="section-title">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {foodFilters.map((filter) => (
                  <Button
                    key={filter}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>

            {/* Restaurants List */}
            <div className="space-y-4">
              {restaurants.map((restaurant) => (
                <LuxuryCard 
                  key={restaurant.id}
                  onClick={() => navigate(`/restaurants/${restaurant.id}`)}
                  className="p-0 overflow-hidden"
                >
                  <div className="flex">
                    <div className="w-24 h-24 bg-muted flex-shrink-0">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-playfair font-semibold text-foreground">
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
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="text-accent fill-accent" size={14} />
                          <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <IndianRupee size={12} className="mr-1" />
                          {restaurant.priceRange}
                        </div>
                      </div>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}