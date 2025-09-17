import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, IndianRupee, Star } from "lucide-react";

export default function PackageCompare() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { packages?: number[] } };
  const selected = location.state?.packages ?? [];

  useEffect(() => {
    document.title = `Compare Packages • Discover Jharkhand`;
  }, []);

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Compare Packages</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Side-by-side overview</p>
      </header>

      <main className="px-6 -mt-4">
        <div className="grid grid-cols-2 gap-3">
          {[0,1].map((col) => (
            <LuxuryCard key={col} className="space-y-3">
              <div className="h-28 bg-muted rounded-md" />
              <h3 className="font-medium text-foreground">Package #{selected[col] ?? '—'}</h3>
              <div className="text-sm text-muted-foreground flex items-center"><Clock size={14} className="mr-1" /> 5D/4N</div>
              <div className="text-sm text-muted-foreground flex items-center"><Star size={14} className="mr-1 text-accent" /> 4.8</div>
              <div className="text-sm text-muted-foreground flex items-center"><IndianRupee size={14} className="mr-1" /> ₹25,000</div>
              <ul className="list-disc ml-4 text-sm text-muted-foreground">
                <li>Highlight 1</li>
                <li>Highlight 2</li>
                <li>Highlight 3</li>
              </ul>
            </LuxuryCard>
          ))}
        </div>
      </main>
    </div>
  );
}
