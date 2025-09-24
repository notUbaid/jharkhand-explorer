import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, IndianRupee, ArrowLeft, Navigation, Heart, ChevronLeft, ChevronRight } from "lucide-react";

// Mock restaurant data - in real app this would come from API
const getRestaurantData = (id: string) => {
  const restaurants = [
    {
      id: "rest02",
      name: "Mocha Café & Bar",
      category: "Premium",
      location: "Lalpur, Ranchi",
      rating: 4.9,
      priceRange: "~₹1,800 for two",
      cuisine: "Continental, Lebanese, Desserts, Coffee",
      contact: "+91 85398 10606",
      address: "501 A & B, 6th Floor, H-Square Building, Lalpur, Ranchi, Jharkhand 834001",
      description: "Ranchi's premier rooftop dining destination offering an exquisite blend of continental cuisine, authentic Lebanese flavors, and artisanal desserts. Perched on the 6th floor with panoramic city views, Mocha Café & Bar creates an unforgettable dining experience with its sophisticated ambiance, live music performances, and expertly crafted cocktails. Perfect for romantic dinners, business meetings, or special celebrations.",
      goodToKnow: "Famous for desserts, continental, and coffee; Great evening ambience & rooftop seating; Live music nights occasionally",
      timings: "12:00 PM – 11:30 PM",
      specialties: [
        "Artisanal Coffee & Desserts",
        "Authentic Lebanese Cuisine", 
        "Continental Fine Dining",
        "Craft Cocktails & Mocktails",
        "Rooftop Dining Experience",
        "Live Music Performances"
      ],
      amenities: [
        "Rooftop Seating",
        "Air Conditioning", 
        "Valet Parking",
        "WiFi Available",
        "Live Music",
        "Private Dining",
        "Wheelchair Accessible",
        "Credit Cards Accepted"
      ],
      atmosphere: "Sophisticated rooftop ambiance with panoramic city views, perfect for romantic dinners and special occasions",
      bestFor: "Date nights, business dinners, celebrations, coffee lovers, dessert enthusiasts",
      travelTips: "Book rooftop tables in advance, especially for evening dining. Best visited during sunset hours for stunning city views. Dress code is smart casual. Parking available in building basement.",
      accessibility: "Wheelchair accessible with elevator access. Senior-friendly with comfortable seating. Family-friendly with high chairs available. Female-friendly with well-lit parking and security.",
      image: "/src/assets/Food & Dining/[(Mocha Café-Bar)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Mocha Café-Bar)1].jpg",
        "/src/assets/Food & Dining/[(Mocha Café-Bar)2].jpg",
        "/src/assets/Food & Dining/[(Mocha Café-Bar)2](1).jpg"
      ]
    },
    {
      id: "rest03", 
      name: "Jashn The Restaurant",
      category: "Budget",
      location: "Lalpur / Purulia Road, Ranchi",
      rating: 4.4,
      priceRange: "~₹500 for two",
      cuisine: "North Indian, Chinese, Biryani",
      contact: "+91 62035 31174",
      address: "Near Albert Compound, Purulia Road, Lalpur, Ranchi (near Kashyap Eye Hospital)",
      description: "A beloved family restaurant serving authentic North Indian cuisine, flavorful Chinese dishes, and aromatic biryanis at pocket-friendly prices. Known for its generous portions, homely atmosphere, and consistent quality, Jashn has been a favorite among locals and visitors alike. The rooftop seating offers a pleasant dining experience with good ventilation and city views.",
      goodToKnow: "Great for North Indian, Chinese & biryani; Rooftop seating & parking available; Popular for group/family meals",
      timings: "11:30 AM – 11:00 PM",
      specialties: [
        "Authentic North Indian Curries",
        "Flavorful Chinese Dishes",
        "Aromatic Biryanis",
        "Tandoor Specialties",
        "Fresh Rotis & Naan",
        "Traditional Desserts"
      ],
      amenities: [
        "Rooftop Seating",
        "Air Conditioning",
        "Free Parking",
        "Home Delivery",
        "Takeaway Available",
        "Family Friendly",
        "Group Dining",
        "Cash & Card Accepted"
      ],
      atmosphere: "Warm, family-friendly ambiance with comfortable seating and traditional Indian decor",
      bestFor: "Family meals, group dining, budget-conscious diners, traditional Indian food lovers",
      travelTips: "Best visited during lunch hours (12-3 PM) for fresh preparations. Rooftop seating recommended for evening dining. Parking available on-site. Popular during weekends, so consider booking ahead.",
      accessibility: "Ground floor accessible. Senior-friendly with comfortable seating. Family-friendly with high chairs and kids' menu. Female-friendly with well-lit premises and security.",
      image: "/src/assets/Food & Dining/[(Jashn the Restaurant)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Jashn the Restaurant)1].jpg",
        "/src/assets/Food & Dining/[(Jashn the Restaurant)2].jpg",
        "/src/assets/Food & Dining/[(Jashn the Resturant)3].jpg"
      ]
    },
    {
      id: "rest04",
      name: "Barbeque Nation",
      category: "Premium",
      location: "Circular Road / Lalpur, Ranchi",
      rating: 4.4,
      priceRange: "~₹1,600 for two (buffet)",
      cuisine: "Buffet style, BBQ grills",
      contact: "080 6902 8767",
      address: "3rd Floor, Max Building (Opposite Pantaloons), Circular Road, Lalpur, Ranchi",
      description: "Experience the ultimate live grill buffet at Barbeque Nation, where you can grill your own meats, vegetables, and seafood right at your table. This popular chain restaurant offers an extensive spread of appetizers, main courses, desserts, and beverages in a vibrant, family-friendly atmosphere. Perfect for celebrations, group dining, and those who love interactive dining experiences.",
      goodToKnow: "Classic live grill buffet experience; Very popular on weekends & holidays; Offers corporate/group dining packages",
      timings: "12:00 PM – 11:00 PM",
      specialties: [
        "Live Grill Experience",
        "Extensive Buffet Spread",
        "Fresh Seafood & Meats",
        "Vegetarian BBQ Options",
        "Dessert Counter",
        "Mocktail Bar"
      ],
      amenities: [
        "Live Grill Tables",
        "Air Conditioning",
        "Valet Parking",
        "Group Dining",
        "Corporate Packages",
        "Birthday Celebrations",
        "Family Friendly",
        "Credit Cards Accepted"
      ],
      atmosphere: "Vibrant, interactive dining atmosphere with live grilling stations and energetic ambiance",
      bestFor: "Group celebrations, family gatherings, corporate events, BBQ enthusiasts, buffet lovers",
      travelTips: "Book tables in advance, especially on weekends and holidays. Arrive hungry to make the most of the buffet. Best visited during lunch hours (12-3 PM) for freshest preparations. Parking available in building basement.",
      accessibility: "Elevator access to 3rd floor. Wheelchair accessible with spacious seating. Senior-friendly with comfortable chairs. Family-friendly with kids' menu and high chairs. Female-friendly with well-lit premises.",
      image: "/src/assets/Food & Dining/[(Barbeque Nation)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Barbeque Nation)1].jpg",
        "/src/assets/Food & Dining/[(Barbeque Nation)2].jpg",
        "/src/assets/Food & Dining/[(Barbeque Nation)3].jpg"
      ]
    },
    {
      id: "rest05",
      name: "OONA — The One",
      category: "Premium",
      location: "Kadru / New A.G. Colony, Ranchi",
      rating: 4.3,
      priceRange: "~₹1,400 for two",
      cuisine: "North Indian, Chinese, Desserts",
      contact: "+91 77070 77888",
      address: "Samridhi Building, New A.G. Colony, Kadru, Ranchi, Jharkhand 834002",
      description: "An elegant fine-dining establishment offering a sophisticated blend of North Indian and Chinese cuisines with an impressive dessert selection. OONA — The One creates an upscale dining experience with its contemporary decor, attentive service, and carefully crafted menu. Perfect for romantic dinners, business meetings, and special celebrations with its refined ambiance and premium offerings.",
      goodToKnow: "Upscale ambience with diverse menu; Ideal for dates & celebrations; Known for desserts & cocktails",
      timings: "12:00 PM – 10:45 PM",
      specialties: [
        "Premium North Indian Cuisine",
        "Authentic Chinese Dishes",
        "Artisanal Desserts",
        "Signature Cocktails",
        "Fine Dining Experience",
        "Chef's Special Creations"
      ],
      amenities: [
        "Air Conditioning",
        "Valet Parking",
        "Private Dining",
        "WiFi Available",
        "Credit Cards Accepted",
        "Birthday Celebrations",
        "Corporate Events",
        "Romantic Setting"
      ],
      atmosphere: "Elegant, contemporary ambiance with sophisticated decor and intimate lighting",
      bestFor: "Romantic dinners, business meetings, celebrations, fine dining enthusiasts, dessert lovers",
      travelTips: "Reservations recommended, especially for evening dining. Best visited during dinner hours (7-10 PM) for full menu availability. Dress code is smart casual. Parking available in building premises.",
      accessibility: "Ground floor accessible. Senior-friendly with comfortable seating. Family-friendly with high chairs available. Female-friendly with well-lit premises and security.",
      image: "/src/assets/Food & Dining/[(OONA-The One)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(OONA-The One)1].jpg",
        "/src/assets/Food & Dining/[(OONA-The One)2].jpg",
        "/src/assets/Food & Dining/[(OONA-The One)3].jpg"
      ]
    },
    {
      id: "rest06",
      name: "Kaveri Restaurant",
      category: "Budget",
      location: "Hindpiri / Ashok Nagar, Ranchi",
      rating: 4.2,
      priceRange: "~₹400–₹600 for two",
      cuisine: "South Indian, North Indian, Snacks",
      contact: "+91 84092 11101",
      address: "Hindpiri / Ashok Nagar, Ranchi (multiple outlets, Hindpiri most popular)",
      description: "A popular vegetarian restaurant chain known for its authentic South Indian cuisine, wholesome North Indian thalis, and quick service. Kaveri Restaurant has been serving delicious, budget-friendly meals to locals and visitors for years. The Hindpiri outlet is particularly famous for its extensive menu, fresh preparations, and consistent quality that keeps customers coming back.",
      goodToKnow: "Famous for pure veg thalis; Quick service & budget-friendly; Busy during lunch hours",
      timings: "10:00 AM – 10:00 PM",
      specialties: [
        "Authentic South Indian Thalis",
        "Fresh Dosa & Idli",
        "North Indian Curries",
        "Traditional Snacks",
        "Fresh Juices & Lassi",
        "Vegetarian Specialties"
      ],
      amenities: [
        "Pure Vegetarian",
        "Air Conditioning",
        "Free Parking",
        "Home Delivery",
        "Takeaway Available",
        "Quick Service",
        "Family Friendly",
        "Cash & Card Accepted"
      ],
      atmosphere: "Clean, traditional ambiance with comfortable seating and efficient service",
      bestFor: "Vegetarian food lovers, budget-conscious diners, quick meals, traditional Indian cuisine enthusiasts",
      travelTips: "Best visited during lunch hours (12-3 PM) for fresh thalis. Avoid peak hours (1-2 PM) for faster service. Parking available on-site. Popular for breakfast dosas and evening snacks.",
      accessibility: "Ground floor accessible. Senior-friendly with comfortable seating. Family-friendly with kids' menu. Female-friendly with well-lit premises and security.",
      image: "/src/assets/Food & Dining/[(Kaveri Restaurant)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Kaveri Restaurant)1].jpg",
        "/src/assets/Food & Dining/[(Kaveri Restaurant)2].jpg",
        "/src/assets/Food & Dining/[(Kaveri Restaurant)3].jpg"
      ]
    },
    {
      id: "rest07",
      name: "Oak Tavern Lounge",
      category: "Premium",
      location: "Doranda / Bara Ghaghra, Ranchi",
      rating: 4.1,
      priceRange: "~₹800 for two",
      cuisine: "Multi-cuisine, Lounge/Fine Dining",
      contact: "+91 99420 03511",
      address: "1st Floor, Abhi's Plaza, Bara Ghaghra Main Road, Doranda, Ranchi",
      description: "A sophisticated lounge and dining destination offering an eclectic mix of cuisines in an elegant, contemporary setting. Oak Tavern Lounge is known for its premium drinks, succulent kebabs, and vibrant nightlife atmosphere. With live music performances and DJ nights on weekends, it's the perfect spot for evening entertainment, casual dining, and social gatherings.",
      goodToKnow: "Lounge ambience with drinks & kebabs; Live music / DJ nights on weekends; Needs table booking for peak times",
      timings: "12:00 PM – 11:00 PM",
      specialties: [
        "Premium Cocktails & Drinks",
        "Succulent Kebabs & Grills",
        "Multi-Cuisine Menu",
        "Live Music Performances",
        "DJ Nights",
        "Lounge Experience"
      ],
      amenities: [
        "Lounge Seating",
        "Air Conditioning",
        "Valet Parking",
        "Live Music",
        "DJ Entertainment",
        "Private Parties",
        "Credit Cards Accepted",
        "WiFi Available"
      ],
      atmosphere: "Sophisticated lounge ambiance with contemporary decor and vibrant nightlife energy",
      bestFor: "Evening entertainment, social gatherings, drinks with friends, kebab lovers, music enthusiasts",
      travelTips: "Book tables in advance, especially for weekend evenings. Best visited after 7 PM for full lounge experience. Dress code is smart casual. Parking available in plaza basement.",
      accessibility: "Elevator access to 1st floor. Wheelchair accessible with spacious seating. Senior-friendly with comfortable chairs. Female-friendly with well-lit premises and security.",
      image: "/src/assets/Food & Dining/[(Oak Tavern Lounge)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Oak Tavern Lounge)1].jpg",
        "/src/assets/Food & Dining/[(Oak Tavern Lounge)2].jpg",
        "/src/assets/Food & Dining/[(Oak Tavern Lounge)3].jpg"
      ]
    },
    {
      id: "rest08",
      name: "Zinnia Multi-Cuisine Restaurant",
      category: "Mid-range",
      location: "Lalpur, Ranchi",
      rating: 4.2,
      priceRange: "~₹700 for two",
      cuisine: "Multi-cuisine",
      contact: "+91 65122 20220",
      address: "Circular Road, Near Lalpur Chowk, Ranchi, Jharkhand 834001",
      description: "A well-established family restaurant offering a diverse menu spanning multiple cuisines in a comfortable, well-maintained setting. Zinnia Multi-Cuisine Restaurant has built a reputation for consistent quality, attentive service, and value-for-money dining. Perfect for casual family meals, business lunches, and group dining with its spacious layout and efficient service.",
      goodToKnow: "Popular family restaurant with diverse menu; Good service & well-maintained ambience; Great for casual lunch or dinner",
      timings: "11:00 AM – 11:00 PM",
      specialties: [
        "Multi-Cuisine Menu",
        "North Indian Curries",
        "Chinese Dishes",
        "Continental Options",
        "Fresh Beverages",
        "Family Specials"
      ],
      amenities: [
        "Air Conditioning",
        "Free Parking",
        "Home Delivery",
        "Takeaway Available",
        "Family Friendly",
        "Group Dining",
        "Credit Cards Accepted",
        "WiFi Available"
      ],
      atmosphere: "Comfortable, family-friendly ambiance with clean decor and spacious seating",
      bestFor: "Family meals, casual dining, business lunches, group gatherings, multi-cuisine lovers",
      travelTips: "Best visited during lunch hours (12-3 PM) for fresh preparations. Popular during weekends, so consider booking ahead. Parking available on-site. Great for large group dining.",
      accessibility: "Ground floor accessible. Senior-friendly with comfortable seating. Family-friendly with high chairs available. Female-friendly with well-lit premises and security.",
      image: "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine Restaurant)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine Restaurant)1].jpg",
        "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine Restaurant)2].jpg",
        "/src/assets/Food & Dining/[(Zinnia Multi-Cuisine Restaurant)3].jpg"
      ]
    },
    {
      id: "rest09",
      name: "Taste Ride Café & Restro",
      category: "Budget",
      location: "Bariatu, Ranchi",
      rating: 4.3,
      priceRange: "~₹400 for two",
      cuisine: "Fast food, Chinese, Snacks, Shakes",
      contact: "+91 94703 56789",
      address: "Bariatu Main Road, Opposite Sadar Hospital, Ranchi",
      description: "A vibrant café and restaurant popular among students and young professionals, offering delicious fast food, refreshing shakes, Chinese dishes, and quick snacks at pocket-friendly prices. Taste Ride Café & Restro creates a cozy, casual atmosphere perfect for hangouts, study sessions, and casual dining with friends.",
      goodToKnow: "Famous among students & youngsters; Known for fast food, shakes, Chinese & snacks; Pocket-friendly with cozy café vibes",
      timings: "10:00 AM – 10:00 PM",
      specialties: [
        "Fresh Shakes & Beverages",
        "Fast Food & Burgers",
        "Chinese Dishes",
        "Quick Snacks",
        "Student Specials",
        "Café Experience"
      ],
      amenities: [
        "Air Conditioning",
        "Free WiFi",
        "Student Discounts",
        "Takeaway Available",
        "Home Delivery",
        "Casual Seating",
        "Cash & Card Accepted",
        "Group Friendly"
      ],
      atmosphere: "Cozy, casual café ambiance with vibrant decor and student-friendly environment",
      bestFor: "Students, young professionals, casual hangouts, quick meals, budget-conscious diners",
      travelTips: "Best visited during evening hours (5-9 PM) for full café experience. Popular among students, so can get crowded during lunch hours. WiFi available for work/study. Parking available on roadside.",
      accessibility: "Ground floor accessible. Student-friendly with casual seating. Family-friendly with kids' menu. Female-friendly with well-lit premises and security.",
      image: "/src/assets/Food & Dining/[(Taste Ride Café-Restro)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Taste Ride Café-Restro)1].jpg",
        "/src/assets/Food & Dining/[(Taste Ride Café-Restro)2].jpg",
        "/src/assets/Food & Dining/[(Taste Ride Café-Restro)3].jpg"
      ]
    },
    {
      id: "rest10",
      name: "Kailash Pure Veg",
      category: "Budget",
      location: "Deoghar",
      rating: 4.5,
      priceRange: "~₹200–₹400 for two",
      cuisine: "Pure vegetarian, Thalis, Sweets",
      contact: "+91 93342 87654",
      address: "Tower Chowk, Deoghar, Jharkhand 814112",
      description: "A traditional vegetarian restaurant serving authentic local specialties, famous for its wholesome thalis and fresh sweets. Kailash Pure Veg has been a trusted name among locals and visitors for its hygienic preparation, traditional recipes, and family-friendly environment. Perfect for those seeking authentic vegetarian cuisine in a clean, comfortable setting.",
      goodToKnow: "Pure veg restaurant serving local specialties; Popular for thalis & sweets; Hygienic & family-friendly environment",
      timings: "9:00 AM – 10:00 PM",
      specialties: [
        "Traditional Thalis",
        "Fresh Sweets & Mithai",
        "Local Specialties",
        "Pure Vegetarian Cuisine",
        "Traditional Snacks",
        "Fresh Beverages"
      ],
      amenities: [
        "Pure Vegetarian",
        "Air Conditioning",
        "Free Parking",
        "Family Friendly",
        "Takeaway Available",
        "Hygienic Kitchen",
        "Cash & Card Accepted",
        "Group Dining"
      ],
      atmosphere: "Traditional, family-friendly ambiance with clean decor and comfortable seating",
      bestFor: "Vegetarian food lovers, family meals, traditional cuisine enthusiasts, budget-conscious diners",
      travelTips: "Best visited during lunch hours (12-3 PM) for fresh thalis. Popular among families, so can get crowded during weekends. Parking available on-site. Great for traditional dining experience.",
      accessibility: "Ground floor accessible. Senior-friendly with comfortable seating. Family-friendly with high chairs available. Female-friendly with well-lit premises and security.",
      image: "/src/assets/Food & Dining/[(Kailash Pure Veg)1].jpg",
      images: [
        "/src/assets/Food & Dining/[(Kailash Pure Veg)1].jpg",
        "/src/assets/Food & Dining/[(Kailash Pure Veg)2].jpg",
        "/src/assets/Food & Dining/[(Kailash Pure Veg)3].jpg"
      ]
    },
    {
      id: "rest11",
      name: "Dine X Divine",
      category: "Budget",
      location: "Deoghar",
      rating: 4.2,
      priceRange: "~₹300–₹600 for two",
      cuisine: "North Indian, Chinese",
      contact: "+91 94701 11223",
      address: "Near Castairs Town, Deoghar, Jharkhand 814112",
      description: "Good spot for families and travelers with North Indian & Chinese specialties",
      goodToKnow: "Good spot for families and travelers; North Indian & Chinese specialties; Clean interiors and quick service",
      timings: "11:00 AM – 10:30 PM"
    },
    {
      id: "rest12",
      name: "Moon Brewery & Restaurant",
      category: "Premium",
      location: "Bistupur, Jamshedpur",
      rating: 4.6,
      priceRange: "~₹1,500 for two",
      cuisine: "Multi-cuisine, Brewery, Fine dining",
      contact: "+91 77638 12345",
      address: "Bistupur Main Road, Jamshedpur, Jharkhand 831001",
      description: "Known for in-house brewery & fine dining with great ambience for nightlife & celebrations",
      goodToKnow: "Known for in-house brewery & fine dining; Great ambience for nightlife & celebrations; Popular among young professionals",
      timings: "12:00 PM – 11:30 PM"
    },
    {
      id: "rest13",
      name: "Khana Khazana",
      category: "Budget",
      location: "Bistupur, Jamshedpur",
      rating: 4.3,
      priceRange: "~₹500 for two",
      cuisine: "Local Jharkhandi/Bihari cuisine",
      contact: "+91 65722 22333",
      address: "Bistupur Market, Jamshedpur, Jharkhand 831001",
      description: "Specializes in local Jharkhandi & Bihari cuisine with affordable meals and homely taste",
      goodToKnow: "Specializes in local Jharkhandi & Bihari cuisine; Affordable meals with homely taste; Popular with locals & repeat customers",
      timings: "11:00 AM – 10:30 PM"
    }
  ];
  
  return restaurants.find(rest => rest.id === id) || restaurants[0];
};

export default function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant] = useState(() => getRestaurantData(id || "rest02"));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    document.title = `${restaurant.name} • Discover Jharkhand`;
    // Scroll to top when component mounts or restaurant changes
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [restaurant.name, id]);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
      };
    }
  }, [restaurant.images]);

  return (
    <div className="pb-24 min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground px-6 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <Button variant="secondary" size="sm" onClick={() => navigate('/destinations?tab=food')}>
            <ArrowLeft size={14} className="mr-1" /> Back
          </Button>
          <Badge variant="secondary">{restaurant.category}</Badge>
        </div>
        <h1 className="text-2xl font-bold font-inter">{restaurant.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="text-accent fill-accent" size={16} />
            <span className="text-sm font-medium ml-1">{restaurant.rating}</span>
          </div>
          <span className="text-primary-foreground/60 text-sm">•</span>
          <span className="text-primary-foreground/80 text-sm">Menu snapshot, ratings, and info</span>
        </div>
      </header>

      <main className="px-6 pt-6 space-y-6">
        {/* Restaurant Images Gallery */}
        <div className="space-y-3 relative">
          <div className="relative">
            {/* Left scroll button */}
            {canScrollLeft && (
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollLeft}
              >
                <ChevronLeft size={20} />
              </Button>
            )}
            
            {/* Right scroll button */}
            {canScrollRight && (
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
                onClick={scrollRight}
              >
                <ChevronRight size={20} />
              </Button>
            )}
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {restaurant.images?.map((image, index) => (
                <div key={index} className="flex-shrink-0 w-[32rem] h-96 bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${restaurant.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )) || (
                <div className="flex-shrink-0 w-[32rem] h-96 bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={restaurant.image || "/placeholder.svg"} 
                    alt={`${restaurant.name} view`}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center"><MapPin size={14} className="mr-2" /> {restaurant.location}</div>
          <div className="flex items-center"><Phone size={14} className="mr-2" /> {restaurant.contact}</div>
          <div className="flex items-center"><Star size={14} className="mr-2 text-accent" /> {restaurant.rating}</div>
          <div className="flex items-center"><IndianRupee size={14} className="mr-2" /> {restaurant.priceRange}</div>
        </div>
        
        {/* Address Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">Address</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.address}</p>
        </section>
        
        {/* Timings Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">Timings</h2>
          <p className="text-sm text-muted-foreground">{restaurant.timings}</p>
        </section>
        
        {/* About Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">About</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.description}</p>
        </section>

        {/* Specialties Section */}
        {restaurant.specialties && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Specialties</h2>
            <div className="flex flex-wrap gap-2">
              {restaurant.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Amenities Section */}
        {restaurant.amenities && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {restaurant.amenities.map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Atmosphere Section */}
        {restaurant.atmosphere && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Atmosphere</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.atmosphere}</p>
          </section>
        )}

        {/* Best For Section */}
        {restaurant.bestFor && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Best For</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.bestFor}</p>
          </section>
        )}

        {/* Travel Tips Section */}
        {restaurant.travelTips && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Travel Tips</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.travelTips}</p>
          </section>
        )}

        {/* Accessibility Section */}
        {restaurant.accessibility && (
          <section>
            <h2 className="font-medium text-foreground mb-2">Accessibility</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.accessibility}</p>
          </section>
        )}

        {/* Good to Know Section */}
        <section>
          <h2 className="font-medium text-foreground mb-2">Good to Know</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{restaurant.goodToKnow}</p>
        </section>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pb-4">
          <Button variant="outline"><Navigation size={16} className="mr-1" /> More Info</Button>
          <Button variant="outline">Open in Google</Button>
          <Button className="bg-primary hover:bg-primary-light"><Heart size={16} className="mr-1" /> Add to Favorites</Button>
        </div>
      </main>
    </div>
  );
}
