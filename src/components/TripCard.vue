<template>
  <li class="trip">
    <span class="from">{{ trip.from}}</span>
    to
    <span class="to">{{ trip.to}}</span>

    <span class="distance">distance: {{ trip.distance }}</span>

    <span class="co2">co2: {{ trip.co2e }}</span>
  </li>
</template>


<script>
export default {
  props: {
    trip: Object
  }
};
</script>

<style>
li.trip {
  border: 1px solid #333;
}
li.trip span {
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
