// Optimized Transport Data Generator with Lazy Loading
import { TrainOption, BusOption, FlightOption, City } from '@/types/Transport';

// Core cities for initial load (reduced to 15 key cities for performance)
export const coreCities: City[] = [
  // Major Metros
  { id: 1, name: "Delhi", code: "DEL", state: "Delhi" },
  { id: 2, name: "Mumbai", code: "BOM", state: "Maharashtra" },
  { id: 3, name: "Kolkata", code: "CCU", state: "West Bengal" },
  { id: 4, name: "Chennai", code: "MAA", state: "Tamil Nadu" },
  { id: 5, name: "Bangalore", code: "BLR", state: "Karnataka" },
  { id: 6, name: "Hyderabad", code: "HYD", state: "Telangana" },
  { id: 7, name: "Pune", code: "PNQ", state: "Maharashtra" },
  { id: 8, name: "Ahmedabad", code: "AMD", state: "Gujarat" },
  { id: 9, name: "Jaipur", code: "JAI", state: "Rajasthan" },
  { id: 10, name: "Lucknow", code: "LKO", state: "Uttar Pradesh" },
  { id: 11, name: "Patna", code: "PAT", state: "Bihar" },
  { id: 12, name: "Chandigarh", code: "IXC", state: "Chandigarh" },
  { id: 13, name: "Bhubaneswar", code: "BBI", state: "Odisha" },
  { id: 14, name: "Guwahati", code: "GAU", state: "Assam" },
  { id: 15, name: "Ranchi", code: "RNC", state: "Jharkhand" },
  { id: 16, name: "Jamshedpur", code: "JSR", state: "Jharkhand" },
  { id: 17, name: "Dhanbad", code: "DHB", state: "Jharkhand" },
];

// Extended cities for lazy loading (loaded on demand)
export const extendedCities: City[] = [
  { id: 18, name: "Bokaro", code: "BKR", state: "Jharkhand" },
  { id: 19, name: "Deoghar", code: "DGH", state: "Jharkhand" },
  { id: 20, name: "Hazaribagh", code: "HZR", state: "Jharkhand" },
  { id: 21, name: "Giridih", code: "GRD", state: "Jharkhand" },
  { id: 22, name: "Agra", code: "AGR", state: "Uttar Pradesh" },
  { id: 23, name: "Varanasi", code: "VNS", state: "Uttar Pradesh" },
  { id: 24, name: "Amritsar", code: "ATQ", state: "Punjab" },
  { id: 25, name: "Ludhiana", code: "LUH", state: "Punjab" },
  { id: 26, name: "Srinagar", code: "SXR", state: "Jammu & Kashmir" },
  { id: 27, name: "Dehradun", code: "DED", state: "Uttarakhand" },
  { id: 28, name: "Haridwar", code: "HDW", state: "Uttarakhand" },
  { id: 29, name: "Cuttack", code: "CTC", state: "Odisha" },
  { id: 30, name: "Rourkela", code: "RRK", state: "Odisha" },
  { id: 31, name: "Siliguri", code: "SGU", state: "West Bengal" },
  { id: 32, name: "Darjeeling", code: "DRJ", state: "West Bengal" },
  { id: 33, name: "Asansol", code: "ASN", state: "West Bengal" },
  { id: 34, name: "Gangtok", code: "GKT", state: "Sikkim" },
  { id: 35, name: "Imphal", code: "IMF", state: "Manipur" },
  { id: 36, name: "Aizawl", code: "AJL", state: "Mizoram" },
  { id: 37, name: "Kohima", code: "KOH", state: "Nagaland" },
  { id: 38, name: "Shillong", code: "SHL", state: "Meghalaya" },
  { id: 39, name: "Agartala", code: "AGP", state: "Tripura" },
  { id: 40, name: "Itanagar", code: "ITN", state: "Arunachal Pradesh" },
];

// Combined cities for backward compatibility
export const cities = [...coreCities, ...extendedCities];

// Helper functions
const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const getRandomTime = () => {
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};

const calculateDuration = (distanceKm: number, mode: 'train' | 'bus' | 'flight'): string => {
  let hours;
  if (mode === 'flight') {
    hours = Math.max(1, Math.round(distanceKm / 800 + Math.random() * 0.5));
  } else if (mode === 'train') {
    hours = Math.max(2, Math.round(distanceKm / 60 + Math.random() * 2));
  } else {
    hours = Math.max(1, Math.round(distanceKm / 40 + Math.random() * 3));
  }
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}h ${minutes}m`;
};

const getRandomPrice = (distanceKm: number, mode: 'train' | 'bus' | 'flight'): string => {
  let basePrice;
  if (mode === 'flight') {
    basePrice = distanceKm * 4 + Math.random() * 2000;
  } else if (mode === 'train') {
    basePrice = distanceKm * 1.5 + Math.random() * 500;
  } else {
    basePrice = distanceKm * 1 + Math.random() * 300;
  }
  return `₹${Math.round(basePrice / 100) * 100}`;
};

// Global counter for unique route IDs
let globalRouteId = 1;

// Optimized route generation with pagination
export function generateRoutesForCities(cityList: City[], mode: 'train' | 'bus' | 'flight', limit: number = 50): (TrainOption | BusOption | FlightOption)[] {
  const routes: (TrainOption | BusOption | FlightOption)[] = [];
  
  // Realistic operators based on mode and region
  const operators = mode === 'train' ? 
    ['Indian Railways', 'Western Railway', 'Central Railway', 'Northern Railway', 'Southern Railway'] :
    mode === 'bus' ?
    ['Gujarat State Road Transport', 'RedBus', 'Orange Tours', 'GreenLine', 'BlueLine', 'Royal Travels', 'Sharma Transport', 'Neeta Travels'] :
    ['IndiGo', 'SpiceJet', 'Air India', 'Vistara', 'GoAir', 'AirAsia India'];

  const amenities = mode === 'train' ?
    ['WiFi', 'AC', 'Food Service', 'Bedding', 'Charging Points', 'Water Bottles'] :
    mode === 'bus' ?
    ['AC', 'WiFi', 'Charging Points', 'Blankets', 'Water Bottles', 'Entertainment'] :
    ['In-flight Entertainment', 'Meals', 'WiFi', 'Extra Legroom', 'Priority Boarding'];

  // Use global counter for unique IDs
  
  for (let i = 0; i < cityList.length && routes.length < limit; i++) {
    for (let j = 0; j < cityList.length && routes.length < limit; j++) {
      if (i === j) continue; // Skip same city
      
      const fromCity = cityList[i];
      const toCity = cityList[j];
      const distanceKm = Math.floor(Math.random() * 2000) + 200;
      const duration = calculateDuration(distanceKm, mode);
      const departure = getRandomTime();
      const arrival = getRandomTime();
      const price = getRandomPrice(distanceKm, mode);

      if (mode === 'train') {
        // Realistic train numbers and names
        const trainNumber = `${Math.floor(Math.random() * 9000) + 1000}`;
        const trainTypes = ['Express', 'Superfast', 'Mail', 'Passenger', 'Rajdhani', 'Shatabdi', 'Duronto'];
        const trainName = `${getRandomElement(trainTypes)} ${trainNumber}`;
        
        // Realistic pricing based on distance and route popularity
        const basePrice = parseInt(price.replace(/[₹,]/g, ''));
        const isPopularRoute = (fromCity.name === 'Ahmedabad' && ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'].includes(toCity.name)) ||
                              (toCity.name === 'Ahmedabad' && ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'].includes(fromCity.name));
        
        routes.push({
          id: globalRouteId++,
          mode: 'train',
          from: fromCity.name,
          to: toCity.name,
          duration,
          distance: `${distanceKm} km`,
          departure,
          arrival,
          stops: Math.floor(Math.random() * 8) + 2,
          cancellation: 'Free cancellation up to 2 hours before departure',
          trainNumber,
          trainName,
          operator: getRandomElement(operators),
          classes: [
            { class: 'AC 1st Class', price: `₹${Math.round(basePrice * (isPopularRoute ? 3 : 2.5))}`, availability: 'Available' },
            { class: 'AC 2nd Class', price: `₹${Math.round(basePrice * (isPopularRoute ? 2.2 : 1.8))}`, availability: 'Available' },
            { class: 'AC 3rd Class', price: `₹${Math.round(basePrice * (isPopularRoute ? 1.5 : 1.3))}`, availability: 'Available' },
            { class: 'Sleeper', price: price, availability: 'Available' }
          ],
          meals: 'Veg/Non-Veg meals available',
          amenities: amenities.slice(0, Math.floor(Math.random() * 3) + 2),
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        });
      } else if (mode === 'bus') {
        const busTypes = ['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater', 'Volvo', 'Luxury'];
        
        // Realistic bus operators based on region
        const regionalOperators = fromCity.name === 'Ahmedabad' || toCity.name === 'Ahmedabad' ? 
          ['Gujarat State Road Transport', 'Neeta Travels', 'Sharma Travels', 'Royal Travels'] :
          ['RedBus', 'Orange Tours', 'GreenLine', 'BlueLine', 'Royal Travels', 'Sharma Transport'];
        
        routes.push({
          id: globalRouteId++,
          mode: 'bus',
          from: fromCity.name,
          to: toCity.name,
          duration,
          distance: `${distanceKm} km`,
          departure,
          arrival,
          stops: Math.floor(Math.random() * 5) + 1,
          cancellation: 'Free cancellation up to 1 hour before departure',
          operator: getRandomElement(regionalOperators),
          busType: getRandomElement(busTypes),
          price,
          luggage: '15kg free, ₹50/kg extra',
          boarding: `${fromCity.name} Bus Stand`,
          dropoff: `${toCity.name} Bus Stand`,
          amenities: amenities.slice(0, Math.floor(Math.random() * 3) + 2),
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        });
      } else if (mode === 'flight') {
        // Realistic flight numbers and airlines
        const airlines = ['IndiGo', 'SpiceJet', 'Air India', 'Vistara', 'GoAir', 'AirAsia India'];
        const airlineCodes = ['6E', 'SG', 'AI', 'UK', 'G8', 'I5'];
        const airlineIndex = Math.floor(Math.random() * airlines.length);
        const flightNumber = `${airlineCodes[airlineIndex]}${Math.floor(Math.random() * 9000) + 1000}`;
        const aircrafts = ['Boeing 737', 'Airbus A320', 'Boeing 777', 'Airbus A321', 'ATR 72'];
        
        // Realistic pricing for flights
        const basePrice = parseInt(price.replace(/[₹,]/g, ''));
        const isPopularRoute = (fromCity.name === 'Ahmedabad' && ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'].includes(toCity.name)) ||
                              (toCity.name === 'Ahmedabad' && ['Delhi', 'Mumbai', 'Bangalore', 'Chennai'].includes(fromCity.name));
        const flightPrice = isPopularRoute ? `₹${basePrice + Math.floor(Math.random() * 2000)}` : price;
        
        routes.push({
          id: globalRouteId++,
          mode: 'flight',
          from: fromCity.name,
          to: toCity.name,
          duration,
          distance: `${distanceKm} km`,
          departure,
          arrival,
          stops: Math.random() > 0.7 ? Math.floor(Math.random() * 2) + 1 : 0,
          cancellation: 'Free cancellation up to 24 hours before departure',
          flightNumber,
          airline: airlines[airlineIndex],
          aircraft: getRandomElement(aircrafts),
          price: flightPrice,
          class: 'Economy',
          baggage: '15kg check-in, 7kg cabin',
          boarding: `${fromCity.code} Terminal 1`,
          dropoff: `${toCity.code} Terminal 1`,
          terminal: 'Terminal 1',
          gate: `Gate ${Math.floor(Math.random() * 20) + 1}`,
          amenities: amenities.slice(0, Math.floor(Math.random() * 3) + 2),
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        });
      }
    }
  }

  return routes;
}

// Generate specific popular routes for Ahmedabad
export function generateAhmedabadPopularRoutes(): (TrainOption | BusOption | FlightOption)[] {
  const routes: (TrainOption | BusOption | FlightOption)[] = [];
  
  // Ahmedabad to major cities - realistic routes
  const ahmedabadRoutes = [
    { to: "Delhi", distance: 850, mode: "flight" as const, price: "₹4500" },
    { to: "Delhi", distance: 850, mode: "train" as const, price: "₹1200" },
    { to: "Mumbai", distance: 530, mode: "flight" as const, price: "₹3500" },
    { to: "Mumbai", distance: 530, mode: "train" as const, price: "₹800" },
    { to: "Mumbai", distance: 530, mode: "bus" as const, price: "₹600" },
    { to: "Bangalore", distance: 850, mode: "flight" as const, price: "₹4200" },
    { to: "Bangalore", distance: 850, mode: "train" as const, price: "₹1400" },
    { to: "Chennai", distance: 1200, mode: "flight" as const, price: "₹4800" },
    { to: "Chennai", distance: 1200, mode: "train" as const, price: "₹1600" },
    { to: "Hyderabad", distance: 750, mode: "flight" as const, price: "₹3800" },
    { to: "Hyderabad", distance: 750, mode: "train" as const, price: "₹1100" },
    { to: "Pune", distance: 450, mode: "bus" as const, price: "₹500" },
    { to: "Pune", distance: 450, mode: "train" as const, price: "₹700" },
    { to: "Jaipur", distance: 650, mode: "train" as const, price: "₹900" },
    { to: "Jaipur", distance: 650, mode: "bus" as const, price: "₹650" },
    { to: "Lucknow", distance: 950, mode: "train" as const, price: "₹1300" },
    { to: "Lucknow", distance: 950, mode: "flight" as const, price: "₹4000" }
  ];

  // Use global counter for unique IDs

  ahmedabadRoutes.forEach(route => {
    const duration = calculateDuration(route.distance, route.mode);
    const departure = getRandomTime();
    const arrival = getRandomTime();

    if (route.mode === "train") {
      const trainNumber = `${Math.floor(Math.random() * 9000) + 1000}`;
      const trainTypes = ['Express', 'Superfast', 'Mail', 'Rajdhani', 'Shatabdi'];
      const trainName = `${getRandomElement(trainTypes)} ${trainNumber}`;
      
      routes.push({
        id: globalRouteId++,
        mode: 'train',
        from: 'Ahmedabad',
        to: route.to,
        duration,
        distance: `${route.distance} km`,
        departure,
        arrival,
        stops: Math.floor(Math.random() * 6) + 3,
        cancellation: 'Free cancellation up to 2 hours before departure',
        trainNumber,
        trainName,
        operator: 'Western Railway',
        classes: [
          { class: 'AC 1st Class', price: `₹${Math.round(parseInt(route.price.replace(/[₹,]/g, '')) * 2.5)}`, availability: 'Available' },
          { class: 'AC 2nd Class', price: `₹${Math.round(parseInt(route.price.replace(/[₹,]/g, '')) * 1.8)}`, availability: 'Available' },
          { class: 'AC 3rd Class', price: `₹${Math.round(parseInt(route.price.replace(/[₹,]/g, '')) * 1.3)}`, availability: 'Available' },
          { class: 'Sleeper', price: route.price, availability: 'Available' }
        ],
        meals: 'Veg/Non-Veg meals available',
        amenities: ['WiFi', 'AC', 'Food Service', 'Charging Points'],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      });
    } else if (route.mode === "bus") {
      const busTypes = ['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Volvo', 'Luxury'];
      
      routes.push({
        id: globalRouteId++,
        mode: 'bus',
        from: 'Ahmedabad',
        to: route.to,
        duration,
        distance: `${route.distance} km`,
        departure,
        arrival,
        stops: Math.floor(Math.random() * 3) + 1,
        cancellation: 'Free cancellation up to 1 hour before departure',
        operator: 'Gujarat State Road Transport',
        busType: getRandomElement(busTypes),
        price: route.price,
        luggage: '15kg free, ₹50/kg extra',
        boarding: 'Ahmedabad Bus Stand',
        dropoff: `${route.to} Bus Stand`,
        amenities: ['AC', 'WiFi', 'Charging Points', 'Blankets'],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      });
    } else if (route.mode === "flight") {
      const airlines = ['IndiGo', 'SpiceJet', 'Air India', 'Vistara'];
      const airlineCodes = ['6E', 'SG', 'AI', 'UK'];
      const airlineIndex = Math.floor(Math.random() * airlines.length);
      const flightNumber = `${airlineCodes[airlineIndex]}${Math.floor(Math.random() * 9000) + 1000}`;
      
      routes.push({
        id: globalRouteId++,
        mode: 'flight',
        from: 'Ahmedabad',
        to: route.to,
        duration,
        distance: `${route.distance} km`,
        departure,
        arrival,
        stops: Math.random() > 0.8 ? 1 : 0,
        cancellation: 'Free cancellation up to 24 hours before departure',
        flightNumber,
        airline: airlines[airlineIndex],
        aircraft: 'Boeing 737',
        price: route.price,
        class: 'Economy',
        baggage: '15kg check-in, 7kg cabin',
        boarding: 'AMD Terminal 1',
        dropoff: `${getCityCode(route.to)} Terminal 1`,
        terminal: 'Terminal 1',
        gate: `Gate ${Math.floor(Math.random() * 20) + 1}`,
        amenities: ['In-flight Entertainment', 'Meals', 'WiFi'],
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      });
    }
  });

  return routes;
}

// Helper function to get city codes
function getCityCode(cityName: string): string {
  const cityCodes: { [key: string]: string } = {
    'Delhi': 'DEL',
    'Mumbai': 'BOM',
    'Bangalore': 'BLR',
    'Chennai': 'MAA',
    'Hyderabad': 'HYD',
    'Pune': 'PNQ',
    'Jaipur': 'JAI',
    'Lucknow': 'LKO'
  };
  return cityCodes[cityName] || 'XXX';
}

// Generate core routes (limited for performance)
export function generateCoreRoutes() {
  const trainRoutes = generateRoutesForCities(coreCities, 'train', 300);
  const busRoutes = generateRoutesForCities(coreCities, 'bus', 300);
  const flightRoutes = generateRoutesForCities(coreCities, 'flight', 300);
  
  // Add specific Ahmedabad popular routes
  const ahmedabadRoutes = generateAhmedabadPopularRoutes();
  
  return {
    trainRoutes: [...trainRoutes, ...ahmedabadRoutes.filter(r => r.mode === 'train')],
    busRoutes: [...busRoutes, ...ahmedabadRoutes.filter(r => r.mode === 'bus')],
    flightRoutes: [...flightRoutes, ...ahmedabadRoutes.filter(r => r.mode === 'flight')],
    allRoutes: [...trainRoutes, ...busRoutes, ...flightRoutes, ...ahmedabadRoutes]
  };
}

// Generate extended routes on demand
export function generateExtendedRoutes() {
  const allCities = [...coreCities, ...extendedCities];
  const trainRoutes = generateRoutesForCities(allCities, 'train', 200);
  const busRoutes = generateRoutesForCities(allCities, 'bus', 200);
  const flightRoutes = generateRoutesForCities(allCities, 'flight', 200);
  
  return {
    trainRoutes,
    busRoutes,
    flightRoutes,
    allRoutes: [...trainRoutes, ...busRoutes, ...flightRoutes]
  };
}

// Popular routes for quick access
export const popularRoutes = [
  { from: "Ranchi", to: "Delhi", mode: "flight", popularity: 95 },
  { from: "Ranchi", to: "Kolkata", mode: "train", popularity: 90 },
  { from: "Ranchi", to: "Mumbai", mode: "flight", popularity: 85 },
  { from: "Jamshedpur", to: "Kolkata", mode: "train", popularity: 88 },
  { from: "Ranchi", to: "Bangalore", mode: "flight", popularity: 82 },
  { from: "Ranchi", to: "Patna", mode: "bus", popularity: 75 },
  { from: "Ranchi", to: "Hyderabad", mode: "flight", popularity: 78 },
  { from: "Ranchi", to: "Chennai", mode: "flight", popularity: 80 },
  // Ahmedabad popular routes
  { from: "Ahmedabad", to: "Delhi", mode: "flight", popularity: 92 },
  { from: "Ahmedabad", to: "Mumbai", mode: "train", popularity: 88 },
  { from: "Ahmedabad", to: "Bangalore", mode: "flight", popularity: 85 },
  { from: "Ahmedabad", to: "Chennai", mode: "flight", popularity: 82 },
  { from: "Ahmedabad", to: "Hyderabad", mode: "flight", popularity: 80 },
  { from: "Ahmedabad", to: "Pune", mode: "bus", popularity: 75 },
  { from: "Ahmedabad", to: "Jaipur", mode: "train", popularity: 78 },
  { from: "Ahmedabad", to: "Lucknow", mode: "train", popularity: 72 }
];

// Export optimized data (core routes only for initial load)
export function getAllTransportRoutes() {
  const coreRoutes = generateCoreRoutes();
  
  return {
    cities: coreCities, // Start with core cities only
    trainRoutes: coreRoutes.trainRoutes,
    busRoutes: coreRoutes.busRoutes,
    flightRoutes: coreRoutes.flightRoutes,
    popularRoutes,
    // Extended data available on demand
    extendedCities,
    generateExtendedRoutes
  };
}