<template>
<div class="my-2"> 
  <span class="mr-4">If you've used this before, and exported trips as JSON, you can paste the JSON in to save time</span>
  <span class="mr-4"></span>

  <button class="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 mr-4 border border-blue-500 hover:border-transparent rounded"
  @click="prepForImport"
  >
  Import trips 
  </button>
  <button 
  class="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
  @click="exportTrips">
  Export trips
  </button>

  <div v-if="importOpen">

    <form>

      <textarea
        class="bg-white focus:outline-0 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 my-2 block w-full appearance-none leading-normal font-mono"
        v-model="serialisedTrips"
        placeholder="Paste your JSON here"
        
        >
      </textarea>
      <button 
        class="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded mt-4"
        @click="loadTrips">
        Load trips
        </button>

    </form>
  </div>

</div>


</template>


<script>

export default {
  data() {
    return {
      // this is a silly name if we open it to export as well now
      importOpen: false,
      serialisedTrips: null
    };
  },
  components: {},
  computed: {},
  methods: {
    async exportTrips() {
      this.importOpen = true
      const trips = await this.$store.dispatch("exportTrips");
      this.serialisedTrips = trips
    },
    prepForImport() {
      this.importOpen = !this.importOpen
    },
    loadTrips() {
      const res = this.$store.dispatch("tryImportTrips", this.serialisedTrips);

      if (res) {
        this.serialisedTrips = null
        this.importOpen = false
      }
    }
  }
};
</script>
<style>
</style>