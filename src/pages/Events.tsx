import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
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
    title: "Tribal Arts & Textiles Expo 2025",
    date: "October 18–22, 2025",
    location: "Morhabadi Maidan, Ranchi",
    description: "Handicrafts & handloom exhibition focused on tribal artistry",
    image: "/placeholder.svg",
    category: "Cultural",
    entryFee: "₹50",
    timings: "11:00 AM – 8:00 PM",
    highlights: ["Live weaving demo (Tussar)", "Sohrai painting workshops", "Tribal fashion ramp show", "Artisan stalls from 14 districts"],
    expectedAttendees: "12,000",
  },
  {
    id: 2,
    title: "Jharkhand Coffee & Indigenous Beverage Fest",
    date: "December 6–8, 2025",
    location: "Eco Retreat Campus, Netarhat",
    description: "Culinary and beverage-focused fair",
    image: "/placeholder.svg",
    category: "Food",
    entryFee: "₹100",
    timings: "9:30 AM – 6:30 PM",
    highlights: ["Bamboo rice beer tasting", "Tribal coffee pop-ups (Latehar blend)", "Workshops on Mahua fermentation", "Wild fruit jams showcase"],
    expectedAttendees: "6,000",
  },
  {
    id: 3,
    title: "Seraikela Chhau Festival & Cultural Week",
    date: "January 10–14, 2026",
    location: "Rajmahal Grounds, Seraikela",
    description: "Performing arts and cultural celebration",
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "Business",
    entryFee: "₹300 (general), ₹100 (student)",
    timings: "10:00 AM – 5:30 PM",
    highlights: ["Panel talks on rural tech", "Funding pitch events", "Stalls by local SHGs and tribal start-ups", "Mentorship roundtables"],
    expectedAttendees: "3,000",
  },
  {
    id: 5,
    title: "Thekua & Tilkut Mahotsav",
    date: "December 28–30, 2025",
    location: "Nandan Pahar Grounds, Deoghar",
    description: "Traditional food festival",
    image: "/placeholder.svg",
    category: "Food",
    entryFee: "₹30",
    timings: "10:00 AM – 9:00 PM",
    highlights: ["30+ food stalls", "Live cooking of Thekua varieties", "Sweet-making contest", "Folk storytelling zone"],
    expectedAttendees: "15,000",
  },
  {
    id: 6,
    title: "Khatiani Mela (Indigenous Games & Sports Fair)",
    date: "February 2–5, 2026",
    location: "Dumka Stadium Grounds",
    description: "Tribal sports and community games",
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    category: "Food",
    entryFee: "Free with registration",
    timings: "10:00 AM – 6:00 PM",
    highlights: ["Jharkhand food showcase", "International exposure", "Culinary demonstrations", "Trade opportunities"],
    expectedAttendees: "8,000",
  },
  {
    id: 8,
    title: "Jharkhand Mining & Construction Show 2026",
    date: "January 29–31, 2026",
    location: "Prabhat Tara Ground, HEC Campus, Ranchi",
    description: "Industrial exhibition showcasing mining and construction technologies",
    image: "/placeholder.svg",
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Cultural", "Food", "Business", "Sports", "Music", "Art", "Adventure"];

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons];
    return Icon ? <Icon size={16} className="text-primary" /> : null;
  };

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
          <LanguageToggle />
        </div>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder={t("events.searchPlaceholder")}
        />
      </div>

      <div className="px-6 mt-6 relative z-10">
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
          {events.map((event) => (
            <LuxuryCard 
              key={event.id}
              className="p-0 overflow-hidden"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="relative">
                <div className="aspect-[4/3] bg-muted">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                
                <Badge 
                  variant="secondary" 
                  className="absolute top-2 left-2 text-xs bg-white/90 text-foreground"
                >
                  {event.category}
                </Badge>
              </div>
              
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-playfair font-semibold text-foreground mb-1 text-sm">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground mb-1">
                      <Calendar size={10} className="mr-1" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin size={10} className="mr-1" />
                      {event.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs font-medium mb-1">
                      <IndianRupee size={10} className="mr-1 text-accent" />
                      <span className="text-accent">{event.entryFee}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Users size={8} className="mr-1" />
                      {event.expectedAttendees}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {event.description}
                </p>
                  
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={8} className="mr-1" />
                    {event.timings}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {event.highlights.slice(0, 1).map((highlight, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                        {highlight}
                      </Badge>
                    ))}
                    {event.highlights.length > 1 && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        +{event.highlights.length - 1}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Featured Event Banner */}
        <LuxuryCard className="mt-6 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
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
            <Button variant="outline" className="text-accent border-accent">
              List Event
            </Button>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}