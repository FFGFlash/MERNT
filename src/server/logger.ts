import winston from "winston"

export const Logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "server" },
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "info"
    })
  ]
})

export default Logger
