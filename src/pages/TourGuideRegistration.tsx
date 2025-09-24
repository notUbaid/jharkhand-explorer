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
  GraduationCap,
  Mountain,
  TreePine,
  Camera as CameraIcon,
  Car,
  Briefcase,
  Trophy,
  BookOpen,
  Languages,
  Award,
  Map,
  Compass,
  Binoculars,
  Backpack,
  History,
  Heart,
  Users as UsersIcon
} from "lucide-react";

export default function TourGuideRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Jharkhand",
    pincode: "",
    dateOfBirth: "",
    gender: "",
    
    // Professional Details
    bio: "",
    experience: "",
    qualifications: "",
    languagesSpoken: [] as string[],
    certifications: [] as string[],
    achievements: [] as string[],
    
    // Tour Guide Specializations
    specializations: [] as string[],
    areasOfExpertise: [] as string[],
    tourTypes: [] as string[],
    destinations: [] as string[],
    
    // Professional Portfolio
    profileImages: [] as File[],
    certificationDocuments: [] as File[],
    tourSamples: "",
    testimonials: "",
    
    // Services & Rates
    servicesOffered: [] as string[],
    hourlyRate: "",
    dayRate: "",
    groupSizeMax: "",
    availabilityDays: [] as string[],
    seasonalAvailability: "",
    transportationProvided: false,
    equipmentProvided: false,
    equipmentList: "",
    
    // Social Media & Contact
    website: "",
    instagram: "",
    facebook: "",
    whatsapp: "",
    emergencyContact: "",
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToPricing: false,
    agreeToQuality: false,
    agreeToSafety: false,
    agreeToBackground: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const languageOptions = [
    "Hindi", "English", "Santhali", "Munda", "Ho", "Kurukh", "Kharia", 
    "Bengali", "Oraon", "Bhojpuri", "Magahi", "Maithili", "Urdu", "Other"
  ];

  const specializationOptions = [
    "Cultural Heritage Tours", "Adventure Tourism", "Nature & Wildlife", "Religious Tourism",
    "Tribal Culture", "Historical Sites", "Photography Tours", "Eco-Tourism",
    "Trekking & Hiking", "Village Tourism", "Festival Tourism", "Craft Tours",
    "Food & Culinary Tours", "Mining Heritage", "Waterfall Tours", "Temple Tours"
  ];

  const areaExpertiseOptions = [
    "Jharkhand History", "Tribal Traditions", "Local Folklore", "Wildlife Knowledge",
    "Flora & Fauna", "Geology & Mining", "Traditional Crafts", "Local Cuisine",
    "Religious Practices", "Folk Music & Dance", "Traditional Medicine", "Local Languages",
    "Photography Techniques", "Adventure Sports", "Safety & First Aid", "Environmental Conservation"
  ];

  const tourTypeOptions = [
    "Half Day Tours", "Full Day Tours", "Multi-Day Tours", "Weekend Getaways",
    "Group Tours", "Private Tours", "Family Tours", "Adventure Tours",
    "Cultural Immersion", "Photography Expeditions", "Trekking Tours", "Village Stays",
    "Festival Tours", "Educational Tours", "Corporate Tours", "Custom Tours"
  ];

  const destinationOptions = [
    "Ranchi", "Hazaribagh", "Deoghar", "Jamshedpur", "Dhanbad", "Bokaro",
    "Giridih", "Ramgarh", "Chaibasa", "Dumka", "Sahebganj", "Pakur",
    "Netarhat", "Betla National Park", "Hundru Falls", "Jonha Falls",
    "Dassam Falls", "Lodh Falls", "Parasnath Hill", "Rajrappa Temple",
    "Baidyanath Temple", "Jagannath Temple", "Sun Temple Bundu", "Palamu Tiger Reserve"
  ];

  const serviceOptions = [
    "Guided Tours", "Transportation Arrangement", "Accommodation Booking", "Meal Arrangements",
    "Photography Services", "Equipment Rental", "Safety Briefing", "Cultural Interpretation",
    "Language Translation", "Emergency Assistance", "Custom Itinerary Planning", "Group Coordination",
    "Educational Talks", "Hands-on Activities", "Shopping Assistance", "24/7 Support"
  ];

  const availabilityOptions = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];

  const qualificationOptions = [
    "Government Licensed Tour Guide", "Tourism Ministry Certification", "First Aid Certified",
    "Adventure Sports Certification", "Language Proficiency Certificate", "Cultural Heritage Training",
    "Wildlife Guide Certification", "Eco-Tourism Certification", "Photography Certification",
    "Mountaineering Certification", "Traditional Crafts Knowledge", "Local History Expert"
  ];

  const certificationOptions = [
    "Ministry of Tourism License", "State Tourism Board Certification", "First Aid & CPR",
    "Wilderness First Aid", "Adventure Activity Certification", "Professional Tour Guide License",
    "Cultural Heritage Guide", "Wildlife Conservation Training", "Eco-Tourism Certification",
    "Language Interpreter Certification", "Photography Guide Certification", "Safety Training"
  ];

  const achievementOptions = [
    "Best Tour Guide Award", "Tourist Appreciation Award", "Cultural Ambassador",
    "Tourism Excellence Award", "Community Recognition", "Safety Excellence Award",
    "Innovation in Tourism", "Sustainable Tourism Champion", "Language Excellence",
    "Photography Excellence", "Adventure Tourism Expert", "Heritage Conservation Award"
  ];

  const handleInputChange = (field: string, value: string | number | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = "Invalid phone number";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
      else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Invalid pincode";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
    }

    if (step === 2) {
      if (!formData.bio.trim()) newErrors.bio = "Bio is required";
      if (!formData.experience.trim()) newErrors.experience = "Experience is required";
      if (formData.languagesSpoken.length === 0) newErrors.languagesSpoken = "At least one language is required";
      if (formData.specializations.length === 0) newErrors.specializations = "At least one specialization is required";
    }

    if (step === 3) {
      if (formData.areasOfExpertise.length === 0) newErrors.areasOfExpertise = "At least one area of expertise is required";
      if (formData.tourTypes.length === 0) newErrors.tourTypes = "At least one tour type is required";
      if (formData.destinations.length === 0) newErrors.destinations = "At least one destination is required";
      if (formData.profileImages.length === 0) newErrors.profileImages = "At least one profile image is required";
    }

    if (step === 4) {
      if (formData.servicesOffered.length === 0) newErrors.servicesOffered = "At least one service is required";
      if (!formData.hourlyRate.trim()) newErrors.hourlyRate = "Hourly rate is required";
      else if (isNaN(Number(formData.hourlyRate)) || Number(formData.hourlyRate) <= 0) newErrors.hourlyRate = "Invalid hourly rate";
      if (!formData.dayRate.trim()) newErrors.dayRate = "Day rate is required";
      else if (isNaN(Number(formData.dayRate)) || Number(formData.dayRate) <= 0) newErrors.dayRate = "Invalid day rate";
      if (!formData.groupSizeMax.trim()) newErrors.groupSizeMax = "Maximum group size is required";
      else if (isNaN(Number(formData.groupSizeMax)) || Number(formData.groupSizeMax) <= 0) newErrors.groupSizeMax = "Invalid group size";
      if (formData.availabilityDays.length === 0) newErrors.availabilityDays = "At least one availability day is required";
      if (!formData.emergencyContact.trim()) newErrors.emergencyContact = "Emergency contact is required";
    }

    if (step === 5) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms and conditions";
      if (!formData.agreeToPricing) newErrors.agreeToPricing = "You must agree to pricing policy";
      if (!formData.agreeToQuality) newErrors.agreeToQuality = "You must agree to quality standards";
      if (!formData.agreeToSafety) newErrors.agreeToSafety = "You must agree to safety standards";
      if (!formData.agreeToBackground) newErrors.agreeToBackground = "You must agree to background verification";
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
    
    console.log("Tour guide registration submitted:", formData);
    
    // Show success message and redirect
    alert("Tour guide registration submitted successfully! Our team will review and approve your application within 3-5 business days. You will receive an email with further instructions.");
    navigate("/marketplace?tab=tourguides");
    
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Tell us about yourself as a tour guide</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Professional Details</h2>
              <p className="text-muted-foreground">Tell us about your expertise and qualifications</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio *</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Tell us about yourself, your background, and what makes you passionate about guiding tourists..."
                />
                {errors.bio && <p className="text-red-500 text-sm mt-1">{errors.bio}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Experience *</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 5 years of professional tour guiding"
                />
                {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Qualifications</label>
                <input
                  type="text"
                  value={formData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Bachelor's in Tourism, Licensed Tour Guide"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Languages className="inline w-4 h-4 mr-1" />
                  Languages Spoken *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {languageOptions.map(language => (
                    <label key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.languagesSpoken.includes(language)}
                        onChange={(e) => handleArrayChange('languagesSpoken', language, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
                {errors.languagesSpoken && <p className="text-red-500 text-sm mt-1">{errors.languagesSpoken}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Compass className="inline w-4 h-4 mr-1" />
                  Tour Guide Specializations *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specializationOptions.map(specialization => (
                    <label key={specialization} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.specializations.includes(specialization)}
                        onChange={(e) => handleArrayChange('specializations', specialization, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{specialization}</span>
                    </label>
                  ))}
                </div>
                {errors.specializations && <p className="text-red-500 text-sm mt-1">{errors.specializations}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Certifications & Licenses</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {certificationOptions.map(cert => (
                    <label key={cert} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.certifications.includes(cert)}
                        onChange={(e) => handleArrayChange('certifications', cert, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Trophy className="inline w-4 h-4 mr-1" />
                  Achievements & Recognition
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {achievementOptions.map(achievement => (
                    <label key={achievement} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.achievements.includes(achievement)}
                        onChange={(e) => handleArrayChange('achievements', achievement, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{achievement}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Tour Expertise & Portfolio</h2>
              <p className="text-muted-foreground">Show us your areas of expertise and portfolio</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <BookOpen className="inline w-4 h-4 mr-1" />
                  Areas of Expertise *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {areaExpertiseOptions.map(area => (
                    <label key={area} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.areasOfExpertise.includes(area)}
                        onChange={(e) => handleArrayChange('areasOfExpertise', area, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{area}</span>
                    </label>
                  ))}
                </div>
                {errors.areasOfExpertise && <p className="text-red-500 text-sm mt-1">{errors.areasOfExpertise}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <UsersIcon className="inline w-4 h-4 mr-1" />
                  Tour Types Offered *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {tourTypeOptions.map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.tourTypes.includes(type)}
                        onChange={(e) => handleArrayChange('tourTypes', type, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
                {errors.tourTypes && <p className="text-red-500 text-sm mt-1">{errors.tourTypes}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Map className="inline w-4 h-4 mr-1" />
                  Destinations Covered *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {destinationOptions.map(destination => (
                    <label key={destination} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.destinations.includes(destination)}
                        onChange={(e) => handleArrayChange('destinations', destination, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{destination}</span>
                    </label>
                  ))}
                </div>
                {errors.destinations && <p className="text-red-500 text-sm mt-1">{errors.destinations}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <CameraIcon className="inline w-4 h-4 mr-1" />
                  Profile Images *
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'profileImages')}
                    className="hidden"
                    id="profile-image-upload"
                  />
                  <label htmlFor="profile-image-upload" className="cursor-pointer">
                    <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
                    <p className="text-muted-foreground">Click to upload profile images</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG up to 10MB each</p>
                  </label>
                </div>
                {formData.profileImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.profileImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Profile ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index, 'profileImages')}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.profileImages && <p className="text-red-500 text-sm mt-1">{errors.profileImages}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <FileText className="inline w-4 h-4 mr-1" />
                  Certification Documents
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleImageUpload(e, 'certificationDocuments')}
                    className="hidden"
                    id="cert-document-upload"
                  />
                  <label htmlFor="cert-document-upload" className="cursor-pointer">
                    <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
                    <p className="text-muted-foreground">Upload certification documents</p>
                    <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG, JPEG up to 10MB each</p>
                  </label>
                </div>
                {formData.certificationDocuments.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {formData.certificationDocuments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <button
                          onClick={() => removeImage(index, 'certificationDocuments')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <AlertCircle size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Sample Tour Descriptions</label>
                <textarea
                  value={formData.tourSamples}
                  onChange={(e) => handleInputChange('tourSamples', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Describe a few sample tours you offer, including what makes them special..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Heart className="inline w-4 h-4 mr-1" />
                  Client Testimonials
                </label>
                <textarea
                  value={formData.testimonials}
                  onChange={(e) => handleInputChange('testimonials', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Share any positive feedback from previous clients..."
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Services & Rates</h2>
              <p className="text-muted-foreground">Configure your services and pricing</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Briefcase className="inline w-4 h-4 mr-1" />
                  Services Offered *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {serviceOptions.map(service => (
                    <label key={service} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.servicesOffered.includes(service)}
                        onChange={(e) => handleArrayChange('servicesOffered', service, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
                {errors.servicesOffered && <p className="text-red-500 text-sm mt-1">{errors.servicesOffered}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <IndianRupee className="inline w-4 h-4 mr-1" />
                  Hourly Rate *
                </label>
                <input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="500"
                  min="0"
                />
                {errors.hourlyRate && <p className="text-red-500 text-sm mt-1">{errors.hourlyRate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <IndianRupee className="inline w-4 h-4 mr-1" />
                  Day Rate *
                </label>
                <input
                  type="number"
                  value={formData.dayRate}
                  onChange={(e) => handleInputChange('dayRate', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="2000"
                  min="0"
                />
                {errors.dayRate && <p className="text-red-500 text-sm mt-1">{errors.dayRate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  Maximum Group Size *
                </label>
                <input
                  type="number"
                  value={formData.groupSizeMax}
                  onChange={(e) => handleInputChange('groupSizeMax', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="15"
                  min="1"
                />
                {errors.groupSizeMax && <p className="text-red-500 text-sm mt-1">{errors.groupSizeMax}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Seasonal Availability</label>
                <input
                  type="text"
                  value={formData.seasonalAvailability}
                  onChange={(e) => handleInputChange('seasonalAvailability', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., October to March (Peak Season)"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" />
                  Days Available *
                </label>
                <div className="grid grid-cols-7 gap-2">
                  {availabilityOptions.map(day => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.availabilityDays.includes(day)}
                        onChange={(e) => handleArrayChange('availabilityDays', day, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-xs">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
                {errors.availabilityDays && <p className="text-red-500 text-sm mt-1">{errors.availabilityDays}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transportation Provided</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.transportationProvided}
                      onChange={(e) => handleInputChange('transportationProvided', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">I provide transportation services</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Equipment Provided</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.equipmentProvided}
                      onChange={(e) => handleInputChange('equipmentProvided', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">I provide necessary equipment</span>
                  </label>
                  <textarea
                    value={formData.equipmentList}
                    onChange={(e) => handleInputChange('equipmentList', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={2}
                    placeholder="List equipment provided (e.g., binoculars, first aid kit, trekking poles...)"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  Emergency Contact *
                </label>
                <input
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Emergency contact number"
                />
                {errors.emergencyContact && <p className="text-red-500 text-sm mt-1">{errors.emergencyContact}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Globe className="inline w-4 h-4 mr-1" />
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Instagram className="inline w-4 h-4 mr-1" />
                  Instagram
                </label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={(e) => handleInputChange('instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="@username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Facebook className="inline w-4 h-4 mr-1" />
                  Facebook
                </label>
                <input
                  type="text"
                  value={formData.facebook}
                  onChange={(e) => handleInputChange('facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Facebook page/profile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Phone className="inline w-4 h-4 mr-1" />
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="WhatsApp number"
                />
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
                <h3 className="font-semibold text-foreground mb-2">Tour Guide Marketplace Terms & Conditions</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• You agree to provide accurate tour guide information and maintain professional standards</p>
                  <p>• You are responsible for tourist safety and providing quality guided experiences</p>
                  <p>• We charge a 10% commission on successful tour bookings</p>
                  <p>• You must comply with all safety regulations and local laws</p>
                  <p>• We reserve the right to remove guides who violate our policies</p>
                  <p>• Background verification and document validation are mandatory</p>
                  <p>• Tourist satisfaction and safety are your primary responsibilities</p>
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
                  <span className="text-sm">I agree to the Tour Guide Marketplace Terms & Conditions *</span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToPricing}
                    onChange={(e) => handleInputChange('agreeToPricing', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to the pricing policy and commission structure (10%) *</span>
                </label>
                {errors.agreeToPricing && <p className="text-red-500 text-sm">{errors.agreeToPricing}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToQuality}
                    onChange={(e) => handleInputChange('agreeToQuality', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to maintain quality standards and tourist satisfaction *</span>
                </label>
                {errors.agreeToQuality && <p className="text-red-500 text-sm">{errors.agreeToQuality}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToSafety}
                    onChange={(e) => handleInputChange('agreeToSafety', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to ensure tourist safety and provide necessary safety measures *</span>
                </label>
                {errors.agreeToSafety && <p className="text-red-500 text-sm">{errors.agreeToSafety}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToBackground}
                    onChange={(e) => handleInputChange('agreeToBackground', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to undergo background verification and document validation *</span>
                </label>
                {errors.agreeToBackground && <p className="text-red-500 text-sm">{errors.agreeToBackground}</p>}
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
            onClick={() => navigate("/marketplace?tab=tourguides")}
            className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Tour Guides
          </Button>
          <LanguageToggle />
        </div>
        <h1 className="text-2xl font-playfair font-bold">Become a Tour Guide</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Share your knowledge and earn money by guiding tourists</p>
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
                  Submit Tour Guide Application
                </>
              )}
            </Button>
          )}
        </div>

        {/* Help Section */}
        <LuxuryCard className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Contact Support</p>
              <p>Email: guides@jharkhandtourism.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Review Process</p>
              <p>Applications are reviewed within 3-5 business days</p>
              <p>Background verification takes additional 2-3 days</p>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}

