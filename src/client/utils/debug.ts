/* eslint-disable no-console */
export default function debug(message: any, ...args: any[]) {
  return process.env.NODE_ENV === 'development' && console.log(message, ...args)
}
