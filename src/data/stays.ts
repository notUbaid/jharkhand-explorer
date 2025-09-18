export interface Stay {
  id: number;
  name: string;
  location: string;
  category: string;
  rating: number;
  price: string;
  image: string;
  images: string[];
  description: string;
  amenities: string[];
  highlights: string[];
  contact: string;
  address: string;
  checkIn: string;
  checkOut: string;
  cancellationPolicy: string;
  facilities: string[];
  nearbyAttractions: string[];
  bestFor: string;
  travelTips: string;
  accessibility: string;
}

export const stays: Stay[] = [
  {
    id: 1,
    name: "Radisson Blu Hotel",
    location: "Ranchi",
    category: "Luxury",
    rating: 4.6,
    price: "₹8,500",
    image: "/src/assets/Stays/Radisson Blu Hotel.jpg",
    images: [
      "/src/assets/Stays/Radisson Blu Hotel.jpg",
      "/src/assets/Stays/Radisson Blu Hotel2.jpg",
      "/src/assets/Stays/Radisson Blu Hotel 3.jpg"
    ],
    description: "Experience luxury and comfort at Radisson Blu Hotel Ranchi, featuring modern amenities, elegant rooms, and exceptional service. Located in the heart of the city, this premium hotel offers world-class facilities including fine dining restaurants, spa services, and business centers. Perfect for business travelers and leisure guests seeking a sophisticated stay experience.",
    amenities: ["Free WiFi", "Swimming Pool", "Spa & Wellness", "Fitness Center", "Restaurant", "Room Service", "Concierge", "Parking"],
    highlights: ["Luxury Accommodation", "City Center Location", "Fine Dining", "Business Facilities", "Spa Services"],
    contact: "+91 651 222 0000",
    address: "Main Road, Ranchi, Jharkhand 834001",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    facilities: ["Air Conditioning", "Mini Bar", "Safe", "Television", "Telephone", "Work Desk"],
    nearbyAttractions: ["Rock Garden", "Kanke Dam", "Firayalal Market", "Jagannath Temple"],
    bestFor: "Business travelers, luxury seekers, couples, families",
    travelTips: "Book in advance during peak season. Request city view rooms for better experience. Spa appointments should be booked early.",
    accessibility: "Wheelchair accessible rooms available. Elevator access to all floors. Senior-friendly with assistance available."
  },
  {
    id: 2,
    name: "Le Lac Sarovar Portico",
    location: "Ranchi",
    category: "Premium",
    rating: 4.4,
    price: "₹6,500",
    image: "/src/assets/Stays/Le Lac Sarovar Portico.jpg",
    images: [
      "/src/assets/Stays/Le Lac Sarovar Portico.jpg",
      "/src/assets/Stays/Le Lac Sarovar Portico 2.jpg",
      "/src/assets/Stays/Le Lac Sarovar Portico 3.jpg"
    ],
    description: "A premium hotel offering comfortable accommodation with modern amenities and excellent service. Le Lac Sarovar Portico provides a perfect blend of comfort and convenience, featuring well-appointed rooms, dining facilities, and recreational amenities. Ideal for both business and leisure travelers.",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "Parking", "Concierge", "Laundry Service"],
    highlights: ["Modern Rooms", "Central Location", "Dining Options", "Business Services"],
    contact: "+91 651 222 1111",
    address: "Main Road, Ranchi, Jharkhand 834001",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone", "Work Desk", "Safe"],
    nearbyAttractions: ["Rock Garden", "Kanke Dam", "Firayalal Market"],
    bestFor: "Business travelers, families, couples",
    travelTips: "Good value for money. Request rooms on higher floors for better views.",
    accessibility: "Wheelchair accessible. Elevator available. Senior-friendly."
  },
  {
    id: 3,
    name: "Chanakya BNR Hotel",
    location: "Ranchi",
    category: "Mid-range",
    rating: 4.2,
    price: "₹4,500",
    image: "/src/assets/Stays/Chanakya BNR Hotel.jpg",
    images: [
      "/src/assets/Stays/Chanakya BNR Hotel.jpg",
      "/src/assets/Stays/Chanakya BNR Hotel2.jpg",
      "/src/assets/Stays/Chanakya BNR Hotel 3.jpg"
    ],
    description: "A comfortable mid-range hotel offering good value accommodation in Ranchi. Chanakya BNR Hotel provides clean rooms, essential amenities, and friendly service. Perfect for budget-conscious travelers who don't want to compromise on comfort and convenience.",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "Parking", "Laundry Service"],
    highlights: ["Budget Friendly", "Clean Rooms", "Good Service", "Central Location"],
    contact: "+91 651 222 2222",
    address: "Station Road, Ranchi, Jharkhand 834001",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone", "Work Desk"],
    nearbyAttractions: ["Railway Station", "Rock Garden", "Firayalal Market"],
    bestFor: "Budget travelers, families, solo travelers",
    travelTips: "Great for railway station proximity. Book early for better rates.",
    accessibility: "Ground floor rooms available. Basic accessibility features."
  },
  {
    id: 4,
    name: "Hotel Palash",
    location: "Ranchi",
    category: "Mid-range",
    rating: 4.1,
    price: "₹3,500",
    image: "/src/assets/Stays/Hotel Palash.jpg",
    images: [
      "/src/assets/Stays/Hotel Palash.jpg",
      "/src/assets/Stays/Hotel palash 2.jpg",
      "/src/assets/Stays/Hotel palash 3.jpg"
    ],
    description: "A reliable mid-range hotel offering comfortable accommodation with essential amenities. Hotel Palash provides clean rooms, friendly service, and good value for money. Perfect for travelers seeking comfortable stay without breaking the budget.",
    amenities: ["Free WiFi", "Restaurant", "Room Service", "Parking"],
    highlights: ["Value for Money", "Clean Accommodation", "Friendly Staff", "Good Location"],
    contact: "+91 651 222 3333",
    address: "Main Road, Ranchi, Jharkhand 834001",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone"],
    nearbyAttractions: ["Rock Garden", "Kanke Dam", "Firayalal Market"],
    bestFor: "Budget travelers, families, business travelers",
    travelTips: "Good option for extended stays. Request rooms away from main road for quieter experience.",
    accessibility: "Basic accessibility. Ground floor rooms available."
  },
  {
    id: 5,
    name: "Aangan Resort",
    location: "Netarhat",
    category: "Resort",
    rating: 4.5,
    price: "₹5,500",
    image: "/src/assets/Stays/Angan Resort.jpg",
    images: [
      "/src/assets/Stays/Angan Resort.jpg",
      "/src/assets/Stays/Aangan Resort 2.jpg",
      "/src/assets/Stays/Aangan Resort 3.jpg"
    ],
    description: "Experience the beauty of Netarhat at Aangan Resort, nestled in the hills with breathtaking views. This resort offers comfortable accommodation surrounded by nature, perfect for those seeking peace and tranquility. Enjoy the cool mountain climate and scenic surroundings.",
    amenities: ["Free WiFi", "Restaurant", "Parking", "Garden", "Mountain Views"],
    highlights: ["Mountain Location", "Scenic Views", "Peaceful Environment", "Nature Experience"],
    contact: "+91 651 222 4444",
    address: "Netarhat, Latehar District, Jharkhand",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone", "Heating"],
    nearbyAttractions: ["Sunrise Point", "Koel View Point", "Upper Ghaghri Falls", "Lower Ghaghri Falls"],
    bestFor: "Nature lovers, couples, families, photographers",
    travelTips: "Best visited during October-March. Carry warm clothes. Book rooms with mountain views.",
    accessibility: "Limited wheelchair access due to hilly terrain. Senior-friendly with assistance."
  },
  {
    id: 6,
    name: "Mountain Eco Resort",
    location: "Netarhat",
    category: "Eco Resort",
    rating: 4.3,
    price: "₹4,500",
    image: "/src/assets/Stays/Mountain Eco Resort.jpg",
    images: [
      "/src/assets/Stays/Mountain Eco Resort.jpg",
      "/src/assets/Stays/Mountain Eco Resort 2.jpg",
      "/src/assets/Stays/Mountain Eco Resort 3.jpg"
    ],
    description: "An eco-friendly resort committed to sustainable tourism in the beautiful hills of Netarhat. Mountain Eco Resort offers comfortable accommodation while preserving the natural environment. Perfect for eco-conscious travelers who want to enjoy nature responsibly.",
    amenities: ["Free WiFi", "Restaurant", "Parking", "Garden", "Eco-friendly Facilities"],
    highlights: ["Eco-friendly", "Sustainable Tourism", "Mountain Views", "Nature Experience"],
    contact: "+91 651 222 5555",
    address: "Netarhat, Latehar District, Jharkhand",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone", "Heating"],
    nearbyAttractions: ["Sunrise Point", "Koel View Point", "Upper Ghaghri Falls"],
    bestFor: "Eco-conscious travelers, nature lovers, families",
    travelTips: "Perfect for nature enthusiasts. Book in advance during peak season. Respect the eco-friendly policies.",
    accessibility: "Limited wheelchair access. Senior-friendly with assistance available."
  },
  {
    id: 7,
    name: "Bamboo Grove Eco Lodge",
    location: "Betla",
    category: "Eco Lodge",
    rating: 4.4,
    price: "₹3,500",
    image: "/src/assets/Stays/Bamboo Grove Eco Lodge.jpg",
    images: [
      "/src/assets/Stays/Bamboo Grove Eco Lodge.jpg",
      "/src/assets/Stays/Bamboo Grove Eco Lodge 2.jpg",
      "/src/assets/Stays/Bamboo Grove Eco Lodge3.jpg"
    ],
    description: "Immerse yourself in nature at Bamboo Grove Eco Lodge, located near Betla National Park. This eco-friendly accommodation offers a unique jungle experience with comfortable bamboo cottages and sustainable amenities. Perfect for wildlife enthusiasts and nature lovers.",
    amenities: ["Free WiFi", "Restaurant", "Parking", "Garden", "Jungle Views"],
    highlights: ["Jungle Location", "Eco-friendly", "Wildlife Proximity", "Unique Experience"],
    contact: "+91 651 222 6666",
    address: "Near Betla National Park, Palamu, Jharkhand",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 48 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone"],
    nearbyAttractions: ["Betla National Park", "Palamu Fort", "Wildlife Safari"],
    bestFor: "Wildlife enthusiasts, nature lovers, adventure seekers",
    travelTips: "Perfect for safari experiences. Book safari slots in advance. Carry insect repellent.",
    accessibility: "Limited wheelchair access due to jungle terrain. Senior-friendly with assistance."
  },
  {
    id: 8,
    name: "Sikaria Homestay",
    location: "Hazaribagh",
    category: "Homestay",
    rating: 4.6,
    price: "₹2,500",
    image: "/src/assets/Stays/Sikaria Homestay 1.jpg",
    images: [
      "/src/assets/Stays/Sikaria Homestay 1.jpg",
      "/src/assets/Stays/Sikaria Homestay 2.jpg",
      "/src/assets/Stays/Sikaria Homestay 3.jpg"
    ],
    description: "Experience authentic local hospitality at Sikaria Homestay in Hazaribagh. This family-run homestay offers comfortable accommodation with home-cooked meals and cultural experiences. Perfect for travelers seeking authentic local experiences and cultural immersion.",
    amenities: ["Free WiFi", "Home-cooked Meals", "Parking", "Cultural Experiences"],
    highlights: ["Local Hospitality", "Cultural Experience", "Home-cooked Food", "Authentic Stay"],
    contact: "+91 651 222 7777",
    address: "Hazaribagh, Jharkhand",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone"],
    nearbyAttractions: ["Hazaribagh National Park", "Canary Hill", "Local Markets"],
    bestFor: "Cultural enthusiasts, budget travelers, families",
    travelTips: "Great for cultural experiences. Try local cuisine. Book in advance.",
    accessibility: "Basic accessibility. Ground floor rooms available."
  },
  {
    id: 9,
    name: "Simra Homestay",
    location: "Deoghar",
    category: "Homestay",
    rating: 4.5,
    price: "₹2,000",
    image: "/src/assets/Stays/Simra Homestay 1.jpg",
    images: [
      "/src/assets/Stays/Simra Homestay 1.jpg",
      "/src/assets/Stays/Simra Homestay 2.jpg",
      "/src/assets/Stays/Simra Homestay 3.jpg"
    ],
    description: "A warm and welcoming homestay near Deoghar offering comfortable accommodation with traditional hospitality. Simra Homestay provides authentic local experiences with home-cooked meals and cultural insights. Perfect for pilgrims and cultural travelers.",
    amenities: ["Free WiFi", "Home-cooked Meals", "Parking", "Cultural Experiences"],
    highlights: ["Pilgrimage Proximity", "Local Hospitality", "Traditional Food", "Cultural Experience"],
    contact: "+91 651 222 8888",
    address: "Deoghar, Jharkhand",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone"],
    nearbyAttractions: ["Baidyanath Temple", "Basukinath Temple", "Naulakha Mandir"],
    bestFor: "Pilgrims, cultural travelers, budget travelers",
    travelTips: "Perfect for temple visits. Try traditional cuisine. Book during festival seasons.",
    accessibility: "Basic accessibility. Ground floor rooms available."
  },
  {
    id: 10,
    name: "Tribal Heritage Homestay",
    location: "Khunti",
    category: "Homestay",
    rating: 4.7,
    price: "₹2,800",
    image: "/src/assets/Stays/Tribal Heritage Homestay.jpg",
    images: [
      "/src/assets/Stays/Tribal Heritage Homestay.jpg",
      "/src/assets/Stays/Tribal Heritage homestay2.jpg",
      "/src/assets/Stays/Tribal Heritage Homestay 3.jpg"
    ],
    description: "Immerse yourself in tribal culture at Tribal Heritage Homestay in Khunti. This unique accommodation offers authentic tribal experiences with traditional meals, cultural performances, and insights into local customs. Perfect for cultural enthusiasts and those seeking authentic tribal experiences.",
    amenities: ["Free WiFi", "Traditional Meals", "Cultural Performances", "Parking"],
    highlights: ["Tribal Culture", "Cultural Performances", "Traditional Food", "Authentic Experience"],
    contact: "+91 651 222 9999",
    address: "Khunti, Jharkhand",
    checkIn: "2:00 PM",
    checkOut: "12:00 PM",
    cancellationPolicy: "Free cancellation up to 24 hours before check-in",
    facilities: ["Air Conditioning", "Television", "Telephone"],
    nearbyAttractions: ["Tribal Villages", "Cultural Centers", "Local Markets"],
    bestFor: "Cultural enthusiasts, tribal culture lovers, families",
    travelTips: "Great for cultural immersion. Participate in local activities. Respect tribal customs.",
    accessibility: "Basic accessibility. Ground floor rooms available."
  }
];

export const getStayById = (id: string | number): Stay | undefined => {
  return stays.find(stay => stay.id === Number(id));
};


