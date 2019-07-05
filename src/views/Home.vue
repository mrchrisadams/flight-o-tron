<template>
  <div class="home">
    <TripContainer/>
  </div>
</template>

<script>
// @ is an alias to /src
import TripContainer from "@/components/TripContainer.vue";

export default {
  name: "home",
  components: {
    TripContainer
  }
};
</script>
