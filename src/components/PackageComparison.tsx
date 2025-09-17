import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Star, Clock, Users, IndianRupee, Calendar, MapPin, Check, X as XIcon } from "lucide-react";
import { usePackageComparison } from "@/contexts/PackageComparisonContext";
import { Package } from "@/types/Package";

export const PackageComparison = () => {
  const { leftPackage, rightPackage, clearComparison } = usePackageComparison();

  if (!leftPackage || !rightPackage) return null;

  const renderPackageDetails = (pkg: Package, side: 'left' | 'right') => (
    <div className="flex-1">
      {/* Package Header */}
      <div className="text-center mb-6">
        <div className="w-32 h-24 bg-muted rounded-lg overflow-hidden mx-auto mb-4">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-foreground text-lg mb-2 line-clamp-2">
          {pkg.title}
        </h3>
        <Badge variant="outline" className="mb-3">
          {pkg.category}
        </Badge>
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star size={14} className="text-accent fill-accent mr-1" />
            {pkg.rating}
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {pkg.duration}
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            {pkg.groupSize}
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="text-center mb-6 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-center">
          <IndianRupee size={20} className="text-accent" />
          <span className="text-2xl font-bold text-accent ml-1">{pkg.price}</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">per person</div>
      </div>

      {/* Details */}
      <div className="space-y-4">
        {/* Best Time */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2 flex items-center">
            <Calendar size={14} className="mr-2" />
            Best Time to Visit
          </h4>
          <p className="text-sm text-muted-foreground">{pkg.bestTime}</p>
        </div>

        {/* Departure City */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2 flex items-center">
            <MapPin size={14} className="mr-2" />
            Departure City
          </h4>
          <p className="text-sm text-muted-foreground">{pkg.departureCity}</p>
        </div>

        {/* Accommodation */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">Accommodation</h4>
          <p className="text-sm text-muted-foreground">{pkg.accommodation}</p>
        </div>

        {/* Meals */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">Meals</h4>
          <p className="text-sm text-muted-foreground">{pkg.meals}</p>
        </div>

        {/* Transport */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">Transport</h4>
          <p className="text-sm text-muted-foreground">{pkg.transport}</p>
        </div>

        {/* Inclusions */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">Inclusions</h4>
          <div className="space-y-1">
            {pkg.inclusions.map((inclusion: string, index: number) => (
              <div key={index} className="flex items-start text-sm text-muted-foreground">
                <Check size={12} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{inclusion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Exclusions */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">Exclusions</h4>
          <div className="space-y-1">
            {pkg.exclusions.map((exclusion: string, index: number) => (
              <div key={index} className="flex items-start text-sm text-muted-foreground">
                <XIcon size={12} className="text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{exclusion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Tips */}
        <div>
          <h4 className="font-medium text-foreground text-sm mb-2">Travel Tips</h4>
          <p className="text-sm text-muted-foreground">{pkg.travelTips}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-foreground">Package Comparison</h2>
          <Button variant="ghost" size="sm" onClick={clearComparison}>
            <X size={20} />
          </Button>
        </div>

        {/* Comparison Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="flex gap-8">
            {/* Left Package */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <Badge variant="secondary" className="text-xs">Package A</Badge>
              </div>
              {renderPackageDetails(leftPackage, 'left')}
            </div>

            {/* Divider */}
            <div className="w-px bg-border"></div>

            {/* Right Package */}
            <div className="flex-1">
              <div className="text-center mb-4">
                <Badge variant="secondary" className="text-xs">Package B</Badge>
              </div>
              {renderPackageDetails(rightPackage, 'right')}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/30">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Compare packages side-by-side to make the best choice
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={clearComparison}>
                Close Comparison
              </Button>
              <Button className="bg-primary hover:bg-primary-light">
                Book Package A
              </Button>
              <Button className="bg-primary hover:bg-primary-light">
                Book Package B
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
