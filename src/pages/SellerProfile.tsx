import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { MessagingModal } from "@/components/MessagingModal";
import { products } from "@/data/products";
import { SellerProfile } from "@/data/products";
import { 
  Star, 
  User, 
  ArrowLeft, 
  MapPin,
  Clock,
  Shield,
  Phone,
  Mail,
  Calendar,
  Package,
  Instagram,
  Facebook,
  Globe,
  Award,
  Users,
  Heart,
  MessageCircle
} from "lucide-react";

export default function SellerProfilePage() {
  const { sellerId } = useParams<{ sellerId: string }>();
  const navigate = useNavigate();
  const [sellerProfile, setSellerProfile] = useState<SellerProfile | null>(null);
  const [sellerProducts, setSellerProducts] = useState<typeof products>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMessagingModal, setShowMessagingModal] = useState(false);

  useEffect(() => {
    // Find seller profile by sellerId (which is the business name)
    const product = products.find(p => p.sellerProfile.businessName === sellerId);
    if (product) {
      setSellerProfile(product.sellerProfile);
      // Get all products from this seller
      const productsFromSeller = products.filter(p => p.sellerProfile.businessName === sellerId);
      setSellerProducts(productsFromSeller);
    }
    setIsLoading(false);
    
    if (product) {
      document.title = `${product.sellerProfile.businessName} • Discover Jharkhand`;
    } else {
      document.title = `Seller Not Found • Discover Jharkhand`;
    }
  }, [sellerId]);

  const handleContactSeller = () => {
    setShowMessagingModal(true);
  };

  const handleFollowSeller = () => {
    if (sellerProfile) {
      // Simulate following seller
      alert(`Following ${sellerProfile.businessName}!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading seller profile...</p>
        </div>
      </div>
    );
  }

  if (!sellerProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Seller Not Found</h1>
          <p className="text-muted-foreground mb-6">The seller you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/marketplace")} variant="outline">
            <ArrowLeft className="mr-2" size={16} />
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6">
        <div className="flex justify-between items-start mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back
          </Button>
          <LanguageToggle />
        </div>
      </div>

      <div className="px-6 py-6 pb-32 max-w-6xl mx-auto">
        {/* Seller Header */}
        <LuxuryCard className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <User size={80} className="text-muted-foreground" />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-playfair font-bold text-foreground mb-2">
                    {sellerProfile.businessName}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-3">
                    by {sellerProfile.name}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="default" className="bg-green-500 text-white">
                      Verified Seller
                    </Badge>
                    <Badge variant="outline">
                      Est. {sellerProfile.establishedYear}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleFollowSeller}>
                    <Heart size={16} className="mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleContactSeller}>
                    <MessageCircle size={16} className="mr-2" />
                    Contact
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="text-accent fill-accent" size={16} />
                    <span className="ml-1 font-semibold">{sellerProfile.averageRating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Package size={16} className="text-primary" />
                    <span className="ml-1 font-semibold">{sellerProfile.totalProducts}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Products</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock size={16} className="text-primary" />
                    <span className="ml-1 font-semibold text-sm">{sellerProfile.responseTime}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Response</p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar size={16} className="text-primary" />
                    <span className="ml-1 font-semibold">{new Date().getFullYear() - sellerProfile.establishedYear}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Years</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <MapPin size={14} className="mr-2 text-primary" />
                    <span>{sellerProfile.address}, {sellerProfile.city}, {sellerProfile.state} - {sellerProfile.pincode}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone size={14} className="mr-2 text-primary" />
                    <span>{sellerProfile.phone}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail size={14} className="mr-2 text-primary" />
                    <span>{sellerProfile.email}</span>
                  </div>
                  {sellerProfile.socialMedia.website && (
                    <div className="flex items-center text-sm">
                      <Globe size={14} className="mr-2 text-primary" />
                      <span>{sellerProfile.socialMedia.website}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </LuxuryCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <User size={20} className="mr-2" />
                About the Seller
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {sellerProfile.description}
              </p>
            </LuxuryCard>

            {/* Specialties */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Award size={20} className="mr-2" />
                Specialties
              </h2>
              <div className="flex flex-wrap gap-2">
                {sellerProfile.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </LuxuryCard>

            {/* Certifications */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                <Shield size={20} className="mr-2" />
                Certifications & Awards
              </h2>
              <div className="space-y-3">
                {sellerProfile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <Shield size={16} className="mr-3 text-green-500" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Social Media */}
            {(sellerProfile.socialMedia.instagram || sellerProfile.socialMedia.facebook || sellerProfile.socialMedia.website) && (
              <LuxuryCard className="p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <Users size={20} className="mr-2" />
                  Connect With Us
                </h2>
                <div className="flex flex-wrap gap-3">
                  {sellerProfile.socialMedia.instagram && (
                    <Button variant="outline" className="flex items-center">
                      <Instagram size={16} className="mr-2" />
                      Instagram
                    </Button>
                  )}
                  {sellerProfile.socialMedia.facebook && (
                    <Button variant="outline" className="flex items-center">
                      <Facebook size={16} className="mr-2" />
                      Facebook
                    </Button>
                  )}
                  {sellerProfile.socialMedia.website && (
                    <Button variant="outline" className="flex items-center">
                      <Globe size={16} className="mr-2" />
                      Website
                    </Button>
                  )}
                </div>
              </LuxuryCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={handleContactSeller}
                >
                  <Phone size={16} className="mr-2" />
                  Contact Seller
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleFollowSeller}
                >
                  <Heart size={16} className="mr-2" />
                  Follow Seller
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/marketplace")}
                >
                  <Package size={16} className="mr-2" />
                  View All Products
                </Button>
              </div>
            </LuxuryCard>

            {/* Seller Stats */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Seller Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Products</span>
                  <span className="font-semibold">{sellerProfile.totalProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Rating</span>
                  <div className="flex items-center">
                    <Star size={14} className="text-accent fill-accent mr-1" />
                    <span className="font-semibold">{sellerProfile.averageRating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Response Time</span>
                  <span className="font-semibold">{sellerProfile.responseTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Years in Business</span>
                  <span className="font-semibold">{new Date().getFullYear() - sellerProfile.establishedYear}</span>
                </div>
              </div>
            </LuxuryCard>

            {/* Featured Products */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Featured Products</h3>
              <div className="space-y-3">
                {sellerProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer" onClick={() => navigate(`/products/${product.id}`)}>
                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-foreground">{product.name}</h4>
                      <div className="flex items-center">
                        <Star size={12} className="text-accent fill-accent mr-1" />
                        <span className="text-xs text-muted-foreground">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {sellerProducts.length > 3 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-3"
                  onClick={() => navigate("/marketplace")}
                >
                  View All {sellerProducts.length} Products
                </Button>
              )}
            </LuxuryCard>
          </div>
        </div>
      </div>

      {/* Messaging Modal */}
      {sellerProfile && (
        <MessagingModal
          isOpen={showMessagingModal}
          onClose={() => setShowMessagingModal(false)}
          guideName={sellerProfile.name}
          guideImage="/assets/Logo.jpg"
          guideSpecialization={sellerProfile.businessName}
          guidePhone={sellerProfile.phone}
          guideEmail={sellerProfile.email}
        />
      )}
    </div>
  );
}
