import Express from 'express'
import Cors from 'cors'
import CookieParser from 'cookie-parser'
import Path from 'path'
import StatusError, { ErrorHandler } from './error'
import RestApi from './rest'

const { PORT = 8080, SECRET, NODE_ENV = 'production' } = process.env

export const App = Express()

//* Enable react reloading on file change while in development mode
if (NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const livereload = require('livereload')
  const livereloadServer = livereload.createServer()
  livereloadServer.watch(Path.resolve(__dirname, 'public'))
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const connectLivereload = require('connect-livereload')
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
App.get('/bad-request', () => {
  throw new StatusError('This is an example status error.', 400, {
    foo: 'bar',
    bar: 'foo'
  })
})

//* Error example
App.get('/server-error', () => {
  throw new Error('Some server error occurred!')
})

//! End Error Handler Testing

//* Render Front-End
App.get('*', (req, res, next) => {
  const accept = req.headers.accept || 'application/json'
  accept.includes('text/html')
    ? res.sendFile(Path.join(__dirname, 'public/index.html'))
    : accept.includes('jest')
    ? res.sendStatus(200)
    : next()
})

App.use('/rest', RestApi)

//* Serve static files, only if there wasn't an expected response of "text/html"
App.use(Express.static(Path.join(__dirname, 'public')), () => {
  throw new StatusError('Not Found', 404)
})

//* Handle Server Side Errors, if something throws an error while trying to handle a request
App.use(ErrorHandler)

export default App
