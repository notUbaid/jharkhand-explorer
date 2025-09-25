import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { MapPin, Route, Calendar, Clock, Star, ArrowLeft, ArrowRight, Plane, Hotel, Utensils, Camera, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Utility function to decode HTML entities
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

// Types for map components
interface RouteSegment {
  from: {
    name: string;
    position: [number, number];
    type: "airport" | "hotel" | "attraction" | "restaurant" | "destination";
    icon: string;
  };
  to: {
    name: string;
    position: [number, number];
    type: "airport" | "hotel" | "attraction" | "restaurant" | "destination";
    icon: string;
  };
  day: number;
  time: string;
  description: string;
  duration: string;
  activities: string[];
}

// Component to handle map updates and auto-zoom
const MapUpdater: React.FC<{
  currentSegment: RouteSegment;
  routeSegments: RouteSegment[];
  currentStep: number;
  onTransitionStart: () => void;
  onTransitionEnd: () => void;
}> = ({ currentSegment, routeSegments, currentStep, onTransitionStart, onTransitionEnd }) => {
  const map = useMap();

  useEffect(() => {
    if (currentSegment && map) {
      // Calculate bounds for the current route segment
      const bounds = L.latLngBounds([
        currentSegment.from.position,
        currentSegment.to.position
      ]);

      // Add padding based on the distance for better visualization
      const distance = map.distance(
        L.latLng(currentSegment.from.position[0], currentSegment.from.position[1]),
        L.latLng(currentSegment.to.position[0], currentSegment.to.position[1])
      );

      // Dynamic padding based on distance
      let padding = 0.1;
      if (distance < 2000) { // Very short distance
        padding = 0.05;
      } else if (distance < 10000) { // Short distance
        padding = 0.08;
      } else if (distance < 50000) { // Medium distance
        padding = 0.12;
      } else { // Long distance
        padding = 0.15;
      }

      const paddedBounds = bounds.pad(padding);

      // Calculate optimal zoom level based on distance with more granular control
      let optimalZoom = 11;
      if (distance < 1000) { // Less than 1km - very close
        optimalZoom = 15;
      } else if (distance < 3000) { // Less than 3km - close
        optimalZoom = 14;
      } else if (distance < 8000) { // Less than 8km - nearby
        optimalZoom = 13;
      } else if (distance < 20000) { // Less than 20km - regional
        optimalZoom = 12;
      } else if (distance < 50000) { // Less than 50km - state level
        optimalZoom = 10;
      } else if (distance < 100000) { // Less than 100km - country level
        optimalZoom = 9;
      } else { // More than 100km - very wide
        optimalZoom = 8;
      }

      // Instantly fit bounds without any animation
      map.fitBounds(paddedBounds, {
        padding: [30, 30],
        animate: false,
        maxZoom: optimalZoom
      });

      // Ensure zoom is set instantly as well
      map.setZoom(optimalZoom, {
        animate: false
      });
    }
  }, [currentSegment, map, currentStep, onTransitionStart, onTransitionEnd]);

  return null;
};

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Real coordinates for Jharkhand locations
const locations = {
  'Ranchi Airport': [23.3142, 85.3214] as [number, number],
  'Patratu Lake Resort': [23.5747, 85.2732] as [number, number],
  'Netarhat Hill Station': [23.4973, 84.2623] as [number, number],
  'Upper Ghaghri Falls': [23.4800, 84.2500] as [number, number],
  'Koel View Point': [23.5000, 84.2700] as [number, number],
  'Sunset Point': [23.4900, 84.2600] as [number, number],
  'Candlelight Dinner Spot': [23.5747, 85.2732] as [number, number], // Same as resort
  'Jagannath Temple': [23.3441, 85.3096] as [number, number],
  'Handicrafts Emporium': [23.3500, 85.3200] as [number, number],
  'Ranchi Railway Station': [23.3441, 85.3096] as [number, number],
  // Industrial locations
  'Jamshedpur Airport': [22.8046, 86.2029] as [number, number],
  'Hotel Sonnet Jamshedpur': [22.8046, 86.2029] as [number, number],
  'Tata Steel Museum': [22.8046, 86.2029] as [number, number],
  'Noamundi Iron Ore Mine': [22.1667, 85.5333] as [number, number],
  'Company Guest House Noamundi': [22.1667, 85.5333] as [number, number],
  'Dhanbad Railway Station': [23.7956, 86.4353] as [number, number],
  'Hotel Clarks Inn Dhanbad': [23.7956, 86.4353] as [number, number],
  'Jharia Coalfield': [23.7500, 86.4000] as [number, number],
  'ISM Museum': [23.7956, 86.4353] as [number, number],
  'North Urimari Open-Cast Mine': [23.8000, 86.4500] as [number, number],
  'Mine Canteen': [23.8000, 86.4500] as [number, number],
  'SAIL Office Ranchi': [23.3441, 85.3096] as [number, number],
  // Spiritual locations
  'Jasidih Railway Station': [24.4833, 86.7000] as [number, number],
  'Deoghar City': [24.4833, 86.7000] as [number, number],
  'Baba Baidyanath Temple': [24.4833, 86.7000] as [number, number],
  'Basukinath Temple': [24.5000, 86.7500] as [number, number],
  'Naulakha Mandir': [24.4833, 86.7000] as [number, number],
  'Trikuta Parvat': [24.4833, 86.7000] as [number, number],
  'Parasnath Hills': [24.0167, 86.1833] as [number, number],
  'Shikharji Temples': [24.0167, 86.1833] as [number, number],
  'Giridih City': [24.1833, 86.3000] as [number, number],
  'Dharamshala Parasnath': [24.0167, 86.1833] as [number, number],
  // Adventure locations
  'Hotel Radisson Blu Ranchi': [23.3441, 85.3096] as [number, number],
  'Rock Garden Tagore Hill': [23.3441, 85.3096] as [number, number],
  'Kanke Dam': [23.3500, 85.3200] as [number, number],
  'Hundru Falls': [23.4500, 85.2000] as [number, number],
  'Dassam Falls': [23.4000, 85.2500] as [number, number],
  'Jonha Falls Gautamdhara': [23.4200, 85.2200] as [number, number],
  'Netarhat Tourist Lodge': [23.4973, 84.2623] as [number, number],
  'Sunset Point Netarhat': [23.4900, 84.2600] as [number, number],
  'Betla National Park': [23.8000, 84.2000] as [number, number],
  'Palamu Fort Ruins': [23.8000, 84.2000] as [number, number],
  'Forest Rest House': [23.8000, 84.2000] as [number, number],
  'Parasnath Hills Trek': [24.0167, 86.1833] as [number, number],
  'Parasnath Summit': [24.0167, 86.1833] as [number, number],
  // Grand Jharkhand Explorer locations
  'Hotel Capital Residency': [23.3441, 85.3096] as [number, number],
  'Firayalal Market': [23.3500, 85.3200] as [number, number],
  'Ranchi Lake': [23.3441, 85.3096] as [number, number],
  'Tribal Village': [23.4500, 85.2000] as [number, number],
  'Netarhat Dam': [23.4973, 84.2623] as [number, number],
  'Forest Rest House Betla': [23.8000, 84.2000] as [number, number],
  'Baidyanath Temple Deoghar': [24.4833, 86.7000] as [number, number],
  'Jagannath Temple Ranchi': [23.3441, 85.3096] as [number, number],
  'Local Markets Ranchi': [23.3500, 85.3200] as [number, number],
  // Additional locations for 8-day itinerary
  'Hazaribagh City': [24.0000, 85.3500] as [number, number],
  'Hazaribagh Wildlife Sanctuary': [24.0000, 85.3500] as [number, number],
  'Canary Hill Hazaribagh': [24.0000, 85.3500] as [number, number],
  'Rajrappa Temple': [23.6333, 85.5167] as [number, number],
  'Tata Steel Museum Jamshedpur': [22.8046, 86.2029] as [number, number],
  'Jubilee Park Jamshedpur': [22.8046, 86.2029] as [number, number],
  'Dimna Lake Jamshedpur': [22.8046, 86.2029] as [number, number],
  'Tribal Cultural Centre Jamshedpur': [22.8046, 86.2029] as [number, number],
  'Handicraft Emporium Ranchi': [23.3500, 85.3200] as [number, number],
  // Mining Exploration Journey locations
  'Dhanbad City': [23.8000, 86.4500] as [number, number],
  'Hotel Grand Inn Dhanbad': [23.8000, 86.4500] as [number, number],
  'ISM Geological Museum': [23.8000, 86.4500] as [number, number],
  'North Urimari Mine': [23.8500, 86.5000] as [number, number],
  'Mine Visitor Center': [23.8500, 86.5000] as [number, number],
  // Tribal Heritage & Handicrafts Trail locations
  'Backpacker Hostel Ranchi': [23.3441, 85.3096] as [number, number],
  'Amadubi Village': [22.7000, 86.2000] as [number, number],
  'Hazaribagh Villages': [24.0000, 85.3500] as [number, number],
  'Tribal Artisan Village': [24.0000, 85.3500] as [number, number],
  // Lakes & Valleys Luxury Escape locations
  'Premium Restaurant Ranchi': [23.3441, 85.3096] as [number, number],
  'Heritage Restaurant Ranchi': [23.3441, 85.3096] as [number, number],
  'Handicrafts Emporium Ranchi': [23.3500, 85.3200] as [number, number],
  'Premium Café Ranchi': [23.3441, 85.3096] as [number, number],
  // Historic & Architectural Jharkhand locations
  'Dumka City': [24.2667, 87.2500] as [number, number],
  'Maluti Temples': [24.2667, 87.2500] as [number, number],
  'Rajmahal Hills': [25.0000, 87.5000] as [number, number],
  'Latehar City': [23.7500, 84.5000] as [number, number],
  'Eco Lodge Betla': [23.8000, 84.2000] as [number, number],
  // Waterfalls & Scenic Ranchi Circuit locations
  'Hirni Falls': [23.3000, 85.2000] as [number, number],
  'Main Road Shopping Ranchi': [23.3500, 85.3200] as [number, number],
  // The Grand Jharkhand Explorer locations
  'Hotel Capitol Residency': [23.3441, 85.3096] as [number, number],
  'Betla Forest Lodge': [23.8000, 84.2000] as [number, number],
  'Hotel Rajdoot Hazaribagh': [24.0000, 85.3500] as [number, number],
  'Hotel Shivam Deoghar': [24.4833, 86.7000] as [number, number],
  'Tapovan Caves': [24.4833, 86.7000] as [number, number],
  'Tata Steel Zoological Park': [22.8046, 86.2029] as [number, number],
  'Bistupur Market': [22.8046, 86.2029] as [number, number],
  'Tribal Art Workshop': [24.0000, 85.3500] as [number, number],
  // Adventure & Eco-Experience locations
  'Eco-Lodge Ranchi': [23.3441, 85.3096] as [number, number],
  'Camping Site Netarhat': [23.4973, 84.2623] as [number, number],
  'Eco Camp Betla': [23.8000, 84.2000] as [number, number],
  'Hotel Giridih': [24.1833, 86.3000] as [number, number],
  'Patratu Adventure Resort': [23.6333, 85.5167] as [number, number],
  'River Picnic Site': [23.3000, 85.2000] as [number, number],
  'ATV Track Patratu': [23.6333, 85.5167] as [number, number],
  // The Nomad Trail locations
  'Khunti District': [23.0833, 85.2833] as [number, number],
  'Tribal Family Homestay': [23.0833, 85.2833] as [number, number],
  'Nomad Camping Site Netarhat': [23.4973, 84.2623] as [number, number],
  'Betla Eco-Hut': [23.8000, 84.2000] as [number, number],
  'Mud-House Homestay Hazaribagh': [24.0000, 85.3500] as [number, number],
  'Budget Lodge Deoghar': [24.4833, 86.7000] as [number, number],
  'Shared Camp Jonha': [23.3000, 85.2000] as [number, number],
  'Community Cooking Site': [23.8000, 84.2000] as [number, number],
  // Jharkhand Nightlife & Wilderness Safari locations
  'Luxury Hotel Ranchi': [23.3441, 85.3096] as [number, number],
  'Stargazing Site Netarhat': [23.4973, 84.2623] as [number, number],
  'Premium Tents Betla': [23.8000, 84.2000] as [number, number],
  'Patratu Resort': [23.6333, 85.5167] as [number, number],
  'Luxury Hotel Jamshedpur': [22.8046, 86.2029] as [number, number],
  'Street Food Night Tour': [23.3500, 85.3200] as [number, number],
  'Night Boating Patratu': [23.6333, 85.5167] as [number, number],
  'Pub Crawl Bistupur': [22.8046, 86.2029] as [number, number]
};

interface RouteSegment {
  id: string;
  from: {
    name: string;
    position: [number, number];
    type: 'airport' | 'hotel' | 'attraction' | 'restaurant' | 'destination';
    icon: string;
  };
  to: {
    name: string;
    position: [number, number];
    type: 'airport' | 'hotel' | 'attraction' | 'restaurant' | 'destination';
    icon: string;
  };
  description: string;
  duration: string;
  activities: string[];
  day: number;
  time: string;
}

interface ItineraryMapProps {
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
  packageTitle: string;
}

export default function ItineraryMap({ itinerary, packageTitle }: ItineraryMapProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [routeSegments, setRouteSegments] = useState<RouteSegment[]>([]);

  // Create route segments based on itinerary
  useEffect(() => {
    const segments: RouteSegment[] = [];

    // Check if this is the Industry Immersion package
    const isIndustryPackage = packageTitle.includes('Industry Immersion') || packageTitle.includes('Iron & Coal');
    const isSpiritualPackage = packageTitle.includes('Spiritual') || packageTitle.includes('Cultural') || packageTitle.includes('Circuit');
    const isAdventurePackage = packageTitle.includes('Adventure') || packageTitle.includes('Wilderness') || packageTitle.includes('Getaway');
    const isGrandExplorerPackage = packageTitle.includes('Discover Jharkhand') || packageTitle.includes('Nature & Culture') || packageTitle.includes('Grand');
    const isMiningPackage = packageTitle.includes('Mining Exploration') || packageTitle.includes('Coal Fields') || packageTitle.includes('Open-Cast Mining');
    const isTribalPackage = packageTitle.includes('Tribal Heritage') || packageTitle.includes('Handicrafts Trail') || packageTitle.includes('Cultural');
    const isLuxuryPackage = packageTitle.includes('Lakes & Valleys') || packageTitle.includes('Luxury Escape') || packageTitle.includes('Patratu Lake');
    const isHistoricPackage = packageTitle.includes('Historic & Architectural') || packageTitle.includes('Maluti Temples') || packageTitle.includes('Palamu Fort');
    const isWaterfallPackage = packageTitle.includes('Waterfalls & Scenic') || packageTitle.includes('Ranchi Circuit') || packageTitle.includes('Dassam Falls');
    const isGrandExplorerPackage2 = packageTitle.includes('The Grand Jharkhand Explorer') || packageTitle.includes('Complete Jharkhand Experience') || packageTitle.includes('flagship package');
    const isAdventureEcoPackage = packageTitle.includes('Adventure & Eco-Experience') || packageTitle.includes('Water Adventure') || packageTitle.includes('Rappelling') || packageTitle.includes('ATV Rides');
    const isNomadTrailPackage = packageTitle.includes('The Nomad Trail') || packageTitle.includes('Backpacking') || packageTitle.includes('Tribal Village Homestays') || packageTitle.includes('Budget-Friendly');
    const isNightlifeSafariPackage = packageTitle.includes('Nightlife & Wilderness Safari') || packageTitle.includes('Night Safari') || packageTitle.includes('Stargazing') || packageTitle.includes('Pub Crawl');

    if (isIndustryPackage) {
      // Industry Immersion Package Route Segments
      
      // Day 1: Jamshedpur Arrival
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Jamshedpur Airport',
          position: locations['Jamshedpur Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Hotel Sonnet Jamshedpur',
          position: locations['Hotel Sonnet Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Arrival and industry briefing',
        duration: '1.5 hours',
        activities: ['Airport pickup with industry briefing', 'Check-in at Hotel Sonnet (4★)', 'Welcome tea with Tata Steel executives'],
        day: 1,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day1-museum',
        from: {
          name: 'Hotel Sonnet Jamshedpur',
          position: locations['Hotel Sonnet Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Tata Steel Museum',
          position: locations['Tata Steel Museum'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Tata Steel Museum visit',
        duration: '2 hours',
        activities: ['Visit Tata Steel Museum', 'Company history and innovations', 'Welcome dinner with industry professionals'],
        day: 1,
        time: 'Evening'
      });

      // Day 2: Noamundi Iron Ore Mine
      segments.push({
        id: 'day2-noamundi',
        from: {
          name: 'Hotel Sonnet Jamshedpur',
          position: locations['Hotel Sonnet Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Noamundi Iron Ore Mine',
          position: locations['Noamundi Iron Ore Mine'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Iron ore mine operations tour',
        duration: '2.5 hours',
        activities: ['Safety briefing and PPE distribution', 'Surface mine tour', 'Heavy machinery demonstration'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-guesthouse',
        from: {
          name: 'Noamundi Iron Ore Mine',
          position: locations['Noamundi Iron Ore Mine'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Company Guest House Noamundi',
          position: locations['Company Guest House Noamundi'],
          type: 'restaurant',
          icon: 'utensils'
        },
        description: 'Lunch with engineers',
        duration: '1.5 hours',
        activities: ['Lunch at company guest house with engineers', 'Sustainability practices workshop', 'Iron ore processing plant visit'],
        day: 2,
        time: 'Afternoon'
      });

      // Day 3: Transfer to Dhanbad
      segments.push({
        id: 'day3-dhanbad',
        from: {
          name: 'Hotel Sonnet Jamshedpur',
          position: locations['Hotel Sonnet Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Hotel Clarks Inn Dhanbad',
          position: locations['Hotel Clarks Inn Dhanbad'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Transfer to coal capital',
        duration: '3 hours',
        activities: ['Scenic drive to Dhanbad', 'Check-in at Hotel Clarks Inn (4★)', 'Traditional lunch at local restaurant'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-jharia',
        from: {
          name: 'Hotel Clarks Inn Dhanbad',
          position: locations['Hotel Clarks Inn Dhanbad'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Jharia Coalfield',
          position: locations['Jharia Coalfield'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Coal heritage zone visit',
        duration: '2 hours',
        activities: ['Jharia Coalfield heritage zone visit', 'ISM Museum tour', 'Coal mining history presentation'],
        day: 3,
        time: 'Afternoon'
      });

      // Day 4: North Urimari Mine
      segments.push({
        id: 'day4-urimari',
        from: {
          name: 'Hotel Clarks Inn Dhanbad',
          position: locations['Hotel Clarks Inn Dhanbad'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'North Urimari Open-Cast Mine',
          position: locations['North Urimari Open-Cast Mine'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Open-cast mine tour',
        duration: '1.5 hours',
        activities: ['Safety briefing and advanced PPE fitting', 'Open-cast mine tour with expert guides', 'AR/VR mining simulation experience'],
        day: 4,
        time: 'Morning'
      });

      segments.push({
        id: 'day4-canteen',
        from: {
          name: 'North Urimari Open-Cast Mine',
          position: locations['North Urimari Open-Cast Mine'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Mine Canteen',
          position: locations['Mine Canteen'],
          type: 'restaurant',
          icon: 'utensils'
        },
        description: 'Lunch with mine workers',
        duration: '2 hours',
        activities: ['Lunch at mine canteen with workers', 'Materials Science Lab Workshop', 'Engineer interaction session'],
        day: 4,
        time: 'Afternoon'
      });

      // Day 5: Return to Ranchi
      segments.push({
        id: 'day5-ranchi',
        from: {
          name: 'Hotel Clarks Inn Dhanbad',
          position: locations['Hotel Clarks Inn Dhanbad'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'SAIL Office Ranchi',
          position: locations['SAIL Office Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Final industry visit',
        duration: '2 hours',
        activities: ['Drive to Ranchi', 'Visit Steel Authority of India (SAIL) office', 'Traditional farewell lunch'],
        day: 5,
        time: 'Morning'
      });

      segments.push({
        id: 'day5-departure',
        from: {
          name: 'SAIL Office Ranchi',
          position: locations['SAIL Office Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Departure with certificates',
        duration: '30 minutes',
        activities: ['Final industry insights session', 'Airport drop with certificates'],
        day: 5,
        time: 'Evening'
      });

    } else if (isSpiritualPackage) {
      // Spiritual & Cultural Circuit Package Route Segments
      
      // Day 1: Deoghar Arrival
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Jasidih Railway Station',
          position: locations['Jasidih Railway Station'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Deoghar City',
          position: locations['Deoghar City'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Arrival and temple visit',
        duration: '1 hour',
        activities: ['Train arrival at Jasidih', 'Hotel check-in', 'Baba Baidyanath Temple visit'],
        day: 1,
        time: 'Morning'
      });

      segments.push({
        id: 'day1-temple',
        from: {
          name: 'Deoghar City',
          position: locations['Deoghar City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Baba Baidyanath Temple',
          position: locations['Baba Baidyanath Temple'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Sacred Jyotirlinga visit',
        duration: '2 hours',
        activities: ['Baba Baidyanath Temple visit', 'Evening arti experience'],
        day: 1,
        time: 'Evening'
      });

      // Day 2: Basukinath & Naulakha Mandir
      segments.push({
        id: 'day2-basukinath',
        from: {
          name: 'Deoghar City',
          position: locations['Deoghar City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Basukinath Temple',
          position: locations['Basukinath Temple'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Sacred temple visit',
        duration: '1 hour',
        activities: ['Drive to Basukinath Temple', 'Return to Deoghar for lunch'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-naulakha',
        from: {
          name: 'Deoghar City',
          position: locations['Deoghar City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Naulakha Mandir',
          position: locations['Naulakha Mandir'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Golden temple and mountain',
        duration: '2 hours',
        activities: ['Naulakha Mandir & Trikuta Parvat', 'Ropeway optional'],
        day: 2,
        time: 'Afternoon'
      });

      // Day 3: Parasnath Hills
      segments.push({
        id: 'day3-parasnath',
        from: {
          name: 'Deoghar City',
          position: locations['Deoghar City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Parasnath Hills',
          position: locations['Parasnath Hills'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Sacred mountain pilgrimage',
        duration: '2 hours',
        activities: ['Drive to Parasnath Hills', 'Trek / ropeway to summit temples'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-shikharji',
        from: {
          name: 'Parasnath Hills',
          position: locations['Parasnath Hills'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Shikharji Temples',
          position: locations['Shikharji Temples'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Jain temples at summit',
        duration: '3 hours',
        activities: ['Trek / ropeway to summit temples', 'Lunch at foothill dharamshala'],
        day: 3,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day3-giridih',
        from: {
          name: 'Shikharji Temples',
          position: locations['Shikharji Temples'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Giridih City',
          position: locations['Giridih City'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Transfer to Giridih',
        duration: '1 hour',
        activities: ['Return to Giridih'],
        day: 3,
        time: 'Evening'
      });

      // Day 4: Return Journey
      segments.push({
        id: 'day4-departure',
        from: {
          name: 'Giridih City',
          position: locations['Giridih City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Return and departure',
        duration: '3 hours',
        activities: ['Drive back to Ranchi / Jasidih', 'Onward journey'],
        day: 4,
        time: 'Morning'
      });

    } else if (isMiningPackage) {
      // Mining Exploration Journey Package Route Segments
      
      // Day 1: Dhanbad Arrival
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Dhanbad Railway Station',
          position: locations['Dhanbad City'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Hotel Grand Inn Dhanbad',
          position: locations['Hotel Grand Inn Dhanbad'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Mining journey begins',
        duration: '1 hour',
        activities: ['Hotel check-in', 'Safety orientation & PPE distribution', 'Coal documentary screening'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Jharia Coal Heritage
      segments.push({
        id: 'day2-jharia',
        from: {
          name: 'Hotel Grand Inn Dhanbad',
          position: locations['Hotel Grand Inn Dhanbad'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Jharia Coalfield',
          position: locations['Jharia Coalfield'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Coal heritage exploration',
        duration: '2 hours',
        activities: ['Jharia Coalfield heritage zone', 'Surface mine viewing point'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-museum',
        from: {
          name: 'Jharia Coalfield',
          position: locations['Jharia Coalfield'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'ISM Geological Museum',
          position: locations['ISM Geological Museum'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Geological museum visit',
        duration: '2 hours',
        activities: ['ISM Geological Museum', 'Engineer debrief session'],
        day: 2,
        time: 'Afternoon'
      });

      // Day 3: North Urimari Mine & Patratu Valley
      segments.push({
        id: 'day3-urimari',
        from: {
          name: 'Hotel Grand Inn Dhanbad',
          position: locations['Hotel Grand Inn Dhanbad'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'North Urimari Mine',
          position: locations['North Urimari Mine'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Open-cast mine tour',
        duration: '2 hours',
        activities: ['Open-cast mine tour', 'Heavy machinery observation'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-simulation',
        from: {
          name: 'North Urimari Mine',
          position: locations['North Urimari Mine'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Mine Visitor Center',
          position: locations['Mine Visitor Center'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'AR/VR simulation experience',
        duration: '1 hour',
        activities: ['AR/VR simulation', 'Patratu Valley sightseeing'],
        day: 3,
        time: 'Afternoon'
      });

    } else if (isTribalPackage) {
      // Tribal Heritage & Handicrafts Trail Package Route Segments
      
      // Day 1: Arrival at Ranchi
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Railway Station',
          position: locations['Ranchi Railway Station'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Backpacker Hostel Ranchi',
          position: locations['Backpacker Hostel Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Cultural journey begins',
        duration: '1 hour',
        activities: ['Railway station/airport welcome', 'Hostel orientation', 'Street food walk'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Amadubi Village
      segments.push({
        id: 'day2-amadubi',
        from: {
          name: 'Backpacker Hostel Ranchi',
          position: locations['Backpacker Hostel Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Amadubi Village',
          position: locations['Amadubi Village'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Paitkar painting workshop',
        duration: '3 hours',
        activities: ['Drive to Amadubi village', 'Paitkar painting workshop', 'Lunch with tribal family', 'Folk storytelling session'],
        day: 2,
        time: 'Morning'
      });

      // Day 3: Hazaribagh Villages
      segments.push({
        id: 'day3-hazaribagh',
        from: {
          name: 'Amadubi Village',
          position: locations['Amadubi Village'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hazaribagh Villages',
          position: locations['Hazaribagh Villages'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Sohrai & Kohbar art',
        duration: '4 hours',
        activities: ['Drive to Hazaribagh villages', 'Sohrai wall paintings', 'Kohbar ritual art', 'Meet women artisans'],
        day: 3,
        time: 'Morning'
      });

      // Day 4: Departure
      segments.push({
        id: 'day4-departure',
        from: {
          name: 'Hazaribagh Villages',
          position: locations['Hazaribagh Villages'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Ranchi Railway Station',
          position: locations['Ranchi Railway Station'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Cultural journey ends',
        duration: '2 hours',
        activities: ['Transfer back to Ranchi/Hazaribagh station'],
        day: 4,
        time: 'Morning'
      });

    } else if (isLuxuryPackage) {
      // Lakes & Valleys Luxury Escape Package Route Segments
      
      // Day 1: Arrival at Ranchi & Patratu Valley
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Premium Restaurant Ranchi',
          position: locations['Premium Restaurant Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Luxury begins',
        duration: '1.5 hours',
        activities: ['Airport/Station pickup with luxury vehicle', 'Welcome lunch at premium restaurant (multi-cuisine)'],
        day: 1,
        time: 'Morning'
      });

      segments.push({
        id: 'day1-patratu',
        from: {
          name: 'Premium Restaurant Ranchi',
          position: locations['Premium Restaurant Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Patratu Lake Resort',
          position: locations['Patratu Lake Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Scenic drive to luxury resort',
        duration: '2 hours',
        activities: ['Scenic drive to Patratu Valley (2-hour journey)', 'Check-in at Patratu Lake Resort (5★ luxury)', 'Welcome tea with lake views'],
        day: 1,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day1-lake-activities',
        from: {
          name: 'Patratu Lake Resort',
          position: locations['Patratu Lake Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Patratu Lake',
          position: locations['Patratu Lake'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Lake activities and luxury dining',
        duration: '4 hours',
        activities: ['Private boat ride on Patratu Lake', 'Spa session (couples massage available)', 'Candlelight dinner by the lake with live music', 'Stargazing from private balcony'],
        day: 1,
        time: 'Evening'
      });

      // Day 2: Netarhat Hill Station Day Trip
      segments.push({
        id: 'day2-netarhat',
        from: {
          name: 'Patratu Lake Resort',
          position: locations['Patratu Lake Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Queen of Chotanagpur',
        duration: '3 hours',
        activities: ['Breakfast with lake views', 'Drive to Netarhat (3-hour scenic journey)', 'Arrival at Netarhat Hill Station'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-ghaghri',
        from: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Upper Ghaghri Falls',
          position: locations['Upper Ghaghri Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Photography and nature walk',
        duration: '2 hours',
        activities: ['Upper Ghaghri Falls - photography and nature walk', 'Curated picnic lunch with local delicacies'],
        day: 2,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day2-sunset',
        from: {
          name: 'Upper Ghaghri Falls',
          position: locations['Upper Ghaghri Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Sunset Point Netarhat',
          position: locations['Sunset Point Netarhat'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Spectacular sunset views',
        duration: '2 hours',
        activities: ['Koel View Point - panoramic valley views', 'Sunset Point - witness spectacular sunset'],
        day: 2,
        time: 'Evening'
      });

      segments.push({
        id: 'day2-return',
        from: {
          name: 'Sunset Point Netarhat',
          position: locations['Sunset Point Netarhat'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Patratu Lake Resort',
          position: locations['Patratu Lake Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Return to luxury resort',
        duration: '3 hours',
        activities: ['Return journey to Patratu with refreshments', 'Romantic dinner at resort with wine pairing'],
        day: 2,
        time: 'Evening'
      });

      // Day 3: Ranchi Local Sightseeing & Departure
      segments.push({
        id: 'day3-ranchi',
        from: {
          name: 'Patratu Lake Resort',
          position: locations['Patratu Lake Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Jagannath Temple Ranchi',
          position: locations['Jagannath Temple Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Cultural heritage visit',
        duration: '2 hours',
        activities: ['Breakfast and checkout', 'Drive back to Ranchi (2-hour journey)', 'Visit Jagannath Temple - spiritual experience'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-shopping',
        from: {
          name: 'Jagannath Temple Ranchi',
          position: locations['Jagannath Temple Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Handicrafts Emporium Ranchi',
          position: locations['Handicrafts Emporium Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Luxury shopping and dining',
        duration: '2 hours',
        activities: ['Traditional lunch at heritage restaurant', 'Handicrafts Emporium - luxury shopping'],
        day: 3,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day3-departure',
        from: {
          name: 'Handicrafts Emporium Ranchi',
          position: locations['Handicrafts Emporium Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Luxury departure',
        duration: '1.5 hours',
        activities: ['Final tea at premium café', 'Airport/Station drop with farewell gifts'],
        day: 3,
        time: 'Afternoon'
      });

    } else if (isHistoricPackage) {
      // Historic & Architectural Jharkhand Package Route Segments
      
      // Day 1: Arrival at Ranchi
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Jagannath Temple Ranchi',
          position: locations['Jagannath Temple Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Heritage journey begins',
        duration: '1 hour',
        activities: ['Airport/Station pickup', 'Jagannath Temple visit'],
        day: 1,
        time: 'Morning'
      });

      segments.push({
        id: 'day1-rock-garden',
        from: {
          name: 'Jagannath Temple Ranchi',
          position: locations['Jagannath Temple Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Rock Garden Tagore Hill',
          position: locations['Rock Garden Tagore Hill'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Rock Garden & Kanke Dam',
        duration: '2 hours',
        activities: ['Rock Garden & Kanke Dam'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Maluti Temples & Rajmahal Hills
      segments.push({
        id: 'day2-dumka',
        from: {
          name: 'Rock Garden Tagore Hill',
          position: locations['Rock Garden Tagore Hill'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Dumka City',
          position: locations['Dumka City'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Dumka',
        duration: '3 hours',
        activities: ['Drive to Dumka'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-maluti',
        from: {
          name: 'Dumka City',
          position: locations['Dumka City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Maluti Temples',
          position: locations['Maluti Temples'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Maluti Temples exploration',
        duration: '3 hours',
        activities: ['Maluti Temples exploration', 'UNESCO heritage nomination learning'],
        day: 2,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day2-rajmahal',
        from: {
          name: 'Maluti Temples',
          position: locations['Maluti Temples'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Rajmahal Hills',
          position: locations['Rajmahal Hills'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Rajmahal Hills visit',
        duration: '2 hours',
        activities: ['Rajmahal Hills visit'],
        day: 2,
        time: 'Evening'
      });

      // Day 3: Palamu Fort & Betla
      segments.push({
        id: 'day3-latehar',
        from: {
          name: 'Dumka City',
          position: locations['Dumka City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Latehar City',
          position: locations['Latehar City'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Latehar',
        duration: '2 hours',
        activities: ['Drive to Latehar'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-palamu',
        from: {
          name: 'Latehar City',
          position: locations['Latehar City'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Palamu Fort Ruins',
          position: locations['Palamu Fort Ruins'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Palamu Fort ruins',
        duration: '2 hours',
        activities: ['Palamu Fort ruins'],
        day: 3,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day3-betla',
        from: {
          name: 'Palamu Fort Ruins',
          position: locations['Palamu Fort Ruins'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Eco Lodge Betla',
          position: locations['Eco Lodge Betla'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Betla National Park safari',
        duration: '2 hours',
        activities: ['Betla National Park safari'],
        day: 3,
        time: 'Evening'
      });

      // Day 4: Departure
      segments.push({
        id: 'day4-departure',
        from: {
          name: 'Eco Lodge Betla',
          position: locations['Eco Lodge Betla'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Return transfer to Ranchi',
        duration: '3 hours',
        activities: ['Return transfer to Ranchi'],
        day: 4,
        time: 'Morning'
      });

    } else if (isWaterfallPackage) {
      // Waterfalls & Scenic Ranchi Circuit Package Route Segments
      
      // Day 1: Arrival at Ranchi + Dassam Falls
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Waterfall journey begins',
        duration: '1.5 hours',
        activities: ['Airport/Station pickup', 'Drive to Dassam Falls'],
        day: 1,
        time: 'Morning'
      });

      segments.push({
        id: 'day1-shopping',
        from: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Main Road Shopping Ranchi',
          position: locations['Main Road Shopping Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Ranchi Lake & Main Road shopping',
        duration: '2 hours',
        activities: ['Ranchi Lake & Main Road shopping'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Hundru & Jonha Falls + Patratu Valley
      segments.push({
        id: 'day2-hundru',
        from: {
          name: 'Main Road Shopping Ranchi',
          position: locations['Main Road Shopping Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Drive to Hundru Falls',
        duration: '1.5 hours',
        activities: ['Drive to Hundru Falls'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-jonha',
        from: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Jonha Falls Gautamdhara',
          position: locations['Jonha Falls Gautamdhara'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Jonha Falls picnic',
        duration: '2 hours',
        activities: ['Jonha Falls picnic'],
        day: 2,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day2-patratu',
        from: {
          name: 'Jonha Falls Gautamdhara',
          position: locations['Jonha Falls Gautamdhara'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Patratu Valley',
          position: locations['Patratu Valley'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Patratu Valley sunset drive',
        duration: '2 hours',
        activities: ['Patratu Valley sunset drive'],
        day: 2,
        time: 'Evening'
      });

      // Day 3: Hirni Falls & Departure
      segments.push({
        id: 'day3-hirni',
        from: {
          name: 'Patratu Valley',
          position: locations['Patratu Valley'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hirni Falls',
          position: locations['Hirni Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Visit Hirni Falls',
        duration: '2 hours',
        activities: ['Visit Hirni Falls'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-departure',
        from: {
          name: 'Hirni Falls',
          position: locations['Hirni Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Return to Ranchi for departure',
        duration: '1.5 hours',
        activities: ['Return to Ranchi for departure'],
        day: 3,
        time: 'Afternoon'
      });

    } else if (isGrandExplorerPackage2) {
      // The Grand Jharkhand Explorer Package Route Segments
      
      // Day 1: Arrival at Ranchi
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Hotel Capitol Residency',
          position: locations['Hotel Capitol Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Welcome to Jharkhand',
        duration: '1 hour',
        activities: ['Airport/Station pickup', 'Rock Garden & Kanke Dam', 'Welcome dinner with tribal dance show'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Ranchi Waterfalls Tour
      segments.push({
        id: 'day2-dassam',
        from: {
          name: 'Hotel Capitol Residency',
          position: locations['Hotel Capitol Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Dassam Falls visit',
        duration: '1.5 hours',
        activities: ['Dassam Falls'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-hundru',
        from: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Hundru Falls visit',
        duration: '1 hour',
        activities: ['Hundru Falls'],
        day: 2,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day2-jonha',
        from: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Jonha Falls Gautamdhara',
          position: locations['Jonha Falls Gautamdhara'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Jonha Falls visit',
        duration: '1 hour',
        activities: ['Jonha Falls', 'Firayalal Chowk shopping'],
        day: 2,
        time: 'Evening'
      });

      // Day 3: Netarhat Hill Station
      segments.push({
        id: 'day3-netarhat',
        from: {
          name: 'Jonha Falls Gautamdhara',
          position: locations['Jonha Falls Gautamdhara'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Netarhat',
        duration: '3 hours',
        activities: ['Drive to Netarhat', 'Upper Ghaghri Falls', 'Koel View Point', 'Sunset Point'],
        day: 3,
        time: 'Morning'
      });

      // Day 4: Betla National Park & Palamu Fort
      segments.push({
        id: 'day4-betla',
        from: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Betla Forest Lodge',
          position: locations['Betla Forest Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Transfer to Betla',
        duration: '2 hours',
        activities: ['Transfer to Betla', 'Safari experience', 'Palamu Fort ruins'],
        day: 4,
        time: 'Morning'
      });

      // Day 5: Hazaribagh
      segments.push({
        id: 'day5-hazaribagh',
        from: {
          name: 'Betla Forest Lodge',
          position: locations['Betla Forest Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Hotel Rajdoot Hazaribagh',
          position: locations['Hotel Rajdoot Hazaribagh'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Hazaribagh',
        duration: '2.5 hours',
        activities: ['Drive to Hazaribagh', 'National Park & Lake', 'Tribal villages Sohrai/Kohbar art workshop'],
        day: 5,
        time: 'Morning'
      });

      // Day 6: Deoghar (Religious Circuit)
      segments.push({
        id: 'day6-deoghar',
        from: {
          name: 'Hotel Rajdoot Hazaribagh',
          position: locations['Hotel Rajdoot Hazaribagh'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Hotel Shivam Deoghar',
          position: locations['Hotel Shivam Deoghar'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Deoghar',
        duration: '3 hours',
        activities: ['Drive to Deoghar', 'Baidyanath Jyotirlinga darshan', 'Naulakha Mandir', 'Tapovan caves'],
        day: 6,
        time: 'Morning'
      });

      // Day 7: Jamshedpur (Steel City)
      segments.push({
        id: 'day7-jamshedpur',
        from: {
          name: 'Hotel Shivam Deoghar',
          position: locations['Hotel Shivam Deoghar'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Hotel Sonnet Jamshedpur',
          position: locations['Hotel Sonnet Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Transfer to Jamshedpur',
        duration: '4 hours',
        activities: ['Transfer to Jamshedpur', 'Dimna Lake', 'Jubilee Park', 'Tata Steel Zoological Park', 'Bistupur market'],
        day: 7,
        time: 'Morning'
      });

      // Day 8: Departure
      segments.push({
        id: 'day8-departure',
        from: {
          name: 'Hotel Sonnet Jamshedpur',
          position: locations['Hotel Sonnet Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Drop at Ranchi/Jamshedpur station/airport',
        duration: '2 hours',
        activities: ['Drop at Ranchi/Jamshedpur station/airport'],
        day: 8,
        time: 'Morning'
      });

    } else if (isAdventureEcoPackage) {
      // Adventure & Eco-Experience Package Route Segments
      
      // Day 1: Arrival at Ranchi
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Eco-Lodge Ranchi',
          position: locations['Eco-Lodge Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Adventure begins',
        duration: '1 hour',
        activities: ['Airport/Station pickup', 'Evening campfire & orientation', 'Eco-lodge stay'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Water Adventure
      segments.push({
        id: 'day2-dassam',
        from: {
          name: 'Eco-Lodge Ranchi',
          position: locations['Eco-Lodge Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Dassam Falls trekking',
        duration: '1.5 hours',
        activities: ['Dassam Falls trekking'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-hundru',
        from: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Hundru Falls rappelling',
        duration: '2 hours',
        activities: ['Hundru Falls trekking', 'Rappelling activities'],
        day: 2,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day2-river',
        from: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'River Picnic Site',
          position: locations['River Picnic Site'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'River picnic with kayaking',
        duration: '2 hours',
        activities: ['River picnic with kayaking'],
        day: 2,
        time: 'Evening'
      });

      // Day 3: Netarhat & Valley Camping
      segments.push({
        id: 'day3-netarhat',
        from: {
          name: 'River Picnic Site',
          position: locations['River Picnic Site'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Camping Site Netarhat',
          position: locations['Camping Site Netarhat'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Netarhat',
        duration: '3 hours',
        activities: ['Drive to Netarhat', 'Camping experience', 'Stargazing', 'Nature trails & birdwatching'],
        day: 3,
        time: 'Morning'
      });

      // Day 4: Betla Safari & Night Trail
      segments.push({
        id: 'day4-betla',
        from: {
          name: 'Camping Site Netarhat',
          position: locations['Camping Site Netarhat'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Eco Camp Betla',
          position: locations['Eco Camp Betla'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Transfer to Betla',
        duration: '2 hours',
        activities: ['Transfer to Betla', 'Jeep safari', 'Night jungle walk'],
        day: 4,
        time: 'Morning'
      });

      // Day 5: Parasnath Hills Trek
      segments.push({
        id: 'day5-giridih',
        from: {
          name: 'Eco Camp Betla',
          position: locations['Eco Camp Betla'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Hotel Giridih',
          position: locations['Hotel Giridih'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Giridih',
        duration: '2.5 hours',
        activities: ['Drive to Giridih', 'Trek to Parasnath Hills (Shikharji)', 'Evening relaxation'],
        day: 5,
        time: 'Morning'
      });

      // Day 6: Patratu Lake Adventure
      segments.push({
        id: 'day6-patratu',
        from: {
          name: 'Hotel Giridih',
          position: locations['Hotel Giridih'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Patratu Adventure Resort',
          position: locations['Patratu Adventure Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Patratu Valley',
        duration: '2 hours',
        activities: ['Drive to Patratu Valley', 'Boat ride & speedboat', 'ATV rides', 'Sunset viewpoint'],
        day: 6,
        time: 'Morning'
      });

      // Day 7: Departure
      segments.push({
        id: 'day7-departure',
        from: {
          name: 'Patratu Adventure Resort',
          position: locations['Patratu Adventure Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Return transfer to Ranchi & departure',
        duration: '1.5 hours',
        activities: ['Return transfer to Ranchi & departure'],
        day: 7,
        time: 'Morning'
      });

    } else if (isNomadTrailPackage) {
      // The Nomad Trail Package Route Segments
      
      // Day 1: Arrival in Ranchi
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Backpacker Hostel Ranchi',
          position: locations['Backpacker Hostel Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Nomad journey begins',
        duration: '1 hour',
        activities: ['Railway station/airport welcome', 'Hostel orientation', 'Street food walk', 'Backpacker hostel stay'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Ranchi Waterfalls Circuit
      segments.push({
        id: 'day2-dassam',
        from: {
          name: 'Backpacker Hostel Ranchi',
          position: locations['Backpacker Hostel Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Dassam Falls visit',
        duration: '1.5 hours',
        activities: ['Dassam Falls'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-hundru',
        from: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Hundru Falls visit',
        duration: '1 hour',
        activities: ['Hundru Falls'],
        day: 2,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day2-jonha',
        from: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Shared Camp Jonha',
          position: locations['Shared Camp Jonha'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Jonha Falls & shared camp',
        duration: '1 hour',
        activities: ['Jonha Falls', 'Picnic lunch', 'Evening bonfire', 'Shared camp near Jonha'],
        day: 2,
        time: 'Evening'
      });

      // Day 3: Tribal Village Stay (Khunti)
      segments.push({
        id: 'day3-khunti',
        from: {
          name: 'Shared Camp Jonha',
          position: locations['Shared Camp Jonha'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Tribal Family Homestay',
          position: locations['Tribal Family Homestay'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Travel to Khunti district',
        duration: '2 hours',
        activities: ['Travel to Khunti district', 'Tribal family homestay', 'Nagpuri folk music jam', 'Khunti homestay'],
        day: 3,
        time: 'Morning'
      });

      // Day 4: Netarhat Hill Exploration
      segments.push({
        id: 'day4-netarhat',
        from: {
          name: 'Tribal Family Homestay',
          position: locations['Tribal Family Homestay'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Nomad Camping Site Netarhat',
          position: locations['Nomad Camping Site Netarhat'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Trekking trails & camping',
        duration: '3 hours',
        activities: ['Trekking trails', 'Upper Ghaghri Falls & Koel View Point', 'Nomad-style camping', 'Starry sky overnight'],
        day: 4,
        time: 'Morning'
      });

      // Day 5: Betla National Park Adventure
      segments.push({
        id: 'day5-betla',
        from: {
          name: 'Nomad Camping Site Netarhat',
          position: locations['Nomad Camping Site Netarhat'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Betla Eco-Hut',
          position: locations['Betla Eco-Hut'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Early morning jeep safari',
        duration: '2 hours',
        activities: ['Early morning jeep safari', 'Palamu Fort ruins', 'Community cooking activity', 'Betla eco-hut'],
        day: 5,
        time: 'Morning'
      });

      // Day 6: Hazaribagh Art Villages
      segments.push({
        id: 'day6-hazaribagh',
        from: {
          name: 'Betla Eco-Hut',
          position: locations['Betla Eco-Hut'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Mud-House Homestay Hazaribagh',
          position: locations['Mud-House Homestay Hazaribagh'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Sohrai & Kohbar mural villages',
        duration: '2.5 hours',
        activities: ['Sohrai & Kohbar mural villages', 'DIY painting workshop', 'Rustic mud-house homestay'],
        day: 6,
        time: 'Morning'
      });

      // Day 7: Parasnath Hills Backpacking Trek
      segments.push({
        id: 'day7-parasnath',
        from: {
          name: 'Mud-House Homestay Hazaribagh',
          position: locations['Mud-House Homestay Hazaribagh'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Dharamshala Parasnath',
          position: locations['Dharamshala Parasnath'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Moderate trek to Shikharji Peak',
        duration: '3 hours',
        activities: ['Moderate trek to Shikharji Peak', 'Dharamshala stay with trekkers'],
        day: 7,
        time: 'Morning'
      });

      // Day 8: Deoghar Spiritual Stopover
      segments.push({
        id: 'day8-deoghar',
        from: {
          name: 'Dharamshala Parasnath',
          position: locations['Dharamshala Parasnath'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Budget Lodge Deoghar',
          position: locations['Budget Lodge Deoghar'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Baidyanath Temple darshan',
        duration: '2.5 hours',
        activities: ['Baidyanath Temple darshan', 'Street food markets', 'Budget lodge stay'],
        day: 8,
        time: 'Morning'
      });

      // Day 9: Departure
      segments.push({
        id: 'day9-departure',
        from: {
          name: 'Budget Lodge Deoghar',
          position: locations['Budget Lodge Deoghar'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Return to Ranchi or nearest station',
        duration: '3 hours',
        activities: ['Return to Ranchi or nearest station'],
        day: 9,
        time: 'Morning'
      });

    } else if (isNightlifeSafariPackage) {
      // Jharkhand Nightlife & Wilderness Safari Package Route Segments
      
      // Day 1: Arrival at Ranchi
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Luxury Hotel Ranchi',
          position: locations['Luxury Hotel Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Premium experience begins',
        duration: '1 hour',
        activities: ['Luxury hotel check-in', 'Street food night tour', 'Litti chokha, handia, tribal delicacies'],
        day: 1,
        time: 'Afternoon'
      });

      // Day 2: Netarhat Sunset & Stargazing
      segments.push({
        id: 'day2-netarhat',
        from: {
          name: 'Luxury Hotel Ranchi',
          position: locations['Luxury Hotel Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Stargazing Site Netarhat',
          position: locations['Stargazing Site Netarhat'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Drive to Netarhat',
        duration: '3 hours',
        activities: ['Drive to Netarhat', 'Upper Ghaghri Falls & Sunset Point', 'Night stargazing with telescopes'],
        day: 2,
        time: 'Morning'
      });

      // Day 3: Betla National Park Night Safari
      segments.push({
        id: 'day3-betla',
        from: {
          name: 'Stargazing Site Netarhat',
          position: locations['Stargazing Site Netarhat'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Premium Tents Betla',
          position: locations['Premium Tents Betla'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Morning & night safari',
        duration: '2 hours',
        activities: ['Morning safari', 'Evening exclusive night safari', 'Bonfire with wildlife photography'],
        day: 3,
        time: 'Morning'
      });

      // Day 4: Patratu Valley & Lake
      segments.push({
        id: 'day4-patratu',
        from: {
          name: 'Premium Tents Betla',
          position: locations['Premium Tents Betla'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Patratu Resort',
          position: locations['Patratu Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Scenic valley drive',
        duration: '2 hours',
        activities: ['Scenic valley drive', 'Night boating with lanterns', 'Patratu resort stay'],
        day: 4,
        time: 'Morning'
      });

      // Day 5: Jamshedpur – Food & Nightlife
      segments.push({
        id: 'day5-jamshedpur',
        from: {
          name: 'Patratu Resort',
          position: locations['Patratu Resort'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Luxury Hotel Jamshedpur',
          position: locations['Luxury Hotel Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Dimna Lake visit',
        duration: '2.5 hours',
        activities: ['Dimna Lake visit', 'Pub crawl + fine dining', 'Bistupur market nightlife circuit'],
        day: 5,
        time: 'Morning'
      });

      // Day 6: Departure
      segments.push({
        id: 'day6-departure',
        from: {
          name: 'Luxury Hotel Jamshedpur',
          position: locations['Luxury Hotel Jamshedpur'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Transfer to Ranchi',
        duration: '2 hours',
        activities: ['Transfer to Ranchi'],
        day: 6,
        time: 'Morning'
      });

    } else if (isGrandExplorerPackage) {
      // Grand Jharkhand Explorer Package Route Segments
      
      // Day 1: Ranchi Arrival
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Welcome to Jharkhand',
        duration: '1.5 hours',
        activities: ['Airport/Railway station pickup with traditional welcome', 'Check-in at Hotel Capital Residency (4★)', 'Visit Rock Garden (Tagore Hill) - 300+ rock sculptures'],
        day: 1,
        time: 'Morning'
      });

      segments.push({
        id: 'day1-kanke-dam',
        from: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Kanke Dam',
          position: locations['Kanke Dam'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Dam exploration and boating',
        duration: '2 hours',
        activities: ['Explore Kanke Dam - boating and photography', 'Traditional lunch at local restaurant (Litti Chokha)'],
        day: 1,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day1-market',
        from: {
          name: 'Kanke Dam',
          position: locations['Kanke Dam'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Firayalal Market',
          position: locations['Firayalal Market'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Shopping and cultural experience',
        duration: '2 hours',
        activities: ['Shopping at Firayalal Market - handicrafts and souvenirs', 'Evening tea at Ranchi Lake with sunset views'],
        day: 1,
        time: 'Evening'
      });

      // Day 2: Waterfall Circuit
      segments.push({
        id: 'day2-dassam',
        from: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Nature\'s symphony begins',
        duration: '1.5 hours',
        activities: ['Dassam Falls (40m height) - photography and nature walk', 'Jonha Falls (Gautamdhara) - temple visit and waterfall'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-hundru',
        from: {
          name: 'Dassam Falls',
          position: locations['Dassam Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Niagara of Jharkhand',
        duration: '2 hours',
        activities: ['Picnic lunch by the falls', 'Hundru Falls (98m height) - the \'Niagara of Jharkhand\''],
        day: 2,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day2-tribal',
        from: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Tribal Village',
          position: locations['Tribal Village'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Cultural interaction',
        duration: '2 hours',
        activities: ['Visit nearby tribal village for cultural interaction', 'Return to hotel with scenic drive'],
        day: 2,
        time: 'Evening'
      });

      // Day 3: Netarhat Hill Station
      segments.push({
        id: 'day3-netarhat',
        from: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Queen of Chotanagpur',
        duration: '3 hours',
        activities: ['Early departure to Netarhat (3-hour scenic drive)', 'Check-in at Netarhat Tourist Lodge'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-ghaghri',
        from: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Upper Ghaghri Falls',
          position: locations['Upper Ghaghri Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Trekking and photography',
        duration: '2 hours',
        activities: ['Upper Ghaghri Falls - trekking and photography', 'Traditional lunch at hill station'],
        day: 3,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day3-dam',
        from: {
          name: 'Upper Ghaghri Falls',
          position: locations['Upper Ghaghri Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Netarhat Dam',
          position: locations['Netarhat Dam'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Boating and scenic views',
        duration: '2 hours',
        activities: ['Netarhat Dam - boating and scenic views', 'Koel View Point - panoramic valley views'],
        day: 3,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day3-sunset',
        from: {
          name: 'Netarhat Dam',
          position: locations['Netarhat Dam'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Sunset Point Netarhat',
          position: locations['Sunset Point Netarhat'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Spectacular sunset',
        duration: '2 hours',
        activities: ['Sunset Point - witness spectacular sunset', 'Bonfire dinner with local music'],
        day: 3,
        time: 'Evening'
      });

      // Day 4: Betla National Park
      segments.push({
        id: 'day4-betla',
        from: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Betla National Park',
          position: locations['Betla National Park'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Wildlife & History',
        duration: '2.5 hours',
        activities: ['Early morning jungle safari in Betla National Park', 'Wildlife spotting (tigers, elephants, deer, birds)'],
        day: 4,
        time: 'Morning'
      });

      segments.push({
        id: 'day4-palamu',
        from: {
          name: 'Betla National Park',
          position: locations['Betla National Park'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Palamu Fort Ruins',
          position: locations['Palamu Fort Ruins'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Historical fort exploration',
        duration: '2 hours',
        activities: ['Breakfast at forest rest house', 'Visit Palamu Fort ruins (16th century)'],
        day: 4,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day4-return',
        from: {
          name: 'Palamu Fort Ruins',
          position: locations['Palamu Fort Ruins'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Return to Ranchi',
        duration: '4 hours',
        activities: ['Traditional forest lunch', 'Nature walk and bird watching', 'Return to Ranchi (4-hour drive)'],
        day: 4,
        time: 'Evening'
      });

      // Day 5: Spiritual Journey
      segments.push({
        id: 'day5-baidyanath',
        from: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Baidyanath Temple Deoghar',
          position: locations['Baidyanath Temple Deoghar'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Spiritual Journey',
        duration: '2 hours',
        activities: ['Visit Baidyanath Temple (Jyotirlinga) - spiritual experience', 'Jagannath Temple - architectural marvel'],
        day: 5,
        time: 'Morning'
      });

      segments.push({
        id: 'day5-departure',
        from: {
          name: 'Baidyanath Temple Deoghar',
          position: locations['Baidyanath Temple Deoghar'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Departure with memories',
        duration: '2 hours',
        activities: ['Final shopping at local markets', 'Traditional farewell lunch', 'Airport/station drop with memories to cherish'],
        day: 5,
        time: 'Afternoon'
      });

      // Day 6: Cultural Heritage Exploration
      segments.push({
        id: 'day6-hazaribagh',
        from: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Hazaribagh City',
          position: locations['Hazaribagh City'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Cultural Heritage Exploration',
        duration: '2.5 hours',
        activities: ['Breakfast and departure to Hazaribagh', 'Visit Hazaribagh Wildlife Sanctuary'],
        day: 6,
        time: 'Morning'
      });

      segments.push({
        id: 'day6-canary-hill',
        from: {
          name: 'Hazaribagh City',
          position: locations['Hazaribagh City'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Canary Hill Hazaribagh',
          position: locations['Canary Hill Hazaribagh'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Rock Art and Canary Hill',
        duration: '2 hours',
        activities: ['Traditional lunch at local restaurant', 'Explore Hazaribagh Rock Art and Canary Hill'],
        day: 6,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day6-rajrappa',
        from: {
          name: 'Canary Hill Hazaribagh',
          position: locations['Canary Hill Hazaribagh'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Rajrappa Temple',
          position: locations['Rajrappa Temple'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Temple complex visit',
        duration: '2 hours',
        activities: ['Visit Rajrappa Temple complex', 'Return to Ranchi'],
        day: 6,
        time: 'Evening'
      });

      // Day 7: Industrial Heritage
      segments.push({
        id: 'day7-jamshedpur',
        from: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Tata Steel Museum Jamshedpur',
          position: locations['Tata Steel Museum Jamshedpur'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Industrial Heritage & Modern Jharkhand',
        duration: '2.5 hours',
        activities: ['Early breakfast and departure to Jamshedpur', 'Visit Tata Steel Museum and company heritage'],
        day: 7,
        time: 'Morning'
      });

      segments.push({
        id: 'day7-jubilee-park',
        from: {
          name: 'Tata Steel Museum Jamshedpur',
          position: locations['Tata Steel Museum Jamshedpur'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Jubilee Park Jamshedpur',
          position: locations['Jubilee Park Jamshedpur'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Jubilee Park and Dimna Lake',
        duration: '2 hours',
        activities: ['Explore Jubilee Park and Dimna Lake', 'Lunch at local restaurant'],
        day: 7,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day7-tribal-centre',
        from: {
          name: 'Jubilee Park Jamshedpur',
          position: locations['Jubilee Park Jamshedpur'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Tribal Cultural Centre Jamshedpur',
          position: locations['Tribal Cultural Centre Jamshedpur'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Tribal Cultural Centre',
        duration: '2 hours',
        activities: ['Visit Tribal Cultural Centre', 'Return journey to Ranchi'],
        day: 7,
        time: 'Evening'
      });

      // Day 8: Final Departure
      segments.push({
        id: 'day8-shopping',
        from: {
          name: 'Hotel Capital Residency',
          position: locations['Hotel Capital Residency'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Handicraft Emporium Ranchi',
          position: locations['Handicraft Emporium Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Final Departure',
        duration: '2 hours',
        activities: ['Breakfast and final packing', 'Visit local handicraft emporium for last-minute shopping'],
        day: 8,
        time: 'Morning'
      });

      segments.push({
        id: 'day8-departure',
        from: {
          name: 'Handicraft Emporium Ranchi',
          position: locations['Handicraft Emporium Ranchi'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Final departure',
        duration: '2 hours',
        activities: ['Traditional farewell lunch', 'Airport/station drop with unforgettable memories'],
        day: 8,
        time: 'Afternoon'
      });

    } else if (isAdventurePackage) {
      // Adventure & Wilderness Getaway Package Route Segments
      
      // Day 1: Ranchi Arrival
      segments.push({
        id: 'day1-arrival',
        from: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        to: {
          name: 'Hotel Radisson Blu Ranchi',
          position: locations['Hotel Radisson Blu Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Adventure begins',
        duration: '1.5 hours',
        activities: ['Pick-up from Ranchi Airport with adventure briefing', 'Check-in at Hotel Radisson Blu (4★)', 'Adventure gear distribution and safety briefing'],
        day: 1,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day1-rock-garden',
        from: {
          name: 'Hotel Radisson Blu Ranchi',
          position: locations['Hotel Radisson Blu Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Rock Garden Tagore Hill',
          position: locations['Rock Garden Tagore Hill'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Rock Garden exploration',
        duration: '2 hours',
        activities: ['Visit Rock Garden (Tagore Hill) - 300+ sculptures', 'Explore Kanke Dam - sunset photography'],
        day: 1,
        time: 'Evening'
      });

      // Day 2: Waterfall Adventure
      segments.push({
        id: 'day2-hundru',
        from: {
          name: 'Hotel Radisson Blu Ranchi',
          position: locations['Hotel Radisson Blu Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Waterfall rappelling adventure',
        duration: '2 hours',
        activities: ['Hundru Falls (98m) - rappelling and photography', 'Dassam Falls (40m) - rock climbing basics'],
        day: 2,
        time: 'Morning'
      });

      segments.push({
        id: 'day2-jonha',
        from: {
          name: 'Hundru Falls',
          position: locations['Hundru Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Jonha Falls Gautamdhara',
          position: locations['Jonha Falls Gautamdhara'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Temple and waterfall visit',
        duration: '2 hours',
        activities: ['Jonha Falls (Gautamdhara) - temple visit', 'Picnic lunch by the falls'],
        day: 2,
        time: 'Afternoon'
      });

      // Day 3: Netarhat Hill Station
      segments.push({
        id: 'day3-netarhat',
        from: {
          name: 'Hotel Radisson Blu Ranchi',
          position: locations['Hotel Radisson Blu Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Hill station adventure',
        duration: '3 hours',
        activities: ['Drive to Netarhat (3-hour scenic journey)', 'Check-in at Netarhat Tourist Lodge'],
        day: 3,
        time: 'Morning'
      });

      segments.push({
        id: 'day3-ghaghri',
        from: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Upper Ghaghri Falls',
          position: locations['Upper Ghaghri Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Trekking and photography',
        duration: '2 hours',
        activities: ['Upper Ghaghri Falls - trekking and photography', 'Traditional lunch at hill station'],
        day: 3,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day3-sunset',
        from: {
          name: 'Upper Ghaghri Falls',
          position: locations['Upper Ghaghri Falls'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Sunset Point Netarhat',
          position: locations['Sunset Point Netarhat'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Spectacular sunset views',
        duration: '2 hours',
        activities: ['Koel View Point - panoramic valley views', 'Sunset Point - witness spectacular sunset'],
        day: 3,
        time: 'Evening'
      });

      // Day 4: Betla National Park
      segments.push({
        id: 'day4-betla',
        from: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Betla National Park',
          position: locations['Betla National Park'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Wildlife safari adventure',
        duration: '2.5 hours',
        activities: ['Early morning jungle safari in Betla NP', 'Wildlife spotting (tigers, elephants, deer)'],
        day: 4,
        time: 'Morning'
      });

      segments.push({
        id: 'day4-palamu',
        from: {
          name: 'Betla National Park',
          position: locations['Betla National Park'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Palamu Fort Ruins',
          position: locations['Palamu Fort Ruins'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Historical fort exploration',
        duration: '2 hours',
        activities: ['Visit Palamu Fort ruins (16th century)', 'Traditional forest lunch'],
        day: 4,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day4-return-netarhat',
        from: {
          name: 'Palamu Fort Ruins',
          position: locations['Palamu Fort Ruins'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Return to Netarhat',
        duration: '2 hours',
        activities: ['Nature walk and bird watching', 'Return to Netarhat', 'Dinner with wildlife stories'],
        day: 4,
        time: 'Evening'
      });

      // Day 5: Parasnath Trek
      segments.push({
        id: 'day5-parasnath',
        from: {
          name: 'Netarhat Tourist Lodge',
          position: locations['Netarhat Tourist Lodge'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Parasnath Hills Trek',
          position: locations['Parasnath Hills Trek'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Sacred mountain trek',
        duration: '2 hours',
        activities: ['Drive to Giridih (2-hour journey)', 'Begin Parasnath trek (1350m elevation)'],
        day: 5,
        time: 'Morning'
      });

      segments.push({
        id: 'day5-summit',
        from: {
          name: 'Parasnath Hills Trek',
          position: locations['Parasnath Hills Trek'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Parasnath Summit',
          position: locations['Parasnath Summit'],
          type: 'attraction',
          icon: 'camera'
        },
        description: 'Summit temple visit',
        duration: '3 hours',
        activities: ['Reach summit - temple visit and packed lunch', 'Descend with scenic photography'],
        day: 5,
        time: 'Afternoon'
      });

      segments.push({
        id: 'day5-return',
        from: {
          name: 'Parasnath Summit',
          position: locations['Parasnath Summit'],
          type: 'attraction',
          icon: 'camera'
        },
        to: {
          name: 'Hotel Radisson Blu Ranchi',
          position: locations['Hotel Radisson Blu Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        description: 'Return to Ranchi',
        duration: '3 hours',
        activities: ['Return to Ranchi', 'Celebration dinner with adventure team'],
        day: 5,
        time: 'Evening'
      });

      // Day 6: Departure
      segments.push({
        id: 'day6-departure',
        from: {
          name: 'Hotel Radisson Blu Ranchi',
          position: locations['Hotel Radisson Blu Ranchi'],
          type: 'hotel',
          icon: 'hotel'
        },
        to: {
          name: 'Ranchi Airport',
          position: locations['Ranchi Airport'],
          type: 'airport',
          icon: 'plane'
        },
        description: 'Adventure memories',
        duration: '30 minutes',
        activities: ['Final adventure briefing and certificates', 'Airport drop with unforgettable memories'],
        day: 6,
        time: 'Morning'
      });

    } else {
      // Original Lakes & Valleys Package Route Segments
    segments.push({
      id: 'day1-arrival',
      from: {
        name: 'Ranchi Airport',
        position: locations['Ranchi Airport'],
        type: 'airport',
        icon: 'plane'
      },
      to: {
        name: 'Patratu Lake Resort',
        position: locations['Patratu Lake Resort'],
        type: 'hotel',
        icon: 'hotel'
      },
      description: 'Arrival and transfer to luxury lake resort',
      duration: '1.5 hours',
      activities: ['Airport pickup', 'Scenic drive to Patratu Valley', 'Resort check-in'],
      day: 1,
      time: 'Morning'
    });

    segments.push({
      id: 'day1-activities',
      from: {
        name: 'Patratu Lake Resort',
        position: locations['Patratu Lake Resort'],
        type: 'hotel',
        icon: 'hotel'
      },
      to: {
        name: 'Patratu Lake',
        position: locations['Patratu Lake Resort'],
        type: 'attraction',
        icon: 'camera'
      },
      description: 'Lake activities and boat ride',
      duration: '2 hours',
      activities: ['Boat ride on Patratu Lake', 'Lakeside relaxation', 'Photography'],
      day: 1,
      time: 'Afternoon'
    });

    segments.push({
      id: 'day1-dinner',
      from: {
        name: 'Patratu Lake',
        position: locations['Patratu Lake Resort'],
        type: 'attraction',
        icon: 'camera'
      },
      to: {
        name: 'Candlelight Dinner Spot',
        position: locations['Candlelight Dinner Spot'],
        type: 'restaurant',
        icon: 'utensils'
      },
      description: 'Romantic candlelight dinner by the lake',
      duration: '2 hours',
      activities: ['Candlelight dinner', 'Lake view dining', 'Evening relaxation'],
      day: 1,
      time: 'Evening'
    });

    // Day 2: Patratu to Netarhat
    segments.push({
      id: 'day2-netarhat',
      from: {
        name: 'Patratu Lake Resort',
        position: locations['Patratu Lake Resort'],
        type: 'hotel',
        icon: 'hotel'
      },
      to: {
        name: 'Netarhat Hill Station',
        position: locations['Netarhat Hill Station'],
        type: 'destination',
        icon: 'camera'
      },
      description: 'Scenic drive to hill station',
      duration: '2 hours',
      activities: ['Drive to Netarhat', 'Hill station exploration', 'Mountain views'],
      day: 2,
      time: 'Morning'
    });

    segments.push({
      id: 'day2-falls',
      from: {
        name: 'Netarhat Hill Station',
        position: locations['Netarhat Hill Station'],
        type: 'destination',
        icon: 'camera'
      },
      to: {
        name: 'Upper Ghaghri Falls',
        position: locations['Upper Ghaghri Falls'],
        type: 'attraction',
        icon: 'camera'
      },
      description: 'Visit to beautiful waterfall',
      duration: '1 hour',
      activities: ['Upper Ghaghri Falls', 'Waterfall photography', 'Nature walk'],
      day: 2,
      time: 'Afternoon'
    });

    segments.push({
      id: 'day2-viewpoint',
      from: {
        name: 'Upper Ghaghri Falls',
        position: locations['Upper Ghaghri Falls'],
        type: 'attraction',
        icon: 'camera'
      },
      to: {
        name: 'Koel View Point',
        position: locations['Koel View Point'],
        type: 'attraction',
        icon: 'camera'
      },
      description: 'Panoramic view point exploration',
      duration: '1 hour',
      activities: ['Koel View Point', 'Panoramic views', 'Scenic photography'],
      day: 2,
      time: 'Afternoon'
    });

    segments.push({
      id: 'day2-sunset',
      from: {
        name: 'Koel View Point',
        position: locations['Koel View Point'],
        type: 'attraction',
        icon: 'camera'
      },
      to: {
        name: 'Sunset Point',
        position: locations['Sunset Point'],
        type: 'attraction',
        icon: 'camera'
      },
      description: 'Sunset viewing and picnic lunch',
      duration: '2 hours',
      activities: ['Sunset Point', 'Curated picnic lunch', 'Sunset photography'],
      day: 2,
      time: 'Evening'
    });

    // Day 3: Return to Ranchi
    segments.push({
      id: 'day3-return',
      from: {
        name: 'Netarhat Hill Station',
        position: locations['Netarhat Hill Station'],
        type: 'destination',
        icon: 'camera'
      },
      to: {
        name: 'Jagannath Temple',
        position: locations['Jagannath Temple'],
        type: 'attraction',
        icon: 'camera'
      },
      description: 'Return to Ranchi and temple visit',
      duration: '2 hours',
      activities: ['Drive back to Ranchi', 'Jagannath Temple visit', 'Spiritual experience'],
      day: 3,
      time: 'Morning'
    });

    segments.push({
      id: 'day3-shopping',
      from: {
        name: 'Jagannath Temple',
        position: locations['Jagannath Temple'],
        type: 'attraction',
        icon: 'camera'
      },
      to: {
        name: 'Handicrafts Emporium',
        position: locations['Handicrafts Emporium'],
        type: 'attraction',
        icon: 'camera'
      },
      description: 'Local handicrafts shopping',
      duration: '1 hour',
      activities: ['Handicrafts Emporium', 'Local shopping', 'Souvenir collection'],
      day: 3,
      time: 'Afternoon'
    });

    segments.push({
      id: 'day3-departure',
      from: {
        name: 'Handicrafts Emporium',
        position: locations['Handicrafts Emporium'],
        type: 'attraction',
        icon: 'camera'
      },
      to: {
        name: 'Ranchi Railway Station',
        position: locations['Ranchi Railway Station'],
        type: 'airport',
        icon: 'plane'
      },
      description: 'Departure and transfer to station',
      duration: '30 minutes',
      activities: ['Airport/Station drop', 'Departure'],
      day: 3,
      time: 'Evening'
    });
    }

    setRouteSegments(segments);
  }, [itinerary, packageTitle]);

  // Create custom icons for different location types
  const createCustomIcon = (type: string, name: string) => {
    const icons = {
      plane: '✈️',
      hotel: '🏨',
      camera: '📸',
      utensils: '🍽️',
      car: '🚗'
    };

    const colors = {
      airport: '#ef4444',
      hotel: '#10b981',
      attraction: '#3b82f6',
      restaurant: '#f59e0b',
      destination: '#8b5cf6'
    };

    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background: ${colors[type as keyof typeof colors] || '#6b7280'};
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          position: relative;
        ">
          ${icons[type as keyof typeof icons] || '📍'}
          <div style="
            position: absolute;
            bottom: -8px;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
            color: ${colors[type as keyof typeof colors] || '#6b7280'};
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">
            ${name.split(' ')[0]}
          </div>
        </div>
      `,
      iconSize: [40, 50],
      iconAnchor: [20, 40]
    });
  };

  const currentSegment = routeSegments[currentStep];
  const nextSegment = routeSegments[currentStep + 1];
  const prevSegment = routeSegments[currentStep - 1];

  const handleNext = () => {
    if (currentStep < routeSegments.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!currentSegment) return null;

  // Calculate center point for current segment
  const centerLat = (currentSegment.from.position[0] + currentSegment.to.position[0]) / 2;
  const centerLng = (currentSegment.from.position[1] + currentSegment.to.position[1]) / 2;

  // Calculate distance for visual feedback
  const distance = Math.round(
    Math.sqrt(
      Math.pow((currentSegment.to.position[0] - currentSegment.from.position[0]) * 111, 2) +
      Math.pow((currentSegment.to.position[1] - currentSegment.from.position[1]) * 111, 2)
    )
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Route className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Interactive Journey Map</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-200 shadow-lg relative">
            {/* Loading overlay removed for instant transitions */}
            <MapContainer
              center={[centerLat, centerLng]}
              zoom={11}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Map updater for auto-zoom and centering */}
              <MapUpdater 
                currentSegment={currentSegment}
                routeSegments={routeSegments}
                currentStep={currentStep}
                onTransitionStart={() => setIsTransitioning(true)}
                onTransitionEnd={() => setIsTransitioning(false)}
              />
              
              {/* Current route segment */}
              <Polyline
                positions={[currentSegment.from.position, currentSegment.to.position]}
                color="#3b82f6"
                weight={6}
                opacity={0.8}
              />
              
              {/* From marker */}
              <Marker
                position={currentSegment.from.position}
                icon={createCustomIcon(currentSegment.from.type, currentSegment.from.name)}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold text-blue-900">{currentSegment.from.name}</h4>
                    <p className="text-sm text-blue-700">Starting point</p>
                  </div>
                </Popup>
              </Marker>
              
              {/* To marker */}
              <Marker
                position={currentSegment.to.position}
                icon={createCustomIcon(currentSegment.to.type, currentSegment.to.name)}
              >
                <Popup>
                  <div className="p-2">
                    <h4 className="font-semibold text-blue-900">{currentSegment.to.name}</h4>
                    <p className="text-sm text-blue-700">Destination</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          
          {/* Navigation Controls */}
          <div className="mt-4 flex items-center justify-between">
            <Button
              onClick={handlePrev}
              disabled={currentStep === 0 || isTransitioning}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {routeSegments.length}
              </span>
              <div className="flex gap-1">
                {routeSegments.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <Button
              onClick={handleNext}
              disabled={currentStep === routeSegments.length - 1 || isTransitioning}
              variant="outline"
              className="flex items-center gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Current Step Details */}
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Day {currentSegment.day} - {currentSegment.time}</span>
            </div>
            
            <h4 className="font-semibold text-blue-900 mb-2">{currentSegment.description}</h4>
            
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700">Duration: {currentSegment.duration}</span>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Route className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-blue-700">Distance: ~{distance} km</span>
            </div>
            
            <div className="space-y-2">
              <h5 className="font-medium text-blue-900 text-sm">Route:</h5>
              <div className="flex items-center gap-2 text-sm text-blue-700">
                <MapPin className="w-3 h-3 text-blue-500" />
                <span>{currentSegment.from.name}</span>
                <ArrowRight className="w-3 h-3 text-blue-500" />
                <MapPin className="w-3 h-3 text-blue-500" />
                <span>{currentSegment.to.name}</span>
              </div>
            </div>
            
            <div className="space-y-2 mt-3">
              <h5 className="font-medium text-blue-900 text-sm">Activities:</h5>
              <ul className="space-y-1">
                {currentSegment.activities.map((activity, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{activity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Package Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Package Overview</h4>
            <p className="text-sm text-blue-700 mb-3">{decodeHtmlEntities(packageTitle)}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-900">Total Steps:</span>
                <p className="text-blue-700">{routeSegments.length}</p>
              </div>
              <div>
                <span className="font-medium text-blue-900">Duration:</span>
                <p className="text-blue-700">{itinerary.length} Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}