<script setup lang="ts">
  import tab from '../ui-components/tab/tab.vue';
  import dropdown from '../ui-components/dropdown/dropdown.vue';
  import backToTop from '../ui-components/back-to-top/back-to-top.vue';
  import flightCard from '../components/flight-card/flight-card.vue';
  import searchForm from '../components/search-form/search-form.vue';
</script>

<script lang="ts">
  import { mapGetters, mapState, mapActions } from 'vuex';
  import { SortItems } from '../constants';

  export default {
    data () {
      return {
        showDropDown: false,
        sortItems: SortItems,
      }
    },
    mounted() {
      window.addEventListener("resize", this.handleMobileUI);
      this.handleMobileUI();
    },
    computed: {
      ...mapState(['flights', 'sortBy']),
      ...mapGetters(['sortedFlights']),
      cheapestPrice: function(): number {
        const sortedFlights = [...this.flights]?.sort((a, b) => a.price?.amount - b.price?.amount);
        return sortedFlights[0]?.price?.amount || 0;
      },
      shortestDuration: function(): string {
        const sortedFlights = [...this.flights]?.sort((a, b) => a.duration?.localeCompare(b.duration));
        return sortedFlights[0]?.duration || '';
      },
      earliestArrival: function(): string {
        const sortedFlights = [...this.flights]?.sort((a, b) => a.arrivalDateTime?.localeCompare(b.arrivalDateTime));
        return sortedFlights[0]?.arrivalDateTime || '';
      },
    },
    methods: {
      ...mapActions(['sortFlights']),
      handleMobileUI(): void {
        this.showDropDown = window.innerWidth < 700
      }
    }
  }
</script>

<template>
  <searchForm />

  <div data-cy="sort-container" v-if="flights?.length" class="mb-20">
    <div class="flex justify-content-end">
      <dropdown :on-click='sortFlights' :selectedItem="sortBy" :items="sortItems" v-if="showDropDown"></dropdown>
    </div>

    <div>
      <tab :on-click='sortFlights' :selectedItem="sortBy" :items="sortItems" v-if="!showDropDown"></tab>
    </div>
  </div>

  <flightCard
    v-for="(flight, index) in sortedFlights"
    :flight="flight"
    :key="'flight-card-' + index"
    :isCheapestFlight="cheapestPrice === flight.price?.amount"
    :isShortestFlight="shortestDuration === flight.duration"
    :isEarliestFlight="earliestArrival === flight.arrivalDateTime"
    class="mb-20"
    data-cy="flight-card"
  ></flightCard>

  <backToTop data-cy="back-to-top" />
</template>

<style lang="scss">
  @import "../styles/styles.scss";
</style>
