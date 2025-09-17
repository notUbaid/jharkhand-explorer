// Package interface for type safety
export interface Package {
  id: number;
  title: string;
  duration: string;
  price: string;
  category: string;
  rating: number;
  image: string;
  highlights: string[];
  difficulty: string;
  type: string;
  description: string;
  groupSize: string;
  bestTime: string;
  departureCity: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
  accommodation: string[];
  meals: string[];
  transport: string;
  inclusions: string[];
  exclusions: string[];
  travelTips: string[];
}
