import { describe, it, expect, beforeEach } from 'vitest';
import flightStore from '@/store/flight.state';
import { SORTBY } from '@/constants/index';

describe('Flight Store', () => {
  let store: any;

  beforeEach(() => {
    store = flightStore;
  });

  it('sorts flights by CHEAPEST_PRICE', () => {
    store.state.flights = [{ price: { amount: 300 } }, { price: { amount: 200 } }];
    store.commit('sortFlights', SORTBY.CHEAPEST_PRICE);

    const sortedFlights = store.getters.sortedFlights;
    expect(sortedFlights[0].price.amount).toBe(200);
    expect(sortedFlights[1].price.amount).toBe(300);
  });

  it('sorts flights by SHORTEST_DURATION', () => {
    store.state.flights = [
      {
        "uuid": "SA00003-b790715d-b2b8-4d23-ac27-d4e88c0e84af",
        "origin": "FRA",
        "destination": "CGN",
        "departureDate": "2023-11-13",
        "returnDate": "2023-11-21",
        "seatAvailability": 7,
        "price": {
          "amount": 128,
          "currency": "EUR"
        },
        "offerType": "BestPrice",
        "departureDateTime": "2023-11-13T08:30:00",
        "arrivalDateTime": "2023-11-21T10:00:00",
        "duration": "01:30",
        "nonstop": true
      },
      {
        "uuid": "SA00003-b790715d-b2b8-4d23-ac27-d4e88c0e84af",
        "origin": "FRA",
        "destination": "CGN",
        "departureDate": "2023-11-13",
        "returnDate": "2023-11-21",
        "seatAvailability": 7,
        "price": {
          "amount": 104,
          "currency": "EUR"
        },
        "offerType": "BestPrice",
        "departureDateTime": "2023-11-13T11:00:00",
        "arrivalDateTime": "2023-11-21T13:20:00",
        "duration": "02:20",
        "nonstop": true
      }
    ];

    store.commit('sortFlights', SORTBY.SHORTEST_DURATION);

    const sortedFlights = store.getters.sortedFlights;
    expect(sortedFlights[0].duration).toBe('01:30');
    expect(sortedFlights[1].duration).toBe('02:20');
  });
});
