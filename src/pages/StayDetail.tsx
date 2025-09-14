import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, IndianRupee, Users, Wifi, AirVent, Car, Utensils, Bath, ArrowLeft, GitCompare } from "lucide-react";

export default function StayDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Stay #${id} • Discover Jharkhand`;
  }, [id]);

  const amenityIcon = (name: string) => {
    switch (name) {
      case 'WiFi': return <Wifi size={12} />;
      case 'AC': return <AirVent size={12} />;
      case 'Parking': return <Car size={12} />;
      case 'Restaurant': return <Utensils size={12} />;
      case 'Pool': return <Bath size={12} />;
      default: return null;
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Hotel</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Stay #{id}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">About, amenities, and booking</p>
      </header>

      <main className="px-6 -mt-4 space-y-4">
        <LuxuryCard className="p-0 overflow-hidden">
          <div className="h-52 bg-muted" />
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center"><MapPin size={14} className="mr-2" /> Ranchi</div>
              <div className="flex items-center"><Star size={14} className="mr-2 text-accent" /> 4.6</div>
              <div className="flex items-center"><Users size={14} className="mr-2" /> 2 guests</div>
              <div className="flex items-center"><IndianRupee size={14} className="mr-2" /> ₹4,500 / night</div>
            </div>

            <section>
              <h2 className="font-medium text-foreground mb-1">About</h2>
              <p className="text-sm text-muted-foreground">Premium accommodation with modern amenities and warm hospitality. Placeholder description.</p>
            </section>

            <section>
              <h3 className="font-medium text-foreground mb-2">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {['WiFi','AC','Parking','Restaurant','Pool'].map(a => (
                  <Badge key={a} variant="secondary" className="flex items-center gap-1">
                    {amenityIcon(a)} <span>{a}</span>
                  </Badge>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-medium text-foreground mb-2">Accessibility</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">Wheelchair Access</Badge>
                <Badge variant="outline">Ramp</Badge>
                <Badge variant="outline">Wide Doorways</Badge>
              </div>
            </section>

            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary-light">Book Now</Button>
              <Button variant="outline" onClick={() => navigate('/stays/compare')}>
                <GitCompare size={14} className="mr-1" /> Compare
              </Button>
            </div>
          </div>
        </LuxuryCard>
      </main>
    </div>
  );
}
