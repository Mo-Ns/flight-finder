import { SORTBY } from "@/constants/index";

export interface FlightModel {
  sortBy: SORTBY;
  searchOptions: SearchOptions | null;
  flights: Flight[];
}

export interface Flight {
  uuid: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  departureDateTime: string;
  arrivalDateTime: string;
  seatAvailability: number;
  price: PriceComponent;
  offerType: string;
  duration: string;
  nonstop: boolean;
}

export interface PriceComponent {
  amount: number;
  currency: string;
}

export interface SearchOptions {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
}

export interface FlightSearchResponse {
  data: FlightSearchResponseData;
  status: number;
  statusText: string;
}

export interface FlightSearchResponseData {
  flights: Flight[];
}