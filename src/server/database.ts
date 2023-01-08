import Mongoose from 'mongoose'
import Logger from './logger'

const { MONGO_HOST, MONGO_DB, MONGO_USER, MONGO_PASS, MONGO_TIMEOUT_MS } =
  process.env

export const Database = Mongoose.connection

Database.on('connecting', () => Logger.info('Connecting to MongoDB...'))
Database.on('connected', () => Logger.info('Connected to MongoDB'))
Database.once('open', () => Logger.info('Connection with MongoDB is open'))
Database.on('disconnecting', () => Logger.info('Disconnecting from MongoDB'))
Database.on('disconnected', () => Logger.info('Disconnected from MongoDB'))

Database.on('error', err => Logger.error(err.message))

Mongoose.set('strictQuery', false)

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

export default Database
