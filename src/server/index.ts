import Express, { NextFunction, Request, Response } from "express"
import { createServer } from "http"
import { AddressInfo } from "net"
import Winston from "winston"
import Cors from "cors"
import CookieParser from "cookie-parser"
import Path from "path"

const { PORT = 8080, SECRET, NODE_ENV = "production" } = process.env

const App = Express()
const Server = createServer(App)
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
App.get("*", (_, res) =>
  res.sendFile(Path.join(__dirname, "public/index.html"))
)

//* Handle Server Side Errors
App.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err)
  Logger.error(err.message)
  res.sendStatus(500)
})

Server.listen(PORT, () =>
  Logger.info(
    `Server listening on port ${(Server.address() as AddressInfo).port}`
  )
)
