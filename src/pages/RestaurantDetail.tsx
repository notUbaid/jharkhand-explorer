import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, IndianRupee, ArrowLeft, Navigation, Heart } from "lucide-react";

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Restaurant #${id} • Discover Jharkhand`;
  }, [id]);

  return (
    <div className="pb-20 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Dining</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Restaurant #{id}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Menu snapshot, ratings, and info</p>
      </header>

      <main className="px-6 -mt-4 space-y-4">
        <LuxuryCard className="p-0 overflow-hidden">
          <div className="h-44 bg-muted" />
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center"><MapPin size={14} className="mr-2" /> Ranchi</div>
              <div className="flex items-center"><Phone size={14} className="mr-2" /> +91-9876543213</div>
              <div className="flex items-center"><Star size={14} className="mr-2 text-accent" /> 4.6</div>
              <div className="flex items-center"><IndianRupee size={14} className="mr-2" /> ₹200-400</div>
            </div>
            <section>
              <h2 className="font-medium text-foreground mb-1">Good to Know</h2>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                <li>Veg options available</li>
                <li>Local specialties served</li>
                <li>Family friendly</li>
              </ul>
            </section>
            <div className="flex gap-2">
              <Button variant="outline"><Navigation size={16} className="mr-1" /> Directions</Button>
              <Button variant="outline">Open in Google</Button>
              <Button className="bg-primary hover:bg-primary-light"><Heart size={16} className="mr-1" /> Add to Favorites</Button>
            </div>
          </div>
        </LuxuryCard>
      </main>
    </div>
  );
}
