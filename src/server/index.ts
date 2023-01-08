import { Server as _Server } from 'http'
import { AddressInfo } from 'net'
import { App } from './app'
import Logger from './logger'

// eslint-disable-next-line @typescript-eslint/no-var-requires
process.env.NODE_ENV === 'development' && require('dotenv').config()

const { PORT = 8080 } = process.env

export const Server: _Server = App.listen(PORT, () =>
  Logger.info(
    `Server listening on port ${(Server.address() as AddressInfo).port}`
  )
)

export default Server
