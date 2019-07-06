<template>
  <li
    class="flex flex-row mx-4 my-4 py-2 px-4 mx-2 text-base bg-gray-200 focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg appearance-none leading-normal"
  >
    <span class="flex-1 block from">{{ trip.from}}</span>
    <span class="flex-1 block from">to</span>

    <span class="flex-1 block to">{{ trip.to}}</span>

    <span class="flex-1 block">{{ trip.distance }}km</span>

    <span class="flex-1 block">{{ trip.co2e }}kg</span>
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
</style>
