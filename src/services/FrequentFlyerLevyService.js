const debug = require("debug")("fot:front:frequenFlyerLevyService")
const fflMultipliers = [0, 0, 0.09, 0.24, 0.46, 0.74, 1.09, 1.49, 1.93, 2.4]

export default {
  addLevyToFlightCost(cost, pos) {
    // we have a ceiling, because the trips max out at 9
    if (pos > 9) {
      post = 9
    }
    return cost * fflMultipliers[pos]
  }
}
