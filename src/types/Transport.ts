// Transport types for type safety

export interface BaseTransportOption {
  id: number;
  mode: "train" | "bus" | "flight";
  from: string;
  to: string;
  duration: string;
  distance: string;
  departure: string;
  arrival: string;
  amenities: string[];
  days: string[];
  route: string;
  features: string[];
  stops: number;
  cancellation: string;
}

export interface TrainClass {
  class: string;
  price: string;
  availability: string;
}

export interface TrainOption extends BaseTransportOption {
  mode: "train";
  trainNumber: string;
  trainName: string;
  operator: string;
  classes: TrainClass[];
  meals: string;
}

export interface BusOption extends BaseTransportOption {
  mode: "bus";
  operator: string;
  busType: string;
  price: string;
  luggage: string;
  boarding: string;
  dropoff: string;
}

export interface FlightOption extends BaseTransportOption {
  mode: "flight";
  flightNumber: string;
  airline: string;
  aircraft: string;
  price: string;
  class: string;
  baggage: string;
  boarding: string;
  dropoff: string;
  terminal: string;
  gate: string;
}

export type TransportOption = TrainOption | BusOption | FlightOption;

export interface City {
  id: number;
  name: string;
  code: string;
  state: string;
}


