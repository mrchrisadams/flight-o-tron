<template>
  <li
    class="flex flex-row my-4 py-2 px-4 text-base bg-gray-200 focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg appearance-none leading-normal"
  >
    <span class="flex-1 block from">{{ trip.from}} to {{ trip.to}}</span>

    <span class="flex-1 block">{{ trip.distance }}km</span>

    <span class="flex-1 block">{{ trip.co2e }}kg</span>

    <span class="flex-1 block">
      {{ trip.cost }}
      <span class="italic text-sm"
        v-if="showFFL"
      ><br>({{ trip.cost + addLevyToFlightCost(trip.cost, index) }} with the FFL )</span>
    </span>
    <button @click="deleteTrip"><span class="text-sm text-red-800">Delete trip</span></button>
  </li>
</template>


<script>
import FrequentFlyerLevyService from "@/services/FrequentFlyerLevyService.js"
export default {
  props: {
    trip: Object,
    index: Number
  },
  computed: {
    showFFL() {
      return this.$store.state.showFFL;
    }
  },
  methods: {
    addLevyToFlightCost(cost, pos) {
      return FrequentFlyerLevyService.addLevyToFlightCost(cost, pos)
    },
    deleteTrip() {
      this.$store.dispatch("deleteTrip", this.trip);
    }
  }
};
</script>

<style>
</style>
