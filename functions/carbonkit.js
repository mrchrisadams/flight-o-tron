const axios = require("axios")
const debug = require("debug")("fot:backend:carbonkitService")

const apiClient = axios.create({
  baseURL: "https://api.carbonkit.net/3/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  auth: {
    username: "mrchrisadams",
    password: "armor-tahiti-salivate-widely"
  }
})

module.exports = {
  getFlightCalc(from, to) {
    debug("GET FLIGHT CALC")
    debug(from, to)
    let flightCalcPath =
      "/categories/Great_Circle_flight_methodology/calculation.json"
    return apiClient
      .get(flightCalcPath, {
        params: {
          type: "great circle route",
          "values.IATAcode1": from,
          "values.IATAcode2": to
        }
      })
      .then(response => {
        return response
      })
      .catch(error => {
        console.error(error)
      })
  }
}
