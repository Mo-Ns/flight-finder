export enum SORTBY {
  SHORTEST_DURATION = 'shortest_duration',
  CHEAPEST_PRICE = 'cheapest_price',
  DEPARTURE_TIME = 'departure_time',
  ARRIVAL_TIME = 'arrival_time',
}

export interface SortItem {
  value: SORTBY;
  label: string;
}

export const SortItems: SortItem[] = [
  {
    value: SORTBY.CHEAPEST_PRICE,
    label: 'Cheapest Price'
  },
  {
    value: SORTBY.SHORTEST_DURATION,
    label: 'Shortest Duration'
  },
  {
    value: SORTBY.DEPARTURE_TIME,
    label: 'Departure Time'
  },
  {
    value: SORTBY.ARRIVAL_TIME,
    label: 'Arrival Time'
  },
];


export const MIN_SCROLL_TOP = 400;

export const API = {
  SEARCH_FLIGHTS: '/src/assets/flights-mock.json',
}