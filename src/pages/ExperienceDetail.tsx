import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { experiences, Experience } from "@/data/experiences";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  IndianRupee, 
  ArrowLeft, 
  Star, 
  Users,
  User,
  Shield,
  Heart,
  Share2,
  CheckCircle,
  AlertCircle,
  Clock3
} from "lucide-react";

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Find the experience by ID
    const foundExperience = experiences.find(exp => exp.id === parseInt(id || "0"));
    setExperience(foundExperience || null);
    setIsLoading(false);
    
    if (foundExperience) {
      document.title = `${foundExperience.title} • Discover Jharkhand`;
    } else {
      document.title = `Experience Not Found • Discover Jharkhand`;
    }
  }, [id]);

  const handleBookNow = () => {
    if (experience) {
      // Simulate booking
      alert(`Booking ${experience.title} for ${experience.price}!`);
    }
  };

  const handleAddToWishlist = () => {
    if (experience) {
      // Simulate adding to wishlist
      alert(`Added ${experience.title} to wishlist!`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading experience details...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Experience Not Found</h1>
          <p className="text-muted-foreground mb-6">The experience you're looking for doesn't exist.</p>
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
            size="default"
            onClick={() => navigate("/marketplace?tab=experiences")}
            className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Marketplace
          </Button>
          <LanguageToggle />
        </div>
      </div>

      <div className="px-6 py-6 pb-32 max-w-4xl mx-auto">
        {/* Experience Header */}
        <LuxuryCard className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-playfair font-bold text-foreground mb-2">
                    {experience.title}
                  </h1>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-sm">
                      {experience.category}
                    </Badge>
                    <Badge variant="default" className="bg-green-500 text-white text-sm">
                      {experience.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleAddToWishlist}>
                    <Heart size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="text-accent fill-accent" size={16} />
                    <span className="ml-1 font-semibold">{experience.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <IndianRupee size={16} className="text-accent" />
                    <span className="ml-1 font-semibold text-lg">{experience.price}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Price</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div className="flex items-center">
                  <Clock size={14} className="mr-2 text-primary" />
                  <span>{experience.duration}</span>
                </div>
                <div className="flex items-center">
                  <Users size={14} className="mr-2 text-primary" />
                  <span>Max {experience.maxParticipants}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2 text-primary" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2 text-primary" />
                  <span>{experience.nextSlot}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 h-12 text-lg font-semibold"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="mr-2" size={16} />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </LuxuryCard>

        {/* Experience Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">About This Experience</h2>
              <p className="text-muted-foreground leading-relaxed">
                {experience.description}
              </p>
            </LuxuryCard>

            {/* What to Expect */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">What to Expect</h2>
              <div className="space-y-2">
                {experience.whatToExpect.map((item, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle size={14} className="mr-2 text-green-500" />
                    {item}
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Highlights */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Experience Highlights</h2>
              <div className="space-y-2">
                {experience.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <Star size={14} className="mr-2 text-accent" />
                    {highlight}
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Materials Included */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Materials Included</h2>
              <div className="flex flex-wrap gap-2">
                {experience.materials.map((material, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {material}
                  </Badge>
                ))}
              </div>
            </LuxuryCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor Information */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Instructor</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <User size={16} className="mr-3 text-primary" />
                  <div>
                    <span className="text-sm font-medium">{experience.instructor}</span>
                  </div>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {experience.instructorBio}
                  </p>
                </div>
              </div>
            </LuxuryCard>

            {/* Requirements */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Requirements</h3>
              <div className="space-y-2">
                {experience.requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center text-sm text-muted-foreground">
                    <AlertCircle size={14} className="mr-2 text-orange-500" />
                    {requirement}
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Cancellation Policy */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Cancellation Policy</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Shield size={14} className="mr-2 text-green-500" />
                {experience.cancellationPolicy}
              </div>
            </LuxuryCard>

            {/* Quick Info */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Duration</span>
                  <span className="font-semibold">{experience.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Max Participants</span>
                  <span className="font-semibold">{experience.maxParticipants}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <span className="font-semibold">{experience.difficulty}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Next Available</span>
                  <span className="font-semibold text-sm">{experience.nextSlot}</span>
                </div>
              </div>
            </LuxuryCard>
          </div>
        </div>
      </div>
    </div>
  );
}
