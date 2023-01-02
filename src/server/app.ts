import Express from "express"
import { createServer } from "http"
import Winston from "winston"
import Cors from "cors"
import CookieParser from "cookie-parser"
import Path from "path"
import Mongoose from "mongoose"
import StatusError, { ErrorHandler } from "./error"

const {
  PORT = 8080,
  SECRET,
  NODE_ENV = "production",
  MONGO_HOST,
  MONGO_DB,
  MONGO_USER,
  MONGO_PASS,
  MONGO_TIMEOUT_MS
} = process.env

export const Logger = Winston.createLogger({
  level: "info",
  format: Winston.format.json(),
  defaultMeta: { service: "server" },
  transports: [
    new Winston.transports.Console(),
    new Winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new Winston.transports.File({
      filename: "logs/combined.log",
      level: "info"
    })
  ]
})

export const Database = Mongoose.connection

Database.on("connecting", () => Logger.info("Connecting to MongoDB..."))
Database.on("connected", () => Logger.info("Connected to MongoDB"))
Database.once("open", () => Logger.info("Connection with MongoDB is open"))
Database.on("disconnecting", () => Logger.info("Disconnecting from MongoDB"))
Database.on("disconnected", () => Logger.info("Disconnected from MongoDB"))

Database.on("error", err => Logger.error(err.message))

Mongoose.set("strictQuery", false)

//* If provided with a host connect to MongoDB
MONGO_HOST &&
  Mongoose.connect(
    MONGO_HOST,
    {
      dbName: MONGO_DB,
      user: MONGO_USER,
      pass: MONGO_PASS,
      connectTimeoutMS: (MONGO_TIMEOUT_MS && parseInt(MONGO_TIMEOUT_MS)) || 5000
    },
    err => Logger.error(err?.message)
  )

export const App = Express()
export const Server = createServer(App)

//* Enable react reloading on file change while in development mode
if (NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const livereload = require("livereload")
  const livereloadServer = livereload.createServer()
  livereloadServer.watch(Path.resolve(__dirname, "public"))
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const connectLivereload = require("connect-livereload")
  App.use(connectLivereload())
}

//* Add Cross-origin, urlencoded, json and cookie middleware
App.use(
  Cors({
    origin: [`http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`],
    credentials: true
  }),
  Express.urlencoded({ extended: true }),
  Express.json(),
  CookieParser(SECRET)
)

//! Error Handler Testing

//* StatusError example
App.get("/bad-request", () => {
  throw new StatusError("This is an example status error.", 400, {
    foo: "bar",
    bar: "foo"
  })
})

//* Error example
App.get("/server-error", () => {
  throw new Error("Some server error occurred!")
})

//! End Error Handler Testing

//* Render Front-End
App.get("*", (req, res, next) => {
  const expectedResponse = req.headers.accept && req.headers.accept.split(",")
  if (expectedResponse?.includes("jest")) {
    res.status(200).send("<p>OK</p>")
  } else if (expectedResponse?.includes("text/html")) {
    res.sendFile(Path.join(__dirname, "public/index.html"))
  } else next()
})

//* Serve static files, only if there wasn't an expected response of "text/html"
App.use(Express.static(Path.join(__dirname, "public")), () => {
  throw new StatusError("Not Found", 404)
})

//* Handle Server Side Errors, if something throws an error while trying to handle a request
App.use(ErrorHandler)

export default App
