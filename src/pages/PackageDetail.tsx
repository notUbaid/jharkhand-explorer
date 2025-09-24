import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookingModal } from "@/components/BookingModal";
import { Clock, IndianRupee, Star, ArrowLeft, Share2, GitCompare, Users, MapPin, Calendar, Building, Utensils } from "lucide-react";
import { getPackageById } from "@/data/packages";
import { Package } from "@/types/Package";
import { usePackageComparison } from "@/contexts/PackageComparisonContext";
import { PackageSelectionModal } from "@/components/PackageSelectionModal";
import { PackageComparison } from "@/components/PackageComparison";
import { BookingItem } from "@/hooks/useBooking";
import { scrollManager } from "@/utils/scrollManager";

export default function PackageDetail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(getPackageById(id || "1"));
  const [showSelectionModal, setShowSelectionModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { setLeftPackage, setRightPackage, isComparing, setOpenComparisonModal } = usePackageComparison();

  useEffect(() => {
    const pkg = getPackageById(id || "1");
    setPackageData(pkg);
    document.title = `${pkg.title} • Discover Jharkhand`;
    scrollManager.scrollToTop(true);
  }, [id]);

  const handleComparePackage = () => {
    if (packageData) {
      setLeftPackage(packageData);
      setShowSelectionModal(true);
    }
  };

  const handlePackageSelect = (selectedPackage: Package) => {
    setRightPackage(selectedPackage);
    setOpenComparisonModal(true);
  };

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingSuccess = (bookingId: string) => {
    console.log('Booking successful:', bookingId);
    // You can add additional success handling here
  };


  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> {t("common.back")}
          </Button>
          <Badge variant="secondary">{packageData.category}</Badge>
        </div>
        <h1 className="text-2xl font-playfair font-bold">{packageData.title}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">{packageData.type}</p>
      </header>

      <main className="px-6 space-y-6 pt-6">
        {/* Package Info */}
        <div className="bg-muted/30 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-primary" />
              <div>
                <div className="text-muted-foreground text-xs">{t("common.duration")}</div>
                <div className="font-semibold">{packageData.duration}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-2 text-primary" />
              <div>
                <div className="text-muted-foreground text-xs">{t("common.groupSize")}</div>
                <div className="font-semibold">{packageData.groupSize}</div>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-primary" />
              <div>
                <div className="text-muted-foreground text-xs">{t("common.bestTime")}</div>
                <div className="font-semibold">{packageData.bestTime}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-muted">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="text-accent fill-accent" size={16} />
                <span className="text-lg font-semibold ml-2">{packageData.rating}</span>
                <span className="text-muted-foreground ml-1">{t("common.rating")}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <IndianRupee size={20} className="text-accent" />
                  <span className="text-2xl font-bold text-accent">{packageData.price}</span>
                </div>
                <div className="text-sm text-muted-foreground">per person</div>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{packageData.description}</p>
        </section>

        {/* Highlights Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">{t("common.highlights")}</h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {packageData.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                {highlight}
              </Badge>
            ))}
          </div>
        </section>

        {/* Itinerary Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">{t("common.itinerary")}</h3>
          <Accordion type="single" collapsible>
            {packageData.itinerary.map((day) => (
              <AccordionItem key={day.day} value={`day-${day.day}`}>
                <AccordionTrigger>{day.title}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{day.title}</h4>
                    <ul className="list-disc ml-4 space-y-1">
                      {day.activities.map((activity, index) => (
                        <li key={index} className="text-sm text-muted-foreground">{activity}</li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Accommodation Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">Accommodation</h3>
          <div className="space-y-2">
            {packageData.accommodation.map((acc, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <Building size={14} className="mt-0.5 text-muted-foreground" />
                <span className="text-sm">{acc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Meals Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">Meals</h3>
          <div className="space-y-2">
            {packageData.meals.map((meal, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <Utensils size={14} className="mt-0.5 text-muted-foreground" />
                <span className="text-sm">{meal}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Transport Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">Transport</h3>
          <div className="p-3 bg-muted rounded-lg">
            <span className="text-sm">{packageData.transport}</span>
          </div>
        </section>

        {/* Inclusions/Exclusions Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">{t("common.inclusionsExclusions")}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-success">{t("common.inclusions")}</h4>
              <ul className="list-disc ml-4 text-muted-foreground space-y-1">
                {packageData.inclusions.map((inclusion, index) => (
                  <li key={index}>{inclusion}</li>
                ))}
              </ul>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-destructive">Exclusions</h4>
              <ul className="list-disc ml-4 text-muted-foreground space-y-1">
                {packageData.exclusions.map((exclusion, index) => (
                  <li key={index}>{exclusion}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Travel Tips Section */}
        <section>
          <h3 className="font-medium text-foreground mb-2">{t("common.travelTips")}</h3>
          <div className="space-y-2">
            {packageData.travelTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pb-4">
          <Button className="bg-primary hover:bg-primary-light" onClick={handleBookNow}>{t("common.bookNow")}</Button>
          <Button variant="outline" onClick={handleComparePackage}>
            <GitCompare size={14} className="mr-1" /> {t("common.compare")} {t("common.package")}
          </Button>
          <Button variant="outline"><Share2 size={14} className="mr-1" /> {t("common.share")}</Button>
        </div>
      </main>

      {/* Package Selection Modal */}
      <PackageSelectionModal
        isOpen={showSelectionModal}
        onClose={() => setShowSelectionModal(false)}
        onSelect={handlePackageSelect}
        excludeId={packageData?.id}
      />

      {/* Package Comparison Modal */}
      <PackageComparison />

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bookingItems={packageData ? [{
          id: packageData.id.toString(),
          type: 'package',
          title: packageData.title,
          price: parseFloat(packageData.price.replace(/[₹,]/g, '')),
          quantity: 1,
          duration: packageData.duration,
          location: packageData.departureCity || 'Jharkhand',
          image: packageData.image,
          metadata: {
            category: packageData.category,
            type: packageData.type,
            groupSize: packageData.groupSize,
            bestTime: packageData.bestTime,
            rating: packageData.rating
          }
        }] : []}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}
