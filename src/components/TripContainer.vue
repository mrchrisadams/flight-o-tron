<template>
  <div class="trip listing">
    <ul class="trip-list">
      <TripCard v-for="trip in trips" :key="trip.id" :trip="trip" />
    </ul>
    <form @submit.prevent="createTrip">
      <input v-model="newTrip.from" type="text" placeholder="Starting Airport" />
      <input v-model="newTrip.to" type="text" placeholder="Destination Airport" />
      <!-- <input v-model="newTrip.distance" type="text" placeholder="Add an event title">
      <input v-model="newTrip.co2e" type="text" placeholder="Add an event title">-->
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
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
      return this.$store.state.totalCo2;
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
