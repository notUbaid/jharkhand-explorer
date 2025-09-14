import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, IndianRupee, ArrowLeft } from "lucide-react";

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Experience #${id} • Discover Jharkhand`;
  }, [id]);

  return (
    <div className="pb-20 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Workshop</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Experience #{id}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Learn, create, and enjoy</p>
      </header>

      <main className="px-6 -mt-4 space-y-4">
        <LuxuryCard className="p-0 overflow-hidden">
          <div className="h-44 bg-muted" />
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center"><Clock size={14} className="mr-2" /> 4 hours</div>
              <div className="flex items-center"><Calendar size={14} className="mr-2" /> Tomorrow 10:00 AM</div>
              <div className="flex items-center"><MapPin size={14} className="mr-2" /> Ranchi</div>
            </div>
            <div className="flex items-center text-sm">
              <IndianRupee size={16} className="text-accent mr-1" /> <span className="font-bold text-accent">₹1,500</span>
            </div>
            <section>
              <h2 className="font-medium text-foreground mb-1">Good to Know</h2>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                <li>All materials provided</li>
                <li>Beginner friendly</li>
                <li>Certificate of participation</li>
              </ul>
            </section>
            <Button className="bg-primary hover:bg-primary-light">Book Now</Button>
          </div>
        </LuxuryCard>
      </main>
    </div>
  );
}
