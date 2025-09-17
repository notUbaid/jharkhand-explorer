import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, IndianRupee, ArrowLeft, Star, Users } from "lucide-react";

// Mock experience data - in real app this would come from API
const getExperienceData = (id: string) => {
  const experiences = [
    {
      id: "1",
      title: "Sohrai Painting Workshop",
      instructor: "Artist Reena Hansda",
      price: "₹1,800",
      duration: "3.5 hours",
      rating: 4.9,
      location: "Hazaribagh",
      maxParticipants: 10,
      nextSlot: "Saturday 11:00 AM",
      description: "Learn traditional Sohrai painting using natural pigments, on paper or fabric."
    },
    {
      id: "2",
      title: "Tribal Music & Drum Circle (Mandar + Nagara)",
      instructor: "Musician Babulal Murmu",
      price: "₹900",
      duration: "2.5 hours",
      rating: 4.7,
      location: "Khunti",
      maxParticipants: 20,
      nextSlot: "Tomorrow 4:00 PM",
      description: "Hands-on session with traditional tribal percussion; group rhythm circles in open field."
    },
    {
      id: "3",
      title: "Tussar Silk Weaving Demo + Hands-on Weft Weaving",
      instructor: "Weaver Sita Devi",
      price: "₹2,200",
      duration: "4 hours",
      rating: 4.8,
      location: "Bhagaiya, Godda",
      maxParticipants: 8,
      nextSlot: "This Sunday",
      description: "Watch the traditional loom in action and try basic Tussar weaving yourself."
    },
    {
      id: "4",
      title: "Folk Tales by Fire: Santhal Storytelling Night",
      instructor: "Storyteller Doman Tudu",
      price: "₹700",
      duration: "2 hours",
      rating: 4.6,
      location: "Dumka",
      maxParticipants: 25,
      nextSlot: "Friday 7:00 PM",
      description: "Listen to age-old tribal tales under the stars with tea and snacks."
    },
    {
      id: "5",
      title: "Dokra Jewelry Making Mini Workshop",
      instructor: "Craftsman Narsingh Munda",
      price: "₹2,500",
      duration: "5 hours",
      rating: 4.9,
      location: "Chainpur, Palamu",
      maxParticipants: 6,
      nextSlot: "Next Monday",
      description: "Learn wax casting and try designing a small piece (ring or pendant) with guidance."
    },
    {
      id: "6",
      title: "Wild Edible Plants Walk + Cooking Demo",
      instructor: "Forager and Chef Lata Kisku",
      price: "₹2,200",
      duration: "6 hours",
      rating: 4.8,
      location: "Netarhat Forest Edge",
      maxParticipants: 10,
      nextSlot: "Sunday 9:00 AM",
      description: "Forage seasonal greens and cook a forest-style tribal meal."
    },
    {
      id: "7",
      title: "Chhau Dance Intro Class (Seraikela Style)",
      instructor: "Dancer Guru Mohan Singh",
      price: "₹1,500",
      duration: "2 hours",
      rating: 4.9,
      location: "Seraikela",
      maxParticipants: 15,
      nextSlot: "Next Friday",
      description: "Learn basic movements of the dramatic martial-style folk dance."
    },
    {
      id: "8",
      title: "Terracotta Tile Painting (Inspired by Maluti Temples)",
      instructor: "Artist Anjali Dutta",
      price: "₹1,300",
      duration: "3 hours",
      rating: 4.7,
      location: "Maluti, near Dumka",
      maxParticipants: 12,
      nextSlot: "This Weekend",
      description: "Paint traditional designs on clay tiles, inspired by ancient temple art."
    },
    {
      id: "9",
      title: "Tribal Tattoo & Body Art Demo (Non-permanent)",
      instructor: "Artisan Kiran Tudu",
      price: "₹600",
      duration: "1.5 hours",
      rating: 4.6,
      location: "Simdega",
      maxParticipants: 18,
      nextSlot: "Wednesday Afternoon",
      description: "Get a traditional-style Santhal body art motif with safe natural dye (temporary only)."
    },
    {
      id: "10",
      title: "Lac Bangle Craft Session",
      instructor: "Artisan Anita Kumari",
      price: "₹1,400",
      duration: "3 hours",
      rating: 4.8,
      location: "Khunti",
      maxParticipants: 10,
      nextSlot: "Saturday 2:00 PM",
      description: "Shape and color your own bangle using natural lac and mirror inlays."
    }
  ];
  
  return experiences.find(exp => exp.id === id) || experiences[0];
};

export default function ExperienceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience] = useState(() => getExperienceData(id || "1"));

  useEffect(() => {
    document.title = `${experience.title} • Discover Jharkhand`;
  }, [experience.title]);

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">Workshop</Badge>
        </div>
        <h1 className="text-2xl font-inter font-bold">{experience.title}</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">{experience.instructor}</p>
      </header>

      <main className="px-6 space-y-6">
        {/* Experience Image */}
        <div className="h-64 bg-muted rounded-lg" />
        
        {/* Experience Info */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center"><Clock size={14} className="mr-2" /> {experience.duration}</div>
          <div className="flex items-center"><Calendar size={14} className="mr-2" /> {experience.nextSlot}</div>
          <div className="flex items-center"><MapPin size={14} className="mr-2" /> {experience.location}</div>
          <div className="flex items-center"><Users size={14} className="mr-2" /> Max {experience.maxParticipants}</div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm">
            <IndianRupee size={16} className="text-accent mr-1" /> 
            <span className="font-bold text-accent">{experience.price}</span>
          </div>
          <div className="flex items-center text-sm">
            <Star className="text-accent fill-accent" size={14} />
            <span className="font-medium ml-1">{experience.rating}</span>
          </div>
        </div>

        {/* About Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">About This Experience</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{experience.description}</p>
        </section>

        {/* Good to Know Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">Good to Know</h2>
          <ul className="list-disc ml-4 text-sm text-muted-foreground space-y-1">
            <li>All materials provided</li>
            <li>Beginner friendly</li>
            <li>Certificate of participation</li>
            <li>Small group experience</li>
          </ul>
        </section>
        {/* Action Button */}
        <div className="pb-4">
          <Button className="bg-primary hover:bg-primary-light">Book Now</Button>
        </div>
      </main>
    </div>
  );
}
