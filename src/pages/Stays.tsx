import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
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
import { stays } from "@/data/stays";

export default function Stays() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [stayImageIndices, setStayImageIndices] = useState<Record<number, number>>({});
  const [stayIsTransitioning, setStayIsTransitioning] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();

  const categories = ["All", "Luxury", "Premium", "Mid-range", "Resort", "Eco Lodge", "Homestay"];
  const priceRanges = ["All", "Under ₹3K", "₹3K-5K", "₹5K-8K", "Above ₹8K"];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Rating" }
  ];

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

  // Image rotation for stays
  useEffect(() => {
    const interval = setInterval(() => {
      setStayImageIndices(prev => {
        const newIndices = { ...prev };
        stays.forEach(stay => {
          if (stay.images && stay.images.length > 1) {
            newIndices[stay.id] = ((newIndices[stay.id] || 0) + 1) % stay.images.length;
          }
        });
        return newIndices;
      });

      // Trigger crossfade effect
      setStayIsTransitioning(prev => {
        const newTransitioning = { ...prev };
        stays.forEach(stay => {
          if (stay.images && stay.images.length > 1) {
            newTransitioning[stay.id] = true;
          }
        });
        return newTransitioning;
      });

      // Reset transition state after animation
      setTimeout(() => {
        setStayIsTransitioning(prev => {
          const newTransitioning = { ...prev };
          stays.forEach(stay => {
            if (stay.images && stay.images.length > 1) {
              newTransitioning[stay.id] = false;
            }
          });
          return newTransitioning;
        });
      }, 2000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const filteredStays = stays.filter(stay => {
    const matchesSearch = stay.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                         stay.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                         stay.highlights.some(h => h.toLowerCase().includes(searchValue.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || stay.category === selectedCategory;
    
    // Price range filtering
    const price = parseInt(stay.price.replace(/[₹,]/g, ''));
    let matchesPrice = true;
    if (selectedPriceRange === "Under ₹3K") matchesPrice = price < 3000;
    else if (selectedPriceRange === "₹3K-5K") matchesPrice = price >= 3000 && price <= 5000;
    else if (selectedPriceRange === "₹5K-8K") matchesPrice = price >= 5000 && price <= 8000;
    else if (selectedPriceRange === "Above ₹8K") matchesPrice = price > 8000;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sorting logic
  const sortedStays = [...filteredStays].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''));
      case "price-high":
        return parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''));
      case "rating":
        return b.rating - a.rating;
      default: // popularity
        return b.rating - a.rating; // Using rating as popularity proxy
    }
  });

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-playfair font-bold">{t("stays.title")}</h1>
            <p className="text-primary-foreground/80 mt-1">{t("stays.subtitle")}</p>
          </div>
          <LanguageToggle />
        </div>
        
        <SearchBar
          value={searchValue}
          onChange={setSearchValue}
          placeholder={t("stays.searchPlaceholder")}
        />
      </div>

      <div className="px-6 mt-6 relative z-10">
        {/* Enhanced Filters */}
        <div className="space-y-6 mb-8">
          {/* Sort and Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold text-foreground">
                {sortedStays.length} Stay{sortedStays.length !== 1 ? 's' : ''} Found
              </h3>
              {(selectedCategory !== "All" || selectedPriceRange !== "All" || searchValue) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedPriceRange("All");
                    setSearchValue("");
                  }}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 text-sm border rounded-md bg-background"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground text-sm">Categories</h4>
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

          {/* Price Range Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground text-sm">Price Range</h4>
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
        </div>

        {/* Stays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {sortedStays.map((stay) => (
            <LuxuryCard 
              key={stay.id}
              className="p-0 overflow-hidden cursor-pointer"
              onClick={() => navigate(`/stays/${stay.id}`)}
            >
              <div className="relative">
                <div className="aspect-[3/2] bg-muted overflow-hidden">
                  {/* Current Image */}
                  <img 
                    src={stay.images ? stay.images[stayImageIndices[stay.id] || 0] : stay.image} 
                    alt={stay.name}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[3000ms] ease-in-out ${
                      stayIsTransitioning[stay.id] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                  
                  {/* Next Image (for crossfade) */}
                  {stay.images && stay.images.length > 1 && (
                    <img 
                      src={stay.images[((stayImageIndices[stay.id] || 0) + 1) % stay.images.length]} 
                      alt={stay.name}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-[3000ms] ease-in-out ${
                        stayIsTransitioning[stay.id] ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                      }`}
                    />
                  )}
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 ease-in-out" />
                </div>
                
                {/* Action buttons overlay */}
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

                {/* Category Badge */}
                <Badge 
                  className="absolute top-3 left-3 bg-primary/90 text-primary-foreground"
                >
                  {stay.category}
                </Badge>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 font-inter">
                      {stay.name}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin size={12} className="mr-1" />
                      {stay.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="text-accent fill-accent" size={14} />
                      <span className="text-sm font-medium ml-1">{stay.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {stay.category}
                    </Badge>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {stay.highlights.slice(0, 2).map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-primary/10 text-primary">
                        {highlight}
                      </Badge>
                    ))}
                    {stay.highlights.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-muted">
                        +{stay.highlights.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="font-bold text-lg text-accent">{stay.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">per night</span>
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

        {/* No Results */}
        {sortedStays.length === 0 && (
          <div className="text-center py-12">
            <Building size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No stays found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedPriceRange("All");
                setSearchValue("");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}