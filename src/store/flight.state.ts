import axios from 'axios';
import { createStore } from 'vuex';
import { API, SORTBY } from '@/constants/index';
import { FlightModel, FlightSearchResponse, SearchOptions } from '@/store/flight.model';

const state: FlightModel = {
  sortBy: SORTBY.CHEAPEST_PRICE,
  searchOptions: null,
  flights: []
}

const mutations = {
  async findFlights(state: FlightModel, searchOptions: SearchOptions) {
    state.searchOptions = searchOptions;

    try {
      axios.get(API.SEARCH_FLIGHTS).then(({ data }: FlightSearchResponse) => {
        const { flights } = data || {};
        state.flights = flights
      });
    } catch (error) {
      console.error('Error fetching flights', error);
    }
  },

  sortFlights(state: FlightModel, sortBy: SORTBY) {
    state.sortBy = sortBy;
  },
}

const actions = {
  findFlights: ({ commit }: any, searchOptions: SearchOptions) => commit('findFlights', searchOptions),
  sortFlights: ({ commit }: any, sortBy: SORTBY) => commit('sortFlights', sortBy),
}

const getters = {
  sortedFlights: (state: FlightModel) => {
    const flights = state.flights || [];

    switch (state.sortBy) {
      case SORTBY.SHORTEST_DURATION:
        return flights?.slice().sort((a, b) => a.duration.localeCompare(b.duration));

      case SORTBY.CHEAPEST_PRICE:
        return flights?.slice().sort((a, b) => a.price.amount - b.price.amount);

      case SORTBY.DEPARTURE_TIME:
          return flights?.slice().sort((a, b) => a.departureDateTime.localeCompare(b.departureDateTime));

      case SORTBY.ARRIVAL_TIME:
        return flights?.slice().sort((a, b) => a.arrivalDateTime.localeCompare(b.arrivalDateTime));

      default:
        return flights?.slice();
    }
  }
}

export default createStore({
  state,
  getters,
  actions,
  mutations
})