import { useState } from "react";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  IndianRupee, 
  Users, 
  MapPin,
  Star,
  Heart,
  Share2,
  GitCompare,
  Calendar,
  Plane,
  Car,
  Building,
  Utensils
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    id: 1,
    title: "Tribal Culture Explorer",
    duration: "5 Days / 4 Nights",
    price: "₹25,000",
    category: "Cultural",
    rating: 4.8,
    image: "/placeholder.svg",
    highlights: ["Santhal Village Visit", "Tribal Dance Performance", "Handicraft Workshop"],
    difficulty: "Easy",
  },
  {
    id: 2,
    title: "Wildlife & Nature Retreat",
    duration: "4 Days / 3 Nights", 
    price: "₹18,000",
    category: "Nature",
    rating: 4.6,
    image: "/placeholder.svg",
    highlights: ["Betla National Park", "Netarhat Hill Station", "Bird Watching"],
    difficulty: "Moderate",
  },
  {
    id: 3,
    title: "Spiritual Jharkhand Journey",
    duration: "3 Days / 2 Nights",
    price: "₹12,000", 
    category: "Religious",
    rating: 4.7,
    image: "/placeholder.svg",
    highlights: ["Baidyanath Temple", "Jagannath Temple", "Meditation Sessions"],
    difficulty: "Easy",
  },
  {
    id: 4,
    title: "Adventure Seeker's Paradise",
    duration: "6 Days / 5 Nights",
    price: "₹35,000",
    category: "Adventure", 
    rating: 4.5,
    image: "/placeholder.svg",
    highlights: ["Rock Climbing", "River Rafting", "Jungle Trekking"],
    difficulty: "Challenging",
  },
  {
    id: 5,
    title: "Heritage & History Trail",
    duration: "4 Days / 3 Nights",
    price: "₹20,000",
    category: "Historic",
    rating: 4.4,
    image: "/placeholder.svg",
    highlights: ["Palamu Fort", "Archaeological Sites", "Museum Tours"],
    difficulty: "Easy",
  },
  {
    id: 6,
    title: "Wellness & Ayurveda Retreat",
    duration: "7 Days / 6 Nights",
    price: "₹45,000",
    category: "Wellness",
    rating: 4.9,
    image: "/placeholder.svg",
    highlights: ["Ayurvedic Treatments", "Yoga Sessions", "Herbal Garden Tours"],
    difficulty: "Easy",
  },
];

export default function Packages() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const navigate = useNavigate();

  const categories = ["All", "Cultural", "Nature", "Religious", "Adventure", "Historic", "Wellness"];

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10 text-success";
      case "Moderate": return "bg-accent/10 text-accent";
      case "Challenging": return "bg-destructive/10 text-destructive";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <h1 className="text-2xl font-playfair font-bold text-center mb-4">
          Travel Packages
        </h1>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search packages by destination, theme..."
        />
      </div>

      <div className="px-6 -mt-2 relative z-10">
        {/* Category Filters */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-foreground">Categories</h3>
            {comparing.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/packages/compare', { state: { packages: comparing } })}
                className="text-primary border-primary"
              >
                <GitCompare size={14} className="mr-1" />
                Compare ({comparing.length})
              </Button>
            )}
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
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="card-grid-2">
          {packages.map((pkg) => (
            <LuxuryCard 
              key={pkg.id}
              className="p-0 overflow-hidden"
            >
              <div className="relative">
                <div className="h-48 bg-muted">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Action buttons overlay */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => toggleFavorite(pkg.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      favorites.includes(pkg.id) 
                        ? 'bg-accent text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart size={14} className={favorites.includes(pkg.id) ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={() => toggleCompare(pkg.id)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      comparing.includes(pkg.id) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <GitCompare size={14} />
                  </button>
                </div>

                <Badge 
                  className={`absolute top-3 left-3 ${getDifficultyColor(pkg.difficulty)}`}
                >
                  {pkg.difficulty}
                </Badge>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-playfair font-semibold text-foreground mb-1">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock size={12} className="mr-1" />
                      {pkg.duration}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="text-accent fill-accent" size={14} />
                      <span className="text-sm font-medium ml-1">{pkg.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pkg.category}
                    </Badge>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {pkg.highlights.slice(0, 2).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {highlight}
                      </Badge>
                    ))}
                    {pkg.highlights.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-muted">
                        +{pkg.highlights.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="font-bold text-lg text-accent">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">per person</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/packages/${pkg.id}`)}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="premium"
                      size="sm"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Quick Stats */}
        <LuxuryCard className="mt-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="text-center">
            <h3 className="font-playfair font-semibold text-foreground mb-2">
              Discover More
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              15+ curated packages covering all of Jharkhand's hidden gems
            </p>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <Calendar className="mx-auto text-primary mb-1" size={20} />
                <p className="text-xs text-muted-foreground">Flexible Dates</p>
              </div>
              <div>
                <Users className="mx-auto text-primary mb-1" size={20} />
                <p className="text-xs text-muted-foreground">Group Discounts</p>
              </div>
              <div>
                <Car className="mx-auto text-primary mb-1" size={20} />
                <p className="text-xs text-muted-foreground">Transport Included</p>
              </div>
              <div>
                <Building className="mx-auto text-primary mb-1" size={20} />
                <p className="text-xs text-muted-foreground">Premium Stays</p>
              </div>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}