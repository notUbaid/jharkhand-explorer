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
  Package, 
  IndianRupee, 
  Star,
  CheckCircle,
  AlertCircle,
  Camera,
  FileText,
  Shield,
  Clock,
  Globe,
  Instagram,
  Facebook,
  Linkedin
} from "lucide-react";

export default function ProductRegistration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Seller Information
    sellerName: "",
    businessName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Jharkhand",
    pincode: "",
    establishedYear: "",
    
    // Business Details
    businessType: "",
    gstNumber: "",
    panNumber: "",
    businessDescription: "",
    specialties: [] as string[],
    certifications: [] as string[],
    
    // Social Media
    website: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    
    // Product Information
    productName: "",
    productDescription: "",
    category: "",
    price: "",
    originalPrice: "",
    discount: "",
    inStock: true,
    stockQuantity: "",
    productImages: [] as File[],
    
    // Product Details
    materials: "",
    dimensions: "",
    weight: "",
    color: "",
    careInstructions: "",
    warranty: "",
    returnPolicy: "",
    
    // Shipping Information
    shippingAvailable: true,
    shippingCost: "",
    freeShippingThreshold: "",
    estimatedDelivery: "",
    shippingRegions: [] as string[],
    
    // Terms and Conditions
    agreeToTerms: false,
    agreeToPricing: false,
    agreeToQuality: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Handicrafts", "Textiles", "Jewelry", "Home Decor", "Art & Paintings",
    "Traditional Clothing", "Wooden Crafts", "Metal Work", "Pottery", "Bamboo Products",
    "Tribal Artifacts", "Spices & Herbs", "Organic Products", "Books & Literature", "Other"
  ];

  const businessTypes = [
    "Individual Artisan", "Small Business", "Cooperative", "NGO", "Government Organization",
    "Private Company", "Startup", "Other"
  ];

  const specialties = [
    "Traditional Handicrafts", "Tribal Art", "Eco-Friendly Products", "Custom Orders",
    "Bulk Manufacturing", "Export Quality", "Heritage Products", "Contemporary Design",
    "Sustainable Materials", "Handmade Products"
  ];

  const certifications = [
    "Handicrafts Certification", "Organic Certification", "Fair Trade", "ISO Certification",
    "Export License", "GST Registration", "MSME Registration", "Tribal Artisan Certificate",
    "Quality Assurance", "Environmental Certification"
  ];

  const shippingRegions = [
    "All India", "North India", "South India", "East India", "West India",
    "Jharkhand Only", "Bihar & Jharkhand", "West Bengal & Jharkhand", "Custom Regions"
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
    setFormData(prev => ({ ...prev, productImages: [...prev.productImages, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      productImages: prev.productImages.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.sellerName.trim()) newErrors.sellerName = "Seller name is required";
      if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
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
      if (!formData.businessType) newErrors.businessType = "Business type is required";
      if (!formData.businessDescription.trim()) newErrors.businessDescription = "Business description is required";
      if (formData.specialties.length === 0) newErrors.specialties = "At least one specialty is required";
    }

    if (step === 3) {
      if (!formData.productName.trim()) newErrors.productName = "Product name is required";
      if (!formData.productDescription.trim()) newErrors.productDescription = "Product description is required";
      if (!formData.category) newErrors.category = "Category is required";
      if (!formData.price.trim()) newErrors.price = "Price is required";
      else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) newErrors.price = "Invalid price";
      if (formData.productImages.length === 0) newErrors.productImages = "At least one product image is required";
    }

    if (step === 4) {
      if (!formData.shippingCost.trim()) newErrors.shippingCost = "Shipping cost is required";
      else if (isNaN(Number(formData.shippingCost)) || Number(formData.shippingCost) < 0) newErrors.shippingCost = "Invalid shipping cost";
      if (!formData.estimatedDelivery.trim()) newErrors.estimatedDelivery = "Estimated delivery time is required";
      if (formData.shippingRegions.length === 0) newErrors.shippingRegions = "At least one shipping region is required";
    }

    if (step === 5) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms and conditions";
      if (!formData.agreeToPricing) newErrors.agreeToPricing = "You must agree to pricing policy";
      if (!formData.agreeToQuality) newErrors.agreeToQuality = "You must agree to quality standards";
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
    
    console.log("Product registration submitted:", formData);
    
    // Show success message and redirect
    alert("Product registration submitted successfully! Our team will review and approve your listing within 2-3 business days.");
    navigate("/marketplace");
    
    setIsSubmitting(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Seller Information</h2>
              <p className="text-muted-foreground">Tell us about yourself and your business</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.sellerName}
                  onChange={(e) => handleInputChange('sellerName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
                {errors.sellerName && <p className="text-red-500 text-sm mt-1">{errors.sellerName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Building className="inline w-4 h-4 mr-1" />
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your business name"
                />
                {errors.businessName && <p className="text-red-500 text-sm mt-1">{errors.businessName}</p>}
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
                  placeholder="Enter your complete business address"
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
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Business Details</h2>
              <p className="text-muted-foreground">Tell us about your business and expertise</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Business Type *</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select business type</option>
                  {businessTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.businessType && <p className="text-red-500 text-sm mt-1">{errors.businessType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Established Year</label>
                <input
                  type="number"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange('establishedYear', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="2020"
                  min="1900"
                  max="2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">GST Number (Optional)</label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="22AAAAA0000A1Z5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">PAN Number (Optional)</label>
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange('panNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="AAAAA0000A"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Business Description *</label>
                <textarea
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange('businessDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Describe your business, its history, and what makes it unique..."
                />
                {errors.businessDescription && <p className="text-red-500 text-sm mt-1">{errors.businessDescription}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Specialties *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {specialties.map(specialty => (
                    <label key={specialty} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.specialties.includes(specialty)}
                        onChange={(e) => handleArrayChange('specialties', specialty, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{specialty}</span>
                    </label>
                  ))}
                </div>
                {errors.specialties && <p className="text-red-500 text-sm mt-1">{errors.specialties}</p>}
              </div>

              <div className="md:col-span-2">
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
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Product Information</h2>
              <p className="text-muted-foreground">Tell us about the product you want to list</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your product name"
                />
                {errors.productName && <p className="text-red-500 text-sm mt-1">{errors.productName}</p>}
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
                <label className="block text-sm font-medium text-foreground mb-2">
                  <IndianRupee className="inline w-4 h-4 mr-1" />
                  Selling Price *
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

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Original Price (Optional)</label>
                <input
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Stock Quantity</label>
                <input
                  type="number"
                  value={formData.stockQuantity}
                  onChange={(e) => handleInputChange('stockQuantity', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Product Description *</label>
                <textarea
                  value={formData.productDescription}
                  onChange={(e) => handleInputChange('productDescription', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Describe your product in detail, including materials used, dimensions, care instructions, etc."
                />
                {errors.productDescription && <p className="text-red-500 text-sm mt-1">{errors.productDescription}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Camera className="inline w-4 h-4 mr-1" />
                  Product Images *
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
                    <p className="text-muted-foreground">Click to upload product images</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG, JPEG up to 10MB each</p>
                  </label>
                </div>
                {formData.productImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {formData.productImages.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Product ${index + 1}`}
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
                {errors.productImages && <p className="text-red-500 text-sm mt-1">{errors.productImages}</p>}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-2">Shipping & Delivery</h2>
              <p className="text-muted-foreground">Configure shipping options for your product</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Shipping Cost (₹) *</label>
                <input
                  type="number"
                  value={formData.shippingCost}
                  onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
                {errors.shippingCost && <p className="text-red-500 text-sm mt-1">{errors.shippingCost}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Free Shipping Threshold (₹)</label>
                <input
                  type="number"
                  value={formData.freeShippingThreshold}
                  onChange={(e) => handleInputChange('freeShippingThreshold', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="0"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Estimated Delivery Time *</label>
                <input
                  type="text"
                  value={formData.estimatedDelivery}
                  onChange={(e) => handleInputChange('estimatedDelivery', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g., 3-5 business days"
                />
                {errors.estimatedDelivery && <p className="text-red-500 text-sm mt-1">{errors.estimatedDelivery}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">Shipping Regions *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {shippingRegions.map(region => (
                    <label key={region} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.shippingRegions.includes(region)}
                        onChange={(e) => handleArrayChange('shippingRegions', region, e.target.checked ? 'add' : 'remove')}
                        className="rounded"
                      />
                      <span className="text-sm">{region}</span>
                    </label>
                  ))}
                </div>
                {errors.shippingRegions && <p className="text-red-500 text-sm mt-1">{errors.shippingRegions}</p>}
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
                <h3 className="font-semibold text-foreground mb-2">Marketplace Terms & Conditions</h3>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• You agree to provide accurate product information and maintain product quality standards</p>
                  <p>• You are responsible for fulfilling orders and handling customer service</p>
                  <p>• We charge a 5% commission on successful sales</p>
                  <p>• You must comply with all applicable laws and regulations</p>
                  <p>• We reserve the right to remove listings that violate our policies</p>
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
                  <span className="text-sm">I agree to the Marketplace Terms & Conditions *</span>
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
                  <span className="text-sm">I agree to maintain quality standards and customer satisfaction *</span>
                </label>
                {errors.agreeToQuality && <p className="text-red-500 text-sm">{errors.agreeToQuality}</p>}
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
            onClick={() => navigate("/marketplace")}
            className="text-primary-foreground hover:bg-primary-foreground/10 px-4 py-2"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Marketplace
          </Button>
          <LanguageToggle />
        </div>
        <h1 className="text-2xl font-playfair font-bold">List Your Product</h1>
        <p className="text-primary-foreground/80 text-sm mt-1">Join our marketplace and reach thousands of customers</p>
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
                  Submit Application
                </>
              )}
            </Button>
          )}
        </div>

        {/* Help Section */}
        <LuxuryCard className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="font-semibold text-foreground mb-3 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Need Help?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">Contact Support</p>
              <p>Email: support@jharkhandmarketplace.com</p>
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
