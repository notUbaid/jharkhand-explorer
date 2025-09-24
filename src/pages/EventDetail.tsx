import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { BookingModal } from "@/components/BookingModal";
import { BookingItem } from "@/hooks/useBooking";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  IndianRupee, 
  ArrowLeft, 
  Ticket, 
  Users, 
  Star, 
  Heart, 
  Share2,
  CheckCircle,
  Info,
  Phone,
  Mail,
  Globe,
  Palette,
  Utensils,
  Briefcase,
  Trophy
} from "lucide-react";

// Event data - same as in Events.tsx
const events = [
  {
    id: 1,
    title: "Tribal Arts and Textiles Expo 2025",
    date: "October 18–22, 2025",
    location: "Morhabadi Maidan, Ranchi",
    description: "Handicrafts & handloom exhibition focused on tribal artistry",
    image: "/assets/event/event1/event 1 (1).png",
    category: "Cultural",
    entryFee: "₹50",
    timings: "11:00 AM – 8:00 PM",
    highlights: ["Live weaving demo (Tussar)", "Sohrai painting workshops", "Tribal fashion ramp show", "Artisan stalls from 14 districts"],
    expectedAttendees: "12,000",
    detailedDescription: "Immerse yourself in the rich cultural heritage of Jharkhand at this comprehensive exhibition showcasing traditional tribal arts and textiles. Experience live demonstrations of ancient weaving techniques, participate in hands-on workshops, and witness the beauty of indigenous craftsmanship.",
    organizer: "Jharkhand Tribal Development Society",
    contactInfo: {
      phone: "+91 98765 43210",
      email: "info@jharkhandtribalarts.com",
      website: "www.jharkhandtribalarts.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "Live demonstrations by master artisans",
      "Interactive workshops for all ages",
      "Traditional tribal fashion shows",
      "Authentic handicraft shopping",
      "Cultural performances and music"
    ],
    importantInfo: [
      "Entry tickets available at venue",
      "Photography allowed in designated areas",
      "Free parking available",
      "Food and beverages available on-site",
      "Children under 12 enter free"
    ]
  },
  {
    id: 2,
    title: "Jharkhand Coffee and Indigenous Beverage Fest",
    date: "December 6–8, 2025",
    location: "Eco Retreat Campus, Netarhat",
    description: "Culinary and beverage-focused fair",
    image: "/assets/event/event 2/event 2 (1).png",
    category: "Food",
    entryFee: "₹100",
    timings: "9:30 AM – 6:30 PM",
    highlights: ["Bamboo rice beer tasting", "Tribal coffee pop-ups (Latehar blend)", "Workshops on Mahua fermentation", "Wild fruit jams showcase"],
    expectedAttendees: "6,000",
    detailedDescription: "Discover the unique flavors of Jharkhand's indigenous beverages and traditional coffee culture. From bamboo rice beer to locally grown coffee varieties, this festival celebrates the state's rich culinary heritage.",
    organizer: "Jharkhand Food & Beverage Association",
    contactInfo: {
      phone: "+91 98765 43211",
      email: "info@jharkhandfoodfest.com",
      website: "www.jharkhandfoodfest.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "Tasting sessions of traditional beverages",
      "Coffee brewing workshops",
      "Live cooking demonstrations",
      "Local food vendors",
      "Cultural performances"
    ],
    importantInfo: [
      "Age verification required for alcohol tasting",
      "Tasting coupons available for purchase",
      "Free samples for registered participants",
      "Photography encouraged",
      "Parking available on-site"
    ]
  },
  {
    id: 3,
    title: "Seraikela Chhau Festival and Cultural Week",
    date: "January 10–14, 2026",
    location: "Rajmahal Grounds, Seraikela",
    description: "Performing arts and cultural celebration",
    image: "/assets/event/event 3/event 3 (1).png",
    category: "Cultural",
    entryFee: "Free",
    timings: "4:00 PM – 10:00 PM",
    highlights: ["Daily Chhau performances", "Mask-making exhibition", "Tribal percussion concerts", "Folk food courts"],
    expectedAttendees: "18,000",
    detailedDescription: "Experience the mesmerizing art of Chhau dance, a traditional martial art form from Jharkhand. This cultural extravaganza features world-class performances, mask-making workshops, and authentic tribal cuisine.",
    organizer: "Seraikela Chhau Academy",
    contactInfo: {
      phone: "+91 98765 43212",
      email: "info@seraikelachhau.com",
      website: "www.seraikelachhau.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "Daily Chhau dance performances",
      "Mask-making workshops",
      "Traditional percussion concerts",
      "Folk food courts",
      "Cultural exhibitions"
    ],
    importantInfo: [
      "Free entry for all visitors",
      "Performances start at 4 PM daily",
      "Workshops require advance registration",
      "Food courts open throughout the event",
      "Photography allowed during performances"
    ]
  },
  {
    id: 4,
    title: "Jharkhand Rural Start-up Summit",
    date: "November 22–23, 2025",
    location: "BIT Mesra Convention Hall, Ranchi",
    description: "Start-up and innovation conclave",
    image: "/assets/event/event 4/event 4 (1).png",
    category: "Business",
    entryFee: "₹300 (general), ₹100 (student)",
    timings: "10:00 AM – 5:30 PM",
    highlights: ["Panel talks on rural tech", "Funding pitch events", "Stalls by local SHGs and tribal start-ups", "Mentorship roundtables"],
    expectedAttendees: "3,000",
    detailedDescription: "Connect with innovative entrepreneurs and discover groundbreaking solutions for rural development. This summit brings together start-ups, investors, and industry leaders to foster innovation in Jharkhand.",
    organizer: "Jharkhand Innovation Hub",
    contactInfo: {
      phone: "+91 98765 43213",
      email: "info@jharkhandstartup.com",
      website: "www.jharkhandstartup.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "Keynote speeches by industry leaders",
      "Start-up pitch competitions",
      "Networking sessions",
      "Exhibition of innovative products",
      "Mentorship opportunities"
    ],
    importantInfo: [
      "Registration required for entry",
      "Student discounts available",
      "Networking lunch included",
      "Pitch competition prizes worth ₹5 lakhs",
      "Free parking for attendees"
    ]
  },
  {
    id: 5,
    title: "Thekua and Tilkut Mahotsav",
    date: "December 28–30, 2025",
    location: "Nandan Pahar Grounds, Deoghar",
    description: "Traditional food festival",
    image: "/assets/event/event 5/event 5 (1).png",
    category: "Food",
    entryFee: "₹30",
    timings: "10:00 AM – 9:00 PM",
    highlights: ["30+ food stalls", "Live cooking of Thekua varieties", "Sweet-making contest", "Folk storytelling zone"],
    expectedAttendees: "15,000",
    detailedDescription: "Celebrate Jharkhand's traditional sweets and culinary heritage at this vibrant food festival. From Thekua to Tilkut, experience authentic flavors and traditional cooking methods.",
    organizer: "Deoghar Food Festival Committee",
    contactInfo: {
      phone: "+91 98765 43214",
      email: "info@deogharfoodfest.com",
      website: "www.deogharfoodfest.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "Live cooking demonstrations",
      "Sweet-making competitions",
      "Traditional food stalls",
      "Folk storytelling sessions",
      "Cultural performances"
    ],
    importantInfo: [
      "Entry includes food tasting coupons",
      "Competition registration on-site",
      "Free parking available",
      "Photography encouraged",
      "Children under 5 enter free"
    ]
  },
  {
    id: 6,
    title: "Khatiani Mela (Indigenous Games and Sports Fair)",
    date: "February 2–5, 2026",
    location: "Dumka Stadium Grounds",
    description: "Tribal sports and community games",
    image: "/assets/event/event 6/Event 6 (1).png",
    category: "Sports",
    entryFee: "₹20",
    timings: "8:00 AM – 6:00 PM",
    highlights: ["Archery contests", "Bamboo pole climbing", "Tribal wrestling", "Handicraft awards", "Millet lunch stalls"],
    expectedAttendees: "10,000",
    detailedDescription: "Witness traditional tribal sports and games that have been passed down through generations. From archery to bamboo pole climbing, experience the athletic heritage of Jharkhand's indigenous communities.",
    organizer: "Dumka Sports Association",
    contactInfo: {
      phone: "+91 98765 43215",
      email: "info@dumkasports.com",
      website: "www.dumkasports.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "Traditional sports competitions",
      "Archery demonstrations",
      "Tribal wrestling matches",
      "Handicraft exhibitions",
      "Traditional food stalls"
    ],
    importantInfo: [
      "Sports competitions open to all",
      "Safety equipment provided",
      "Free parking available",
      "Photography allowed",
      "Food stalls open throughout"
    ]
  },
  {
    id: 7,
    title: "World Food India – Jharkhand Pavilion",
    date: "September 25–28, 2025",
    location: "Nepal House, Doranda (Jharkhand Pavilion) + Pragati Maidan, Delhi",
    description: "International food exhibition showcasing Jharkhand cuisine",
    image: "/assets/event/event 7/Event 7 (1).png",
    category: "Food",
    entryFee: "Free with registration",
    timings: "10:00 AM – 6:00 PM",
    highlights: ["Jharkhand food showcase", "International exposure", "Culinary demonstrations", "Trade opportunities"],
    expectedAttendees: "8,000",
    detailedDescription: "Represent Jharkhand's culinary excellence on an international platform. This prestigious event showcases traditional foods and opens doors for global trade opportunities.",
    organizer: "Jharkhand Tourism Department",
    contactInfo: {
      phone: "+91 98765 43216",
      email: "info@jharkhandtourism.com",
      website: "www.jharkhandtourism.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "International food exhibitions",
      "Culinary demonstrations",
      "Trade networking opportunities",
      "Cultural performances",
      "Business meetings"
    ],
    importantInfo: [
      "Registration required for entry",
      "Business cards recommended",
      "Free parking available",
      "Photography allowed",
      "Networking lunch included"
    ]
  },
  {
    id: 8,
    title: "Jharkhand Mining and Construction Show 2026",
    date: "January 29–31, 2026",
    location: "Prabhat Tara Ground, HEC Campus, Ranchi",
    description: "Industrial exhibition showcasing mining and construction technologies",
    image: "/assets/event/event 8/Event 8 (1).png",
    category: "Business",
    entryFee: "Free (registration required)",
    timings: "10:00 AM – 6:00 PM",
    highlights: ["300+ exhibitors", "Technology demonstrations", "Industry networking", "Investment opportunities"],
    expectedAttendees: "15,000+",
    detailedDescription: "Explore cutting-edge technologies in mining and construction at this comprehensive industry exhibition. Connect with leading companies and discover innovative solutions.",
    organizer: "Jharkhand Industries Association",
    contactInfo: {
      phone: "+91 98765 43217",
      email: "info@jharkhandindustries.com",
      website: "www.jharkhandindustries.com"
    },
    accessibility: ["Wheelchair Accessible", "Parking Available", "Food Stalls", "First Aid"],
    whatToExpect: [
      "Technology demonstrations",
      "Industry networking sessions",
      "Investment opportunities",
      "Product exhibitions",
      "Expert panel discussions"
    ],
    importantInfo: [
      "Registration required for entry",
      "Business cards recommended",
      "Free parking available",
      "Photography allowed in designated areas",
      "Networking lunch included"
    ]
  }
];

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [isLoading, setIsLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const foundEvent = events.find(e => e.id === parseInt(id || "0"));
    setEvent(foundEvent || null);
    setIsLoading(false);
    if (foundEvent) {
      document.title = `${foundEvent.title} • Discover Jharkhand`;
    } else {
      document.title = `Event Not Found • Discover Jharkhand`;
    }
  }, [id]);

  const handleBookNow = () => {
    if (event) {
      setShowBookingModal(true);
    }
  };

  const handleBookingSuccess = (bookingId: string) => {
    console.log('Booking successful:', bookingId);
    // You can add additional success handling here
  };

  const handleBookTicket = () => {
    // Implement booking logic
    console.log("Booking ticket for event:", event?.title);
  };

  const handleAddToFavorites = () => {
    // Implement favorites logic
    console.log("Adding to favorites:", event?.title);
  };

  const handleShare = () => {
    // Implement share logic
    console.log("Sharing event:", event?.title);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cultural": return <Palette className="w-4 h-4" />;
      case "Food": return <Utensils className="w-4 h-4" />;
      case "Business": return <Briefcase className="w-4 h-4" />;
      case "Sports": return <Trophy className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h1>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/events")}>
            <ArrowLeft className="mr-2" size={16} />
            Back to Events
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
            onClick={() => navigate("/events")}
            className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Events
          </Button>
          <LanguageToggle />
        </div>
      </div>

      <div className="px-6 py-6 pb-32 max-w-4xl mx-auto">
        {/* Event Header */}
        <LuxuryCard className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="flex items-center gap-1">
                  {getCategoryIcon(event.category)}
                  {event.category}
                </Badge>
                <Badge variant="outline" className="text-accent">
                  <Star className="w-3 h-3 mr-1" />
                  Popular Event
                </Badge>
              </div>

              <h1 className="text-2xl font-playfair font-bold text-foreground mb-3">
                {event.title}
              </h1>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.timings}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">{event.expectedAttendees} expected attendees</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-lg font-semibold text-accent">
                  <IndianRupee className="w-5 h-5 mr-1" />
                  {event.entryFee}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddToFavorites}
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={handleBookNow}
              >
                <Ticket className="mr-2" size={16} />
                Book Ticket
              </Button>
            </div>
          </div>
        </LuxuryCard>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {event.description}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {event.detailedDescription}
              </p>
            </LuxuryCard>

            {/* What to Expect */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">What to Expect</h2>
              <div className="space-y-2">
                {event.whatToExpect.map((item: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Highlights */}
            <LuxuryCard className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Event Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {event.highlights.map((highlight: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <Star className="w-4 h-4 mr-2 mt-0.5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </LuxuryCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Organizer Info */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Organizer</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-foreground">{event.organizer}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{event.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>{event.contactInfo.email}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{event.contactInfo.website}</span>
                  </div>
                </div>
              </div>
            </LuxuryCard>

            {/* Important Information */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Important Information</h3>
              <div className="space-y-2">
                {event.importantInfo.map((info: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <Info className="w-4 h-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                    <span className="text-muted-foreground text-sm">{info}</span>
                  </div>
                ))}
              </div>
            </LuxuryCard>

            {/* Accessibility */}
            <LuxuryCard className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Accessibility</h3>
              <div className="flex flex-wrap gap-2">
                {event.accessibility.map((item: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </LuxuryCard>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        bookingItems={event ? [{
          id: event.id.toString(),
          type: 'event',
          title: event.title,
          price: parseFloat(event.entryFee.replace(/[₹,]/g, '')),
          quantity: 1,
          date: event.date,
          time: event.timings,
          location: event.location,
          image: event.image,
          metadata: {
            category: event.category,
            organizer: event.organizer,
            expectedAttendees: event.expectedAttendees
          }
        }] : []}
        onSuccess={handleBookingSuccess}
      />
    </div>
  );
}
