import Express, { NextFunction, Request, Response } from "express"
import { createServer } from "http"
import { AddressInfo } from "net"
import Winston from "winston"
import Cors from "cors"
import CookieParser from "cookie-parser"
import Path from "path"
import Mongoose from "mongoose"

// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.NODE_ENV === "development" && require("dotenv").config()

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

const Logger = Winston.createLogger({
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

const Database = Mongoose.connection

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

const App = Express()
const Server = createServer(App)

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

//* Serve static files
App.use(Express.static(Path.join(__dirname, "public")))

//* Render Front-End
App.get("*", (_, response) =>
  response.sendFile(Path.join(__dirname, "public/index.html"))
)

//* Handle Server Side Errors
App.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  Logger.error(err.message)
  if (res.headersSent) return next(err)
  res.sendStatus(500)
})

Server.listen(PORT, () =>
  Logger.info(
    `Server listening on port ${(Server.address() as AddressInfo).port}`
  )
)
