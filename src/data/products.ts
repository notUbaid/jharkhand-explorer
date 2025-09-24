export interface SellerProfile {
  name: string;
  businessName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  email: string;
  establishedYear: number;
  description: string;
  specialties: string[];
  certifications: string[];
  totalProducts: number;
  averageRating: number;
  responseTime: string;
  verified: boolean;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    website?: string;
  };
}

export interface Product {
  id: number;
  name: string;
  seller: string;
  price: string;
  rating: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
  sellerProfile: SellerProfile;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Dokra Tribal Necklace",
    seller: "Tribal Artisans Co-op",
    price: "₹1,800",
    rating: 4.9,
    image: "/assets/Products/DokraTribalNecklace.png.png",
    category: "Handicrafts",
    inStock: true,
    description: "Handmade brass jewelry with tribal motifs, traditional bell-metal casting",
    sellerProfile: {
      name: "Rajesh Kumar Mahato",
      businessName: "Tribal Artisans Co-op",
      address: "Village: Khunti, Near Tribal Museum",
      city: "Khunti",
      state: "Jharkhand",
      pincode: "835210",
      phone: "+91 98765 43210",
      email: "rajesh.mahato@tribalartisans.coop",
      establishedYear: 2015,
      description: "Rajesh Kumar Mahato leads a cooperative of 25+ traditional Dokra artisans from the Munda and Santhal tribes. With over 15 years of experience in bell-metal casting, he has been instrumental in preserving and promoting Jharkhand's ancient Dokra art form. The cooperative operates from a traditional workshop in Khunti, where artisans create authentic tribal jewelry using age-old techniques passed down through generations.",
      specialties: ["Dokra Bell-Metal Casting", "Tribal Jewelry Design", "Traditional Metalwork", "Cultural Heritage Preservation"],
      certifications: ["Ministry of Textiles - Handicrafts Certification", "Jharkhand Tribal Development Society", "National Handicrafts Development Corporation"],
      totalProducts: 45,
      averageRating: 4.9,
      responseTime: "Within 2 hours",
      verified: true,
      socialMedia: {
        instagram: "@tribalartisans_khunti",
        facebook: "Tribal Artisans Cooperative Khunti",
        website: "www.tribalartisansjharkhand.com"
      }
    }
  },
  {
    id: 2,
    name: "Tussar Silk Saree (Jharkhand weave)",
    seller: "Santhal Weavers Collective",
    price: "₹4,500",
    rating: 4.8,
    image: "/assets/Products/Tussar.png",
    category: "Clothing/Textiles",
    inStock: true,
    description: "Indigenous silk, richly textured, known for tribal patterns and earthy hues",
    sellerProfile: {
      name: "Sunita Murmu",
      businessName: "Santhal Weavers Collective",
      address: "Weaver's Colony, Dumka District",
      city: "Dumka",
      state: "Jharkhand",
      pincode: "814101",
      phone: "+91 94311 56789",
      email: "sunita.murmu@santhalweavers.org",
      establishedYear: 2012,
      description: "Sunita Murmu is a master weaver and the founder of Santhal Weavers Collective, a women-led organization of 40+ skilled weavers from the Santhal tribe. She learned the art of Tussar silk weaving from her grandmother and has been preserving this traditional craft for over 20 years. The collective operates from a traditional weaving center in Dumka, where they create authentic tribal textiles using natural dyes and traditional looms.",
      specialties: ["Tussar Silk Weaving", "Natural Dyeing", "Tribal Textile Design", "Women Empowerment"],
      certifications: ["Ministry of Textiles - Silk Mark Certification", "Jharkhand Silk Development Board", "National Institute of Fashion Technology"],
      totalProducts: 38,
      averageRating: 4.8,
      responseTime: "Within 3 hours",
      verified: true,
      socialMedia: {
        instagram: "@santhalweavers_dumka",
        facebook: "Santhal Weavers Collective",
        website: "www.santhalweaversjharkhand.org"
      }
    }
  },
  {
    id: 3,
    name: "Sohrai Painting (Wall Art)",
    seller: "Tribal Women Artists",
    price: "₹2,200",
    rating: 4.7,
    image: "/assets/Products/Sohrai.png",
    category: "Handicrafts",
    inStock: true,
    description: "Ritual wall art by tribal women, using natural pigments, animal and plant motifs",
    sellerProfile: {
      name: "Kamla Devi Hansda",
      businessName: "Tribal Women Artists",
      address: "Hazaribagh Tribal Art Center, Near Hazaribagh Lake",
      city: "Hazaribagh",
      state: "Jharkhand",
      pincode: "825301",
      phone: "+91 92345 67890",
      email: "kamla.hansda@tribalwomenartists.org",
      establishedYear: 2018,
      description: "Kamla Devi Hansda is a renowned Sohrai artist and the coordinator of Tribal Women Artists collective in Hazaribagh. With 25+ years of experience in traditional wall painting, she has trained over 100 women in the ancient art of Sohrai. The collective operates from a cultural center near Hazaribagh Lake, where they create authentic tribal paintings using natural pigments and traditional techniques.",
      specialties: ["Sohrai Wall Painting", "Natural Pigment Preparation", "Tribal Art Training", "Cultural Documentation"],
      certifications: ["Ministry of Culture - Traditional Art Certification", "Jharkhand Tribal Art Society", "National Museum of Tribal Art"],
      totalProducts: 52,
      averageRating: 4.7,
      responseTime: "Within 4 hours",
      verified: true,
      socialMedia: {
        instagram: "@tribalwomenartists_hzb",
        facebook: "Tribal Women Artists Hazaribagh",
        website: "www.tribalwomenartistsjharkhand.com"
      }
    }
  },
  {
    id: 4,
    name: "Tilkut (Deoghar Sweet)",
    seller: "Deoghar Traditional Sweets",
    price: "₹350",
    rating: 4.9,
    image: "/assets/Products/Tilkut.png",
    category: "Food Items",
    inStock: true,
    description: "Made from pounded sesame seeds and jaggery; a winter delicacy of Deoghar",
    sellerProfile: {
      name: "Ram Prasad Singh",
      businessName: "Deoghar Traditional Sweets",
      address: "Baba Baidyanath Temple Road, Near Shiv Mandir",
      city: "Deoghar",
      state: "Jharkhand",
      pincode: "814112",
      phone: "+91 94312 34567",
      email: "ram.singh@deogharsweets.com",
      establishedYear: 1995,
      description: "Ram Prasad Singh is a third-generation sweet maker from Deoghar, specializing in traditional Tilkut preparation. His family has been making authentic Tilkut sweets for over 60 years, using age-old recipes passed down through generations. The shop is located near the famous Baidyanath Temple and is known for its pure, traditional preparation methods using only the finest sesame seeds and jaggery.",
      specialties: ["Traditional Tilkut Making", "Sesame Seed Processing", "Jaggery Preparation", "Temple Sweets"],
      certifications: ["Food Safety and Standards Authority of India", "Jharkhand Food Processing Society", "Deoghar Chamber of Commerce"],
      totalProducts: 28,
      averageRating: 4.9,
      responseTime: "Within 1 hour",
      verified: true,
      socialMedia: {
        instagram: "@deogharsweets_traditional",
        facebook: "Deoghar Traditional Sweets",
        website: "www.deogharsweets.com"
      }
    }
  },
  {
    id: 5,
    name: "Lac Bangles Set",
    seller: "Traditional Crafts Co-op",
    price: "₹450",
    rating: 4.6,
    image: "/assets/Products/Lac Bangles.png",
    category: "Handicrafts",
    inStock: true,
    description: "Brightly colored bangles made from natural resin (lac), often embellished with mirrors or beads",
    sellerProfile: {
      name: "Sushila Devi",
      businessName: "Traditional Crafts Co-op",
      address: "Simdega Craft Village, Near Lac Processing Unit",
      city: "Simdega",
      state: "Jharkhand",
      pincode: "835223",
      phone: "+91 98765 12345",
      email: "sushila.devi@traditionalcrafts.coop",
      establishedYear: 2010,
      description: "Sushila Devi leads a cooperative of 30+ lac artisans in Simdega district, specializing in traditional lac bangle making. With 20+ years of experience, she has mastered the art of lac processing and bangle crafting. The cooperative operates from a traditional workshop where artisans create authentic lac bangles using natural resin and traditional techniques.",
      specialties: ["Lac Processing", "Bangle Crafting", "Natural Resin Work", "Traditional Jewelry"],
      certifications: ["Ministry of Textiles - Handicrafts Certification", "Jharkhand Lac Development Society", "National Handicrafts Development Corporation"],
      totalProducts: 35,
      averageRating: 4.6,
      responseTime: "Within 3 hours",
      verified: true,
      socialMedia: {
        instagram: "@traditionalcrafts_simdega",
        facebook: "Traditional Crafts Cooperative Simdega",
        website: "www.traditionalcraftsjharkhand.com"
      }
    }
  },
  {
    id: 6,
    name: "Chhau Dance Mask",
    seller: "Seraikela Artisans",
    price: "₹1,200",
    rating: 4.8,
    image: "/assets/Products/Chhau.png",
    category: "Handicrafts",
    inStock: true,
    description: "Traditional mask used in Chhau dance, handcrafted with intricate designs",
    sellerProfile: {
      name: "Babulal Mahato",
      businessName: "Seraikela Artisans",
      address: "Seraikela Chhau Center, Near Royal Palace",
      city: "Seraikela",
      state: "Jharkhand",
      pincode: "833219",
      phone: "+91 94321 87654",
      email: "babulal.mahato@seraikelaartisans.org",
      establishedYear: 2008,
      description: "Babulal Mahato is a master Chhau mask maker from Seraikela, with 30+ years of experience in traditional mask crafting. He learned the art from his father and has been preserving the ancient Chhau mask-making techniques. His workshop is located near the historic Seraikela Palace, where he creates authentic Chhau dance masks using traditional materials and methods.",
      specialties: ["Chhau Mask Making", "Traditional Dance Props", "Clay Modeling", "Cultural Heritage"],
      certifications: ["Ministry of Culture - Traditional Art Certification", "Seraikela Chhau Society", "Jharkhand Cultural Development Board"],
      totalProducts: 42,
      averageRating: 4.8,
      responseTime: "Within 2 hours",
      verified: true,
      socialMedia: {
        instagram: "@seraikelaartisans_chhau",
        facebook: "Seraikela Artisans Chhau",
        website: "www.seraikelaartisans.com"
      }
    }
  },
  {
    id: 7,
    name: "Handwoven Bamboo Basket",
    seller: "Bamboo Crafts Collective",
    price: "₹800",
    rating: 4.5,
    image: "/assets/Products/Handwoven.png",
    category: "Handicrafts",
    inStock: true,
    description: "Eco-friendly bamboo basket woven by local artisans using traditional techniques",
    sellerProfile: {
      name: "Ramesh Oraon",
      businessName: "Bamboo Crafts Collective",
      address: "Bamboo Craft Village, Near Netarhat",
      city: "Latehar",
      state: "Jharkhand",
      pincode: "829206",
      phone: "+91 91234 56789",
      email: "ramesh.oraon@bamboocrafts.org",
      establishedYear: 2016,
      description: "Ramesh Oraon leads a collective of 25+ bamboo artisans from the Oraon tribe in Latehar district. With 18+ years of experience in bamboo weaving, he specializes in creating traditional baskets and household items. The collective operates from a bamboo processing center near Netarhat, where artisans create eco-friendly products using sustainable bamboo harvesting techniques.",
      specialties: ["Bamboo Weaving", "Eco-friendly Crafts", "Traditional Basket Making", "Sustainable Harvesting"],
      certifications: ["Ministry of Environment - Eco-friendly Certification", "Jharkhand Bamboo Development Society", "National Bamboo Mission"],
      totalProducts: 31,
      averageRating: 4.5,
      responseTime: "Within 4 hours",
      verified: true,
      socialMedia: {
        instagram: "@bamboocrafts_latehar",
        facebook: "Bamboo Crafts Collective Latehar",
        website: "www.bamboocraftsjharkhand.org"
      }
    }
  },
  {
    id: 8,
    name: "Tribal Pottery Set",
    seller: "Clay Artisans Guild",
    price: "₹1,500",
    rating: 4.7,
    image: "/assets/Products/Miniature Terracotta Figurines.png",
    category: "Handicrafts",
    inStock: true,
    description: "Traditional terracotta pottery set with tribal designs and patterns",
    sellerProfile: {
      name: "Ganga Devi",
      businessName: "Clay Artisans Guild",
      address: "Potter's Colony, Maluti Village",
      city: "Dumka",
      state: "Jharkhand",
      pincode: "814101",
      phone: "+91 98765 98765",
      email: "ganga.devi@clayartisans.org",
      establishedYear: 2014,
      description: "Ganga Devi is a master potter and the coordinator of Clay Artisans Guild in Maluti village. With 25+ years of experience in terracotta pottery, she specializes in creating traditional tribal pottery and miniature figurines. The guild operates from a traditional pottery center in Maluti, where artisans create authentic terracotta products using age-old techniques and local clay.",
      specialties: ["Terracotta Pottery", "Miniature Figurines", "Traditional Clay Work", "Cultural Artifacts"],
      certifications: ["Ministry of Textiles - Handicrafts Certification", "Jharkhand Pottery Development Society", "National Handicrafts Development Corporation"],
      totalProducts: 48,
      averageRating: 4.7,
      responseTime: "Within 3 hours",
      verified: true,
      socialMedia: {
        instagram: "@clayartisans_maluti",
        facebook: "Clay Artisans Guild Maluti",
        website: "www.clayartisansjharkhand.com"
      }
    }
  },
  {
    id: 9,
    name: "Sohrai Painted Wooden Box",
    seller: "Tribal Women Artists",
    price: "₹950",
    rating: 4.6,
    image: "/assets/Products/Sohrai-Mural Painted Wooden Box or Tray.png",
    category: "Handicrafts",
    inStock: true,
    description: "Hand-painted wooden box featuring traditional Sohrai art motifs",
    sellerProfile: {
      name: "Kamla Devi Hansda",
      businessName: "Tribal Women Artists",
      address: "Hazaribagh Tribal Art Center, Near Hazaribagh Lake",
      city: "Hazaribagh",
      state: "Jharkhand",
      pincode: "825301",
      phone: "+91 92345 67890",
      email: "kamla.hansda@tribalwomenartists.org",
      establishedYear: 2018,
      description: "Kamla Devi Hansda is a renowned Sohrai artist and the coordinator of Tribal Women Artists collective in Hazaribagh. With 25+ years of experience in traditional wall painting, she has trained over 100 women in the ancient art of Sohrai. The collective operates from a cultural center near Hazaribagh Lake, where they create authentic tribal paintings using natural pigments and traditional techniques.",
      specialties: ["Sohrai Wall Painting", "Natural Pigment Preparation", "Tribal Art Training", "Cultural Documentation"],
      certifications: ["Ministry of Culture - Traditional Art Certification", "Jharkhand Tribal Art Society", "National Museum of Tribal Art"],
      totalProducts: 52,
      averageRating: 4.7,
      responseTime: "Within 4 hours",
      verified: true,
      socialMedia: {
        instagram: "@tribalwomenartists_hzb",
        facebook: "Tribal Women Artists Hazaribagh",
        website: "www.tribalwomenartistsjharkhand.com"
      }
    }
  },
  {
    id: 10,
    name: "Mandar Drum",
    seller: "Musical Instruments Co-op",
    price: "₹2,800",
    rating: 4.9,
    image: "/assets/Products/Mandar Drum.png",
    category: "Handicrafts",
    inStock: true,
    description: "Traditional tribal drum used in folk music and cultural performances",
    sellerProfile: {
      name: "Suresh Kumar Mahato",
      businessName: "Musical Instruments Co-op",
      address: "Musical Instruments Workshop, Near Tribal Museum",
      city: "Ranchi",
      state: "Jharkhand",
      pincode: "834001",
      phone: "+91 94321 23456",
      email: "suresh.mahato@musicalinstruments.coop",
      establishedYear: 2011,
      description: "Suresh Kumar Mahato is a master craftsman specializing in traditional tribal musical instruments, particularly the Mandar drum. With 20+ years of experience, he has been preserving the ancient art of tribal instrument making. The cooperative operates from a traditional workshop in Ranchi, where artisans create authentic tribal musical instruments using traditional materials and techniques.",
      specialties: ["Tribal Musical Instruments", "Mandar Drum Making", "Traditional Craftsmanship", "Cultural Music"],
      certifications: ["Ministry of Culture - Traditional Art Certification", "Jharkhand Musical Instruments Society", "National Institute of Music"],
      totalProducts: 39,
      averageRating: 4.9,
      responseTime: "Within 2 hours",
      verified: true,
      socialMedia: {
        instagram: "@musicalinstruments_ranchi",
        facebook: "Musical Instruments Cooperative Ranchi",
        website: "www.musicalinstrumentsjharkhand.com"
      }
    }
  },
  {
    id: 11,
    name: "Handmade Stone Pendant",
    seller: "Stone Artisans Collective",
    price: "₹650",
    rating: 4.4,
    image: "/assets/Products/Handmade Stone Pendant.png",
    category: "Handicrafts",
    inStock: true,
    description: "Unique stone pendant carved by local artisans with tribal symbols",
    sellerProfile: {
      name: "Vikram Singh",
      businessName: "Stone Artisans Collective",
      address: "Stone Carving Center, Near Palamu Fort",
      city: "Daltonganj",
      state: "Jharkhand",
      pincode: "822101",
      phone: "+91 91234 98765",
      email: "vikram.singh@stoneartisans.org",
      establishedYear: 2017,
      description: "Vikram Singh leads a collective of 20+ stone artisans from Palamu district, specializing in traditional stone carving and jewelry making. With 15+ years of experience, he has mastered the art of stone carving using traditional tools and techniques. The collective operates from a stone carving center near Palamu Fort, where artisans create authentic stone jewelry and artifacts.",
      specialties: ["Stone Carving", "Tribal Jewelry", "Traditional Tools", "Cultural Artifacts"],
      certifications: ["Ministry of Textiles - Handicrafts Certification", "Jharkhand Stone Development Society", "National Handicrafts Development Corporation"],
      totalProducts: 33,
      averageRating: 4.4,
      responseTime: "Within 5 hours",
      verified: true,
      socialMedia: {
        instagram: "@stoneartisans_palamu",
        facebook: "Stone Artisans Collective Palamu",
        website: "www.stoneartisansjharkhand.com"
      }
    }
  },
  {
    id: 12,
    name: "Tussar Silk Stole",
    seller: "Santhal Weavers Collective",
    price: "₹1,200",
    rating: 4.7,
    image: "/assets/Products/Tussar Silk Stole.png",
    category: "Clothing/Textiles",
    inStock: true,
    description: "Elegant silk stole with traditional tribal patterns and designs",
    sellerProfile: {
      name: "Sunita Murmu",
      businessName: "Santhal Weavers Collective",
      address: "Weaver's Colony, Dumka District",
      city: "Dumka",
      state: "Jharkhand",
      pincode: "814101",
      phone: "+91 94311 56789",
      email: "sunita.murmu@santhalweavers.org",
      establishedYear: 2012,
      description: "Sunita Murmu is a master weaver and the founder of Santhal Weavers Collective, a women-led organization of 40+ skilled weavers from the Santhal tribe. She learned the art of Tussar silk weaving from her grandmother and has been preserving this traditional craft for over 20 years. The collective operates from a traditional weaving center in Dumka, where they create authentic tribal textiles using natural dyes and traditional looms.",
      specialties: ["Tussar Silk Weaving", "Natural Dyeing", "Tribal Textile Design", "Women Empowerment"],
      certifications: ["Ministry of Textiles - Silk Mark Certification", "Jharkhand Silk Development Board", "National Institute of Fashion Technology"],
      totalProducts: 38,
      averageRating: 4.8,
      responseTime: "Within 3 hours",
      verified: true,
      socialMedia: {
        instagram: "@santhalweavers_dumka",
        facebook: "Santhal Weavers Collective",
        website: "www.santhalweaversjharkhand.org"
      }
    }
  },
  {
    id: 13,
    name: "Beaded Tribal Jewelry",
    seller: "Tribal Artisans Co-op",
    price: "₹750",
    rating: 4.5,
    image: "/assets/Products/unnamedBeaded.png",
    category: "Handicrafts",
    inStock: true,
    description: "Colorful beaded jewelry made by tribal artisans using traditional techniques",
    sellerProfile: {
      name: "Rajesh Kumar Mahato",
      businessName: "Tribal Artisans Co-op",
      address: "Village: Khunti, Near Tribal Museum",
      city: "Khunti",
      state: "Jharkhand",
      pincode: "835210",
      phone: "+91 98765 43210",
      email: "rajesh.mahato@tribalartisans.coop",
      establishedYear: 2015,
      description: "Rajesh Kumar Mahato leads a cooperative of 25+ traditional Dokra artisans from the Munda and Santhal tribes. With over 15 years of experience in bell-metal casting, he has been instrumental in preserving and promoting Jharkhand's ancient Dokra art form. The cooperative operates from a traditional workshop in Khunti, where artisans create authentic tribal jewelry using age-old techniques passed down through generations.",
      specialties: ["Dokra Bell-Metal Casting", "Tribal Jewelry Design", "Traditional Metalwork", "Cultural Heritage Preservation"],
      certifications: ["Ministry of Textiles - Handicrafts Certification", "Jharkhand Tribal Development Society", "National Handicrafts Development Corporation"],
      totalProducts: 45,
      averageRating: 4.9,
      responseTime: "Within 2 hours",
      verified: true,
      socialMedia: {
        instagram: "@tribalartisans_khunti",
        facebook: "Tribal Artisans Cooperative Khunti",
        website: "www.tribalartisansjharkhand.com"
      }
    }
  },
  {
    id: 14,
    name: "Kohbar Painting",
    seller: "Tribal Women Artists",
    price: "₹1,100",
    rating: 4.8,
    image: "/assets/Products/Kohbar.png",
    category: "Handicrafts",
    inStock: true,
    description: "Traditional wedding art painting with auspicious symbols and motifs",
    sellerProfile: {
      name: "Kamla Devi Hansda",
      businessName: "Tribal Women Artists",
      address: "Hazaribagh Tribal Art Center, Near Hazaribagh Lake",
      city: "Hazaribagh",
      state: "Jharkhand",
      pincode: "825301",
      phone: "+91 92345 67890",
      email: "kamla.hansda@tribalwomenartists.org",
      establishedYear: 2018,
      description: "Kamla Devi Hansda is a renowned Sohrai artist and the coordinator of Tribal Women Artists collective in Hazaribagh. With 25+ years of experience in traditional wall painting, she has trained over 100 women in the ancient art of Sohrai. The collective operates from a cultural center near Hazaribagh Lake, where they create authentic tribal paintings using natural pigments and traditional techniques.",
      specialties: ["Sohrai Wall Painting", "Natural Pigment Preparation", "Tribal Art Training", "Cultural Documentation"],
      certifications: ["Ministry of Culture - Traditional Art Certification", "Jharkhand Tribal Art Society", "National Museum of Tribal Art"],
      totalProducts: 52,
      averageRating: 4.7,
      responseTime: "Within 4 hours",
      verified: true,
      socialMedia: {
        instagram: "@tribalwomenartists_hzb",
        facebook: "Tribal Women Artists Hazaribagh",
        website: "www.tribalwomenartistsjharkhand.com"
      }
    }
  },
  {
    id: 15,
    name: "Paitka Artwork",
    seller: "Tribal Women Artists",
    price: "₹1,300",
    rating: 4.6,
    image: "/assets/Products/Paitka.png",
    category: "Handicrafts",
    inStock: true,
    description: "Traditional tribal artwork depicting cultural stories and legends",
    sellerProfile: {
      name: "Kamla Devi Hansda",
      businessName: "Tribal Women Artists",
      address: "Hazaribagh Tribal Art Center, Near Hazaribagh Lake",
      city: "Hazaribagh",
      state: "Jharkhand",
      pincode: "825301",
      phone: "+91 92345 67890",
      email: "kamla.hansda@tribalwomenartists.org",
      establishedYear: 2018,
      description: "Kamla Devi Hansda is a renowned Sohrai artist and the coordinator of Tribal Women Artists collective in Hazaribagh. With 25+ years of experience in traditional wall painting, she has trained over 100 women in the ancient art of Sohrai. The collective operates from a cultural center near Hazaribagh Lake, where they create authentic tribal paintings using natural pigments and traditional techniques.",
      specialties: ["Sohrai Wall Painting", "Natural Pigment Preparation", "Tribal Art Training", "Cultural Documentation"],
      certifications: ["Ministry of Culture - Traditional Art Certification", "Jharkhand Tribal Art Society", "National Museum of Tribal Art"],
      totalProducts: 52,
      averageRating: 4.7,
      responseTime: "Within 4 hours",
      verified: true,
      socialMedia: {
        instagram: "@tribalwomenartists_hzb",
        facebook: "Tribal Women Artists Hazaribagh",
        website: "www.tribalwomenartistsjharkhand.com"
      }
    }
  },
  {
    id: 16,
    name: "Rugda (Mushroom Pickle)",
    seller: "Forest Products Co-op",
    price: "₹280",
    rating: 4.7,
    image: "/assets/Products/Rugda.png",
    category: "Food Items",
    inStock: true,
    description: "Traditional forest mushroom pickle, a local delicacy from Jharkhand",
    sellerProfile: {
      name: "Babulal Oraon",
      businessName: "Forest Products Co-op",
      address: "Forest Collection Center, Near Saranda Forest",
      city: "Chaibasa",
      state: "Jharkhand",
      pincode: "833001",
      phone: "+91 94321 54321",
      email: "babulal.oraon@forestproducts.coop",
      establishedYear: 2013,
      description: "Babulal Oraon leads a cooperative of 30+ forest product collectors from the Oraon tribe in Chaibasa district. With 20+ years of experience in forest product collection and processing, he specializes in traditional mushroom pickling and forest delicacies. The cooperative operates from a forest collection center near Saranda Forest, where they process authentic forest products using traditional methods.",
      specialties: ["Forest Product Collection", "Traditional Pickling", "Mushroom Processing", "Sustainable Harvesting"],
      certifications: ["Food Safety and Standards Authority of India", "Jharkhand Forest Development Corporation", "National Forest Products Society"],
      totalProducts: 25,
      averageRating: 4.7,
      responseTime: "Within 6 hours",
      verified: true,
      socialMedia: {
        instagram: "@forestproducts_chaibasa",
        facebook: "Forest Products Cooperative Chaibasa",
        website: "www.forestproductsjharkhand.com"
      }
    }
  },
  {
    id: 17,
    name: "Thekua (Traditional Sweet)",
    seller: "Deoghar Traditional Sweets",
    price: "₹180",
    rating: 4.8,
    image: "/assets/Products/Thekua.png",
    category: "Food Items",
    inStock: true,
    description: "Traditional deep-fried sweet made with wheat flour and jaggery",
    sellerProfile: {
      name: "Ram Prasad Singh",
      businessName: "Deoghar Traditional Sweets",
      address: "Baba Baidyanath Temple Road, Near Shiv Mandir",
      city: "Deoghar",
      state: "Jharkhand",
      pincode: "814112",
      phone: "+91 94312 34567",
      email: "ram.singh@deogharsweets.com",
      establishedYear: 1995,
      description: "Ram Prasad Singh is a third-generation sweet maker from Deoghar, specializing in traditional Tilkut preparation. His family has been making authentic Tilkut sweets for over 60 years, using age-old recipes passed down through generations. The shop is located near the famous Baidyanath Temple and is known for its pure, traditional preparation methods using only the finest sesame seeds and jaggery.",
      specialties: ["Traditional Tilkut Making", "Sesame Seed Processing", "Jaggery Preparation", "Temple Sweets"],
      certifications: ["Food Safety and Standards Authority of India", "Jharkhand Food Processing Society", "Deoghar Chamber of Commerce"],
      totalProducts: 28,
      averageRating: 4.9,
      responseTime: "Within 1 hour",
      verified: true,
      socialMedia: {
        instagram: "@deogharsweets_traditional",
        facebook: "Deoghar Traditional Sweets",
        website: "www.deogharsweets.com"
      }
    }
  },
  {
    id: 18,
    name: "Bamboo Shoot Pickle",
    seller: "Forest Products Co-op",
    price: "₹320",
    rating: 4.5,
    image: "/assets/Products/Bamboo Shoot Pickle (Food Items).png",
    category: "Food Items",
    inStock: true,
    description: "Tangy bamboo shoot pickle, a popular local condiment",
    sellerProfile: {
      name: "Babulal Oraon",
      businessName: "Forest Products Co-op",
      address: "Forest Collection Center, Near Saranda Forest",
      city: "Chaibasa",
      state: "Jharkhand",
      pincode: "833001",
      phone: "+91 94321 54321",
      email: "babulal.oraon@forestproducts.coop",
      establishedYear: 2013,
      description: "Babulal Oraon leads a cooperative of 30+ forest product collectors from the Oraon tribe in Chaibasa district. With 20+ years of experience in forest product collection and processing, he specializes in traditional mushroom pickling and forest delicacies. The cooperative operates from a forest collection center near Saranda Forest, where they process authentic forest products using traditional methods.",
      specialties: ["Forest Product Collection", "Traditional Pickling", "Mushroom Processing", "Sustainable Harvesting"],
      certifications: ["Food Safety and Standards Authority of India", "Jharkhand Forest Development Corporation", "National Forest Products Society"],
      totalProducts: 25,
      averageRating: 4.7,
      responseTime: "Within 6 hours",
      verified: true,
      socialMedia: {
        instagram: "@forestproducts_chaibasa",
        facebook: "Forest Products Cooperative Chaibasa",
        website: "www.forestproductsjharkhand.com"
      }
    }
  },
  {
    id: 19,
    name: "Jackfruit Pickle",
    seller: "Forest Products Co-op",
    price: "₹250",
    rating: 4.6,
    image: "/assets/Products/Jackfruit Pickle.png",
    category: "Food Items",
    inStock: true,
    description: "Spicy jackfruit pickle made with traditional spices and techniques",
    sellerProfile: {
      name: "Babulal Oraon",
      businessName: "Forest Products Co-op",
      address: "Forest Collection Center, Near Saranda Forest",
      city: "Chaibasa",
      state: "Jharkhand",
      pincode: "833001",
      phone: "+91 94321 54321",
      email: "babulal.oraon@forestproducts.coop",
      establishedYear: 2013,
      description: "Babulal Oraon leads a cooperative of 30+ forest product collectors from the Oraon tribe in Chaibasa district. With 20+ years of experience in forest product collection and processing, he specializes in traditional mushroom pickling and forest delicacies. The cooperative operates from a forest collection center near Saranda Forest, where they process authentic forest products using traditional methods.",
      specialties: ["Forest Product Collection", "Traditional Pickling", "Mushroom Processing", "Sustainable Harvesting"],
      certifications: ["Food Safety and Standards Authority of India", "Jharkhand Forest Development Corporation", "National Forest Products Society"],
      totalProducts: 25,
      averageRating: 4.7,
      responseTime: "Within 6 hours",
      verified: true,
      socialMedia: {
        instagram: "@forestproducts_chaibasa",
        facebook: "Forest Products Cooperative Chaibasa",
        website: "www.forestproductsjharkhand.com"
      }
    }
  },
  {
    id: 20,
    name: "Dokra Bangle Set",
    seller: "Tribal Artisans Co-op",
    price: "₹1,100",
    rating: 4.7,
    image: "/assets/Products/Dokra Bangle Set.png",
    category: "Handicrafts",
    inStock: true,
    description: "Set of traditional Dokra bangles with intricate tribal designs",
    sellerProfile: {
      name: "Rajesh Kumar Mahato",
      businessName: "Tribal Artisans Co-op",
      address: "Village: Khunti, Near Tribal Museum",
      city: "Khunti",
      state: "Jharkhand",
      pincode: "835210",
      phone: "+91 98765 43210",
      email: "rajesh.mahato@tribalartisans.coop",
      establishedYear: 2015,
      description: "Rajesh Kumar Mahato leads a cooperative of 25+ traditional Dokra artisans from the Munda and Santhal tribes. With over 15 years of experience in bell-metal casting, he has been instrumental in preserving and promoting Jharkhand's ancient Dokra art form. The cooperative operates from a traditional workshop in Khunti, where artisans create authentic tribal jewelry using age-old techniques passed down through generations.",
      specialties: ["Dokra Bell-Metal Casting", "Tribal Jewelry Design", "Traditional Metalwork", "Cultural Heritage Preservation"],
      certifications: ["Ministry of Textiles - Handicrafts Certification", "Jharkhand Tribal Development Society", "National Handicrafts Development Corporation"],
      totalProducts: 45,
      averageRating: 4.9,
      responseTime: "Within 2 hours",
      verified: true,
      socialMedia: {
        instagram: "@tribalartisans_khunti",
        facebook: "Tribal Artisans Cooperative Khunti",
        website: "www.tribalartisansjharkhand.com"
      }
    }
  }
];
