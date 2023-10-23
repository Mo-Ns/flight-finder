<script setup lang="ts">
  import { mapGetters, mapState, mapActions } from 'vuex';
  import FlightLandIcon from '../../icons/iconFlightLand.vue'
  import FlightTakeoffIcon from '../../icons/iconFlightTakeoff.vue'
  import CalendarIcon from '../../icons/iconCalendar.vue'
  import formButton from '../../ui-components/button/button.vue'
  import formInput from '../../ui-components/input/input.vue'
</script>

<script lang="ts">
  export default {
    name: 'searchForm',
    data () {
      return {
        origin: 'MUC',
        destination: 'CGN',
        departureDate: '13.12.2023',
        returnDate: '21.12.2023',
      }
    },
    methods: {
      ...mapActions(['findFlights']),
      startSearch(): void {
        this.findFlights({ ...this.$data });
      }
    }
  }
</script>

<template>
  <div class="form-container mb-20">
    <form v-on:submit.prevent>
      <div class="row">
        <div class="col-12 col-md  mb-20 mb-md-0">
          <div class="form-field">
            <div class="form-field__prefix">
              <FlightTakeoffIcon />
            </div>
            <div class="form-field__infix">
              <formInput :name="origin" v-model="origin" :placeholder="'From'" data-cy="search-form__origin" />
            </div>
          </div>
        </div>

        <div class="col-12 col-md">
          <div class="form-field">
            <div class="form-field__prefix">
              <FlightLandIcon />
            </div>
            <div class="form-field__infix">
              <formInput :name="destination" v-model="destination" :placeholder="'To'" data-cy="search-form__destination" />
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-20">
        <div class="col">
          <div class="form-field">
            <div class="form-field__prefix">
              <CalendarIcon />
            </div>
            <div class="form-field__infix">
              <formInput :name="departureDate" v-model="departureDate" :placeholder="'Departure'" data-cy="search-form__departureDate" />
            </div>
          </div>
        </div>

        <div class="col">
          <div class="form-field">
            <div class="form-field__prefix">
              <CalendarIcon />
            </div>
            <div class="form-field__infix">
              <formInput :name="returnDate" v-model="returnDate" :placeholder="'Return'" data-cy="search-form__returnDate" />
            </div>
          </div>
        </div>

        <div class="col-md-3 col-lg-2 mt-20 mt-md-0">
          <formButton :on-click="startSearch" data-cy="search-form__search-button">
            Search Flights
          </formButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  @import "./search-form.scss";
</style>

