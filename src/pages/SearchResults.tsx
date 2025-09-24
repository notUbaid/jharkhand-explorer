import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Car, 
  Building, 
  User, 
  Star, 
  IndianRupee,
  Clock,
  Users,
  Phone,
  Mail,
  Globe,
  Filter,
  X,
  Package,
  Camera,
  Music,
  Palette,
  Utensils,
  Mountain,
  TreePine,
  Heart,
  Award,
  Trophy,
  Compass,
  BookOpen
} from "lucide-react";

// Import all data sources
import { destinations } from "@/data/destinations";
import { packages } from "@/data/packages";
import { stays } from "@/data/stays";
import { products } from "@/data/products";
import { experiences } from "@/data/experiences";
import { tourGuides } from "@/data/tourGuides";

// Create a simple transport data array for search
const transportData = [
  {
    id: 1,
    name: "Ranchi to Delhi Flight",
    description: "Direct flight from Ranchi to Delhi",
    type: "Flight",
    from: "Ranchi",
    to: "Delhi",
    price: "₹4,500",
    image: "/assets/transport/flight.jpg",
    features: ["Direct Flight", "Meals Included", "Entertainment"]
  },
  {
    id: 2,
    name: "Ranchi to Kolkata Train",
    description: "Comfortable train journey from Ranchi to Kolkata",
    type: "Train",
    from: "Ranchi",
    to: "Kolkata",
    price: "₹800",
    image: "/assets/transport/train.jpg",
    features: ["AC Coach", "Food Service", "WiFi"]
  },
  {
    id: 3,
    name: "Ranchi to Mumbai Bus",
    description: "Luxury bus service from Ranchi to Mumbai",
    type: "Bus",
    from: "Ranchi",
    to: "Mumbai",
    price: "₹1,200",
    image: "/assets/transport/bus.jpg",
    features: ["AC Sleeper", "Entertainment", "Refreshments"]
  },
  {
    id: 4,
    name: "Jamshedpur to Kolkata Train",
    description: "Express train from Jamshedpur to Kolkata",
    type: "Train",
    from: "Jamshedpur",
    to: "Kolkata",
    price: "₹600",
    image: "/assets/transport/train.jpg",
    features: ["Express Service", "AC Coach", "Food Service"]
  },
  {
    id: 5,
    name: "Ranchi to Bangalore Flight",
    description: "Direct flight from Ranchi to Bangalore",
    type: "Flight",
    from: "Ranchi",
    to: "Bangalore",
    price: "₹4,200",
    image: "/assets/transport/flight.jpg",
    features: ["Direct Flight", "Meals Included", "Entertainment"]
  }
];

// Mock data for events (since we don't have a separate events data file)
const events = [
  {
    id: 1,
    title: "Tribal Arts and Textiles Expo 2025",
    date: "March 15-17, 2025",
    location: "Ranchi",
    category: "Cultural Festival",
    description: "Immerse yourself in the rich cultural heritage of Jharkhand",
    image: "/assets/event/event1/event 1 (1).png"
  },
  {
    id: 2,
    title: "Jharkhand Food Festival",
    date: "April 20-22, 2025",
    location: "Jamshedpur",
    category: "Food Festival",
    description: "Taste the authentic flavors of Jharkhand cuisine",
    image: "/assets/event/event2/event 2 (1).png"
  },
  {
    id: 3,
    title: "Traditional Music and Dance Show",
    date: "May 10, 2025",
    location: "Hazaribagh",
    category: "Cultural Performance",
    description: "Experience the vibrant folk traditions of Jharkhand",
    image: "/assets/event/event3/event 3 (1).png"
  },
  {
    id: 4,
    title: "Adventure Sports Festival",
    date: "June 5-7, 2025",
    location: "Netarhat",
    category: "Sports Event",
    description: "Thrilling adventure activities in the hills of Netarhat",
    image: "/assets/event/event4/event 4 (1).png"
  },
  {
    id: 5,
    title: "Craft and Handicraft Fair",
    date: "July 15-17, 2025",
    location: "Deoghar",
    category: "Craft Fair",
    description: "Discover traditional crafts and meet local artisans",
    image: "/assets/event/event5/event 5 (1).png"
  },
  {
    id: 6,
    title: "Religious Festival Celebration",
    date: "August 20, 2025",
    location: "Baidyanath Temple",
    category: "Religious Event",
    description: "Join the grand celebration at the sacred Baidyanath Temple",
    image: "/assets/event/event6/event 6 (1).png"
  },
  {
    id: 7,
    title: "Wildlife Photography Workshop",
    date: "September 10-12, 2025",
    location: "Betla National Park",
    category: "Educational Workshop",
    description: "Learn wildlife photography in the heart of nature",
    image: "/assets/event/event7/event 7 (1).png"
  },
  {
    id: 8,
    title: "Heritage Walk and Tour",
    date: "October 5, 2025",
    location: "Ranchi",
    category: "Cultural Tour",
    description: "Explore the historical landmarks of Ranchi",
    image: "/assets/event/event8/event 8 (1).png"
  }
];

interface SearchResult {
  id: string;
  type: 'destination' | 'package' | 'stay' | 'transport' | 'product' | 'experience' | 'tourguide' | 'event';
  title: string;
  description: string;
  location?: string;
  price?: string;
  rating?: number;
  image?: string;
  category?: string;
  date?: string;
  tags?: string[];
  path: string;
}

export default function SearchResults() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'relevance' | 'price' | 'rating' | 'date'>('relevance');

  const filterOptions = [
    { value: 'destination', label: 'Destinations', icon: MapPin, color: 'emerald' },
    { value: 'package', label: 'Packages', icon: Package, color: 'blue' },
    { value: 'stay', label: 'Stays', icon: Building, color: 'gold' },
    { value: 'transport', label: 'Transport', icon: Car, color: 'emerald' },
    { value: 'product', label: 'Products', icon: ShoppingBag, color: 'gold' },
    { value: 'experience', label: 'Experiences', icon: Star, color: 'purple' },
    { value: 'tourguide', label: 'Tour Guides', icon: User, color: 'blue' },
    { value: 'event', label: 'Events', icon: Calendar, color: 'red' }
  ];

  // Comprehensive search function
  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase();
    const results: SearchResult[] = [];

    // Search destinations
    destinations.forEach(dest => {
      const searchableText = [
        dest.name,
        dest.description,
        dest.location,
        dest.category,
        ...(dest.tags || [])
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `dest-${dest.id}`,
          type: 'destination',
          title: dest.name,
          description: dest.description,
          location: dest.location,
          image: dest.image,
          category: dest.category,
          tags: dest.tags || [],
          path: `/destinations/${dest.id}`
        });
      }
    });

    // Search packages
    packages.forEach(pkg => {
      const searchableText = [
        pkg.title,
        pkg.description,
        pkg.departureCity,
        pkg.category,
        ...(pkg.inclusions || []),
        ...(pkg.highlights || [])
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `pkg-${pkg.id}`,
          type: 'package',
          title: pkg.title,
          description: pkg.description,
          location: pkg.departureCity,
          price: pkg.price,
          rating: pkg.rating,
          image: pkg.image,
          category: pkg.category,
          tags: pkg.highlights || [],
          path: `/packages/${pkg.id}`
        });
      }
    });

    // Search stays
    stays.forEach(stay => {
      const searchableText = [
        stay.name,
        stay.description,
        stay.location,
        stay.category,
        ...(stay.amenities || []),
        ...(stay.highlights || [])
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `stay-${stay.id}`,
          type: 'stay',
          title: stay.name,
          description: stay.description,
          location: stay.location,
          price: stay.price,
          rating: stay.rating,
          image: stay.image,
          category: stay.category,
          tags: stay.amenities || [],
          path: `/stays/${stay.id}`
        });
      }
    });

    // Search transport
    transportData.forEach(transport => {
      const searchableText = [
        transport.name,
        transport.description,
        transport.type,
        transport.from,
        transport.to,
        ...(transport.features || [])
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `trans-${transport.id}`,
          type: 'transport',
          title: transport.name,
          description: transport.description,
          location: `${transport.from} to ${transport.to}`,
          price: transport.price,
          image: transport.image,
          category: transport.type,
          tags: transport.features || [],
          path: `/transport`
        });
      }
    });

    // Search products
    products.forEach(product => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.seller,
        ...(product.sellerProfile?.specialties || [])
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `prod-${product.id}`,
          type: 'product',
          title: product.name,
          description: product.description,
          price: product.price,
          rating: product.rating,
          image: product.image,
          category: product.category,
          tags: product.sellerProfile?.specialties || [],
          path: `/products/${product.id}`
        });
      }
    });

    // Search experiences
    experiences.forEach(exp => {
      const searchableText = [
        exp.title,
        exp.description,
        exp.category,
        exp.instructor,
        ...(exp.highlights || []),
        ...(exp.whatToExpect || [])
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `exp-${exp.id}`,
          type: 'experience',
          title: exp.title,
          description: exp.description,
          price: exp.price,
          rating: exp.rating,
          image: exp.image,
          category: exp.category,
          tags: exp.highlights || [],
          path: `/experiences/${exp.id}`
        });
      }
    });

    // Search tour guides
    tourGuides.forEach(guide => {
      const searchableText = [
        guide.name,
        guide.bio,
        guide.specialization,
        guide.languages.join(' '),
        ...(guide.specialties || [])
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `guide-${guide.id}`,
          type: 'tourguide',
          title: guide.name,
          description: guide.bio,
          location: guide.locations.join(', '),
          rating: guide.rating,
          image: guide.image,
          category: guide.specialization,
          tags: guide.specialties || [],
          path: `/tourguides/${guide.id}`
        });
      }
    });

    // Search events
    events.forEach(event => {
      const searchableText = [
        event.title,
        event.description,
        event.location,
        event.category,
        event.date
      ].join(' ').toLowerCase();

      if (searchableText.includes(searchTerm)) {
        results.push({
          id: `event-${event.id}`,
          type: 'event',
          title: event.title,
          description: event.description,
          location: event.location,
          date: event.date,
          image: event.image,
          category: event.category,
          tags: [event.category],
          path: `/events/${event.id}`
        });
      }
    });

    return results;
  }, [query]);

  // Filter and sort results
  const filteredAndSortedResults = useMemo(() => {
    let filtered = searchResults;

    // Apply type filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(result => selectedFilters.includes(result.type));
    }

    // Sort results
    switch (sortBy) {
      case 'price':
        filtered = filtered.sort((a, b) => {
          const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || '0');
          return priceA - priceB;
        });
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'date':
        filtered = filtered.sort((a, b) => {
          if (a.date && b.date) {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          }
          return 0;
        });
        break;
      default: // relevance
        // Keep original order (already sorted by relevance in search)
        break;
    }

    return filtered;
  }, [searchResults, selectedFilters, sortBy]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const getTypeIcon = (type: string) => {
    const filter = filterOptions.find(f => f.value === type);
    return filter?.icon || Search;
  };

  const getTypeColor = (type: string) => {
    const filter = filterOptions.find(f => f.value === type);
    return filter?.color || 'gray';
  };

  const getTypeLabel = (type: string) => {
    const filter = filterOptions.find(f => f.value === type);
    return filter?.label || type;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <Button
            variant="ghost"
            size="default"
            onClick={() => navigate("/")}
            className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Home
          </Button>
          <LanguageToggle />
        </div>
        <h1 className="text-2xl font-playfair font-bold">Search Results</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">
          {filteredAndSortedResults.length} results for "{query}"
        </p>
      </div>

      <div className="px-6 py-6 pb-32 max-w-6xl mx-auto">
        {/* Search Filters */}
        <LuxuryCard className="p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-muted-foreground" />
              <span className="font-medium text-foreground">Filter by:</span>
            </div>
            {filterOptions.map(option => {
              const Icon = option.icon;
              const isSelected = selectedFilters.includes(option.value);
              return (
                <Button
                  key={option.value}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter(option.value)}
                  className={`flex items-center gap-2 ${
                    isSelected 
                      ? `bg-${option.color}-500 hover:bg-${option.color}-600 text-white` 
                      : ''
                  }`}
                >
                  <Icon size={16} />
                  {option.label}
                </Button>
              );
            })}
            {selectedFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFilters([])}
                className="text-muted-foreground hover:text-foreground"
              >
                <X size={16} className="mr-1" />
                Clear All
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="font-medium text-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'relevance' | 'price' | 'rating' | 'date')}
              className="px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="relevance">Relevance</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
              <option value="date">Date</option>
            </select>
          </div>
        </LuxuryCard>

        {/* Search Results */}
        {filteredAndSortedResults.length === 0 ? (
          <LuxuryCard className="p-8 text-center">
            <Search size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground mb-4">
              Try searching with different keywords or check your spelling
            </p>
            <Button onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </LuxuryCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedResults.map((result) => {
              const TypeIcon = getTypeIcon(result.type);
              const typeColor = getTypeColor(result.type);
              const typeLabel = getTypeLabel(result.type);

              return (
                <LuxuryCard 
                  key={result.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300"
                  onClick={() => navigate(result.path)}
                >
                  <div className="relative">
                    {result.image && (
                      <div className="aspect-[4/3] bg-muted rounded-t-lg overflow-hidden">
                        <img
                          src={result.image}
                          alt={result.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Badge 
                      className={`absolute top-3 left-3 bg-${typeColor}-500 text-white`}
                    >
                      <TypeIcon size={12} className="mr-1" />
                      {typeLabel}
                    </Badge>
                  </div>

                  <div className="p-4">
                    <h3 className="font-playfair font-semibold text-foreground mb-2 line-clamp-2">
                      {result.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {result.description}
                    </p>

                    <div className="space-y-2">
                      {result.location && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={14} className="mr-2" />
                          {result.location}
                        </div>
                      )}

                      {result.date && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar size={14} className="mr-2" />
                          {result.date}
                        </div>
                      )}

                      {result.price && (
                        <div className="flex items-center text-sm font-medium text-foreground">
                          <IndianRupee size={14} className="mr-2" />
                          {result.price}
                        </div>
                      )}

                      {result.rating && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Star size={14} className="mr-2 fill-yellow-400 text-yellow-400" />
                          {result.rating}/5
                        </div>
                      )}
                    </div>

                    {result.tags && result.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {result.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {result.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{result.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </LuxuryCard>
              );
            })}
          </div>
        )}

        {/* Search Suggestions */}
        {query && filteredAndSortedResults.length > 0 && (
          <LuxuryCard className="mt-6 p-6">
            <h3 className="font-semibold text-foreground mb-4">Search Suggestions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                "Cultural Heritage",
                "Adventure Tourism", 
                "Traditional Crafts",
                "Local Cuisine",
                "Wildlife Safari",
                "Temple Tours",
                "Folk Music",
                "Handicrafts"
              ].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(suggestion)}`)}
                  className="text-left justify-start"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </LuxuryCard>
        )}
      </div>
    </div>
  );
}
