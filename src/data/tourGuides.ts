export interface TourGuide {
  id: number;
  name: string;
  specialization: string;
  locations: string[];
  price: string;
  rating: number;
  experience: string;
  languages: string[];
  verified: boolean;
  image: string;
  description: string;
  specialties: string[];
  availability: string;
  nextAvailable: string;
  totalTours: number;
  responseTime: string;
  verificationDetails?: {
    verifiedBy: string;
    verificationDate: string;
    credentials: string[];
    certifications: string[];
  };
  bio?: string;
  achievements?: string[];
  reviews?: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  contactInfo?: {
    phone: string;
    email: string;
    whatsapp: string;
  };
}

export const tourGuides: TourGuide[] = [
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
    image: "/src/assets/Tour Guides/rajeshkumarsingh.png",
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
    image: "/src/assets/Tour Guides/priyadevi.png",
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
    image: "/src/assets/Tour Guides/amitkumarmunda.png",
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
  },
  {
    id: 4,
    name: "Arjun Singh",
    specialization: "Adventure & Trekking",
    locations: ["Netarhat", "Patratu Valley", "Dassam Falls", "Hazaribagh", "Betla National Park"],
    price: "₹2,800",
    rating: 4.7,
    experience: "5 years",
    languages: ["Hindi", "English"],
    verified: true,
    image: "/src/assets/Tour Guides/arjunsingh.png",
    description: "Adventure enthusiast specializing in trekking, camping, and outdoor activities in Jharkhand's scenic locations.",
    specialties: ["Trekking", "Camping", "Rock Climbing", "Adventure Sports"],
    availability: "Available",
    nextAvailable: "Friday 6:00 AM",
    totalTours: 280,
    responseTime: "Within 2 hours",
    verificationDetails: {
      verifiedBy: "Adventure Sports Authority",
      verificationDate: "2023-06-15",
      credentials: ["Adventure Guide License", "First Aid Certificate", "Mountain Rescue Training"],
      certifications: ["Adventure Sports Authority", "Mountain Rescue Association", "First Aid Society"]
    },
    bio: "Arjun Singh is an adventure sports enthusiast with 5 years of experience in organizing trekking and camping expeditions across Jharkhand's beautiful landscapes.",
    achievements: [
      "Adventure Sports Excellence 2023",
      "Mountain Rescue Expert",
      "280+ Adventure Tours",
      "Safety First Award"
    ],
    reviews: [
      {
        name: "Deepak Kumar",
        rating: 5,
        comment: "Arjun made our trekking experience safe and memorable. Great guide!",
        date: "2024-01-05"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43213",
      email: "arjun.singh@adventurejharkhand.com",
      whatsapp: "+91 98765 43213"
    }
  },
  {
    id: 5,
    name: "Dr. Sunita Sharma",
    specialization: "Educational & Research Tours",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar", "Hazaribagh"],
    price: "₹3,500",
    rating: 4.9,
    experience: "12 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: true,
    image: "/src/assets/Tour Guides/drsunitasharma.png",
    description: "Academic researcher and educator specializing in Jharkhand's geology, anthropology, and environmental studies.",
    specialties: ["Educational Tours", "Research Expeditions", "Geological Sites", "Anthropological Studies"],
    availability: "Available",
    nextAvailable: "Monday 10:00 AM",
    totalTours: 150,
    responseTime: "Within 4 hours",
    verificationDetails: {
      verifiedBy: "University of Jharkhand",
      verificationDate: "2022-08-20",
      credentials: ["PhD in Anthropology", "Research Guide License", "Educational Tour Certificate"],
      certifications: ["University of Jharkhand", "Anthropological Survey of India", "Ministry of Education"]
    },
    bio: "Dr. Sunita Sharma is a renowned anthropologist and educator with 12 years of experience in conducting educational and research tours across Jharkhand.",
    achievements: [
      "Best Educational Guide Award 2023",
      "Research Excellence Award",
      "150+ Educational Tours",
      "Academic Recognition"
    ],
    reviews: [
      {
        name: "Prof. Rajesh Kumar",
        rating: 5,
        comment: "Dr. Sharma's educational tours are exceptional. Perfect for students and researchers!",
        date: "2024-01-03"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43214",
      email: "sunita.sharma@edu.jharkhand.com",
      whatsapp: "+91 98765 43214"
    }
  },
  {
    id: 6,
    name: "Babulal Murmu",
    specialization: "Tribal Heritage & Crafts",
    locations: ["Khunti", "Simdega", "Gumla", "West Singhbhum", "Seraikela"],
    price: "₹1,800",
    rating: 4.8,
    experience: "7 years",
    languages: ["Hindi", "Santhali", "Munda", "English"],
    verified: true,
    image: "/src/assets/Tour Guides/babulal murmu.png",
    description: "Traditional craftsman and tribal heritage expert specializing in Santhal culture and traditional crafts.",
    specialties: ["Traditional Crafts", "Tribal Heritage", "Cultural Workshops", "Handicraft Tours"],
    availability: "Available",
    nextAvailable: "Wednesday 2:00 PM",
    totalTours: 420,
    responseTime: "Within 3 hours",
    verificationDetails: {
      verifiedBy: "Tribal Development Authority",
      verificationDate: "2023-02-10",
      credentials: ["Tribal Crafts Expert", "Cultural Heritage Guide", "Traditional Artisan Certificate"],
      certifications: ["Tribal Development Authority", "Ministry of Tribal Affairs", "Handicrafts Board"]
    },
    bio: "Babulal Murmu is a traditional craftsman from the Santhal community with 7 years of experience in preserving and sharing tribal heritage through craft workshops and cultural tours.",
    achievements: [
      "Tribal Crafts Excellence 2023",
      "Cultural Heritage Preservation",
      "420+ Craft Workshops",
      "Traditional Artisan Award"
    ],
    reviews: [
      {
        name: "Meera Singh",
        rating: 5,
        comment: "Babulal's craft workshops are amazing. Learned so much about tribal traditions!",
        date: "2024-01-01"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43215",
      email: "babulal.murmu@tribalcrafts.com",
      whatsapp: "+91 98765 43215"
    }
  },
  {
    id: 7,
    name: "Dr. Ranjali Dutta",
    specialization: "Medical Tourism & Wellness",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar"],
    price: "₹4,000",
    rating: 4.9,
    experience: "15 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: true,
    image: "/src/assets/Tour Guides/dranjalidutta.png",
    description: "Medical professional specializing in wellness tourism and traditional healing practices in Jharkhand.",
    specialties: ["Wellness Tours", "Medical Tourism", "Traditional Healing", "Health Retreats"],
    availability: "Available",
    nextAvailable: "Tuesday 9:00 AM",
    totalTours: 200,
    responseTime: "Within 2 hours",
    verificationDetails: {
      verifiedBy: "Medical Council of India",
      verificationDate: "2022-12-05",
      credentials: ["MD in Alternative Medicine", "Medical Tourism License", "Wellness Guide Certificate"],
      certifications: ["Medical Council of India", "Ministry of Health", "Wellness Tourism Board"]
    },
    bio: "Dr. Ranjali Dutta is a medical professional with 15 years of experience in wellness tourism and traditional healing practices, specializing in Jharkhand's natural healing resources.",
    achievements: [
      "Wellness Tourism Excellence 2023",
      "Medical Tourism Pioneer",
      "200+ Wellness Tours",
      "Health & Wellness Award"
    ],
    reviews: [
      {
        name: "Dr. Amit Kumar",
        rating: 5,
        comment: "Dr. Dutta's wellness tours are exceptional. Perfect blend of medical expertise and tourism!",
        date: "2023-12-28"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43216",
      email: "ranjali.dutta@wellnessjharkhand.com",
      whatsapp: "+91 98765 43216"
    }
  },
  {
    id: 8,
    name: "Kiran Tudu",
    specialization: "Spiritual & Religious Tours",
    locations: ["Deoghar", "Baidyanath Temple", "Maluti Temples", "Rajrappa", "Hazaribagh"],
    price: "₹2,200",
    rating: 4.8,
    experience: "9 years",
    languages: ["Hindi", "Santhali", "English"],
    verified: true,
    image: "/src/assets/Tour Guides/kirantudu.png",
    description: "Spiritual guide specializing in religious sites and temple tours across Jharkhand's sacred destinations.",
    specialties: ["Temple Tours", "Spiritual Journeys", "Religious Sites", "Pilgrimage Tours"],
    availability: "Available",
    nextAvailable: "Thursday 7:00 AM",
    totalTours: 380,
    responseTime: "Within 2 hours",
    verificationDetails: {
      verifiedBy: "Religious Tourism Board",
      verificationDate: "2023-04-12",
      credentials: ["Spiritual Guide License", "Religious Site Expert", "Pilgrimage Tour Certificate"],
      certifications: ["Religious Tourism Board", "Temple Trust", "Spiritual Tourism Society"]
    },
    bio: "Kiran Tudu is a spiritual guide with 9 years of experience in conducting religious and pilgrimage tours across Jharkhand's sacred sites and temples.",
    achievements: [
      "Spiritual Tourism Excellence 2023",
      "Temple Guide Expert",
      "380+ Pilgrimage Tours",
      "Religious Tourism Award"
    ],
    reviews: [
      {
        name: "Ram Kumar",
        rating: 5,
        comment: "Kiran's spiritual tours are deeply meaningful. Perfect guide for temple visits!",
        date: "2023-12-25"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43217",
      email: "kiran.tudu@spiritualjharkhand.com",
      whatsapp: "+91 98765 43217"
    }
  },
  {
    id: 9,
    name: "Lakshmi Devi",
    specialization: "Women's Tours & Safety",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar", "Hazaribagh"],
    price: "₹2,600",
    rating: 4.9,
    experience: "6 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: true,
    image: "/src/assets/Tour Guides/lakhsmidevi.png",
    description: "Specialized guide for women travelers, ensuring safe and comfortable tours across Jharkhand.",
    specialties: ["Women's Tours", "Safety First", "Solo Travel", "Group Tours"],
    availability: "Available",
    nextAvailable: "Saturday 10:00 AM",
    totalTours: 320,
    responseTime: "Within 1 hour",
    verificationDetails: {
      verifiedBy: "Women's Tourism Board",
      verificationDate: "2023-05-18",
      credentials: ["Women's Safety Certificate", "Tour Guide License", "Security Training"],
      certifications: ["Women's Tourism Board", "Safety First Association", "Tourism Security Council"]
    },
    bio: "Lakshmi Devi is a specialized guide for women travelers with 6 years of experience in ensuring safe and comfortable tours across Jharkhand.",
    achievements: [
      "Women's Safety Excellence 2023",
      "Safe Tourism Pioneer",
      "320+ Women's Tours",
      "Safety First Award"
    ],
    reviews: [
      {
        name: "Priya Singh",
        rating: 5,
        comment: "Lakshmi's tours are perfect for women travelers. Safe, comfortable, and informative!",
        date: "2023-12-20"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43218",
      email: "lakshmi.devi@womentoursjharkhand.com",
      whatsapp: "+91 98765 43218"
    }
  },
  {
    id: 10,
    name: "Meera Kumari",
    specialization: "Family Tours & Kids Activities",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar", "Hazaribagh"],
    price: "₹2,400",
    rating: 4.8,
    experience: "8 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: true,
    image: "/src/assets/Tour Guides/meerakumari.png",
    description: "Family-friendly guide specializing in tours suitable for children and family groups.",
    specialties: ["Family Tours", "Kids Activities", "Educational Tours", "Fun Activities"],
    availability: "Available",
    nextAvailable: "Sunday 11:00 AM",
    totalTours: 450,
    responseTime: "Within 2 hours",
    verificationDetails: {
      verifiedBy: "Family Tourism Board",
      verificationDate: "2023-03-25",
      credentials: ["Family Guide License", "Child Safety Certificate", "Educational Tour Certificate"],
      certifications: ["Family Tourism Board", "Child Safety Council", "Educational Tourism Society"]
    },
    bio: "Meera Kumari is a family-friendly guide with 8 years of experience in organizing tours suitable for children and family groups across Jharkhand.",
    achievements: [
      "Family Tourism Excellence 2023",
      "Kids-Friendly Guide",
      "450+ Family Tours",
      "Child Safety Award"
    ],
    reviews: [
      {
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Meera's family tours are perfect for kids. Educational and fun!",
        date: "2023-12-18"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43219",
      email: "meera.kumari@familytoursjharkhand.com",
      whatsapp: "+91 98765 43219"
    }
  },
  {
    id: 11,
    name: "Naresh Kumar",
    specialization: "Business Tourism & Corporate Tours",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar"],
    price: "₹3,200",
    rating: 4.7,
    experience: "10 years",
    languages: ["Hindi", "English"],
    verified: true,
    image: "/src/assets/Tour Guides/nareshkumar.png",
    description: "Professional guide specializing in business tourism and corporate group tours.",
    specialties: ["Business Tours", "Corporate Groups", "Professional Services", "Executive Tours"],
    availability: "Available",
    nextAvailable: "Monday 8:00 AM",
    totalTours: 280,
    responseTime: "Within 1 hour",
    verificationDetails: {
      verifiedBy: "Business Tourism Board",
      verificationDate: "2023-01-30",
      credentials: ["Business Guide License", "Corporate Tour Certificate", "Professional Services License"],
      certifications: ["Business Tourism Board", "Corporate Tourism Council", "Professional Services Association"]
    },
    bio: "Naresh Kumar is a professional guide with 10 years of experience in organizing business tourism and corporate group tours across Jharkhand.",
    achievements: [
      "Business Tourism Excellence 2023",
      "Corporate Tour Expert",
      "280+ Business Tours",
      "Professional Services Award"
    ],
    reviews: [
      {
        name: "Amit Singh",
        rating: 5,
        comment: "Naresh's business tours are professional and well-organized. Perfect for corporate groups!",
        date: "2023-12-15"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43220",
      email: "naresh.kumar@businesstoursjharkhand.com",
      whatsapp: "+91 98765 43220"
    }
  },
  {
    id: 12,
    name: "Ravi Kumar",
    specialization: "Photography Tours & Workshops",
    locations: ["Netarhat", "Patratu Valley", "Dassam Falls", "Hazaribagh", "Betla National Park"],
    price: "₹2,800",
    rating: 4.6,
    experience: "7 years",
    languages: ["Hindi", "English"],
    verified: true,
    image: "/src/assets/Tour Guides/ravikumar.png",
    description: "Professional photographer specializing in landscape and wildlife photography tours.",
    specialties: ["Photography Tours", "Landscape Photography", "Wildlife Photography", "Photo Workshops"],
    availability: "Available",
    nextAvailable: "Friday 5:00 AM",
    totalTours: 350,
    responseTime: "Within 3 hours",
    verificationDetails: {
      verifiedBy: "Photography Tourism Board",
      verificationDate: "2023-07-10",
      credentials: ["Photography Guide License", "Professional Photographer Certificate", "Wildlife Photography License"],
      certifications: ["Photography Tourism Board", "Professional Photographers Association", "Wildlife Photography Society"]
    },
    bio: "Ravi Kumar is a professional photographer with 7 years of experience in conducting photography tours and workshops across Jharkhand's scenic locations.",
    achievements: [
      "Photography Excellence 2023",
      "Landscape Photography Expert",
      "350+ Photography Tours",
      "Wildlife Photography Award"
    ],
    reviews: [
      {
        name: "Suresh Singh",
        rating: 5,
        comment: "Ravi's photography tours are amazing. Learned so much about landscape photography!",
        date: "2023-12-12"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43221",
      email: "ravi.kumar@photographytoursjharkhand.com",
      whatsapp: "+91 98765 43221"
    }
  },
  {
    id: 13,
    name: "Rita Kumari",
    specialization: "Art & Culture Tours",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar", "Hazaribagh"],
    price: "₹2,300",
    rating: 4.8,
    experience: "6 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: true,
    image: "/src/assets/Tour Guides/ritakumari.png",
    description: "Art and culture enthusiast specializing in Jharkhand's artistic heritage and cultural experiences.",
    specialties: ["Art Tours", "Cultural Experiences", "Museum Tours", "Art Workshops"],
    availability: "Available",
    nextAvailable: "Wednesday 3:00 PM",
    totalTours: 290,
    responseTime: "Within 2 hours",
    verificationDetails: {
      verifiedBy: "Cultural Tourism Board",
      verificationDate: "2023-08-15",
      credentials: ["Cultural Guide License", "Art History Certificate", "Museum Guide Certificate"],
      certifications: ["Cultural Tourism Board", "Art History Society", "Museum Association"]
    },
    bio: "Rita Kumari is an art and culture enthusiast with 6 years of experience in conducting tours focused on Jharkhand's artistic heritage and cultural experiences.",
    achievements: [
      "Cultural Tourism Excellence 2023",
      "Art History Expert",
      "290+ Cultural Tours",
      "Museum Guide Award"
    ],
    reviews: [
      {
        name: "Anita Singh",
        rating: 5,
        comment: "Rita's art tours are fascinating. Great insights into Jharkhand's cultural heritage!",
        date: "2023-12-10"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43222",
      email: "rita.kumari@culturaltoursjharkhand.com",
      whatsapp: "+91 98765 43222"
    }
  },
  {
    id: 14,
    name: "Suresh Kumar",
    specialization: "Night Tours & Evening Experiences",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar"],
    price: "₹2,100",
    rating: 4.7,
    experience: "5 years",
    languages: ["Hindi", "English"],
    verified: true,
    image: "/src/assets/Tour Guides/sureshkumar.png",
    description: "Specialized guide for night tours and evening cultural experiences in Jharkhand.",
    specialties: ["Night Tours", "Evening Experiences", "Cultural Shows", "Night Markets"],
    availability: "Available",
    nextAvailable: "Tonight 7:00 PM",
    totalTours: 180,
    responseTime: "Within 2 hours",
    verificationDetails: {
      verifiedBy: "Night Tourism Board",
      verificationDate: "2023-09-20",
      credentials: ["Night Guide License", "Evening Tour Certificate", "Cultural Show Guide"],
      certifications: ["Night Tourism Board", "Evening Tourism Society", "Cultural Show Association"]
    },
    bio: "Suresh Kumar is a specialized guide with 5 years of experience in conducting night tours and evening cultural experiences across Jharkhand.",
    achievements: [
      "Night Tourism Excellence 2023",
      "Evening Tour Expert",
      "180+ Night Tours",
      "Cultural Show Guide Award"
    ],
    reviews: [
      {
        name: "Vikram Singh",
        rating: 5,
        comment: "Suresh's night tours are unique and exciting. Great way to experience Jharkhand at night!",
        date: "2023-12-08"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43223",
      email: "suresh.kumar@nighttoursjharkhand.com",
      whatsapp: "+91 98765 43223"
    }
  },
  {
    id: 15,
    name: "Sushila Devi",
    specialization: "Senior Citizen Tours",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar", "Hazaribagh"],
    price: "₹2,000",
    rating: 4.9,
    experience: "12 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: true,
    image: "/src/assets/Tour Guides/sushiladevi.png",
    description: "Specialized guide for senior citizens, ensuring comfortable and accessible tours.",
    specialties: ["Senior Tours", "Accessible Tours", "Comfortable Travel", "Gentle Pace"],
    availability: "Available",
    nextAvailable: "Tuesday 10:00 AM",
    totalTours: 520,
    responseTime: "Within 3 hours",
    verificationDetails: {
      verifiedBy: "Senior Tourism Board",
      verificationDate: "2022-10-15",
      credentials: ["Senior Guide License", "Accessibility Certificate", "Comfort Travel Certificate"],
      certifications: ["Senior Tourism Board", "Accessibility Council", "Comfort Travel Association"]
    },
    bio: "Sushila Devi is a specialized guide with 12 years of experience in organizing comfortable and accessible tours for senior citizens across Jharkhand.",
    achievements: [
      "Senior Tourism Excellence 2023",
      "Accessibility Expert",
      "520+ Senior Tours",
      "Comfort Travel Award"
    ],
    reviews: [
      {
        name: "Ram Prasad",
        rating: 5,
        comment: "Sushila's tours are perfect for seniors. Comfortable pace and great care!",
        date: "2023-12-05"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43224",
      email: "sushila.devi@seniortoursjharkhand.com",
      whatsapp: "+91 98765 43224"
    }
  },
  {
    id: 16,
    name: "Vikram Singh",
    specialization: "Luxury Tours & Premium Experiences",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar", "Hazaribagh"],
    price: "₹5,000",
    rating: 4.9,
    experience: "8 years",
    languages: ["Hindi", "English"],
    verified: true,
    image: "/src/assets/Tour Guides/vikramsingh.png",
    description: "Luxury tour specialist offering premium experiences and high-end services across Jharkhand.",
    specialties: ["Luxury Tours", "Premium Experiences", "VIP Services", "High-End Accommodations"],
    availability: "Available",
    nextAvailable: "Tomorrow 11:00 AM",
    totalTours: 150,
    responseTime: "Within 1 hour",
    verificationDetails: {
      verifiedBy: "Luxury Tourism Board",
      verificationDate: "2023-11-05",
      credentials: ["Luxury Guide License", "Premium Services Certificate", "VIP Tour Certificate"],
      certifications: ["Luxury Tourism Board", "Premium Services Association", "VIP Tourism Council"]
    },
    bio: "Vikram Singh is a luxury tour specialist with 8 years of experience in offering premium experiences and high-end services across Jharkhand.",
    achievements: [
      "Luxury Tourism Excellence 2023",
      "Premium Services Expert",
      "150+ Luxury Tours",
      "VIP Services Award"
    ],
    reviews: [
      {
        name: "Rajesh Kumar",
        rating: 5,
        comment: "Vikram's luxury tours are exceptional. Premium service and unforgettable experiences!",
        date: "2023-12-03"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43225",
      email: "vikram.singh@luxurytoursjharkhand.com",
      whatsapp: "+91 98765 43225"
    }
  },
  {
    id: 17,
    name: "Poonam Devi",
    specialization: "Food & Culinary Tours",
    locations: ["Ranchi", "Jamshedpur", "Dhanbad", "Deoghar", "Hazaribagh", "Dumka"],
    price: "₹2,200",
    rating: 4.8,
    experience: "4 years",
    languages: ["Hindi", "English", "Bengali"],
    verified: false,
    image: "/src/assets/Tour Guides/poonamdevi.png",
    description: "Local food expert specializing in traditional Jharkhand cuisine and street food experiences.",
    specialties: ["Street Food", "Traditional Cuisine", "Cooking Classes", "Food Markets"],
    availability: "Available",
    nextAvailable: "Wednesday 6:00 PM",
    totalTours: 180,
    responseTime: "Within 4 hours",
    verificationDetails: {
      verifiedBy: "Food Tourism Board",
      verificationDate: "2023-10-12",
      credentials: ["Food Guide License", "Culinary Expert Certificate", "Street Food Guide"],
      certifications: ["Food Tourism Board", "Culinary Arts Society", "Street Food Association"]
    },
    bio: "Poonam Devi is a local food expert with 4 years of experience in conducting culinary tours and food experiences across Jharkhand.",
    achievements: [
      "Food Tourism Excellence 2023",
      "Culinary Expert",
      "180+ Food Tours",
      "Street Food Guide Award"
    ],
    reviews: [
      {
        name: "Amit Kumar",
        rating: 5,
        comment: "Poonam's food tours are delicious! Great way to explore Jharkhand's cuisine!",
        date: "2023-12-01"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43226",
      email: "poonam.devi@foodtoursjharkhand.com",
      whatsapp: "+91 98765 43226"
    }
  },
  {
    id: 18,
    name: "Manoj Singh",
    specialization: "Photography & Instagram Tours",
    locations: ["Netarhat", "Patratu Valley", "Dassam Falls", "Hazaribagh", "Betla National Park"],
    price: "₹3,000",
    rating: 4.6,
    experience: "3 years",
    languages: ["Hindi", "English"],
    verified: false,
    image: "/src/assets/Tour Guides/manoj singh.png",
    description: "Professional photographer specializing in landscape and wildlife photography tours.",
    specialties: ["Landscape Photography", "Wildlife Photography", "Instagram Tours", "Scenic Spots"],
    availability: "Available",
    nextAvailable: "Friday 5:00 AM",
    totalTours: 120,
    responseTime: "Within 6 hours",
    verificationDetails: {
      verifiedBy: "Photography Tourism Board",
      verificationDate: "2023-12-01",
      credentials: ["Photography Guide License", "Instagram Tour Certificate", "Social Media Guide"],
      certifications: ["Photography Tourism Board", "Social Media Tourism Society", "Instagram Tourism Association"]
    },
    bio: "Manoj Singh is a professional photographer with 3 years of experience in conducting photography and Instagram-worthy tours across Jharkhand's scenic locations.",
    achievements: [
      "Instagram Tourism Excellence 2023",
      "Social Media Guide",
      "120+ Instagram Tours",
      "Photography Innovation Award"
    ],
    reviews: [
      {
        name: "Rahul Kumar",
        rating: 5,
        comment: "Manoj's Instagram tours are perfect for social media enthusiasts. Great photo spots!",
        date: "2023-11-28"
      }
    ],
    contactInfo: {
      phone: "+91 98765 43227",
      email: "manoj.singh@instagramtoursjharkhand.com",
      whatsapp: "+91 98765 43227"
    }
  }
];
