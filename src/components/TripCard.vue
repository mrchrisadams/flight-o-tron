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
      const fflMultipliers = [0, 0, 0.09, 0.24, 0.46, 0.74, 1.09, 1.49, 1.93, 2.4];

      if (pos > 9) {
        pos = 9;
      }
      let multiplier = fflMultipliers[pos];
      const levy = cost * multiplier;
      return levy;
    },
    deleteTrip() {
      this.$store.dispatch("deleteTrip", this.trip);
    }
  }
};
</script>

<style>
</style>
