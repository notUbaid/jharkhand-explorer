import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
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
import { packages } from "@/data/packages";
import { Package } from "@/types/Package";
import { usePackageComparison } from "@/contexts/PackageComparisonContext";
import { PackageSelectionModal } from "@/components/PackageSelectionModal";
import { PackageComparison } from "@/components/PackageComparison";

export default function Packages() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [selectedPackageForComparison, setSelectedPackageForComparison] = useState<Package | null>(null);
  const navigate = useNavigate();
  const { setLeftPackage, setRightPackage, setOpenComparisonModal } = usePackageComparison();

  const categories = ["All", "Nature", "Adventure", "Cultural", "Religious", "Heritage", "Comprehensive", "Premium", "Mining", "Backpacking"];
  const priceRanges = ["All", "Under ₹10K", "₹10K-20K", "₹20K-30K", "Above ₹30K"];
  const durations = ["All", "1-3 Days", "4-6 Days", "7+ Days"];
  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "duration", label: "Duration" },
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

  const handleComparePackage = (pkg: Package) => {
    setSelectedPackageForComparison(pkg);
    setLeftPackage(pkg);
    setShowSelectionModal(true);
  };

  const handlePackageSelect = (selectedPackage: Package) => {
    setRightPackage(selectedPackage);
    setOpenComparisonModal(true);
  };


  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchValue.toLowerCase()) ||
                         pkg.highlights.some(h => h.toLowerCase().includes(searchValue.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory;
    
    // Price range filtering
    const price = parseInt(pkg.price.replace(/[₹,]/g, ''));
    let matchesPrice = true;
    if (selectedPriceRange === "Under ₹10K") matchesPrice = price < 10000;
    else if (selectedPriceRange === "₹10K-20K") matchesPrice = price >= 10000 && price <= 20000;
    else if (selectedPriceRange === "₹20K-30K") matchesPrice = price >= 20000 && price <= 30000;
    else if (selectedPriceRange === "Above ₹30K") matchesPrice = price > 30000;
    
    // Duration filtering
    const durationDays = parseInt(pkg.duration.split(' ')[0]);
    let matchesDuration = true;
    if (selectedDuration === "1-3 Days") matchesDuration = durationDays >= 1 && durationDays <= 3;
    else if (selectedDuration === "4-6 Days") matchesDuration = durationDays >= 4 && durationDays <= 6;
    else if (selectedDuration === "7+ Days") matchesDuration = durationDays >= 7;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesDuration;
  });

  // Sorting logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, ''));
      case "price-high":
        return parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, ''));
      case "duration":
        return parseInt(a.duration.split(' ')[0]) - parseInt(b.duration.split(' ')[0]);
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
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-playfair font-bold text-center mb-4">
              {t("packages.title")}
            </h1>
          </div>
          <LanguageToggle />
        </div>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder={t("packages.searchPlaceholder")}
        />
      </div>

      <div className="px-6 mt-6 relative z-10">
        {/* Enhanced Filters */}
        <div className="space-y-6 mb-8">
          {/* Sort and Results Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h3 className="font-semibold text-foreground">
                {sortedPackages.length} Package{sortedPackages.length !== 1 ? 's' : ''} Found
              </h3>
              {(selectedCategory !== "All" || selectedPriceRange !== "All" || selectedDuration !== "All" || searchValue) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedPriceRange("All");
                    setSelectedDuration("All");
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

          {/* Duration Filters */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground text-sm">Duration</h4>
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

        {/* Packages Grid */}
        <div className="card-grid-2">
          {sortedPackages.map((pkg) => (
            <LuxuryCard 
              key={pkg.id}
              className="p-0 overflow-hidden"
            >
              <div className="relative">
                <div className="aspect-[3/2] bg-muted">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title}
                    className="w-full h-full object-contain object-center"
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleComparePackage(pkg);
                    }}
                    className="p-2 rounded-full backdrop-blur-sm transition-all bg-white/20 text-white hover:bg-white/30"
                  >
                    <GitCompare size={14} />
                  </button>
                </div>

              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1 font-inter">
                      {pkg.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Clock size={12} className="mr-1" />
                      {pkg.duration}
                      <span className="mx-2">•</span>
                      <Users size={12} className="mr-1" />
                      {pkg.groupSize}
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
                        +{pkg.highlights.length - 2} {t("common.more")}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="font-bold text-lg text-accent">{pkg.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">{t("common.perPerson")}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/packages/${pkg.id}`)}
                    >
                      {t("common.viewDetails")}
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary-light"
                    >
                      {t("common.bookNow")}
                    </Button>
                  </div>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No packages found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Package Selection Modal */}
      <PackageSelectionModal
        isOpen={showSelectionModal}
        onClose={() => setShowSelectionModal(false)}
        onSelect={handlePackageSelect}
        excludeId={selectedPackageForComparison?.id}
      />

      {/* Package Comparison Modal */}
      <PackageComparison />
    </div>
  );
}