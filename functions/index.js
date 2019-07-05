const Hapi = require("@hapi/hapi")
const CarbonKit = require("./carbonkit")
const logger = require("debug")("hapi:index")

const init = async () => {
  const server = Hapi.server({
    debug: { request: ["*"], log: ["*"] },
    port: 3000,
    host: "localhost",
    routes: { cors: { origin: "ignore" } }
  })

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: async (request, h) => {
      logger(request.query)
      let resp = await CarbonKit.getFlightCalc(
        request.query.from,
        request.query.to
      )
      return resp.data.output
      // return "WORD"
    }
  })

  await server.start()
  console.log("Server running on %s", server.info.uri)
}

process.on("unhandledRejection", err => {
  console.log(err)
  process.exit(1)
})

init()
