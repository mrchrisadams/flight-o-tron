const CarbonKit = require("./carbonkit")
const apiLogger = require("debug")("fot:apiLogger")

let main = async () => {
  let resp = await CarbonKit.getFlightCalc("LAX", "LHR")
  apiLogger(resp.data.output)
  return resp.data.output
}

main()
