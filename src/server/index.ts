import { AddressInfo } from "net"
import { Server, Logger } from "./app"

// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.NODE_ENV === "development" && require("dotenv").config()

const { PORT = 8080 } = process.env

Server.listen(PORT, () =>
  Logger.info(
    `Server listening on port ${(Server.address() as AddressInfo).port}`
  )
)
