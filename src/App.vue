<template>
  <div id="app" class="container mx-auto px-4 font-sans">
    <div id="nav"></div>
    <h1 class="font-bold text-xl flex items-center justify-between flex-wrap p-6">Flight-O-Tron</h1>
    <div class="px-4 max-w-xl">
      <p
        class="mt-2"
      >If you fly, or book flights for other people, you might not know the carbon footprint of aviation. And most flight calculators seem to assume you are looking backwards to offset, and look at just a one way, or maybe a return flight, rather than taking steps to reduce flying in future.</p>

      <p></p>
      <p class="mt-2">
        One interesting idea to address this is frequent flyer levy from the folks behind
        <a
          class="text-blue-600 underline"
          href="http://afreeride.org/"
        >a free a ride</a>. It's designed to help reduce demand for flying in total, without penalising people who fly rarely, by raising a levy on frequent flying to invest in greener alternatives to burning fossil fuels to fly around.
      </p>

      <p
        class="mt-2"
      >To see the impact it would have had on your last year of travel, in terms what the difference in cost might be, drop in the airport codes, and the rough cost for each flight into this calculator, then hit the "show with the FFL" button.</p>

      <p class="mt-2 text-red-600">
        <em>
          Important: this is all a work in progress, and my understanding of the details of the Frequent Flyer Levy are incomplete. You really,
          <strong>really</strong> should use a proper online calculator to confirm these numbers before making a decision based on them, and check with the Free Ride gang about the the policy details. This may well be wrong.
        </em>
      </p>
    </div>

    <router-view />

    <p class="mt-4 text-sm">
      Hurriedly bashed together on glitch, by
      <a href="https://twitter.com/mrchrisadams">Chris Adams</a>, a while after writing
      <a
        href="https://blog.chrisadams.me.uk/2019/01/01/wonkery-on-aviation-and-the-frequent-flyer-levy/"
      >this post about looking at his own travel habits in the face of a changing climate.</a>
    </p>
  </div>
</template>

<style>
</style>

<script>
export default {};
</script>
