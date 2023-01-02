import { Request, Response, NextFunction } from "express"
import { Logger } from "./app"

export class StatusError {
  message: string
  status: number
  data

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, status = 500, data: any = {}) {
    this.message = message
    this.status = status
    this.data = data
  }
}

export function ErrorHandler(
  err: StatusError | Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  const statusError =
    err instanceof StatusError
      ? err
      : new StatusError("Looks like something is wrong on our end!")
  //* If the error is a server error then log it to the console.
  if (statusError.status >= 500 && statusError.status < 600)
    Logger.error(err.message)
  //* If we've already sent a response to the client then pass the error to the next function
  if (res.headersSent) return next(err)
  //* Send the error to the client
  res.status(statusError.status).json(statusError)
}

export default StatusError
