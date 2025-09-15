import { useState } from "react";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Home, 
  Trees, 
  Palette,
  Star,
  MapPin,
  IndianRupee,
  Users,
  Wifi,
  Car,
  Utensils,
  AirVent,
  Heart,
  GitCompare,
  Calendar,
  Bath,
  Accessibility
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stays = [
  {
    id: 1,
    name: "Radisson Blu Hotel Ranchi",
    type: "Hotel",
    location: "Ranchi",
    rating: 4.5,
    price: "₹4,500",
    image: "/placeholder.svg",
    amenities: ["WiFi", "AC", "Parking", "Restaurant", "Pool"],
    roomType: "Deluxe Room",
    guests: 2,
    accessibility: ["Wheelchair Access", "Elevator"],
  },
  {
    id: 2,
    name: "Tribal Heritage Homestay",
    type: "Homestay",
    location: "Khunti Village",
    rating: 4.8,
    price: "₹1,200",
    image: "/placeholder.svg",
    amenities: ["WiFi", "Local Cuisine", "Cultural Programs"],
    roomType: "Traditional Hut",
    guests: 4,
    accessibility: ["Ground Floor"],
    isAuthentic: true,
  },
  {
    id: 3,
    name: "Netarhat Eco Resort",
    type: "Eco-lodge",
    location: "Netarhat",
    rating: 4.6,
    price: "₹2,800",
    image: "/placeholder.svg",
    amenities: ["Eco-Friendly", "Nature Walks", "Bonfire"],
    roomType: "Eco Cottage",
    guests: 3,
    accessibility: ["Wheelchair Access"],
    isEco: true,
  },
  {
    id: 4,
    name: "Cultural Experience Villa",
    type: "Cultural Stay",
    location: "Saraikela",
    rating: 4.7,
    price: "₹3,200",
    image: "/placeholder.svg",
    amenities: ["Cultural Workshops", "Traditional Meals", "Folk Performances"],
    roomType: "Heritage Suite",
    guests: 6,
    accessibility: ["Ramp Access", "Wide Doorways"],
    isCultural: true,
  },
  {
    id: 5,
    name: "Forest Retreat Lodge",
    type: "Eco-lodge",
    location: "Betla National Park",
    rating: 4.4,
    price: "₹3,800",
    image: "/placeholder.svg",
    amenities: ["Wildlife Safari", "Nature Guides", "Organic Food"],
    roomType: "Forest View Room",
    guests: 2,
    accessibility: ["Ground Floor", "Wide Bathrooms"],
    isEco: true,
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Hotel": return <Building size={16} className="text-primary" />;
    case "Homestay": return <Home size={16} className="text-accent" />;
    case "Eco-lodge": return <Trees size={16} className="text-success" />;
    case "Cultural Stay": return <Palette size={16} className="text-accent" />;
    default: return <Building size={16} className="text-primary" />;
  }
};

const getAmenityIcon = (amenity: string) => {
  switch (amenity) {
    case "WiFi": return <Wifi size={12} />;
    case "AC": return <AirVent size={12} />;
    case "Parking": return <Car size={12} />;
    case "Restaurant": return <Utensils size={12} />;
    case "Pool": return <Bath size={12} />;
    default: return null;
  }
};

export default function Stays() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const navigate = useNavigate();

  const stayTypes = ["All", "Hotel", "Homestay", "Eco-lodge", "Cultural Stay"];

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const toggleCompare = (id: number) => {
    setComparing(prev => {
      if (prev.includes(id)) {
        return prev.filter(comp => comp !== id);
      }
      if (prev.length < 2) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <h1 className="text-2xl font-playfair font-bold text-center mb-4">
          Stays & Accommodation
        </h1>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search hotels, homestays..."
        />
      </div>

      <div className="px-6 mt-6 relative z-10">
        {/* Type Filters */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Accommodation Type</h3>
            {comparing.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/stays/compare', { state: { stays: comparing } })}
                className="text-primary border-primary"
              >
                <GitCompare size={14} className="mr-1" />
                Compare ({comparing.length})
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {stayTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="text-xs flex items-center"
              >
                {type !== "All" && getTypeIcon(type)}
                <span className={type !== "All" ? "ml-1" : ""}>{type}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Stays List */}
        <div className="space-y-4 mt-6">
          {stays.map((stay) => (
            <LuxuryCard 
              key={stay.id}
              className="p-0 overflow-hidden"
              onClick={() => navigate(`/stays/${stay.id}`)}
            >
              <div className="relative">
                <div className="h-40 bg-muted">
                  <img 
                    src={stay.image} 
                    alt={stay.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Special badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {stay.isAuthentic && (
                    <Badge className="bg-accent/90 text-accent-foreground text-xs">
                      ✨ Authentic
                    </Badge>
                  )}
                  {stay.isEco && (
                    <Badge className="bg-success/90 text-success-foreground text-xs">
                      🌱 Eco-Friendly
                    </Badge>
                  )}
                  {stay.isCultural && (
                    <Badge className="bg-accent/90 text-accent-foreground text-xs">
                      🎭 Cultural
                    </Badge>
                  )}
                </div>
                
                {/* Action buttons */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(stay.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      favorites.includes(stay.id) 
                        ? 'bg-accent text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart size={14} className={favorites.includes(stay.id) ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompare(stay.id);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      comparing.includes(stay.id) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <GitCompare size={14} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getTypeIcon(stay.type)}
                      <h3 className="font-playfair font-semibold text-foreground">
                        {stay.name}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <MapPin size={12} className="mr-1" />
                      {stay.location}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{stay.roomType}</span>
                      <div className="flex items-center">
                        <Users size={10} className="mr-1" />
                        {stay.guests} guests
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="text-accent fill-accent" size={14} />
                      <span className="text-sm font-medium ml-1">{stay.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {stay.type}
                    </Badge>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {stay.amenities.slice(0, 3).map((amenity, index) => (
                    <div key={index} className="flex items-center bg-muted rounded-md px-2 py-1">
                      {getAmenityIcon(amenity)}
                      <span className="text-xs text-muted-foreground ml-1">{amenity}</span>
                    </div>
                  ))}
                  {stay.amenities.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{stay.amenities.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Accessibility */}
                {stay.accessibility.length > 0 && (
                  <div className="flex items-center mb-3">
                    <Accessibility size={12} className="text-accent mr-1" />
                    <span className="text-xs text-muted-foreground">
                      {stay.accessibility.join(", ")}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="font-bold text-lg text-accent">{stay.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">/night</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/stays/${stay.id}`);
                      }}
                    >
                      View Details
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-primary hover:bg-primary-light"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Sustainability Banner */}
        <LuxuryCard className="mt-6 bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <div className="text-center py-4">
            <Trees className="mx-auto text-success mb-2" size={24} />
            <h3 className="font-playfair font-semibold text-foreground mb-2">
              Sustainable Tourism
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose eco-friendly and community-based accommodations
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-success">50+</p>
                <p className="text-xs text-muted-foreground">Eco Stays</p>
              </div>
              <div>
                <p className="text-lg font-bold text-success">100%</p>
                <p className="text-xs text-muted-foreground">Local Owned</p>
              </div>
              <div>
                <p className="text-lg font-bold text-success">₹200</p>
                <p className="text-xs text-muted-foreground">Min. to Community</p>
              </div>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}