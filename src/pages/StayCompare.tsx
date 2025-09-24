import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, IndianRupee, Users, MapPin, Wifi, Car, Utensils, AirVent, Bath, Building } from "lucide-react";
import { getStayById } from "@/data/stays";

export default function StayCompare() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { stays?: number[] } };
  const selected = location.state?.stays ?? [];
  const [stays, setStays] = useState<any[]>([]);

  useEffect(() => {
    document.title = `Compare Stays • Discover Jharkhand`;
    
    // Load actual stay data
    const stayData = selected.map(id => getStayById(id.toString())).filter(Boolean);
    setStays(stayData);
  }, [selected]);

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={14} className="text-primary mr-1" />;
    if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car size={14} className="text-primary mr-1" />;
    if (amenityLower.includes('restaurant') || amenityLower.includes('food') || amenityLower.includes('dining')) return <Utensils size={14} className="text-primary mr-1" />;
    if (amenityLower.includes('ac') || amenityLower.includes('air')) return <AirVent size={14} className="text-primary mr-1" />;
    if (amenityLower.includes('pool') || amenityLower.includes('bath')) return <Bath size={14} className="text-primary mr-1" />;
    return <Building size={14} className="text-primary mr-1" />;
  };

  if (stays.length === 0) {
    return (
      <div className="pb-24 min-h-screen bg-background">
        <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
          <div className="flex items-center gap-3 mb-3">
            <Button variant="secondary" size="sm" onClick={() => navigate('/stays')}>
              <ArrowLeft size={14} className="mr-1" /> Back to Stays
            </Button>
          </div>
          <h1 className="text-2xl font-playfair font-bold">Compare Stays</h1>
          <p className="text-primary-foreground/80 text-sm mt-1">Side-by-side overview</p>
        </header>

        <main className="px-6 py-12">
          <div className="text-center">
            <Building size={48} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">No stays to compare</h2>
            <p className="text-muted-foreground mb-4">Select stays from the stays page to compare them here.</p>
            <Button onClick={() => navigate('/stays')}>Browse Stays</Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate('/stays')}>
            <ArrowLeft size={14} className="mr-1" /> Back to Stays
          </Button>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Compare Stays</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Side-by-side comparison of {stays.length} stays</p>
      </header>

      <main className="px-6 py-6">
        <div className={`grid gap-6 ${stays.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
          {stays.map((stay, index) => (
            <LuxuryCard key={stay.id} className="p-6 space-y-4">
              {/* Stay Image */}
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img 
                  src={stay.images[0]} 
                  alt={stay.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Basic Info */}
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{stay.name}</h3>
                  <Badge variant="outline">{stay.category}</Badge>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={14} className="mr-1" />
                  {stay.location}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={14} className="text-accent fill-accent mr-1" />
                    <span className="font-medium">{stay.rating}</span>
                    <span className="text-sm text-muted-foreground ml-1">rating</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1 text-muted-foreground" />
                    <span className="text-sm">{stay.capacity} guests</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="font-bold text-xl text-accent">{stay.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">/night</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Description</h4>
                <p className="text-sm text-muted-foreground line-clamp-3">{stay.description}</p>
              </div>

              {/* Amenities */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Amenities</h4>
                <div className="grid grid-cols-2 gap-2">
                  {stay.amenities.slice(0, 8).map((amenity: string, amenityIndex: number) => (
                    <div key={amenityIndex} className="flex items-center text-xs text-muted-foreground">
                      {getAmenityIcon(amenity)}
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Highlights</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {stay.highlights.slice(0, 5).map((highlight: string, highlightIndex: number) => (
                    <li key={highlightIndex} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t space-y-2">
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/stays/${stay.id}`)}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/stays/${stay.id}`)}
                >
                  Book Now
                </Button>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Add more stays */}
        {stays.length < 2 && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Add another stay to compare</p>
            <Button variant="outline" onClick={() => navigate('/stays')}>
              Browse More Stays
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
