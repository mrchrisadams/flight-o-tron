import axios from "axios"
const debug = require("debug")("fot:front:carbonkitService")

const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_SERVER_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export default {
  getFlightCalc(from, to) {
    debug("GET FLIGHT CALC")
    debug(from, to)

    return apiClient
      .get(`?from=${from}&to=${to}`)
      .then(response => {
        return response
      })
      .catch(error => {
        console.error(error)
      })
  }
}
