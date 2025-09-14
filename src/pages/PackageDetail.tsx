import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, IndianRupee, Star, ArrowLeft, Share2, GitCompare } from "lucide-react";

export default function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Package Details #${id} • Discover Jharkhand`;
  }, [id]);

  return (
    <div className="pb-20 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Cultural</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">Package Details #{id}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Curated itinerary with highlights</p>
      </header>

      <main className="px-6 -mt-4 space-y-4">
        <LuxuryCard className="p-0 overflow-hidden">
          <div className="h-44 bg-muted" />
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" /> 5 Days / 4 Nights
              </div>
              <div className="flex items-center">
                <Star className="text-accent fill-accent" size={14} />
                <span className="text-sm font-medium ml-1">4.8</span>
              </div>
              <div className="flex items-center">
                <IndianRupee size={16} className="text-accent" />
                <span className="font-bold text-accent">₹25,000</span>
              </div>
            </div>

            <section>
              <h2 className="font-medium text-foreground mb-1">About</h2>
              <p className="text-sm text-muted-foreground">Immerse in Jharkhand's tribal culture with village visits, performances, and workshops. Placeholder description.</p>
            </section>

            <section>
              <h3 className="font-medium text-foreground mb-2">Highlights</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Village Visit', 'Dance Performance', 'Handicraft Workshop'].map((h) => (
                  <Badge key={h} variant="secondary" className="bg-primary/10 text-primary">{h}</Badge>
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-medium text-foreground mb-2">Itinerary</h3>
              <Accordion type="single" collapsible>
                {[1,2,3,4,5].map((day) => (
                  <AccordionItem key={day} value={`day-${day}`}>
                    <AccordionTrigger>Day {day}</AccordionTrigger>
                    <AccordionContent>
                      <div className="h-28 bg-muted rounded-md mb-2" />
                      <p className="text-sm text-muted-foreground">Planned activities and sightseeing for day {day}. Placeholder content.</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <section>
              <h3 className="font-medium text-foreground mb-2">Inclusions / Exclusions</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <LuxuryCard>
                  <h4 className="font-medium mb-1">Inclusions</h4>
                  <ul className="list-disc ml-4 text-muted-foreground">
                    <li>Stay & Breakfast</li>
                    <li>Local Transport</li>
                    <li>Guide</li>
                  </ul>
                </LuxuryCard>
                <LuxuryCard>
                  <h4 className="font-medium mb-1">Exclusions</h4>
                  <ul className="list-disc ml-4 text-muted-foreground">
                    <li>Flights</li>
                    <li>Personal Expenses</li>
                    <li>Optional Activities</li>
                  </ul>
                </LuxuryCard>
              </div>
            </section>

            <section>
              <h3 className="font-medium text-foreground mb-2">Accessibility</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                <Badge variant="outline">Wheelchair Access</Badge>
                <Badge variant="outline">Senior Friendly</Badge>
                <Badge variant="outline">Female Guide Available</Badge>
              </div>
            </section>

            <div className="flex gap-2">
              <Button className="bg-primary hover:bg-primary-light">Book Now</Button>
              <Button variant="outline" onClick={() => navigate('/packages/compare') }>
                <GitCompare size={14} className="mr-1" /> Compare
              </Button>
              <Button variant="outline"><Share2 size={14} className="mr-1" /> Share</Button>
            </div>
          </div>
        </LuxuryCard>
      </main>
    </div>
  );
}
