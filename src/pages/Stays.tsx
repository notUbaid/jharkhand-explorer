import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useStayComparison } from "@/contexts/StayComparisonContext";
import { StayComparisonModal } from "@/components/StayComparisonModal";
import { BookingModal } from "@/components/BookingModal";
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
  Accessibility,
  Search
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { stays } from "@/data/stays";
import { BookingItem } from "@/hooks/useBooking";

export default function Stays() {
  const { t } = useTranslation();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { compareItems, addToCompare, removeFromCompare, isInCompare, canAddMore, setOpenCompareModal } = useStayComparison();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("common.all"));
  const [selectedPriceRange, setSelectedPriceRange] = useState(t("common.all"));
  const [sortBy, setSortBy] = useState("popularity");
  const [stayImageIndices, setStayImageIndices] = useState<Record<number, number>>({});
  const [stayIsTransitioning, setStayIsTransitioning] = useState<Record<number, boolean>>({});
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedStay, setSelectedStay] = useState<typeof stays[0] | null>(null);
  const navigate = useNavigate();

  const categories = [
    t("common.all"), 
    t("common.luxury"), 
    t("common.premium"), 
    t("common.midRange"), 
    t("common.resort"), 
    t("common.ecoLodge"), 
    t("common.homestay")
  ];
  const priceRanges = [
    t("common.all"), 
    t("common.under3K"), 
    t("common.3KTo5K"), 
    t("common.5KTo8K"), 
    t("common.above8K")
  ];
  const sortOptions = [
    { value: "popularity", label: t("common.mostPopular") },
    { value: "price-low", label: t("common.price") + ": Low to High" },
    { value: "price-high", label: t("common.price") + ": High to Low" },
    { value: "rating", label: t("common.rating") }
  ];

  // Enhanced search function for stays
  const enhancedSearchStays = (stay: typeof stays[0]) => {
    if (!searchValue.trim()) return true;
    
    const searchTerm = searchValue.toLowerCase().trim();
    
    // Basic stay search
    const matchesName = stay.name.toLowerCase().includes(searchTerm);
    const matchesDescription = stay.description.toLowerCase().includes(searchTerm);
    const matchesLocation = stay.location.toLowerCase().includes(searchTerm);
    const matchesCategory = stay.category.toLowerCase().includes(searchTerm);
    
    // Highlights search
    const matchesHighlights = stay.highlights.some(highlight => 
      highlight.toLowerCase().includes(searchTerm)
    );
    
    // Amenities search
    const matchesAmenities = stay.amenities.some(amenity => 
      amenity.toLowerCase().includes(searchTerm)
    );
    
    // Price search
    const matchesPrice = stay.price.toLowerCase().includes(searchTerm);
    
    // Rating search
    const matchesRating = stay.rating.toString().includes(searchTerm);
    
    return matchesName || matchesDescription || matchesLocation || matchesCategory || 
           matchesHighlights || matchesAmenities || matchesPrice || matchesRating;
  };

  // Search suggestions
  const getSearchSuggestions = () => {
    if (!searchValue.trim()) return [];
    
    const suggestions: string[] = [];
    const searchTerm = searchValue.toLowerCase().trim();
    
    // Location suggestions
    const locations = [...new Set(stays.map(stay => stay.location))];
    locations.forEach(location => {
      if (location.toLowerCase().includes(searchTerm) && !suggestions.includes(location)) {
        suggestions.push(location);
      }
    });
    
    // Category suggestions
    const categories = [...new Set(stays.map(stay => stay.category))];
    categories.forEach(category => {
      if (category.toLowerCase().includes(searchTerm) && !suggestions.includes(category)) {
        suggestions.push(category);
      }
    });
    
    // Amenity suggestions
    const amenities = [...new Set(stays.flatMap(stay => stay.amenities))];
    amenities.forEach(amenity => {
      if (amenity.toLowerCase().includes(searchTerm) && !suggestions.includes(amenity)) {
        suggestions.push(amenity);
      }
    });
    
    // Highlight suggestions
    const highlights = [...new Set(stays.flatMap(stay => stay.highlights))];
    highlights.forEach(highlight => {
      if (highlight.toLowerCase().includes(searchTerm) && !suggestions.includes(highlight)) {
        suggestions.push(highlight);
      }
    });
    
    // Stay name suggestions
    stays.forEach(stay => {
      if (stay.name.toLowerCase().includes(searchTerm) && !suggestions.includes(stay.name)) {
        suggestions.push(stay.name);
      }
    });
    
    return suggestions.slice(0, 8); // Limit to 8 suggestions
  };

  const toggleFavorite = (stay: typeof stays[0]) => {
    if (isFavorite(stay.id.toString(), 'stay')) {
      removeFromFavorites(stay.id.toString(), 'stay');
    } else {
      addToFavorites({
        id: stay.id.toString(),
        type: 'stay',
        name: stay.name,
        description: stay.description,
        image: stay.images[0],
        price: stay.price,
        location: stay.location,
        rating: stay.rating,
        category: stay.category
      });
    }
  };

  const toggleCompare = (stay: typeof stays[0]) => {
    if (isInCompare(stay.id)) {
      removeFromCompare(stay.id);
    } else if (canAddMore) {
      addToCompare(stay);
    }
  };

  const handleBookNow = (stay: typeof stays[0]) => {
    setSelectedStay(stay);
    setShowBookingModal(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    console.log('Booking successful:', bookingId);
    setShowBookingModal(false);
    setSelectedStay(null);
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
    // Enhanced search functionality
    const matchesSearch = enhancedSearchStays(stay);
    const matchesCategory = selectedCategory === t("common.all") || stay.category === selectedCategory;
    
    // Price range filtering
    const price = parseInt(stay.price.replace(/[₹,]/g, ''));
    let matchesPrice = true;
    if (selectedPriceRange === t("common.under3K")) matchesPrice = price < 3000;
    else if (selectedPriceRange === t("common.3KTo5K")) matchesPrice = price >= 3000 && price <= 5000;
    else if (selectedPriceRange === t("common.5KTo8K")) matchesPrice = price >= 5000 && price <= 8000;
    else if (selectedPriceRange === t("common.above8K")) matchesPrice = price > 8000;
    
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
          <div className="flex gap-2">
            <LanguageToggle />
            <DarkModeToggle />
          </div>
        </div>
        
        <div className="relative">
          <SearchBar
            value={searchValue}
            onChange={setSearchValue}
            placeholder={t("stays.searchPlaceholder")}
          />
          
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
                      onClick={() => setSearchValue(suggestion)}
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
        {/* Enhanced Filters */}
        <div className="space-y-6 mb-8">
          {/* Sort and Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold text-foreground">
                {sortedStays.length} Stay{sortedStays.length !== 1 ? 's' : ''} Found
              </h3>
              {(selectedCategory !== t("common.all") || selectedPriceRange !== t("common.all") || searchValue) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(t("common.all"));
                    setSelectedPriceRange(t("common.all"));
                    setSearchValue("");
                  }}
                  className="text-xs"
                >
                  {t("common.clearFilters")}
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
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-3000 ease-in-out ${
                      stayIsTransitioning[stay.id] ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />
                  
                  {/* Next Image (for crossfade) */}
                  {stay.images && stay.images.length > 1 && (
                    <img 
                      src={stay.images[((stayImageIndices[stay.id] || 0) + 1) % stay.images.length]} 
                      alt={stay.name}
                      className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-3000 ease-in-out ${
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
                      toggleFavorite(stay);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      isFavorite(stay.id.toString(), 'stay')
                        ? 'bg-accent text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <Heart size={14} className={isFavorite(stay.id.toString(), 'stay') ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompare(stay);
                    }}
                    className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                      isInCompare(stay.id) 
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookNow(stay);
                      }}
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
                setSelectedCategory(t("common.all"));
                setSelectedPriceRange(t("common.all"));
                setSearchValue("");
              }}
            >
              {t("common.clearAll")} {t("common.filters")}
            </Button>
          </div>
        )}
      </div>

      {/* Compare Button */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-20 right-4 z-40">
          <Button
            onClick={() => setOpenCompareModal(true)}
            className="bg-primary hover:bg-primary/90 shadow-lg"
          >
            <GitCompare size={16} className="mr-2" />
            Compare ({compareItems.length})
          </Button>
        </div>
      )}

      {/* Comparison Modal */}
      <StayComparisonModal />

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bookingItems={selectedStay ? [{
          id: selectedStay.id.toString(),
          type: 'stay',
          title: selectedStay.name,
          price: parseFloat(selectedStay.price.replace(/[₹,]/g, '')),
          quantity: 1,
          duration: '1 night',
          location: selectedStay.location,
          image: selectedStay.images[0],
          metadata: {
            category: selectedStay.category,
            amenities: selectedStay.amenities,
            rating: selectedStay.rating
          }
        }] : []}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}