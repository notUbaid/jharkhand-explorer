import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { LanguageToggle } from "@/components/LanguageToggle";
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

// Mock data - in a real app, this would come from an API
const tourGuides = [
  {
    id: 1,
    name: "Rajesh Kumar Singh",
    specialization: "Historical & Cultural Tours",
    locations: ["Ranchi", "Deoghar", "Baidyanath Temple", "Maluti Temples", "Hazaribagh", "Dumka"],
    price: "₹2,500",
    rating: 4.9,
    experience: "8 years",
    languages: ["Hindi", "English", "Santhali"],
    verified: true,
    image: "/placeholder.svg",
    description: "Expert in Jharkhand's rich historical heritage, specializing in temple architecture and tribal history.",
    specialties: ["Temple Tours", "Historical Sites", "Cultural Heritage", "Photography"],
    availability: "Available",
    nextAvailable: "Tomorrow 9:00 AM",
    totalTours: 450,
    responseTime: "Within 2 hours",
    verificationDetails: {
      verifiedBy: "Jharkhand Tourism Department",
      verificationDate: "2023-01-15",
      credentials: ["Tourism Guide License", "Historical Site Expert Certificate", "Cultural Heritage Specialist"],
      certifications: ["Archaeological Survey of India", "Ministry of Tourism", "Jharkhand Cultural Society"]
    },
    bio: "Rajesh Kumar Singh is a passionate historian and cultural expert with over 8 years of experience guiding tourists through Jharkhand's rich heritage. He holds a Master's degree in History and has been certified by the Archaeological Survey of India for his expertise in temple architecture and tribal history.",
    achievements: [
      "Best Cultural Guide Award 2022",
      "500+ Satisfied Tourists",
      "Featured in Travel Magazines",
      "Local History Expert"
    ],
    reviews: [
      {
        name: "Priya Sharma",
        rating: 5,
        comment: "Rajesh's knowledge of temple history is incredible. He made our Deoghar trip unforgettable!",
        date: "2024-01-15"
      },
      {
        name: "Amit Kumar",
        rating: 5,
        comment: "Professional, knowledgeable, and very patient with our questions. Highly recommended!",
        date: "2024-01-10"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43210",
      email: "rajesh.singh@jharkhandtours.com",
      whatsapp: "+91 98765 43210"
    }
  },
  {
    id: 2,
    name: "Priya Devi",
    specialization: "Wildlife & Nature",
    locations: ["Betla National Park", "Hazaribagh Wildlife Sanctuary", "Netarhat", "Palamu Tiger Reserve", "Dassam Falls"],
    price: "₹3,000",
    rating: 4.8,
    experience: "6 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: true,
    image: "/placeholder.svg",
    description: "Wildlife enthusiast and nature photographer with deep knowledge of Jharkhand's forests and wildlife.",
    specialties: ["Wildlife Safaris", "Bird Watching", "Nature Photography", "Forest Trails"],
    availability: "Available",
    nextAvailable: "Today 2:00 PM",
    totalTours: 320,
    responseTime: "Within 1 hour",
    verificationDetails: {
      verifiedBy: "Wildlife Conservation Society",
      verificationDate: "2023-03-20",
      credentials: ["Wildlife Guide License", "Nature Photography Certificate", "Forest Department Authorization"],
      certifications: ["Wildlife Institute of India", "Forest Department", "Nature Photography Society"]
    },
    bio: "Priya Devi is a wildlife conservationist and nature photographer who has dedicated her life to protecting Jharkhand's natural heritage. With 6 years of experience, she has guided hundreds of wildlife enthusiasts through the state's national parks and sanctuaries.",
    achievements: [
      "Wildlife Conservation Award 2023",
      "Nature Photography Excellence",
      "300+ Wildlife Tours",
      "Forest Department Recognition"
    ],
    reviews: [
      {
        name: "Ravi Kumar",
        rating: 5,
        comment: "Priya's wildlife knowledge is amazing. We saw tigers and many birds thanks to her expertise!",
        date: "2024-01-12"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43211",
      email: "priya.devi@wildlifejharkhand.com",
      whatsapp: "+91 98765 43211"
    }
  },
  {
    id: 3,
    name: "Amit Kumar Munda",
    specialization: "Tribal Culture & Traditions",
    locations: ["Khunti", "Simdega", "Gumla", "West Singhbhum", "Seraikela", "Dumka"],
    price: "₹2,000",
    rating: 4.9,
    experience: "10 years",
    languages: ["Hindi", "Munda", "Ho", "English"],
    verified: true,
    image: "/placeholder.svg",
    description: "Native tribal guide with authentic knowledge of Munda, Santhal, and Ho cultures and traditions.",
    specialties: ["Tribal Villages", "Cultural Experiences", "Traditional Crafts", "Folk Music"],
    availability: "Available",
    nextAvailable: "This Weekend",
    totalTours: 580,
    responseTime: "Within 3 hours",
    verificationDetails: {
      verifiedBy: "Tribal Development Authority",
      verificationDate: "2022-11-10",
      credentials: ["Tribal Cultural Expert", "Native Language Speaker", "Cultural Heritage Guide"],
      certifications: ["Tribal Development Authority", "Ministry of Tribal Affairs", "Cultural Heritage Society"]
    },
    bio: "Amit Kumar Munda is a native tribal guide from the Munda community with deep roots in Jharkhand's tribal culture. He speaks multiple tribal languages and has been preserving and sharing his cultural heritage for over 10 years.",
    achievements: [
      "Cultural Preservation Award 2022",
      "Native Language Expert",
      "600+ Cultural Tours",
      "Tribal Community Leader"
    ],
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Amit's authentic tribal knowledge is incredible. He showed us the real Jharkhand culture!",
        date: "2024-01-08"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43212",
      email: "amit.munda@tribalculture.com",
      whatsapp: "+91 98765 43212"
    }
  }
  // Add more guides as needed...
];

export default function TourGuideDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [guide, setGuide] = useState<any>(null);
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

      <div className="px-6 py-6 max-w-4xl mx-auto">
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
                {guide.reviews.map((review: any, index: number) => (
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
