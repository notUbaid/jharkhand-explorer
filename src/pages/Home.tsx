import { useState } from "react";
import { SearchBar } from "@/components/ui/search-bar";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Calendar, 
  ShoppingBag, 
  Car, 
  Building, 
  Shield,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/jharkhand-hero.jpg";
import { useNavigate } from "react-router-dom";

const quickAccessItems = [
  { icon: Package, label: "Packages", path: "/packages", color: "emerald" },
  { icon: Calendar, label: "Events", path: "/events", color: "gold" },
  { icon: ShoppingBag, label: "Marketplace", path: "/marketplace", color: "emerald" },
  { icon: Car, label: "Rentals", path: "/transport", color: "gold" },
  { icon: Building, label: "Hotels", path: "/stays", color: "emerald" },
  { icon: Shield, label: "SOS Hub", path: "/profile", color: "gold" },
];

const highlights = [
  {
    title: "Top Destinations",
    subtitle: "Discover hidden gems",
    image: heroImage,
  },
  {
    title: "Cultural Heritage",
    subtitle: "Rich tribal traditions",
    image: heroImage,
  },
  {
    title: "Natural Wonders",
    subtitle: "Pristine landscapes",
    image: heroImage,
  },
];

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const navigate = useNavigate();

  const nextHighlight = () => {
    setCurrentHighlight((prev) => (prev + 1) % highlights.length);
  };

  const prevHighlight = () => {
    setCurrentHighlight((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="relative bg-primary text-primary-foreground px-6 pt-12 pb-8">
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative z-10">
          <h1 className="text-2xl font-playfair font-bold text-center mb-2">
            Discover Jharkhand
          </h1>
          <p className="text-center text-primary-foreground/80 mb-6">
            Premium tourism experiences await
          </p>
          
          {/* Search Bar */}
          <SearchBar 
            value={searchValue}
            onChange={setSearchValue}
            className="mb-4"
          />
        </div>
      </div>

      <div className="px-6 -mt-4 relative z-10">
        {/* Highlights Carousel */}
        <LuxuryCard className="mb-6 p-0 overflow-hidden">
          <div className="relative h-48">
            <img 
              src={highlights[currentHighlight].image} 
              alt={highlights[currentHighlight].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-playfair text-xl font-bold mb-1">
                {highlights[currentHighlight].title}
              </h3>
              <p className="text-white/80 text-sm">
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
            Quick Access
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
                Festival Spotlight
              </Badge>
              <h3 className="font-playfair font-semibold text-foreground mb-1">
                Sarhul Festival 2024
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Experience the vibrant celebration of spring with traditional Santhal rituals and cultural performances.
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/events')}
                className="text-primary border-primary hover:bg-primary hover:text-primary-foreground"
              >
                View More <ArrowRight size={14} className="ml-1" />
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
                Jharkhand Fact of the Day
              </h3>
              <p className="text-sm text-foreground">
                Jharkhand is home to over 30 tribal communities, making it one of India's most culturally diverse states. The state's name literally means "land of forests."
              </p>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}