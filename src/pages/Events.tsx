import { useState } from "react";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { SearchBar } from "@/components/ui/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Mountain
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "Sarhul Festival 2024",
    date: "March 15-17, 2024",
    location: "Ranchi Cultural Center",
    description: "Traditional Santhal spring festival celebrating nature's renewal",
    image: "/placeholder.svg",
    category: "Cultural",
    entryFee: "Free",
    timings: "9:00 AM - 9:00 PM",
    highlights: ["Tribal Dance", "Traditional Music", "Local Cuisine"],
    expectedAttendees: "5000+",
  },
  {
    id: 2,
    title: "Jharkhand Food Festival",
    date: "April 5-7, 2024",
    location: "Jamshedpur Convention Center",
    description: "Celebrate the diverse culinary heritage of Jharkhand",
    image: "/placeholder.svg",
    category: "Food",
    entryFee: "₹200",
    timings: "11:00 AM - 10:00 PM",
    highlights: ["Food Stalls", "Cooking Competitions", "Celebrity Chefs"],
    expectedAttendees: "3000+",
  },
  {
    id: 3,
    title: "Tribal Art Exhibition",
    date: "March 20-30, 2024",
    location: "State Museum, Ranchi",
    description: "Showcase of contemporary and traditional tribal artwork",
    image: "/placeholder.svg",
    category: "Art",
    entryFee: "₹50",
    timings: "10:00 AM - 6:00 PM",
    highlights: ["Live Demonstrations", "Artist Interactions", "Art Workshops"],
    expectedAttendees: "1500+",
  },
  {
    id: 4,
    title: "Adventure Sports Meet",
    date: "April 12-14, 2024",
    location: "Netarhat Hills",
    description: "Annual adventure sports competition in scenic hill station",
    image: "/placeholder.svg",
    category: "Adventure",
    entryFee: "₹500",
    timings: "6:00 AM - 6:00 PM",
    highlights: ["Rock Climbing", "Paragliding", "Mountain Biking"],
    expectedAttendees: "800+",
  },
  {
    id: 5,
    title: "Folk Music Night",
    date: "March 25, 2024",
    location: "Birsa Munda Stadium",
    description: "Evening of traditional Jharkhand folk music and dance",
    image: "/placeholder.svg",
    category: "Music",
    entryFee: "₹300",
    timings: "6:00 PM - 11:00 PM",
    highlights: ["Folk Singers", "Traditional Instruments", "Cultural Stories"],
    expectedAttendees: "2000+",
  },
];

const categoryIcons = {
  Cultural: Palette,
  Food: Utensils,
  Art: Palette,
  Adventure: Mountain,
  Music: Music,
};

export default function Events() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Cultural", "Food", "Art", "Adventure", "Music"];

  const getCategoryIcon = (category: string) => {
    const Icon = categoryIcons[category as keyof typeof categoryIcons];
    return Icon ? <Icon size={16} className="text-primary" /> : null;
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <h1 className="text-2xl font-playfair font-bold text-center mb-4">
          Events & Festivals
        </h1>
        <SearchBar 
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Search events, festivals..."
        />
      </div>

      <div className="px-6 -mt-2 relative z-10">
        {/* Category Filters */}
        <div className="section-spacing space-y-4 mb-6">
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
        <div className="space-y-4">
          {events.map((event) => (
            <LuxuryCard 
              key={event.id}
              className="p-0 overflow-hidden"
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="flex">
                <div className="w-24 h-24 bg-muted flex-shrink-0 relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge 
                    variant="secondary" 
                    className="absolute bottom-1 left-1 text-xs bg-white/90 text-foreground"
                  >
                    {event.category}
                  </Badge>
                </div>
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-playfair font-semibold text-foreground mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Calendar size={12} className="mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin size={12} className="mr-1" />
                        {event.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-sm font-medium mb-1">
                        <IndianRupee size={12} className="mr-1 text-accent" />
                        <span className="text-accent">{event.entryFee}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Users size={10} className="mr-1" />
                        {event.expectedAttendees}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock size={10} className="mr-1" />
                      {event.timings}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {event.highlights.slice(0, 2).map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {event.highlights.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{event.highlights.length - 2}
                        </Badge>
                      )}
                    </div>
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