<template>
  <div class="trip listing">
    <form
      @submit.prevent="createTrip"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full"
    >
      <input
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 appearance-none leading-normal"
        v-model="newTrip.from"
        type="text"
        placeholder="Starting Airport"
      />
      <input
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mx-2 appearance-none leading-normal"
        v-model="newTrip.to"
        type="text"
        placeholder="Destination Airport"
      />

      <input
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        value="Submit"
      />
    </form>

    <div class="flex flex-row-reverse">
      <div
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mx-2 appearance-none leading-normalw-1/3"
      >
        <span class="text-6xl">{{ co2 }}</span>
        tonnes of CO2e
      </div>

      <ul class="trip-list w-2/3">
        <TripCard v-for="trip in trips" :key="trip.id" :trip="trip" />
      </ul>
    </div>
  </div>
</template>

<script>
import TripCard from "@/components/TripCard.vue";

export default {
  data() {
    return {
      newTrip: this.createNewTrip()
    };
  },
  components: {
    TripCard
  },
  computed: {
    trips() {
      return this.$store.state.trips;
    },
    co2() {
      let tonnes = this.$store.getters.totalCO2e / 1000;
      return tonnes.toPrecision(2).toLocaleString();
    }
  },
  methods: {
    createNewTrip() {
      const id = Math.floor(Math.random() * 10000000);

      return {
        id: id,
        from: "",
        to: "",
        distance: 0,
        carbon: 0
      };
    },
    createTrip() {
      console.log(this.newTrip);
      this.$store
        .dispatch("addTrip", this.newTrip)
        .then(response => {
          console.log("request returned", response);
          this.newTrip = this.createNewTrip();
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
.trip-list {
  max-width: 40rem;
}
</style>
