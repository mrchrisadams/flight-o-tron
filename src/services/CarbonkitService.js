import axios from "axios"
const logger = require("debug")("vue:carbonkitService")

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
})

export default {
  getFlightCalc(from, to) {
    logger("GET FLIGHT CALC")
    logger(from, to)

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
