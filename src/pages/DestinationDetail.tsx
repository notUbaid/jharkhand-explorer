import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, IndianRupee, Phone, Navigation, Eye, Heart, ArrowLeft, Accessibility } from "lucide-react";

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Destination #${id} • Discover Jharkhand`;
  }, [id]);

  return (
    <div className="pb-20 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Nature</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Destination #{id}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">About, history, attractions and tips</p>
      </header>

      <main className="px-6 -mt-4 space-y-4">
        <LuxuryCard className="p-0 overflow-hidden">
          <div className="grid grid-cols-3 gap-1 bg-muted p-1">
            {[1,2,3].map((i) => (
              <div key={i} className="h-28 bg-muted-foreground/10" />
            ))}
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center"><MapPin size={14} className="mr-2" /> Palamu District</div>
              <div className="flex items-center"><Clock size={14} className="mr-2" /> 6:00 AM - 6:00 PM</div>
              <div className="flex items-center"><IndianRupee size={14} className="mr-2" /> ₹30 Entry</div>
              <div className="flex items-center"><Phone size={14} className="mr-2" /> +91-9876543210</div>
            </div>

            <section>
              <h2 className="font-medium text-foreground mb-1">About</h2>
              <p className="text-sm text-muted-foreground">One of the finest wildlife reserves in Eastern India. Placeholder description detailing history and significance.</p>
            </section>
            <section>
              <h3 className="font-medium text-foreground mb-1">Key Attractions</h3>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                <li>Safari routes and watch towers</li>
                <li>Rich flora and fauna</li>
                <li>Sunset viewpoints</li>
              </ul>
            </section>
            <section>
              <h3 className="font-medium text-foreground mb-1">Travel Tips</h3>
              <p className="text-sm text-muted-foreground">Carry ID, water, and follow park guidelines. Best visited early morning.</p>
            </section>
            <section>
              <h3 className="font-medium text-foreground mb-1">Accessibility</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline"><Accessibility size={12} className="mr-1" /> Wheelchair Access</Badge>
                <Badge variant="outline">Senior Friendly</Badge>
                <Badge variant="outline">Female Guide Available</Badge>
              </div>
            </section>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline"><Navigation size={16} className="mr-1" /> Get Directions</Button>
              <Button variant="outline"><Eye size={16} className="mr-1" /> 360° View</Button>
              <Button className="bg-primary hover:bg-primary-light"><Heart size={16} className="mr-1" /> Add to Favorites</Button>
              <Button variant="outline">Book Ticket</Button>
            </div>
          </div>
        </LuxuryCard>
      </main>
    </div>
  );
}
