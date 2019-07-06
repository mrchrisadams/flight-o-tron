<template>
  <div id="app" class="container mx-auto px-4 font-sans">
    <div id="nav"></div>
    <h1 class="font-bold text-xl flex items-center justify-between flex-wrap p-6">Frequent Flyer Levy-O-Tron</h1>
    <div class="px-4 max-w-xl">
      <p class="mt-2">The frequent flyer levy from the folks behind <a class="text-blue-600 underline" href="http://afreeride.org/">a free a ride</a> is an interesting idea - it's designed to help reduce demand for flying in total, without penalising people who fly rarely.</p>

      <p class="mt-2">To see the impact it would have had on your last year of travel, drop in the airport codes into this calculator, then hit the "show with the FFL" button.</p>

    </div>

    <router-view />
  </div>
</template>

<style>
</style>

<script>
export default {};
</script>
