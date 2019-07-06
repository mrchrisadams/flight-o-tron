<template>
  <div class>
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
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mr-2 my-2 appearance-none leading-normal"
        v-model="newTrip.to"
        type="text"
        placeholder="Destination Airport"
      />
      <input
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mr-2 my-2 appearance-none leading-normal"
        v-model="newTrip.cost"
        type="number"
        placeholder="Approx cost"
      />

      <input
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        value="Submit"
      />
    </form>

    <TripImporter />

    

    <div class="flex flex-wrap">
      <div
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 mr-2 appearance-none leading-normal w-full md:w-1/4"
      >
        <div>
          <span class="text-6xl">{{ co2 }}</span>
          tonnes of CO2e
        </div>
        <div>
          <span class="text-3xl">{{ distance }}</span>
        km flown
        </div>
        <div>
          <span class="text-3xl">{{ spent }}</span>
          spent
        </div>
        
      </div>

      <div class="w-full md:w-2/3 my-2">
        <div v-if="showFFL">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="toggleFFL"
          >Show with FFL</button>
        </div>
        <div v-else>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="toggleFFL"
          >Show with FFL</button>
        </div>

        <ul>
          <TripCard v-for="(trip, index) in trips" :key="trip.id" :index="index" :trip="trip" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TripCard from "@/components/TripCard.vue";
import TripImporter from "@/components/TripImporter.vue";

export default {
  data() {
    return {
      newTrip: this.createNewTrip()
    };
  },
  components: {
    TripCard, TripImporter
  },
  computed: {
    showFFL() {
      return this.$store.state.showFFL;
    },
    trips() {
      return this.$store.state.trips;
    },
    co2() {
      let tonnes = this.$store.getters.totalCO2e / 1000;
      return tonnes.toPrecision(2).toLocaleString();
    },
    distance() {
      let dist = this.$store.getters.totalDistance;
      return dist.toLocaleString();
    },
    spent() {
      let spent = this.$store.getters.totalSpent;
      return spent.toLocaleString();
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
        carbon: 0,
        cost: 0
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
    },
    toggleFFL() {
      this.$store.dispatch("toggleFFL");
    },
    exportTrips() {
      this.$store.dispatch("exportTrips");
      return this.$store.getters.serialisedTrips
    }
  }
};
</script>
<style>
</style>
