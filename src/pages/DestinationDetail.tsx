import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, IndianRupee, Phone, Navigation, Eye, Heart, ArrowLeft, Accessibility, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { getDestinationById } from "@/data/destinations";
export default function DestinationDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination] = useState(() => getDestinationById(id || "1"));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    document.title = `${destination.name} • Discover Jharkhand`;
    // Scroll to top when component mounts or destination changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [destination.name, id]);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, [destination.images]);

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate('/destinations?tab=spots')}>
            <ArrowLeft size={14} className="mr-1" /> {t("common.back")}
          </Button>
          <Badge variant="secondary">{destination.category}</Badge>
        </div>
        <h1 className="text-2xl font-bold font-inter">{destination.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="text-accent fill-accent" size={16} />
            <span className="text-sm font-medium ml-1">{destination.rating}</span>
          </div>
          <span className="text-primary-foreground/60 text-sm">•</span>
          <span className="text-primary-foreground/80 text-sm">{t("common.exploreDiscover")}</span>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Images Section */}
        <div className="space-y-3 relative">
          <div className="relative">
            {/* Left scroll button */}
            {canScrollLeft && (
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollLeft}
              >
                <ChevronLeft size={20} />
              </Button>
            )}
            
            {/* Right scroll button */}
            {canScrollRight && (
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollRight}
              >
                <ChevronRight size={20} />
              </Button>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
            {destination.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-[32rem] h-96 bg-muted rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${destination.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                />
              </div>
            )) || (
                <div className="flex-shrink-0 w-[32rem] h-96 bg-muted rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt={`${destination.name} view`}
                    className="w-full h-full object-cover"
                />
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center"><MapPin size={14} className="mr-2" /> {destination.location}</div>
          <div className="flex items-center"><Clock size={14} className="mr-2" /> {destination.timings}</div>
          <div className="flex items-center"><IndianRupee size={14} className="mr-2" /> {destination.entryFee}</div>
          <div className="flex items-center"><Phone size={14} className="mr-2" /> {destination.contact}</div>
        </div>

        {/* Content Sections */}
        <section>
          <h2 className="font-medium text-foreground mb-2">{t("common.about")}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{destination.description}</p>
        </section>
        
        <section>
          <h3 className="font-medium text-foreground mb-2">{t("common.keyAttractions")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{destination.keyAttractions}</p>
        </section>
        
        <section>
          <h3 className="font-medium text-foreground mb-2">{t("common.travelTips")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{destination.travelTips}</p>
        </section>
        
        <section>
          <h3 className="font-medium text-foreground mb-2">{t("common.accessibility")}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{destination.accessibility}</p>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pb-4">
          {destination.directionsLink && (
            <Button 
              variant="outline" 
              onClick={() => window.open(destination.directionsLink, '_blank')}
            >
              <Navigation size={16} className="mr-1" /> {t("common.moreInfo")}
            </Button>
          )}
          {destination.view360Link && (
            <Button 
              variant="outline"
              onClick={() => window.open(destination.view360Link, '_blank')}
            >
              <Eye size={16} className="mr-1" /> {t("common.view360")}
            </Button>
          )}
          <Button className="bg-primary hover:bg-primary-light">
            <Heart size={16} className="mr-1" /> {t("common.addToFavorites")}
          </Button>
        </div>

        {/* Embedded Map */}
        {destination.embeddedMap && (
          <section className="mb-16">
            <h3 className="font-medium text-foreground mb-3">Location Map</h3>
            <div className="rounded-lg overflow-hidden shadow-md">
              <div 
                dangerouslySetInnerHTML={{ __html: destination.embeddedMap.replace('width="600" height="450"', 'width="100%" height="300"') }}
                className="w-full"
              />
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
