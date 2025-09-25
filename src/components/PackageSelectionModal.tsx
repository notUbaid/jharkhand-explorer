import { useState } from "react";
import { packages } from "@/data/packages";
import { Package } from "@/types/Package";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Search, Star, Clock, Users, IndianRupee } from "lucide-react";
import { usePackageComparison } from "@/contexts/PackageComparisonContext";

interface PackageSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (pkg: Package) => void;
  excludeId?: number;
}

export const PackageSelectionModal = ({ isOpen, onClose, onSelect, excludeId }: PackageSelectionModalProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { leftPackage } = usePackageComparison();

  if (!isOpen) return null;

  const filteredPackages = packages.filter(pkg => 
    pkg.id !== excludeId && 
    (pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     pkg.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Select Package to Compare</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Choose a package to compare with {leftPackage?.title}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        {/* Search */}
        <div className="p-6 border-b">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search packages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Packages List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="border border-border rounded-lg p-4 hover:border-primary transition-colors cursor-pointer"
                onClick={() => {
                  onSelect(pkg);
                  onClose();
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-20 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-2 mb-2">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                      {pkg.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {pkg.duration}
                      </div>
                      <div className="flex items-center">
                        <Users size={12} className="mr-1" />
                        {pkg.groupSize}
                      </div>
                      <div className="flex items-center">
                        <Star size={12} className="mr-1 text-accent fill-accent" />
                        {pkg.rating}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <IndianRupee size={14} className="text-accent" />
                        <span className="font-bold text-accent text-sm">{pkg.price}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {pkg.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No packages found matching your search.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-muted/30">
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
