const axios = require("axios")
const debug = require("debug")("fot:backend:carbonkitService")

if (!process.env.VUE_APP_CARBONKIT_USERNAME) {
  console.error(`No value found for VUE_APP_CARBONKIT_USERNAME`)
  process.exitCode = 1;
}

const apiClient = axios.create({
  baseURL: "https://api.carbonkit.net/3/",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  auth: {
    username: `${process.env.VUE_APP_CARBONKIT_USERNAME}`,
    password: `${process.env.VUE_APP_CARBONKIT_PASSWORD}`,
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