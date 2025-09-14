import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, IndianRupee, Users } from "lucide-react";

export default function StayCompare() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { stays?: number[] } };
  const selected = location.state?.stays ?? [];

  useEffect(() => {
    document.title = `Compare Stays • Discover Jharkhand`;
  }, []);

  return (
    <div className="pb-20 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Compare Stays</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Side-by-side overview</p>
      </header>

      <main className="px-6 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {[0,1].map((col) => (
            <LuxuryCard key={col} className="space-y-3">
              <div className="h-28 bg-muted rounded-md" />
              <h3 className="font-medium text-foreground">Stay #{selected[col] ?? '—'}</h3>
              <div className="text-sm text-muted-foreground flex items-center"><Star size={14} className="mr-1 text-accent" /> 4.6</div>
              <div className="text-sm text-muted-foreground flex items-center"><Users size={14} className="mr-1" /> 2 guests</div>
              <div className="text-sm text-muted-foreground flex items-center"><IndianRupee size={14} className="mr-1" /> ₹4,500 / night</div>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                <li>WiFi, AC, Parking</li>
                <li>Breakfast included</li>
                <li>Central location</li>
              </ul>
            </LuxuryCard>
          ))}
        </div>
      </main>
    </div>
  );
}
