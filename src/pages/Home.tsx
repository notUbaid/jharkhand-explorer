import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SearchBar } from "@/components/ui/search-bar";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { 
  Phone, 
  Calendar, 
  ShoppingBag, 
  Car, 
  Building, 
  MapPin,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/jharkhand-hero.jpg";
import logoImage from "@/assets/Logo.jpg";
import topDestinationsImage from "@/assets/Home/Top Destinations.png";
import culturalHeritageImage from "@/assets/Home/Cultural Heritage.png";
import naturalWondersImage from "@/assets/Home/Natural Wonders.png";
import { useNavigate } from "react-router-dom";

const getQuickAccessItems = (t: (key: string) => string) => [
  { icon: MapPin, label: t("navigation.destinations"), path: "/destinations", color: "emerald" },
  { icon: Phone, label: "SOS", path: "/profile#settings", color: "red" },
  { icon: Calendar, label: t("navigation.events"), path: "/events", color: "emerald" },
  { icon: ShoppingBag, label: t("navigation.marketplace"), path: "/marketplace", color: "gold" },
  { icon: Car, label: t("navigation.transport"), path: "/transport", color: "emerald" },
  { icon: Building, label: t("navigation.stays"), path: "/stays", color: "gold" },
];

const getHighlights = (t: (key: string) => string) => [
  {
    title: t("home.highlights.topDestinations"),
    subtitle: t("home.highlights.topDestinationsSubtitle"),
    image: topDestinationsImage,
  },
  {
    title: t("home.highlights.culturalHeritage"),
    subtitle: t("home.highlights.culturalHeritageSubtitle"),
    image: culturalHeritageImage,
  },
  {
    title: t("home.highlights.naturalWonders"),
    subtitle: t("home.highlights.naturalWondersSubtitle"),
    image: naturalWondersImage,
  },
];

export default function Home() {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const navigate = useNavigate();

  const quickAccessItems = getQuickAccessItems(t);
  const highlights = getHighlights(t);

  const nextHighlight = () => {
    setCurrentHighlight((prev) => (prev + 1) % highlights.length);
  };

  const prevHighlight = () => {
    setCurrentHighlight((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  // Auto-transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % highlights.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [highlights.length]);

  return (
    <div className="pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-primary text-primary-foreground px-6 pt-12 pb-8">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative z-10">
          {/* Logo and Controls */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1"></div>
            <div className="flex gap-2">
              <DarkModeToggle />
              <LanguageToggle />
            </div>
          </div>
          
          {/* Main Branding */}
          <div className="text-center mb-8">
            <img 
              src={logoImage} 
              alt={t("home.logoAlt")} 
              className="w-20 h-20 mx-auto mb-6 rounded-full object-cover shadow-lg"
            />
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-white drop-shadow-lg">
              {t("home.title")}
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium drop-shadow-md">
              {t("home.subtitle")}
            </p>
          </div>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
            <SearchBar 
              value={searchValue}
              onChange={setSearchValue}
              placeholder="Search destinations, experiences, products, events, tour guides..."
              className="mb-4"
            />
          </form>
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Highlights Carousel */}
        <LuxuryCard className="mb-6 p-0 overflow-hidden">
          <div className="relative h-48">
            <img 
              src={highlights[currentHighlight].image} 
              alt={highlights[currentHighlight].title}
              className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/17" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-playfair text-xl font-bold mb-1 drop-shadow-lg transition-all duration-1000 ease-in-out">
                {highlights[currentHighlight].title}
              </h3>
              <p className="text-white/90 text-sm drop-shadow-md transition-all duration-1000 ease-in-out">
                {highlights[currentHighlight].subtitle}
              </p>
            </div>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevHighlight}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button 
              onClick={nextHighlight}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-all"
            >
              <ChevronRight size={16} />
            </button>
            
            {/* Dots indicator */}
            <div className="absolute bottom-2 right-4 flex space-x-1">
              {highlights.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentHighlight ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </LuxuryCard>

        {/* Quick Access */}
        <div className="section-spacing mb-6">
          <h2 className="section-title">
            {t("home.quickAccess")}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {quickAccessItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <LuxuryCard 
                  key={index}
                  className="text-center py-4 px-2"
                  onClick={() => navigate(item.path)}
                >
                  <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                    item.color === 'emerald' 
                      ? 'bg-primary/10 text-primary' 
                      : item.color === 'red'
                      ? 'bg-red-500/10 text-red-500'
                      : 'bg-accent/10 text-accent'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                </LuxuryCard>
              );
            })}
          </div>
        </div>

        {/* Festival Spotlight */}
        <LuxuryCard className="mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-accent" size={24} />
            </div>
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2 bg-accent/10 text-accent border-accent/20">
                {t("home.festivalSpotlight")}
              </Badge>
              <h3 className="font-playfair font-semibold text-foreground mb-1">
                {t("home.sarhulFestival2025")}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {t("home.sarhulDescription")}
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/events')}
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                {t("common.viewMore")} <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        </LuxuryCard>

        {/* Fact of the Day */}
        <LuxuryCard className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="text-primary-foreground" size={20} />
            </div>
            <div>
              <h3 className="font-playfair font-semibold text-primary mb-2">
                {t("home.factOfTheDay")}
              </h3>
              <p className="text-sm text-foreground">
                {t("home.factContent")}
              </p>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}