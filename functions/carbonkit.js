const axios = require("axios")
const logger = require("debug")("hapi:carbonkitService")

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
    console.log("GET FLIGHT CALC")
    console.log(from, to)
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
