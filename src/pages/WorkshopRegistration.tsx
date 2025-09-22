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
  Palette,
  Music,
  Utensils,
  Briefcase,
  Trophy,
  Mountain,
  BookOpen,
  Scissors,
  Hammer,
  Paintbrush
} from "lucide-react";

export default function WorkshopRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Instructor Information
    instructorName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Jharkhand",
    pincode: "",
    
    // Professional Details
    bio: "",
    experience: "",
    qualifications: "",
    languages: [] as string[],
    certifications: [] as string[],
    achievements: [] as string[],
    
    // Social Media
    website: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    
    // Workshop Information
    workshopTitle: "",
    workshopDescription: "",
    category: "",
    difficulty: "",
    duration: "",
    maxParticipants: "",
    price: "",
    materialsIncluded: true,
    materialsList: "",
    
    // Workshop Details
    whatToExpect: [] as string[],
    highlights: [] as string[],
    requirements: [] as string[],
    cancellationPolicy: "",
    
    // Schedule & Location
    workshopImages: [] as File[],
    location: "",
    venueType: "",
    equipmentProvided: true,
    equipmentList: "",
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToPricing: false,
    agreeToQuality: false,
    agreeToSafety: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Art & Craft", "Cooking & Food", "Music & Dance", "Traditional Skills",
    "Textile & Weaving", "Pottery & Ceramics", "Woodworking", "Metalwork",
    "Painting & Drawing", "Photography", "Language Learning", "Cultural Heritage",
    "Nature & Environment", "Technology", "Business & Entrepreneurship", "Other"
  ];

  const difficultyLevels = [
    "Beginner", "Intermediate", "Advanced", "All Levels"
  ];

  const languages = [
    "Hindi", "English", "Santhali", "Munda", "Ho", "Kurukh", "Kharia", "Other"
  ];

  const qualifications = [
    "Traditional Master", "Certified Instructor", "University Degree", "Professional Training",
    "Self-Taught Expert", "Community Recognition", "Award Winner", "Cultural Practitioner"
  ];

  const certifications = [
    "Ministry of Culture Certification", "State Tourism Certification", "UNESCO Recognition",
    "Traditional Arts Certificate", "Teaching License", "Safety Certification", "Quality Assurance",
    "Cultural Heritage Certificate", "Community Development", "Export Quality"
  ];

  const achievements = [
    "National Award Winner", "State Recognition", "Cultural Ambassador", "Master Craftsman",
    "Community Leader", "Innovation Award", "Preservation Award", "Teaching Excellence",
    "International Recognition", "Heritage Conservation"
  ];

  const whatToExpectOptions = [
    "Hands-on practical experience", "Traditional techniques demonstration", "Take-home project",
    "Cultural context and history", "Materials and tools provided", "Certificate of completion",
    "Group learning environment", "Individual attention", "Cultural storytelling",
    "Traditional recipes/methods", "Safety instructions", "Quality assurance"
  ];

  const highlightsOptions = [
    "Learn from master craftsman", "Authentic traditional methods", "Small group size",
    "All materials included", "Cultural immersion", "Certificate provided",
    "Take-home creation", "Traditional techniques", "Expert guidance",
    "Cultural storytelling", "Hands-on experience", "Quality materials"
  ];

  const requirementsOptions = [
    "No prior experience needed", "Basic understanding helpful", "Physical ability required",
    "Comfortable clothing", "Closed-toe shoes", "Apron provided", "Safety equipment provided",
    "Age restriction applies", "Language proficiency", "Pre-registration required"
  ];

  const venueTypes = [
    "Traditional Workshop", "Community Center", "Cultural Center", "Open Air Space",
    "Studio Space", "Home-based", "School/College", "Museum", "Temple Grounds", "Other"
  ];

  const handleInputChange = (field: string, value: any) => {
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, workshopImages: [...prev.workshopImages, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      workshopImages: prev.workshopImages.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.instructorName.trim()) newErrors.instructorName = "Instructor name is required";
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
      if (!formData.bio.trim()) newErrors.bio = "Bio is required";
      if (!formData.experience.trim()) newErrors.experience = "Experience is required";
      if (formData.languages.length === 0) newErrors.languages = "At least one language is required";
    }

    if (step === 3) {
      if (!formData.workshopTitle.trim()) newErrors.workshopTitle = "Workshop title is required";
      if (!formData.workshopDescription.trim()) newErrors.workshopDescription = "Workshop description is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.difficulty) newErrors.difficulty = "Difficulty level is required";
      if (!formData.duration.trim()) newErrors.duration = "Duration is required";
      if (!formData.maxParticipants.trim()) newErrors.maxParticipants = "Maximum participants is required";
      else if (isNaN(Number(formData.maxParticipants)) || Number(formData.maxParticipants) <= 0) newErrors.maxParticipants = "Invalid participant count";
      if (!formData.price.trim()) newErrors.price = "Price is required";
      else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) newErrors.price = "Invalid price";
      if (formData.workshopImages.length === 0) newErrors.workshopImages = "At least one workshop image is required";
    }

    if (step === 4) {
      if (!formData.location.trim()) newErrors.location = "Location is required";
      if (!formData.venueType) newErrors.venueType = "Venue type is required";
      if (formData.whatToExpect.length === 0) newErrors.whatToExpect = "At least one expectation is required";
      if (formData.highlights.length === 0) newErrors.highlights = "At least one highlight is required";
    }

    if (step === 5) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms and conditions";
      if (!formData.agreeToPricing) newErrors.agreeToPricing = "You must agree to pricing policy";
      if (!formData.agreeToQuality) newErrors.agreeToQuality = "You must agree to quality standards";
      if (!formData.agreeToSafety) newErrors.agreeToSafety = "You must agree to safety standards";
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
    
    console.log("Workshop registration submitted:", formData);
    
    // Show success message and redirect
    alert("Workshop registration submitted successfully! Our team will review and approve your workshop within 2-3 business days.");
    navigate("/marketplace?tab=experiences");
    
    setIsSubmitting(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Art & Craft": return <Palette className="w-4 h-4" />;
      case "Cooking & Food": return <Utensils className="w-4 h-4" />;
      case "Music & Dance": return <Music className="w-4 h-4" />;
      case "Traditional Skills": return <GraduationCap className="w-4 h-4" />;
      case "Textile & Weaving": return <Scissors className="w-4 h-4" />;
      case "Pottery & Ceramics": return <Paintbrush className="w-4 h-4" />;
      case "Woodworking": return <Hammer className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Instructor Information</h2>
              <p className="text-muted-foreground">Tell us about yourself as a workshop instructor</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.instructorName}
                  onChange={(e) => handleInputChange('instructorName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
                {errors.instructorName && <p className="text-red-500 text-sm mt-1">{errors.instructorName}</p>}
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
                  placeholder="Tell us about yourself, your background, and what makes you passionate about teaching..."
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
                  placeholder="e.g., 10 years of traditional pottery making"
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
                  placeholder="e.g., Master Craftsman, Certified Instructor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Languages Spoken *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {languages.map(language => (
                    <label key={language} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(language)}
                        onChange={(e) => handleArrayChange('languages', language, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
                {errors.languages && <p className="text-red-500 text-sm mt-1">{errors.languages}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Certifications & Licenses</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {certifications.map(cert => (
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
                <label className="block text-sm font-medium text-foreground mb-2">Achievements & Recognition</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {achievements.map(achievement => (
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
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Workshop Information</h2>
              <p className="text-muted-foreground">Tell us about the workshop you want to offer</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Workshop Title *</label>
                <input
                  type="text"
                  value={formData.workshopTitle}
                  onChange={(e) => handleInputChange('workshopTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Traditional Sohrai Painting Workshop"
                />
                {errors.workshopTitle && <p className="text-red-500 text-sm mt-1">{errors.workshopTitle}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Difficulty Level *</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select difficulty</option>
                  {difficultyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
                {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Duration *
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 3 hours, 1 day, 2 days"
                />
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Users className="inline w-4 h-4 mr-1" />
                  Max Participants *
                </label>
                <input
                  type="number"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="10"
                  min="1"
                />
                {errors.maxParticipants && <p className="text-red-500 text-sm mt-1">{errors.maxParticipants}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <IndianRupee className="inline w-4 h-4 mr-1" />
                  Price per Person *
                </label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
                {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Workshop Description *</label>
                <textarea
                  value={formData.workshopDescription}
                  onChange={(e) => handleInputChange('workshopDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Describe your workshop in detail, including what participants will learn, techniques taught, and the cultural significance..."
                />
                {errors.workshopDescription && <p className="text-red-500 text-sm mt-1">{errors.workshopDescription}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Materials Included</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.materialsIncluded}
                      onChange={(e) => handleInputChange('materialsIncluded', e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm">All materials and tools are provided</span>
                  </label>
                  <textarea
                    value={formData.materialsList}
                    onChange={(e) => handleInputChange('materialsList', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="List all materials and tools that will be provided to participants..."
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Camera className="inline w-4 h-4 mr-1" />
                  Workshop Images *
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="workshop-image-upload"
                  />
                  <label htmlFor="workshop-image-upload" className="cursor-pointer">
                    <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
                    <p className="text-muted-foreground">Click to upload workshop images</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG up to 10MB each</p>
                  </label>
                </div>
                {formData.workshopImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.workshopImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Workshop ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.workshopImages && <p className="text-red-500 text-sm mt-1">{errors.workshopImages}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Workshop Details</h2>
              <p className="text-muted-foreground">Configure workshop expectations and logistics</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Workshop Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., Hazaribagh, Ranchi, Deoghar"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
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
                    <span className="text-sm">All necessary equipment is provided</span>
                  </label>
                  <textarea
                    value={formData.equipmentList}
                    onChange={(e) => handleInputChange('equipmentList', e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={3}
                    placeholder="List all equipment and tools that will be available..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">What Participants Can Expect *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {whatToExpectOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.whatToExpect.includes(option)}
                        onChange={(e) => handleArrayChange('whatToExpect', option, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
                {errors.whatToExpect && <p className="text-red-500 text-sm mt-1">{errors.whatToExpect}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Workshop Highlights *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {highlightsOptions.map(highlight => (
                    <label key={highlight} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.highlights.includes(highlight)}
                        onChange={(e) => handleArrayChange('highlights', highlight, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{highlight}</span>
                    </label>
                  ))}
                </div>
                {errors.highlights && <p className="text-red-500 text-sm mt-1">{errors.highlights}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Requirements & Prerequisites</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {requirementsOptions.map(requirement => (
                    <label key={requirement} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.requirements.includes(requirement)}
                        onChange={(e) => handleArrayChange('requirements', requirement, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{requirement}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cancellation Policy</label>
                <textarea
                  value={formData.cancellationPolicy}
                  onChange={(e) => handleInputChange('cancellationPolicy', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  placeholder="Describe your cancellation and refund policy..."
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
                <h3 className="font-semibold text-foreground mb-2">Workshop Marketplace Terms & Conditions</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• You agree to provide accurate workshop information and maintain quality standards</p>
                  <p>• You are responsible for workshop delivery and participant safety</p>
                  <p>• We charge a 8% commission on successful workshop bookings</p>
                  <p>• You must comply with all safety regulations and local laws</p>
                  <p>• We reserve the right to remove workshops that violate our policies</p>
                  <p>• Participants' safety and satisfaction are your responsibility</p>
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
                  <span className="text-sm">I agree to the Workshop Marketplace Terms & Conditions *</span>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToPricing}
                    onChange={(e) => handleInputChange('agreeToPricing', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to the pricing policy and commission structure *</span>
                </label>
                {errors.agreeToPricing && <p className="text-red-500 text-sm">{errors.agreeToPricing}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToQuality}
                    onChange={(e) => handleInputChange('agreeToQuality', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to maintain quality standards and participant satisfaction *</span>
                </label>
                {errors.agreeToQuality && <p className="text-red-500 text-sm">{errors.agreeToQuality}</p>}

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.agreeToSafety}
                    onChange={(e) => handleInputChange('agreeToSafety', e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-sm">I agree to ensure participant safety and provide necessary safety equipment *</span>
                </label>
                {errors.agreeToSafety && <p className="text-red-500 text-sm">{errors.agreeToSafety}</p>}
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
            onClick={() => navigate("/marketplace?tab=experiences")}
            className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Experiences
          </Button>
          <LanguageToggle />
        </div>
        <h1 className="text-2xl font-playfair font-bold">List Your Workshop</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Share your skills and culture with visitors</p>
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
                  Submit Workshop Application
                </>
              )}
            </Button>
          )}
        </div>

        {/* Help Section */}
        <LuxuryCard className="mt-6 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-purple-600" />
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Contact Support</p>
              <p>Email: workshops@jharkhandmarketplace.com</p>
              <p>Phone: +91 98765 43210</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">Review Process</p>
              <p>Applications are reviewed within 2-3 business days</p>
              <p>You'll receive an email notification once approved</p>
            </div>
          </div>
        </LuxuryCard>
      </div>
    </div>
  );
}
