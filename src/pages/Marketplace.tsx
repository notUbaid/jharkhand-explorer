import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useProductsCart } from "@/hooks/useProductsCart";
import { tourGuides } from "@/data/tourGuides";
import { products } from "@/data/products";
import { experiences } from "@/data/experiences";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  IndianRupee, 
  User,
  Plus,
  Clock,
  MapPin,
  Users,
  Calendar,
  Share2,
  Minus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export default function Marketplace() {
  const { t } = useTranslation();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart, isInCart, getCartItemQuantity, totalItems, totalPrice, items, removeFromCart, updateQuantity, clearCart } = useProductsCart();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("products");
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExperienceCategory, setSelectedExperienceCategory] = useState("All");
  const [selectedSpecialization, setSelectedSpecialization] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("relevance");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const navigate = useNavigate();

  // Razorpay checkout function
  const handleRazorpayCheckout = async () => {
    if (items.length === 0) return;

    try {
      // Load Razorpay script if not already loaded
      if (!window.Razorpay) {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        document.body.appendChild(script);
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Generate order ID
      const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Razorpay options
      const options = {
        key: 'rzp_test_RLUAMPaeE93MzD', // Your Razorpay key
        amount: totalPrice * 100, // Amount in paise
        currency: 'INR',
        name: 'Jharkhand Explorer',
        description: `Order #${orderId}`,
        image: '/assets/Logo.jpg',
        order_id: orderId,
        handler: function (response: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
          // Payment successful
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
          clearCart();
        },
        prefill: {
          name: 'Customer',
          email: 'customer@example.com',
          contact: '9876543210',
        },
        theme: {
          color: '#059669'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  // Favorite functions
  const toggleProductFavorite = (product: typeof products[0]) => {
    if (isFavorite(product.id.toString(), 'product')) {
      removeFromFavorites(product.id.toString(), 'product');
    } else {
      addToFavorites({
        id: product.id.toString(),
        type: 'product',
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        location: product.sellerProfile?.address,
        rating: product.rating,
        category: product.category
      });
    }
  };

  const toggleExperienceFavorite = (experience: typeof experiences[0]) => {
    if (isFavorite(experience.id.toString(), 'experience')) {
      removeFromFavorites(experience.id.toString(), 'experience');
    } else {
      addToFavorites({
        id: experience.id.toString(),
        type: 'experience',
        name: experience.title,
        description: experience.description,
        image: experience.image,
        price: experience.price,
        location: experience.location,
        rating: experience.rating,
        category: experience.category
      });
    }
  };

  const toggleTourGuideFavorite = (guide: typeof tourGuides[0]) => {
    if (isFavorite(guide.id.toString(), 'tourguide')) {
      removeFromFavorites(guide.id.toString(), 'tourguide');
    } else {
      addToFavorites({
        id: guide.id.toString(),
        type: 'tourguide',
        name: guide.name,
        description: guide.bio,
        image: guide.image,
        price: guide.price,
        location: guide.locations.join(', '),
        rating: guide.rating,
        category: guide.specialties.join(', ')
      });
    }
  };

  // Handle URL tab parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['products', 'experiences', 'tourguides'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const productCategories = ["All", "Handicrafts", "Food Items", "Clothing/Textiles", "Souvenirs"];
  const experienceCategories = ["All", "Art & Craft", "Music & Dance", "Cooking & Food", "Nature & Adventure", "Cultural Heritage"];
  const tourGuideSpecializations = [
    "All", "Historical & Cultural Tours", "Wildlife & Nature", "Tribal Culture & Traditions",
    "Adventure & Trekking", "Religious & Spiritual Tours", "Art & Handicrafts", "Food & Culinary Tours",
    "Family & Solo Travel", "Photography & Instagram Tours"
  ];
  const priceRanges = ["All", "Under ₹500", "₹500-1000", "₹1000-2000", "₹2000-5000", "Above ₹5000"];
  const ratingOptions = ["All", "4.5+ Stars", "4.0+ Stars", "3.5+ Stars", "3.0+ Stars"];
  const locationOptions = ["All", "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih"];
  const sortOptions = [
    { value: "relevance", label: "Most Relevant" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" }
  ];

  // Universal search function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const universalSearch = (items: any[], searchTerm: string, type: 'product' | 'experience' | 'tourguide') => {
    if (!searchTerm.trim()) return items;
    
    const term = searchTerm.toLowerCase().trim();
    
    return items.filter(item => {
      // Common search fields
      const titleMatch = item.title?.toLowerCase().includes(term) || 
                        item.name?.toLowerCase().includes(term);
      const descriptionMatch = item.description?.toLowerCase().includes(term);
      const locationMatch = item.location?.toLowerCase().includes(term) ||
                           item.pickupLocation?.toLowerCase().includes(term);
      
      // Type-specific search fields
      let typeSpecificMatch = false;
      
      if (type === 'product') {
        typeSpecificMatch = 
          item.category?.toLowerCase().includes(term) ||
          item.sellerProfile?.businessName?.toLowerCase().includes(term) ||
          item.sellerProfile?.specialties?.some((s: string) => s.toLowerCase().includes(term)) ||
          item.features?.some((f: string) => f.toLowerCase().includes(term));
      } else if (type === 'experience') {
        typeSpecificMatch = 
          item.instructor?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term) ||
          item.difficulty?.toLowerCase().includes(term) ||
          item.whatToExpect?.some((w: string) => w.toLowerCase().includes(term)) ||
          item.highlights?.some((h: string) => h.toLowerCase().includes(term)) ||
          item.materials?.some((m: string) => m.toLowerCase().includes(term));
      } else if (type === 'tourguide') {
        typeSpecificMatch = 
          item.specialization?.toLowerCase().includes(term) ||
          item.specialties?.some((s: string) => s.toLowerCase().includes(term)) ||
          item.locations?.some((l: string) => l.toLowerCase().includes(term)) ||
          item.languages?.some((lang: string) => lang.toLowerCase().includes(term)) ||
          item.experience?.toLowerCase().includes(term);
      }
      
      return titleMatch || descriptionMatch || locationMatch || typeSpecificMatch;
    });
  };

  // Advanced filtering function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const applyAdvancedFilters = (items: any[], type: 'product' | 'experience' | 'tourguide') => {
    return items.filter(item => {
      // Price range filter
      if (selectedPriceRange !== "All") {
        const price = parseFloat(item.price?.replace(/[₹,]/g, '') || '0');
        let priceMatch = false;
        
        switch (selectedPriceRange) {
          case "Under ₹500":
            priceMatch = price < 500;
            break;
          case "₹500-1000":
            priceMatch = price >= 500 && price <= 1000;
            break;
          case "₹1000-2000":
            priceMatch = price >= 1000 && price <= 2000;
            break;
          case "₹2000-5000":
            priceMatch = price >= 2000 && price <= 5000;
            break;
          case "Above ₹5000":
            priceMatch = price > 5000;
            break;
        }
        
        if (!priceMatch) return false;
      }
      
      // Rating filter
      if (selectedRating !== "All") {
        const rating = item.rating || 0;
        let ratingMatch = false;
        
        switch (selectedRating) {
          case "4.5+ Stars":
            ratingMatch = rating >= 4.5;
            break;
          case "4.0+ Stars":
            ratingMatch = rating >= 4.0;
            break;
          case "3.5+ Stars":
            ratingMatch = rating >= 3.5;
            break;
          case "3.0+ Stars":
            ratingMatch = rating >= 3.0;
            break;
        }
        
        if (!ratingMatch) return false;
      }
      
      // Location filter
      if (selectedLocation !== "All") {
        const itemLocation = item.location || item.pickupLocation || '';
        if (!itemLocation.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }
      
      return true;
    });
  };

  // Sorting function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortItems = (items: any[], type: 'product' | 'experience' | 'tourguide') => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "price-low": {
          const priceA = parseFloat(a.price?.replace(/[₹,]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[₹,]/g, '') || '0');
          return priceA - priceB;
        }
        case "price-high": {
          const priceA2 = parseFloat(a.price?.replace(/[₹,]/g, '') || '0');
          const priceB2 = parseFloat(b.price?.replace(/[₹,]/g, '') || '0');
          return priceB2 - priceA2;
        }
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return (b.id || 0) - (a.id || 0);
        case "popular":
          return (b.rating || 0) - (a.rating || 0);
        default: // relevance
          return 0;
      }
    });
  };

  // Filtered and sorted data
  const filteredProducts = sortItems(
    applyAdvancedFilters(
      universalSearch(
        products.filter(product => 
          selectedCategory === "All" || product.category === selectedCategory
        ), 
        searchValue, 
        'product'
      ), 
      'product'
    ), 
    'product'
  );

  const filteredExperiences = sortItems(
    applyAdvancedFilters(
      universalSearch(
        experiences.filter(experience => 
          selectedExperienceCategory === "All" || 
          (selectedExperienceCategory === "Art & Craft" && experience.title.includes("Art")) ||
          (selectedExperienceCategory === "Music & Dance" && experience.title.includes("Music")) ||
          (selectedExperienceCategory === "Cooking & Food" && experience.title.includes("Cooking")) ||
          (selectedExperienceCategory === "Nature & Adventure" && experience.title.includes("Plants")) ||
          (selectedExperienceCategory === "Cultural Heritage" && 
            (experience.title.includes("Folk") || experience.title.includes("Tribal") || 
             experience.title.includes("Tattoo")))
        ), 
        searchValue, 
        'experience'
      ), 
      'experience'
    ), 
    'experience'
  );

  const filteredTourGuides = sortItems(
    applyAdvancedFilters(
      universalSearch(
        tourGuides.filter(guide => 
          selectedSpecialization === "All" || guide.specialization === selectedSpecialization
        ), 
        searchValue, 
        'tourguide'
      ), 
      'tourguide'
    ), 
    'tourguide'
  );

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-playfair font-bold text-center mb-4">
              {t("marketplace.title")}
            </h1>
          </div>
          <LanguageToggle />
        </div>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder={t("marketplace.searchPlaceholder")}
        />
        
        {/* Advanced Search Controls - Simplified */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Removed Show Filters button for simplicity */}
        </div>

        {/* Advanced Filters - Removed for simplicity */}
      </div>

      <div className="px-6 mt-6 pb-32 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="products" className="font-medium">{t("marketplace.products")}</TabsTrigger>
            <TabsTrigger value="experiences" className="font-medium text-center">{t("marketplace.experiences")}</TabsTrigger>
            <TabsTrigger value="tourguides" className="font-medium text-center">Tour Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex gap-6">
              {/* Products Section */}
              <div className="flex-1">
                {/* Product Categories */}
                <div className="space-y-4">
                  <h3 className="section-title">{t("marketplace.categories")}</h3>
                  <div className="flex flex-wrap gap-2">
                    {productCategories.map((category) => (
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

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {filteredProducts.map((product) => (
                    <LuxuryCard 
                      key={product.id}
                      className="p-0 overflow-hidden"
                      onClick={() => navigate(`/products/${product.id}`)}
                    >
                      <div className="relative">
                        <div className="aspect-[3/2] bg-muted">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-contain object-center"
                          />
                        </div>
                        
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="destructive">Out of Stock</Badge>
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleProductFavorite(product);
                          }}
                          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                        >
                          <Heart 
                            size={14} 
                            className={isFavorite(product.id.toString(), 'product') ? 'text-accent fill-accent' : 'text-muted-foreground'} 
                          />
                        </button>
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                          {product.name}
                        </h3>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <User size={12} className="mr-1" />
                          {product.seller}
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Star className="text-accent fill-accent" size={12} />
                            <span className="text-xs font-medium ml-1">{product.rating}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <IndianRupee size={14} className="text-accent" />
                            <span className="font-bold text-accent">{product.price}</span>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={!product.inStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="text-xs px-2 py-1 h-7"
                          >
                            <ShoppingCart size={12} className="mr-1" />
                            {product.inStock ? (isInCart(product.id) ? `In Cart (${getCartItemQuantity(product.id)})` : 'Add') : 'Unavailable'}
                          </Button>
                        </div>
                      </div>
                    </LuxuryCard>
                  ))}
                </div>

                {/* List Product Button */}
                <LuxuryCard className="mt-6 text-center bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                  <div className="py-4">
                    <Plus className="mx-auto text-primary mb-2" size={24} />
                    <h3 className="font-playfair font-semibold text-foreground mb-1">
                      Sell Your Products
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Join our marketplace and reach thousands of tourists
                    </p>
                    <Button 
                      variant="outline" 
                      className="text-primary border-primary"
                      onClick={() => navigate("/product-registration")}
                    >
                      List Your Product
                    </Button>
                  </div>
                </LuxuryCard>
              </div>

              {/* Cart Sidebar */}
              <div className="w-80 flex-shrink-0">
                <LuxuryCard className="sticky top-6 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-foreground flex items-center">
                      <ShoppingCart size={20} className="mr-2" />
                      Cart ({totalItems})
                    </h3>
                    {items.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearCart}
                        className="text-xs text-red-500"
                      >
                        Clear
                      </Button>
                    )}
                  </div>

                  {items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                      <p className="text-sm">Your cart is empty</p>
                      <p className="text-xs mt-1">Add products to get started</p>
                    </div>
                  ) : (
                    <>
                      {/* Cart Items */}
                      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{item.product.name}</p>
                              <p className="text-xs text-muted-foreground">{item.product.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Minus size={12} />
                              </Button>
                              <span className="text-sm w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 p-0"
                              >
                                <Plus size={12} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart Total */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-bold">Total:</span>
                          <div className="flex items-center">
                            <IndianRupee size={16} className="text-accent" />
                            <span className="font-bold text-lg text-accent">
                              {totalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Checkout Button */}
                        <Button 
                          className="w-full bg-accent hover:bg-accent/90 text-white"
                          disabled={items.length === 0}
                          onClick={handleRazorpayCheckout}
                        >
                          <ShoppingCart size={16} className="mr-2" />
                          Proceed to Pay
                        </Button>
                      </div>
                    </>
                  )}
                </LuxuryCard>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experiences" className="space-y-6">
            {/* Experience Categories */}
            <div className="space-y-4">
              <h3 className="section-title">Experience Categories</h3>
              <div className="flex flex-wrap gap-2">
                {experienceCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedExperienceCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedExperienceCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Experiences List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {filteredExperiences.map((experience) => (
                <LuxuryCard 
                  key={experience.id}
                  className="p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  onClick={() => navigate(`/experiences/${experience.id}`)}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] bg-muted">
                      <img 
                        src={experience.image} 
                        alt={experience.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Experience Category Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs bg-white/90 text-foreground">
                        {experience.title.includes("Painting") || experience.title.includes("Weaving") || 
                         experience.title.includes("Jewelry") || experience.title.includes("Terracotta") || 
                         experience.title.includes("Bangle") ? "Art & Craft" :
                         experience.title.includes("Music") || experience.title.includes("Drum") || 
                         experience.title.includes("Dance") ? "Music & Dance" :
                         experience.title.includes("Cooking") ? "Cooking & Food" :
                         experience.title.includes("Plants") ? "Nature & Adventure" :
                         "Cultural Heritage"}
                      </Badge>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExperienceFavorite(experience);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90 transition-colors"
                    >
                      <Heart 
                        size={14} 
                        className={isFavorite(experience.id.toString(), 'experience') ? "text-red-500 fill-red-500" : "text-gray-600"}
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-inter font-semibold text-foreground mb-2 text-base leading-tight">
                          {experience.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <User size={12} className="mr-2" />
                          {experience.instructor}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={12} className="mr-2" />
                          {experience.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {experience.duration}
                      </div>
                      <div className="flex items-center">
                        <Users size={12} className="mr-1" />
                        Max {experience.maxParticipants}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="flex items-center mr-4">
                          <Star className="text-accent fill-accent" size={14} />
                          <span className="text-sm font-medium ml-1">{experience.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <IndianRupee size={16} className="text-accent" />
                          <span className="font-bold text-accent text-lg">{experience.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Next available:</p>
                      <p className="text-sm font-medium text-primary">{experience.nextSlot}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-primary hover:bg-primary/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle booking
                        }}
                      >
                        Book Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle sharing
                        }}
                      >
                        <Share2 size={14} />
                      </Button>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>

            {/* List Experience Button */}
            <LuxuryCard className="mt-6 text-center bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
              <div className="py-4">
                <Plus className="mx-auto text-accent mb-2" size={24} />
                <h3 className="font-playfair font-semibold text-foreground mb-1">
                  Host Your Workshop
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Share your skills and culture with visitors
                </p>
                <Button 
                  variant="outline" 
                  className="text-accent border-accent"
                  onClick={() => navigate("/workshop-registration")}
                >
                  List Your Workshop
                </Button>
              </div>
            </LuxuryCard>
          </TabsContent>

          <TabsContent value="tourguides" className="space-y-6">
            {/* Tour Guide Specializations */}
            <div className="space-y-4">
              <h3 className="section-title">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                {tourGuideSpecializations.map((specialization) => (
                  <Button
                    key={specialization}
                    variant={selectedSpecialization === specialization ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSpecialization(specialization)}
                    className="text-xs"
                  >
                    {specialization}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tour Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {filteredTourGuides.map((guide) => (
                <LuxuryCard 
                  key={guide.id}
                  className="p-0 overflow-hidden"
                  onClick={() => navigate(`/tourguides/${guide.id}`)}
                >
                  <div className="relative">
                    <div className="aspect-[4/3] bg-muted">
                      <img 
                        src={guide.image} 
                        alt={guide.name}
                        className="w-full h-full object-contain object-center"
                      />
                    </div>
                    
                    {guide.verified && (
                      <div className="absolute top-2 left-2">
                        <Badge variant="default" className="bg-green-500 text-white text-xs">
                          ✓ Verified
                        </Badge>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleTourGuideFavorite(guide);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
                    >
                      <Heart 
                        size={14} 
                        className={isFavorite(guide.id.toString(), 'tourguide') ? 'text-accent fill-accent' : 'text-muted-foreground'} 
                      />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-inter font-semibold text-foreground mb-1 text-sm">
                          {guide.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {guide.specialization}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <MapPin size={10} className="mr-1" />
                          {guide.locations.slice(0, 2).join(", ")}
                          {guide.locations.length > 2 && "..."}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock size={8} className="mr-1" />
                        {guide.experience}
                      </div>
                      <div className="flex items-center">
                        <Users size={8} className="mr-1" />
                        {guide.totalTours} tours
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="flex items-center mr-3">
                          <Star className="text-accent fill-accent" size={10} />
                          <span className="text-xs font-medium ml-1">{guide.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <IndianRupee size={12} className="text-accent" />
                          <span className="font-bold text-accent text-sm">{guide.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-muted-foreground">
                        Languages: {guide.languages.join(", ")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Next available:</p>
                        <p className="text-xs font-medium text-primary">{guide.nextAvailable}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle booking
                        }}
                        className="text-xs px-2 py-1 h-7"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </LuxuryCard>
              ))}
            </div>

            {/* Become a Tour Guide Button */}
            <LuxuryCard className="mt-6 text-center bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <div className="py-4">
                <Plus className="mx-auto text-primary mb-2" size={24} />
                <h3 className="font-playfair font-semibold text-foreground mb-1">
                  Become a Tour Guide
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Share your knowledge and earn money by guiding tourists
                </p>
                <Button 
                  variant="outline" 
                  className="text-primary border-primary"
                  onClick={() => navigate("/tourguide-registration")}
                >
                  Register as Guide
                </Button>
              </div>
            </LuxuryCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}