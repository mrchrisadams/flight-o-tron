import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import CarbonkitService from "@/services/CarbonkitService.js"
import FrequentFlyerLevyService from "@/services/FrequentFlyerLevyService.js"

const debug = require("debug")("fot:frontend:store")

export default new Vuex.Store({
  state: {
    showFFL: false,
    trips: [],
    trip: {},
    totalCo2: 0,
    totaldistance: 0
  },
  getters: {
    totalCO2e: state => {
      let reducer = (accumulator, trip) => accumulator + trip.co2e
      return state.trips.reduce(reducer, 0)
    },
    totalDistance: state => {
      let reducer = (accumulator, trip) => accumulator + trip.distance
      return state.trips.reduce(reducer, 0)
    },
    totalSpent: state => {
      let reducer = (accumulator, trip) => accumulator + trip.cost
      return state.trips.reduce(reducer, 0)
    }
  },
  mutations: {
    ADD_TRIP(state, trip) {
      debug(trip)
      state.trips.push(trip)
    },
    DELETE_TRIP(state, tripToRemove) {
      const newTripList = state.trips.filter(trip => {
        trip.id !== tripToRemove.id
      })
      state.trips = newTripList
    },
    TOGGLE_FFL(state) {
      state.showFFL = !state.showFFL
    }
  },
  actions: {
    addTrip({ commit }, trip) {
      CarbonkitService.getFlightCalc(trip.from, trip.to)
        .then(response => {
          // populate the trip with distance and CO2
          const co2e = response.data.amounts.filter(amt => {
            return amt.type == "lifeCycleCO2e"
          })[0]
          const distance = response.data.amounts.filter(amt => {
            return amt.type == "distance"
          })[0]
          trip.co2e = Math.floor(co2e.value)
          trip.distance = Math.floor(distance.value)
          trip.cost = Math.round(trip.cost)
          commit("ADD_TRIP", trip)
        })
        // rescue for when it breaks
        .catch(error => {
          debug(`eep. error at`, error)
        })
    },
    deleteTrip({ commit }, trip) {
      commit("DELETE_TRIP", trip)
    },
    toggleFFL({ commit }) {
      commit("TOGGLE_FFL")
    }
  }
})
