import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import CarbonkitService from "@/services/CarbonkitService.js"

const debug = require("debug")("fot:frontend:store")

const store = new Vuex.Store({
  state: {
    showFFL: false,
    trips: [],
    trip: {},
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
    },
    serialisedTrips: state => {
      return JSON.stringify(state.trips)
    }
  },
  mutations: {
    ADD_TRIP(state, trip) {
      debug(trip)
      state.trips.push(trip)
    },
    DELETE_TRIP(state, tripToRemove) {
      debug("removing", tripToRemove)
      const newTripList = state.trips.filter(trip => {
        return trip.id !== tripToRemove.id
      })
      debug("removing", newTripList)
      state.trips = newTripList
    },
    REPLACE_TRIPS(state, trips) {
      state.trips = trips
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
    },
    exportTrips({ state }) {
      return store.getters.serialisedTrips
    },
    tryImportTrips({commit}, serialisedTrips) {
      const trips = JSON.parse(serialisedTrips)

      const weHaveTripsToImport = trips.length > 0
      if (weHaveTripsToImport) {
        commit('REPLACE_TRIPS', trips)
        return {
          success: true,
          tripsImported: trips.length
        }
      }
      
    }
  }
})
export default store;