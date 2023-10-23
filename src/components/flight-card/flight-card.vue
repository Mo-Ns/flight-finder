<script setup lang="ts">
  import { formatTime, extractTime, extractDate } from '../../helper';
  import FlightLandIcon from '../../icons/iconFlightLand.vue';
  import FlightTakeoffIcon from '../../icons/iconFlightTakeoff.vue';
  import InfoIcon from '../../icons/iconInfo.vue';
  import SeatIcon from '../../icons/iconSeat.vue';
  import chip from '../../ui-components/chip/chip.vue';
</script>

<script lang="ts">
  export default {
    name: 'flightCard',
    data: () => {
      return {
        showMenu: false
      }
    },
    props: {
      flight: {
        type: Object,
        default: {}
      },
      isCheapestFlight: {
        type: Boolean,
        default: false
      },
      isShortestFlight: {
        type: Boolean,
        default: false
      },
      isEarliestFlight: {
        type: Boolean,
        default: false
      },
    }
  }
</script>

<template>
  <div class="row no-gutters flight-card" v-if="flight">
    <div class="col-md-9">
      <div class="shadow flight-card__block">
        <div class="row no-gutters">
          <div class="col vertical-center text-align-right mr-20">
            <div class="bold">{{ extractTime(flight.departureDateTime) }}</div>
            <div class="secondary-text fs-12">{{ extractDate(flight.departureDateTime) }}</div>
          </div>

          <div class="col">
            <div>
              <FlightTakeoffIcon></FlightTakeoffIcon>
            </div>
            <div class="route-line route-line--start"></div>
            <div>{{ flight.origin }}</div>
          </div>

          <div class="col-5 text-align-center">
            <div class="fix-space">
              <span class="secondary-text fs-13 mr-5">Duration:</span>
              <span class="bold fs-14">{{ formatTime(flight.duration) }}</span>
            </div>
            <div class="route-line"></div>

            <chip :classname="'light-green fs-14'" v-if="flight.nonstop">Nonstop</chip>
            <chip :classname="'light-red fs-14'" v-if="!flight.nonstop">
              3 Stops <div class="mt-5 ml-5" title="View Details"><InfoIcon /></div>
            </chip>
          </div>

          <div class="col text-align-right">
            <div>
              <FlightLandIcon></FlightLandIcon>
            </div>
            <div class="route-line route-line--end"></div>
            <div>{{ flight.destination }}</div>
          </div>

          <div class="col vertical-center text-align-left ml-20">
            <div class="bold">{{ extractTime(flight.arrivalDateTime) }}</div>
            <div class="secondary-text fs-12">{{ extractDate(flight.arrivalDateTime) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-3">
      <div class="shadow text-align-right flight-card__block flight-card__block--right">
        <div>
          <chip :classname="'green fs-14 mb-10'" v-if="isCheapestFlight">Cheapest Flight</chip>
          <chip :classname="'braun fs-14 mb-10 ml-10'" v-if="isShortestFlight">Shortest Duration</chip>
          <chip :classname="'blue fs-14 mb-10 ml-10'" v-if="isEarliestFlight">Earliest Flight</chip>
        </div>

        <div>
          <div class="secondary-text fs-13">Flight from</div>
          <div class="bold fs-24 text-no-wrap">{{ flight.price?.amount }} {{ flight.price?.currency }}</div>
          <div class="warning-text" v-if="flight.seatAvailability < 6"><SeatIcon />{{ flight.seatAvailability }} available seats</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "./flight-card.scss";
</style>