import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  IndianRupee, 
  Ticket,
  Plus,
  Star,
  Users,
  Music,
  Utensils,
  Palette,
  Mountain,
  Briefcase,
  Trophy
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Tribal Arts and Textiles Expo 2025",
    date: "October 18–22, 2025",
    location: "Morhabadi Maidan, Ranchi",
    description: "Handicrafts & handloom exhibition focused on tribal artistry",
    image: "/assets/event/event1/event 1 (1).png",
    category: "Cultural",
    entryFee: "₹50",
    timings: "11:00 AM – 8:00 PM",
    highlights: ["Live weaving demo (Tussar)", "Sohrai painting workshops", "Tribal fashion ramp show", "Artisan stalls from 14 districts"],
    expectedAttendees: "12,000",
  },
  {
    id: 2,
    title: "Jharkhand Coffee and Indigenous Beverage Fest",
    date: "December 6–8, 2025",
    location: "Eco Retreat Campus, Netarhat",
    description: "Culinary and beverage-focused fair",
    image: "/assets/event/event 2/event 2 (1).png",
    category: "Food",
    entryFee: "₹100",
    timings: "9:30 AM – 6:30 PM",
    highlights: ["Bamboo rice beer tasting", "Tribal coffee pop-ups (Latehar blend)", "Workshops on Mahua fermentation", "Wild fruit jams showcase"],
    expectedAttendees: "6,000",
  },
  {
    id: 3,
    title: "Seraikela Chhau Festival and Cultural Week",
    date: "January 10–14, 2026",
    location: "Rajmahal Grounds, Seraikela",
    description: "Performing arts and cultural celebration",
    image: "/assets/event/event 3/event 3 (1).png",
    category: "Cultural",
    entryFee: "Free",
    timings: "4:00 PM – 10:00 PM",
    highlights: ["Daily Chhau performances", "Mask-making exhibition", "Tribal percussion concerts", "Folk food courts"],
    expectedAttendees: "18,000",
  },
  {
    id: 4,
    title: "Jharkhand Rural Start-up Summit",
    date: "November 22–23, 2025",
    location: "BIT Mesra Convention Hall, Ranchi",
    description: "Start-up and innovation conclave",
    image: "/assets/event/event 4/event 4 (1).png",
    category: "Business",
    entryFee: "₹300 (general), ₹100 (student)",
    timings: "10:00 AM – 5:30 PM",
    highlights: ["Panel talks on rural tech", "Funding pitch events", "Stalls by local SHGs and tribal start-ups", "Mentorship roundtables"],
    expectedAttendees: "3,000",
  },
  {
    id: 5,
    title: "Thekua and Tilkut Mahotsav",
    date: "December 28–30, 2025",
    location: "Nandan Pahar Grounds, Deoghar",
    description: "Traditional food festival",
    image: "/assets/event/event 5/event 5 (1).png",
    category: "Food",
    entryFee: "₹30",
    timings: "10:00 AM – 9:00 PM",
    highlights: ["30+ food stalls", "Live cooking of Thekua varieties", "Sweet-making contest", "Folk storytelling zone"],
    expectedAttendees: "15,000",
  },
  {
    id: 6,
    title: "Khatiani Mela (Indigenous Games and Sports Fair)",
    date: "February 2–5, 2026",
    location: "Dumka Stadium Grounds",
    description: "Tribal sports and community games",
    image: "/assets/event/event 6/Event 6 (1).png",
    category: "Sports",
    entryFee: "₹20",
    timings: "8:00 AM – 6:00 PM",
    highlights: ["Archery contests", "Bamboo pole climbing", "Tribal wrestling", "Handicraft awards", "Millet lunch stalls"],
    expectedAttendees: "10,000",
  },
  {
    id: 7,
    title: "World Food India – Jharkhand Pavilion",
    date: "September 25–28, 2025",
    location: "Nepal House, Doranda (Jharkhand Pavilion) + Pragati Maidan, Delhi",
    description: "International food exhibition showcasing Jharkhand cuisine",
    image: "/assets/event/event 7/Event 7 (1).png",
    category: "Food",
    entryFee: "Free with registration",
    timings: "10:00 AM – 6:00 PM",
    highlights: ["Jharkhand food showcase", "International exposure", "Culinary demonstrations", "Trade opportunities"],
    expectedAttendees: "8,000",
  },
  {
    id: 8,
    title: "Jharkhand Mining and Construction Show 2026",
    date: "January 29–31, 2026",
    location: "Prabhat Tara Ground, HEC Campus, Ranchi",
    description: "Industrial exhibition showcasing mining and construction technologies",
    image: "/assets/event/event 8/Event 8 (1).png",
    category: "Business",
    entryFee: "Free (registration required)",
    timings: "10:00 AM – 6:00 PM",
    highlights: ["300+ exhibitors", "Technology demonstrations", "Industry networking", "Investment opportunities"],
    expectedAttendees: "15,000+",
  },
];

const categoryIcons = {
  Cultural: Palette,
  Food: Utensils,
  Business: Briefcase,
  Sports: Trophy,
  Music: Music,
  Art: Palette,
  Adventure: Mountain,
};

export default function Events() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(t("common.all"));
  const [selectedPriceRange, setSelectedPriceRange] = useState(t("common.all"));
  const [selectedLocation, setSelectedLocation] = useState(t("common.all"));
  const [sortBy, setSortBy] = useState("relevance");
  const navigate = useNavigate();

  const categories = [
    t("common.all"), 
    t("categories.cultural"), 
    t("categories.food"), 
    t("categories.business"), 
    t("categories.sports"), 
    t("categories.music"), 
    t("categories.art"), 
    t("categories.adventure")
  ];
  const priceRanges = [
    t("common.all"), 
    t("common.free"), 
    t("common.under100"), 
    t("common.100To500"), 
    t("common.500To1000"), 
    t("common.above1000")
  ];
  const locationOptions = [
    t("common.all"), 
    "Ranchi", 
    "Jamshedpur", 
    "Dhanbad", 
    "Bokaro", 
    "Deoghar", 
    "Hazaribagh", 
    "Giridih"
  ];
  const sortOptions = [
    { value: "relevance", label: t("common.mostRelevant") },
    { value: "date", label: t("common.date") + ": Soonest First" },
    { value: "price-low", label: t("common.price") + ": Low to High" },
    { value: "price-high", label: t("common.price") + ": High to Low" },
    { value: "popular", label: t("common.mostPopular") }
  ];

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons];
    return Icon ? <Icon size={16} className="text-primary" /> : null;
  };

  // Search and filter events
  const filteredEvents = events
    .filter(event => {
      // Category filter
      if (selectedCategory !== t("common.all") && event.category !== selectedCategory) {
        return false;
      }

      // Price range filter
      if (selectedPriceRange !== t("common.all")) {
        const entryFee = event.entryFee || "Free";
        let priceMatch = false;
        
        switch (selectedPriceRange) {
          case t("common.free"):
            priceMatch = entryFee === "Free" || entryFee === "₹0";
            break;
          case t("common.under100"):
            priceMatch = entryFee !== "Free" && parseFloat(entryFee.replace(/[₹,]/g, '')) < 100;
            break;
          case t("common.100To500"):
            priceMatch = parseFloat(entryFee.replace(/[₹,]/g, '')) >= 100 && parseFloat(entryFee.replace(/[₹,]/g, '')) <= 500;
            break;
          case t("common.500To1000"):
            priceMatch = parseFloat(entryFee.replace(/[₹,]/g, '')) >= 500 && parseFloat(entryFee.replace(/[₹,]/g, '')) <= 1000;
            break;
          case t("common.above1000"):
            priceMatch = parseFloat(entryFee.replace(/[₹,]/g, '')) > 1000;
            break;
        }
        
        if (!priceMatch) return false;
      }

      // Location filter
      if (selectedLocation !== t("common.all")) {
        if (!event.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // Search filter
      if (searchValue.trim()) {
        const searchTerm = searchValue.toLowerCase().trim();
        const matchesTitle = event.title.toLowerCase().includes(searchTerm);
        const matchesDescription = event.description.toLowerCase().includes(searchTerm);
        const matchesLocation = event.location.toLowerCase().includes(searchTerm);
        const matchesCategory = event.category.toLowerCase().includes(searchTerm);
        const matchesHighlights = event.highlights?.some(highlight => 
          highlight.toLowerCase().includes(searchTerm)
        ) || false;
        
        if (!matchesTitle && !matchesDescription && !matchesLocation && !matchesCategory && !matchesHighlights) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date": {
          // Simple date comparison - you might want to implement proper date parsing
          return a.date.localeCompare(b.date);
        }
        case "price-low": {
          const priceA = parseFloat(a.entryFee?.replace(/[₹,]/g, '') || '0');
          const priceB = parseFloat(b.entryFee?.replace(/[₹,]/g, '') || '0');
          return priceA - priceB;
        }
        case "price-high": {
          const priceA = parseFloat(a.entryFee?.replace(/[₹,]/g, '') || '0');
          const priceB = parseFloat(b.entryFee?.replace(/[₹,]/g, '') || '0');
          return priceB - priceA;
        }
        case "popular": {
          const attendeesA = parseInt(a.expectedAttendees?.replace(/[,]/g, '') || '0');
          const attendeesB = parseInt(b.expectedAttendees?.replace(/[,]/g, '') || '0');
          return attendeesB - attendeesA;
        }
        default: // relevance
          return 0;
      }
    });

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-playfair font-bold text-center mb-4">
              {t("events.title")}
            </h1>
          </div>
          <div className="flex gap-2">
            <LanguageToggle />
            <DarkModeToggle />
          </div>
        </div>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder={t("events.searchPlaceholder")}
        />
        
        {/* Advanced Search Controls - Simplified */}
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Removed Most Relevant dropdown for simplicity */}
        </div>

        {/* Advanced Filters - Removed for simplicity */}
      </div>

      <div className="px-6 mt-6 pb-32 relative z-10">
        {/* Category Filters */}
        <div className="space-y-4 mb-6">
          <h3 className="section-title">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs"
              >
                {category !== "All" && getCategoryIcon(category)}
                <span className={category !== "All" ? "ml-1" : ""}>{category}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
            <LuxuryCard 
              key={event.id}
              className="p-0 overflow-hidden"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="relative">
                <div className="aspect-[3/2] bg-muted">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 left-2 text-sm bg-white/90 text-foreground"
                >
                  {event.category}
                </Badge>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-playfair font-semibold text-foreground mb-2 text-base">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-sm text-muted-foreground mb-1">
                      <Calendar size={12} className="mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={12} className="mr-2" />
                      {event.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm font-medium mb-1">
                      <IndianRupee size={12} className="mr-1 text-accent" />
                      <span className="text-accent">{event.entryFee}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users size={10} className="mr-1" />
                      {event.expectedAttendees}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {event.description}
                </p>
                  
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock size={10} className="mr-2" />
                    {event.timings}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {event.highlights.slice(0, 1).map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-sm px-2 py-1">
                        {highlight}
                      </Badge>
                    ))}
                    {event.highlights.length > 1 && (
                      <Badge variant="outline" className="text-sm px-2 py-1">
                        +{event.highlights.length - 1}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </LuxuryCard>
          ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <Calendar className="mx-auto text-muted-foreground mb-4" size={48} />
              <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        {/* Featured Event Banner */}
        <Dialog>
          <DialogTrigger asChild>
            <LuxuryCard className="mt-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="text-center py-4">
                <Star className="mx-auto text-accent mb-2" size={24} />
                <h3 className="font-playfair font-semibold text-foreground mb-2">
                  Upcoming: Sarhul Festival
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Don't miss Jharkhand's most vibrant cultural celebration
                </p>
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <p className="text-2xl font-bold text-primary">3</p>
                    <p className="text-xs text-muted-foreground">Days</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">50+</p>
                    <p className="text-xs text-muted-foreground">Performances</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">Free</p>
                    <p className="text-xs text-muted-foreground">Entry</p>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary-light">
                  <Ticket size={16} className="mr-2" />
                  Get Notified
                </Button>
              </div>
            </LuxuryCard>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-playfair font-bold text-center mb-2">
                🌸 Sarhul Festival 2025
              </DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                Jharkhand's Sacred Spring Celebration
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Festival Overview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <Star className="mr-2 text-green-600" size={20} />
                  Festival Overview
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sarhul is the most significant spring festival of Jharkhand's tribal communities, particularly the Santhal, Munda, and Ho tribes. 
                  This sacred celebration marks the arrival of spring and honors the Sal tree (Shorea robusta), which holds deep spiritual significance 
                  in tribal culture. The festival symbolizes the harmonious relationship between humans and nature, celebrating the renewal of life 
                  and seeking blessings for prosperity and good harvest.
                </p>
              </div>

              {/* Key Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground">Dates & Timing</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>March 15-17, 2025</strong><br/>
                        Spring season (March-April)<br/>
                        Duration: 3 days<br/>
                        Best time to visit: Early morning rituals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground">Main Locations</h4>
                      <p className="text-sm text-muted-foreground">
                        • Ranchi (Capital celebrations)<br/>
                        • Khunti (Traditional heartland)<br/>
                        • Gumla (Santhal villages)<br/>
                        • Simdega (Munda communities)<br/>
                        • Tribal villages across Jharkhand
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground">Daily Schedule</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Day 1:</strong> Sal tree worship, Pahan rituals<br/>
                        <strong>Day 2:</strong> Jhumar dances, processions<br/>
                        <strong>Day 3:</strong> Community feast, cultural performances
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <IndianRupee className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground">Entry & Costs</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Festival Entry:</strong> Free<br/>
                        <strong>Village Visits:</strong> ₹50-100<br/>
                        <strong>Cultural Shows:</strong> ₹200-500<br/>
                        <strong>Photography:</strong> ₹100-200<br/>
                        <strong>Guided Tours:</strong> ₹500-1000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground">Best For</h4>
                      <p className="text-sm text-muted-foreground">
                        • Cultural enthusiasts<br/>
                        • Photography lovers<br/>
                        • Anthropology students<br/>
                        • Nature lovers<br/>
                        • Spiritual seekers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mountain className="text-primary mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-foreground">Weather</h4>
                      <p className="text-sm text-muted-foreground">
                        <strong>Temperature:</strong> 20-30°C<br/>
                        <strong>Season:</strong> Pleasant spring<br/>
                        <strong>Rainfall:</strong> Minimal<br/>
                        <strong>Best Time:</strong> Early morning & evening
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rituals & Traditions */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Palette className="mr-2 text-orange-600" size={20} />
                  Sacred Rituals & Traditions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">🌳 Sal Tree Worship</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      The Pahan (tribal priest) performs elaborate rituals around the sacred Sal tree, 
                      offering prayers for prosperity and seeking blessings from nature spirits.
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-2">💧 Lota Pani Ritual</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Women perform the sacred water ritual, washing the feet of the Pahan as a sign 
                      of respect and devotion, symbolizing purification and renewal.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">🎭 Jhumar Dance</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Traditional circular dance performed by men and women in colorful attire, 
                      accompanied by drums, flutes, and traditional instruments.
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-2">🍽️ Community Feast</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Grand feast featuring traditional tribal cuisine including rice beer (handia), 
                      roasted meat, and seasonal vegetables prepared in traditional methods.
                    </p>
                  </div>
                </div>
              </div>

              {/* Cultural Experiences */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Music className="mr-2 text-purple-600" size={20} />
                  Cultural Experiences
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Music className="text-purple-600" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Traditional Music</h4>
                    <p className="text-sm text-muted-foreground">
                      Experience authentic tribal music with drums, flutes, and traditional instruments
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Palette className="text-purple-600" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Art & Crafts</h4>
                    <p className="text-sm text-muted-foreground">
                      Witness traditional handicrafts, pottery, and tribal art demonstrations
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Utensils className="text-purple-600" size={24} />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">Tribal Cuisine</h4>
                    <p className="text-sm text-muted-foreground">
                      Taste authentic tribal food prepared using traditional cooking methods
                    </p>
                  </div>
                </div>
              </div>

              {/* Travel Tips */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Trophy className="mr-2 text-blue-600" size={20} />
                  Travel Tips & Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">📸 Photography</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      • Ask permission before photographing rituals<br/>
                      • Early morning light is best for ceremonies<br/>
                      • Respect sacred spaces and traditions<br/>
                      • Capture the vibrant colors and expressions
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-2">🎒 What to Bring</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      • Comfortable walking shoes<br/>
                      • Light cotton clothing<br/>
                      • Sunscreen and hat<br/>
                      • Camera with extra batteries<br/>
                      • Cash for local purchases
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">🏨 Accommodation</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      • Book hotels in Ranchi/Khunti early<br/>
                      • Consider homestays in tribal villages<br/>
                      • Budget: ₹800-2000 per night<br/>
                      • Luxury: ₹3000-8000 per night
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-2">🚗 Getting There</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      • Fly to Ranchi Airport (RNC)<br/>
                      • Train to Ranchi/Khunti stations<br/>
                      • Local transport: buses, taxis<br/>
                      • Village visits: guided tours recommended
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Visit */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Star className="mr-2 text-green-600" size={20} />
                  Why Visit Sarhul Festival?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">🌱 Cultural Immersion</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Experience authentic tribal culture, traditions, and way of life that has remained 
                      unchanged for centuries. Witness living history and cultural heritage.
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-2">📚 Educational Value</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn about tribal customs, environmental conservation, and the deep connection 
                      between indigenous communities and nature.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">📸 Photography Paradise</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Capture stunning images of traditional costumes, rituals, dances, and the vibrant 
                      atmosphere of this unique cultural celebration.
                    </p>
                    
                    <h4 className="font-semibold text-foreground mb-2">🤝 Community Connection</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Interact with friendly tribal communities, participate in their celebrations, 
                      and create meaningful cultural exchanges and memories.
                    </p>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-2">Ready to Experience Sarhul Festival?</h3>
                <p className="text-muted-foreground mb-4">
                  Don't miss this once-in-a-lifetime opportunity to witness Jharkhand's most sacred cultural celebration
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button className="bg-primary hover:bg-primary-light">
                    <Calendar className="mr-2" size={16} />
                    Plan Your Visit
                  </Button>
                  <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
                    <Ticket className="mr-2" size={16} />
                    Get Festival Updates
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* List Event Button */}
        <LuxuryCard className="mt-6 text-center bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
          <div className="py-4">
            <Plus className="mx-auto text-accent mb-2" size={24} />
            <h3 className="font-playfair font-semibold text-foreground mb-1">
              List Your Event
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Promote your cultural events to thousands of visitors
            </p>
            <Button 
              variant="outline" 
              className="text-accent border-accent"
              onClick={() => navigate("/event-registration")}
            >
              List Event
            </Button>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}