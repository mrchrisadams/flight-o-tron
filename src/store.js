import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import CarbonkitService from "@/services/CarbonkitService.js"
const debug = require("debug")("fot:frontend:store")

export default new Vuex.Store({
  state: {
    trips: [
      {
        from: "LHR",
        to: "TXL",
        distance: 1000,
        co2e: 100,
        id: 1
      },
      {
        from: "TXL",
        to: "LHR",
        distance: 1000,
        co2e: 100,
        id: 2
      }
    ],
    trip: {},
    totalCo2: 344000,
    totaldistance: 0,
    tripCounter: 2
  },
  mutations: {
    ADD_TRIP(state, trip) {
      debug(trip)
      state.trips.push(trip)
    },
    DELETE_TRIP(state, tripToRemove) {
      state.trips.filter(trip => {
        trip.id !== tripToRemove.id
      })
    }
  },
  actions: {
    addTrip({ commit, dispatch }, trip) {
      debug("ADD TRIP YO")
      // fetch stuff, init
      CarbonkitService.getFlightCalc(trip.from, trip.to)
        .then(response => {
          // populate the trip with distance and CO2
          const co2e = response.data.amounts.filter(amt => {
            return amt.type == "distance"
          })[0]
          const distance = response.data.amounts.filter(amt => {
            return amt.type == "lifeCycleCO2e"
          })[0]
          trip.co2e = Math.floor(co2e.value)
          trip.distance = Math.floor(distance.value)
          // console.log(response.data.amounts)
          commit("ADD_TRIP", trip)
        })
        // rescue for when it breaks
        .catch(error => {
          debug(`eep. error at`, error)
        })
    }
  }
})
