import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/LanguageToggle";
import { 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Building, 
  Calendar, 
  Clock, 
  IndianRupee, 
  Users,
  Star,
  CheckCircle,
  AlertCircle,
  Camera,
  FileText,
  Shield,
  Globe,
  Instagram,
  Facebook,
  Music,
  Palette,
  Utensils,
  Trophy,
  Heart,
  Mic,
  Film,
  Theater,
  PartyPopper,
  BookOpen,
  TreePine,
  Camera as CameraIcon,
  Ticket,
  Megaphone,
  Gift,
  Award
} from "lucide-react";

export default function EventRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Organizer Information
    organizerName: "",
    organizerType: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Jharkhand",
    pincode: "",
    organizationName: "",
    organizationDescription: "",
    
    // Event Details
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventType: "",
    targetAudience: [] as string[],
    expectedAttendees: "",
    
    // Event Schedule
    eventDate: "",
    eventEndDate: "",
    eventTime: "",
    eventEndTime: "",
    duration: "",
    isMultiDay: false,
    
    // Location & Venue
    venue: "",
    venueType: "",
    venueAddress: "",
    venueCity: "",
    venueCapacity: "",
    accessibilityFeatures: [] as string[],
    parkingAvailable: false,
    publicTransport: false,
    
    // Event Content
    eventImages: [] as File[],
    eventHighlights: [] as string[],
    whatToExpect: [] as string[],
    specialGuests: "",
    performanceLineup: "",
    agenda: "",
    
    // Ticketing & Pricing
    isTicketed: false,
    ticketPrice: "",
    earlyBirdPrice: "",
    groupDiscounts: false,
    freeTickets: "",
    ticketingPlatform: "",
    refundPolicy: "",
    
    // Marketing & Promotion
    marketingMaterials: [] as File[],
    socialMediaLinks: {
      website: "",
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: ""
    },
    mediaPartners: "",
    sponsors: "",
    
    // Requirements & Logistics
    equipmentNeeded: [] as string[],
    cateringRequired: false,
    securityRequired: false,
    permitsObtained: false,
    insuranceCoverage: false,
    covidGuidelines: [] as string[],
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToPricing: false,
    agreeToQuality: false,
    agreeToCompliance: false,
    agreeToMarketing: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const organizerTypes = [
    "Individual", "Cultural Organization", "Non-Profit", "Government Agency",
    "Private Company", "Educational Institution", "Religious Organization", "Community Group"
  ];

  const eventCategories = [
    "Cultural Festival", "Music Concert", "Dance Performance", "Art Exhibition",
    "Food Festival", "Religious Celebration", "Traditional Fair", "Craft Fair",
    "Educational Workshop", "Sports Event", "Community Gathering", "Business Conference",
    "Trade Show", "Theater Performance", "Film Screening", "Literary Event"
  ];

  const eventTypes = [
    "Public Event", "Private Event", "Invitation Only", "Ticketed Event",
    "Free Event", "Charity Event", "Corporate Event", "Educational Event"
  ];

  const targetAudienceOptions = [
    "Families", "Young Adults", "Children", "Seniors", "Tourists", "Locals",
    "Students", "Professionals", "Artists", "Cultural Enthusiasts", "All Ages"
  ];

  const venueTypes = [
    "Outdoor Ground", "Community Hall", "Cultural Center", "Auditorium",
    "Park", "Temple Grounds", "School/College", "Hotel/Resort",
    "Convention Center", "Stadium", "Open Air Theater", "Gallery Space"
  ];

  const accessibilityOptions = [
    "Wheelchair Accessible", "Sign Language Interpretation", "Audio Description",
    "Large Print Materials", "Accessible Parking", "Accessible Restrooms",
    "Ramp Access", "Reserved Seating", "Assistance Available"
  ];

  const highlightOptions = [
    "Live Performances", "Traditional Music", "Folk Dance", "Art Exhibitions",
    "Food Stalls", "Cultural Displays", "Interactive Activities", "Celebrity Guests",
    "Traditional Crafts", "Photography Opportunities", "Shopping", "Family Activities",
    "Educational Content", "Prize Distributions", "Cultural Competitions"
  ];

  const expectationOptions = [
    "Cultural Entertainment", "Educational Experience", "Shopping Opportunities",
    "Food & Beverages", "Live Performances", "Interactive Sessions",
    "Networking Opportunities", "Traditional Activities", "Modern Entertainment",
    "Prize Competitions", "Cultural Immersion", "Photography Sessions"
  ];

  const equipmentOptions = [
    "Sound System", "Lighting", "Stage Setup", "Projection Equipment",
    "Microphones", "Seating Arrangements", "Tent/Canopy", "Security Barriers",
    "Photography Equipment", "Decoration Materials", "Power Supply", "Water Supply"
  ];

  const covidGuidelineOptions = [
    "Sanitization Stations", "Temperature Screening", "Mask Requirements",
    "Social Distancing", "Capacity Limitations", "Contact Tracing",
    "Vaccination Requirements", "Health Declarations", "Outdoor Venue Preference"
  ];

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as object,
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleArrayChange = (field: string, value: string, action: 'add' | 'remove') => {
    setFormData(prev => ({
      ...prev,
      [field]: action === 'add' 
        ? [...prev[field as keyof typeof prev] as string[], value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ 
      ...prev, 
      [field]: [...(prev[field as keyof typeof prev] as File[]), ...files] 
    }));
  };

  const removeImage = (index: number, field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as File[]).filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.organizerName.trim()) newErrors.organizerName = "Organizer name is required";
      if (!formData.organizerType) newErrors.organizerType = "Organizer type is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode";
    }

    if (step === 2) {
      if (!formData.eventTitle.trim()) newErrors.eventTitle = "Event title is required";
      if (!formData.eventDescription.trim()) newErrors.eventDescription = "Event description is required";
      if (!formData.eventCategory) newErrors.eventCategory = "Event category is required";
      if (!formData.eventType) newErrors.eventType = "Event type is required";
      if (!formData.expectedAttendees.trim()) newErrors.expectedAttendees = "Expected attendees is required";
      else if (isNaN(Number(formData.expectedAttendees)) || Number(formData.expectedAttendees) <= 0) newErrors.expectedAttendees = "Invalid attendee count";
      if (formData.targetAudience.length === 0) newErrors.targetAudience = "At least one target audience is required";
    }

    if (step === 3) {
      if (!formData.eventDate) newErrors.eventDate = "Event date is required";
      if (!formData.eventTime) newErrors.eventTime = "Event time is required";
      if (!formData.duration.trim()) newErrors.duration = "Event duration is required";
      if (!formData.venue.trim()) newErrors.venue = "Venue name is required";
      if (!formData.venueType) newErrors.venueType = "Venue type is required";
      if (!formData.venueAddress.trim()) newErrors.venueAddress = "Venue address is required";
      if (!formData.venueCapacity.trim()) newErrors.venueCapacity = "Venue capacity is required";
      else if (isNaN(Number(formData.venueCapacity)) || Number(formData.venueCapacity) <= 0) newErrors.venueCapacity = "Invalid venue capacity";
    }

    if (step === 4) {
      if (formData.eventImages.length === 0) newErrors.eventImages = "At least one event image is required";
      if (formData.eventHighlights.length === 0) newErrors.eventHighlights = "At least one event highlight is required";
      if (formData.whatToExpect.length === 0) newErrors.whatToExpected = "At least one expectation is required";
      if (formData.isTicketed) {
        if (!formData.ticketPrice.trim()) newErrors.ticketPrice = "Ticket price is required for ticketed events";
        else if (isNaN(Number(formData.ticketPrice)) || Number(formData.ticketPrice) <= 0) newErrors.ticketPrice = "Invalid ticket price";
      }
    }

    if (step === 5) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms and conditions";
      if (!formData.agreeToPricing) newErrors.agreeToPricing = "You must agree to pricing policy";
      if (!formData.agreeToQuality) newErrors.agreeToQuality = "You must agree to quality standards";
      if (!formData.agreeToCompliance) newErrors.agreeToCompliance = "You must agree to compliance requirements";
      if (!formData.agreeToMarketing) newErrors.agreeToMarketing = "You must agree to marketing terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Event registration submitted:", formData);
    
    // Show success message and redirect
    alert("Event registration submitted successfully! Our team will review and approve your event within 2-3 business days. You will receive an email with promotional guidelines.");
    navigate("/events");
    
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Organizer Information</h2>
              <p className="text-muted-foreground">Tell us about yourself or your organization</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Organizer Name *
                </label>
                <input
                  type="text"
                  value={formData.organizerName}
                  onChange={(e) => handleInputChange('organizerName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name or organization name"
                />
                {errors.organizerName && <p className="text-red-500 text-sm mt-1">{errors.organizerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Organizer Type *</label>
                <select
                  value={formData.organizerType}
                  onChange={(e) => handleInputChange('organizerType', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select organizer type</option>
                  {organizerTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.organizerType && <p className="text-red-500 text-sm mt-1">{errors.organizerType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="inline w-4 h-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="9876543210"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Complete Address *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Enter your complete address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">City *</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your city"
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Pincode *</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="123456"
                  maxLength={6}
                />
                {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Building className="inline w-4 h-4 mr-1" />
                  Organization Name (if applicable)
                </label>
                <input
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Organization or company name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Organization Description</label>
                <textarea
                  value={formData.organizationDescription}
                  onChange={(e) => handleInputChange('organizationDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Brief description of your organization and its mission..."
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Event Details</h2>
              <p className="text-muted-foreground">Tell us about your event</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Event Title *</label>
                <input
                  type="text"
                  value={formData.eventTitle}
                  onChange={(e) => handleInputChange('eventTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Sohrai Festival 2025"
                />
                {errors.eventTitle && <p className="text-red-500 text-sm mt-1">{errors.eventTitle}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Event Category *</label>
                  <select
                    value={formData.eventCategory}
                    onChange={(e) => handleInputChange('eventCategory', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select category</option>
                    {eventCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.eventCategory && <p className="text-red-500 text-sm mt-1">{errors.eventCategory}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Event Type *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select type</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Event Description *</label>
                <textarea
                  value={formData.eventDescription}
                  onChange={(e) => handleInputChange('eventDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Describe your event in detail, including its significance, activities, and what makes it special..."
                />
                {errors.eventDescription && <p className="text-red-500 text-sm mt-1">{errors.eventDescription}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  Target Audience *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {targetAudienceOptions.map(audience => (
                    <label key={audience} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.targetAudience.includes(audience)}
                        onChange={(e) => handleArrayChange('targetAudience', audience, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{audience}</span>
                    </label>
                  ))}
                </div>
                {errors.targetAudience && <p className="text-red-500 text-sm mt-1">{errors.targetAudience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  Expected Attendees *
                </label>
                <input
                  type="number"
                  value={formData.expectedAttendees}
                  onChange={(e) => handleInputChange('expectedAttendees', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="500"
                  min="1"
                />
                {errors.expectedAttendees && <p className="text-red-500 text-sm mt-1">{errors.expectedAttendees}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Schedule & Venue</h2>
              <p className="text-muted-foreground">When and where will your event take place?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Event Date *
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange('eventDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.eventDate && <p className="text-red-500 text-sm mt-1">{errors.eventDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Event End Date (if multi-day)</label>
                <input
                  type="date"
                  value={formData.eventEndDate}
                  onChange={(e) => handleInputChange('eventEndDate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Start Time *
                </label>
                <input
                  type="time"
                  value={formData.eventTime}
                  onChange={(e) => handleInputChange('eventTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.eventTime && <p className="text-red-500 text-sm mt-1">{errors.eventTime}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">End Time</label>
                <input
                  type="time"
                  value={formData.eventEndTime}
                  onChange={(e) => handleInputChange('eventEndTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Duration *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 3 hours, 2 days, 1 week"
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Building className="inline w-4 h-4 mr-1" />
                  Venue Name *
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Ranchi Stadium, Community Hall"
                />
                {errors.venue && <p className="text-red-500 text-sm mt-1">{errors.venue}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Venue Type *</label>
                <select
                  value={formData.venueType}
                  onChange={(e) => handleInputChange('venueType', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select venue type</option>
                  {venueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.venueType && <p className="text-red-500 text-sm mt-1">{errors.venueType}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Venue Address *
                </label>
                <textarea
                  value={formData.venueAddress}
                  onChange={(e) => handleInputChange('venueAddress', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Complete venue address"
                />
                {errors.venueAddress && <p className="text-red-500 text-sm mt-1">{errors.venueAddress}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Venue City</label>
                <input
                  type="text"
                  value={formData.venueCity}
                  onChange={(e) => handleInputChange('venueCity', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Event city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  Venue Capacity *
                </label>
                <input
                  type="number"
                  value={formData.venueCapacity}
                  onChange={(e) => handleInputChange('venueCapacity', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="1000"
                  min="1"
                />
                {errors.venueCapacity && <p className="text-red-500 text-sm mt-1">{errors.venueCapacity}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Accessibility Features</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {accessibilityOptions.map(feature => (
                    <label key={feature} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.accessibilityFeatures.includes(feature)}
                        onChange={(e) => handleArrayChange('accessibilityFeatures', feature, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.parkingAvailable}
                    onChange={(e) => handleInputChange('parkingAvailable', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Parking Available</span>
                </label>
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.publicTransport}
                    onChange={(e) => handleInputChange('publicTransport', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Accessible by Public Transport</span>
                </label>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Event Content & Ticketing</h2>
              <p className="text-muted-foreground">Add images, highlights, and pricing information</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <CameraIcon className="inline w-4 h-4 mr-1" />
                  Event Images *
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'eventImages')}
                    className="hidden"
                    id="event-image-upload"
                  />
                  <label htmlFor="event-image-upload" className="cursor-pointer">
                    <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
                    <p className="text-muted-foreground">Click to upload event images</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG up to 10MB each</p>
                  </label>
                </div>
                {formData.eventImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.eventImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Event ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index, 'eventImages')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.eventImages && <p className="text-red-500 text-sm mt-1">{errors.eventImages}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Star className="inline w-4 h-4 mr-1" />
                  Event Highlights *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {highlightOptions.map(highlight => (
                    <label key={highlight} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.eventHighlights.includes(highlight)}
                        onChange={(e) => handleArrayChange('eventHighlights', highlight, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{highlight}</span>
                    </label>
                  ))}
                </div>
                {errors.eventHighlights && <p className="text-red-500 text-sm mt-1">{errors.eventHighlights}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What Attendees Can Expect *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {expectationOptions.map(expectation => (
                    <label key={expectation} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.whatToExpect.includes(expectation)}
                        onChange={(e) => handleArrayChange('whatToExpect', expectation, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{expectation}</span>
                    </label>
                  ))}
                </div>
                {errors.whatToExpected && <p className="text-red-500 text-sm mt-1">{errors.whatToExpected}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Special Guests / Performers</label>
                <textarea
                  value={formData.specialGuests}
                  onChange={(e) => handleInputChange('specialGuests', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="List any special guests, performers, or speakers..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Event Agenda</label>
                <textarea
                  value={formData.agenda}
                  onChange={(e) => handleInputChange('agenda', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Detailed schedule of activities..."
                />
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Ticketing Information</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.isTicketed}
                      onChange={(e) => handleInputChange('isTicketed', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">This is a ticketed event</span>
                  </label>

                  {formData.isTicketed && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            <IndianRupee className="inline w-4 h-4 mr-1" />
                            Ticket Price *
                          </label>
                          <input
                            type="number"
                            value={formData.ticketPrice}
                            onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="100"
                            min="0"
                          />
                          {errors.ticketPrice && <p className="text-red-500 text-sm mt-1">{errors.ticketPrice}</p>}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">Early Bird Price</label>
                          <input
                            type="number"
                            value={formData.earlyBirdPrice}
                            onChange={(e) => handleInputChange('earlyBirdPrice', e.target.value)}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="80"
                            min="0"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Free Tickets Available</label>
                        <input
                          type="number"
                          value={formData.freeTickets}
                          onChange={(e) => handleInputChange('freeTickets', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="50"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={formData.groupDiscounts}
                            onChange={(e) => handleInputChange('groupDiscounts', e.target.checked)}
                            className="rounded"
                          />
                          <span className="text-sm">Group discounts available</span>
                        </label>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Refund Policy</label>
                        <textarea
                          value={formData.refundPolicy}
                          onChange={(e) => handleInputChange('refundPolicy', e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          rows={3}
                          placeholder="Describe your refund and cancellation policy..."
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Terms & Conditions</h2>
              <p className="text-muted-foreground">Please review and accept our terms</p>
            </div>

            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Event Marketplace Terms & Conditions</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• You agree to provide accurate event information and maintain quality standards</p>
                  <p>• You are responsible for event execution and attendee safety</p>
                  <p>• We charge a 5% commission on ticket sales (if applicable)</p>
                  <p>• You must comply with all safety regulations and local laws</p>
                  <p>• We reserve the right to remove events that violate our policies</p>
                  <p>• Event permits and insurance are your responsibility</p>
                  <p>• Marketing and promotional support will be provided</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to the Event Marketplace Terms & Conditions *</span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToPricing}
                    onChange={(e) => handleInputChange('agreeToPricing', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to the pricing policy and commission structure (5%) *</span>
                </label>
                {errors.agreeToPricing && <p className="text-red-500 text-sm">{errors.agreeToPricing}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToQuality}
                    onChange={(e) => handleInputChange('agreeToQuality', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to maintain quality standards and attendee satisfaction *</span>
                </label>
                {errors.agreeToQuality && <p className="text-red-500 text-sm">{errors.agreeToQuality}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToCompliance}
                    onChange={(e) => handleInputChange('agreeToCompliance', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to comply with all legal requirements, permits, and safety standards *</span>
                </label>
                {errors.agreeToCompliance && <p className="text-red-500 text-sm">{errors.agreeToCompliance}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToMarketing}
                    onChange={(e) => handleInputChange('agreeToMarketing', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to marketing and promotional guidelines *</span>
                </label>
                {errors.agreeToMarketing && <p className="text-red-500 text-sm">{errors.agreeToMarketing}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
        <h1 className="text-2xl font-playfair font-bold">List Your Event</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Promote your cultural events to thousands of visitors</p>
      </div>

      <div className="px-6 py-6 pb-32 max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Step {currentStep} of 5</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <LuxuryCard className="p-6 mb-6">
          {renderStepContent()}
        </LuxuryCard>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < 5 ? (
            <Button onClick={nextStep}>
              Next Step
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2" size={16} />
                  Submit Event Application
                </>
              )}
            </Button>
          )}
        </div>

        {/* Help Section */}
        <LuxuryCard className="mt-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-amber-600" />
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Contact Support</p>
              <p>Email: events@jharkhandtourism.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Review Process</p>
              <p>Applications are reviewed within 2-3 business days</p>
              <p>You'll receive promotional guidelines once approved</p>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}

