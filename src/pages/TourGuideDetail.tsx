import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { LanguageToggle } from "@/components/LanguageToggle";
import { tourGuides, TourGuide } from "@/data/tourGuides";
import { 
  ArrowLeft, 
  Star, 
  IndianRupee, 
  MapPin, 
  Clock, 
  Users, 
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Shield,
  Award,
  Globe,
  Camera,
  Heart,
  Share2,
  CheckCircle,
  Clock3,
  User,
  Languages,
  GraduationCap,
  FileText
} from "lucide-react";

export default function TourGuideDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [guide, setGuide] = useState<TourGuide | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const foundGuide = tourGuides.find(g => g.id === parseInt(id || "0"));
    setGuide(foundGuide);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading guide details...</p>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Guide Not Found</h1>
          <p className="text-muted-foreground mb-6">The tour guide you're looking for doesn't exist.</p>
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
            onClick={() => navigate("/marketplace")}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Marketplace
          </Button>
          <LanguageToggle />
        </div>
      </div>

      <div className="px-6 py-6 pb-32 max-w-4xl mx-auto">
        {/* Guide Header */}
        <LuxuryCard className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-playfair font-bold text-foreground mb-2">
                    {guide.name}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-3">
                    {guide.specialization}
                  </p>
                  
                  {guide.verified && (
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="default" className="bg-green-500 text-white">
                        <Shield className="mr-1" size={12} />
                        Verified Guide
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Verified by {guide.verificationDetails.verifiedBy}
                      </Badge>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="text-accent fill-accent" size={16} />
                    <span className="ml-1 font-semibold">{guide.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock size={16} className="text-primary" />
                    <span className="ml-1 font-semibold">{guide.experience}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Experience</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users size={16} className="text-primary" />
                    <span className="ml-1 font-semibold">{guide.totalTours}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Tours</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="ml-1 font-semibold">{guide.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Per Tour</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">
                  <Calendar className="mr-2" size={16} />
                  Book Now
                </Button>
                <Button variant="outline">
                  <MessageCircle className="mr-2" size={16} />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </LuxuryCard>

        {/* Guide Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">About {guide.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {guide.bio}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {guide.description}
              </p>
            </LuxuryCard>

            {/* Specialties */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {guide.specialties.map((specialty: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </LuxuryCard>

            {/* Locations */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Coverage Areas</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {guide.locations.map((location: string, index: number) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <MapPin size={14} className="mr-2 text-primary" />
                    {location}
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Reviews */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {guide.reviews.map((review: { name: string; rating: number; comment: string; date: string }, index: number) => (
                  <div key={index} className="border-b border-border pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <User size={16} className="mr-2 text-muted-foreground" />
                        <span className="font-medium">{review.name}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            className={i < review.rating ? "text-accent fill-accent" : "text-muted-foreground"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                  </div>
                ))}
              </div>
            </LuxuryCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Verification Details */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Verification Details</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle size={16} className="mr-2 text-green-500" />
                  <span className="text-sm">Verified by {guide.verificationDetails.verifiedBy}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Verified on {guide.verificationDetails.verificationDate}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-foreground mb-2">Credentials</h4>
                <div className="space-y-1">
                  {guide.verificationDetails.credentials.map((credential: string, index: number) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <FileText size={14} className="mr-2" />
                      {credential}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-foreground mb-2">Certifications</h4>
                <div className="space-y-1">
                  {guide.verificationDetails.certifications.map((cert: string, index: number) => (
                    <div key={index} className="flex items-center text-sm text-muted-foreground">
                      <Award size={14} className="mr-2" />
                      {cert}
                    </div>
                  ))}
                </div>
              </div>
            </LuxuryCard>

            {/* Contact Information */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone size={16} className="mr-3 text-primary" />
                  <span className="text-sm">{guide.contactInfo.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail size={16} className="mr-3 text-primary" />
                  <span className="text-sm">{guide.contactInfo.email}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle size={16} className="mr-3 text-primary" />
                  <span className="text-sm">{guide.contactInfo.whatsapp}</span>
                </div>
              </div>
            </LuxuryCard>

            {/* Languages */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {guide.languages.map((language: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    <Globe size={12} className="mr-1" />
                    {language}
                  </Badge>
                ))}
              </div>
            </LuxuryCard>

            {/* Availability */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Availability</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Clock3 size={16} className="mr-2 text-green-500" />
                  <span className="text-sm font-medium text-green-600">{guide.availability}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Next available: {guide.nextAvailable}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Response time: {guide.responseTime}</span>
                </div>
              </div>
            </LuxuryCard>
          </div>
        </div>
      </div>
    </div>
  );
}
