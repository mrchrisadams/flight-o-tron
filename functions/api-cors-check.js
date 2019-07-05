const axios = require("axios")
const logger = require("debug")("fot:CORSlogger")

let main = async () => {
  let req = await axios.get("http://localhost:3000")
  logger(req.headers)
}
main()
