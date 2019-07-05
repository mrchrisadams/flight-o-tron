import axios from "axios"
const debug = require("debug")("fot:front:carbonkitService")

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
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
