import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, IndianRupee, Clock, Accessibility, ArrowLeft, Ticket } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Event Details #${id} • Discover Jharkhand`;
  }, [id]);

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Festival</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Event Details #{id}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">All key information at a glance</p>
      </header>

      <main className="px-6 space-y-6">
        {/* Event Image */}
        <div className="h-44 bg-muted rounded-lg">
          <img src="/placeholder.svg" alt={`Event ${id} hero`} className="w-full h-full object-cover rounded-lg" />
        </div>
        
        {/* Event Info */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center"><Calendar size={14} className="mr-2" /> March 15-17, 2024</div>
          <div className="flex items-center"><MapPin size={14} className="mr-2" /> Ranchi Cultural Center</div>
          <div className="flex items-center"><Clock size={14} className="mr-2" /> 9:00 AM - 9:00 PM</div>
          <div className="flex items-center"><IndianRupee size={14} className="mr-2" /> Free Entry</div>
        </div>

        {/* About Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">Vibrant celebration with traditional rituals, music, and cultural performances. Placeholder copy for detailed description.</p>
        </section>

        {/* Accessibility Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">Accessibility</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline"><Accessibility size={12} className="mr-1" /> Wheelchair Access</Badge>
            <Badge variant="outline">Women Friendly</Badge>
            <Badge variant="outline">Senior Friendly</Badge>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pb-4">
          <Button className="bg-primary hover:bg-primary-light">
            <Ticket size={16} className="mr-1" /> Book Ticket
          </Button>
          <Button variant="outline">Add to Favorites</Button>
        </div>
      </main>
    </div>
  );
}
