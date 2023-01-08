import debug from './debug'

export interface RequestOptions {
  /** The Headers to send with the request */
  headers?: HeadersInit
  /** The body to send with the request */
  body?: any
  /** The request method to use */
  method?: string
}

export interface ErrorResponse {
  error: number
  message?: string
}

/**
 * Send a request to the server
 * @param url - The url to send our request to
 * @param options - The options to send along with our request
 * @returns The server's response
 */
export default async function request<T>(
  url: string,
  options?: RequestOptions
): Promise<T | ErrorResponse> {
  try {
    //* Parse options
    options = {
      method: options?.method || (options?.body ? 'POST' : 'GET'),
      body: options?.body && JSON.stringify(options.body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options?.headers
      }
    }

    debug(`> ${options.method}: ${url}`, options.body)

    //* Fetch response
    const res = await fetch(url, options)
    const contentType = res.headers.get('Content-Type') || 'text/plain'

    //* Parse response data
    let data = await (contentType.includes('text/')
      ? res.text()
      : contentType.includes('json')
      ? res.json()
      : contentType.includes('application/octet-stream')
      ? res.blob()
      : res.text())

    //* Handle response errors
    if ((!data || !data.error) && !res.ok)
      data = { error: res.status, message: res.statusText }

    debug(`< ${options.method}: ${url}`, data)

    return data
  } catch (err) {
    return { error: 0, message: 'Request Failed' }
  }
}

export type Params = {
  [param: string]:
    | string
    | string[]
    | boolean
    | object
    | number
    | undefined
    | null
}

/**
 * Creates a query string from an object
 * @param params - An object of key/values which will be used to create a query string
 * @returns A query string Ex. ?key1=false&key2=10&key3=example
 */
export function parseParams(params?: Params) {
  if (!params) return
  const typeFilter = ['function']
  const valueFilter = [Infinity, NaN, undefined, null]
  const query = Object.entries(params)
    .filter(
      ([, value]) =>
        !typeFilter.includes(typeof value) ||
        !valueFilter.includes(value as never) ||
        Array.isArray(value)
    )
    .map(
      ([name, value]) =>
        `${name}=${
          Array.isArray(value)
            ? value.join()
            : typeof value === 'object'
            ? JSON.stringify(value)
            : value
        }`
    )
    .join('&')
  return query && `?${query}`
}

/**
 * Sends a 'get' request to the server
 * @param url - The url to send the request to
 * @param params - The parameters object used to build the query string
 * @param headers - The headers to send with the request
 * @returns The server's response
 */
export function get<T>(url: string, params?: Params, headers?: HeadersInit) {
  const query = parseParams(params as Params)
  query && (url += query)
  return request<T>(url, { method: 'GET', headers })
}

/**
 * Sends a 'post' request to the server
 * @param url - The url to send the request to
 * @param body - The data to send as the request body
 * @param headers - The headers to send with the request
 * @returns The server's response
 */
export function post(url: string, body?: any, headers?: HeadersInit) {
  return request(url, { method: 'POST', headers, body })
}

/**
 * Sends a 'put' request to the server
 * @param url - The url to send the request to
 * @param body - The data to send as the request body
 * @param headers - The headers to send with the request
 * @returns The server's response
 */
export function put(url: string, body?: any, headers?: HeadersInit) {
  return request(url, { method: 'PUT', headers, body })
}

/**
 * Sends a 'delete' request to the server
 * @param url - The url to send the request to
 * @param body - The data to send as the request body
 * @param headers - The headers to send with the request
 * @returns The server's response
 */
export function del(url: string, body?: any, headers?: HeadersInit) {
  return request(url, { method: 'DELETE', headers, body })
}

/**
 * Sends a 'patch' request to the server
 * @param url - The url to send the request to
 * @param body - The data to send as the request body
 * @param headers - The headers to send with the request
 * @returns The server's response
 */
export function patch(url: string, body?: any, headers?: HeadersInit) {
  return request(url, { method: 'PATCH', headers, body })
}

//* Expose request methods for testing
if (process.env.NODE_ENV !== 'production') {
  const w = window as never as {
    request: typeof request
    get: typeof get
    post: typeof post
    put: typeof put
    del: typeof del
    patch: typeof patch
  }
  w.request = request
  w.get = get
  w.post = post
  w.put = put
  w.del = del
  w.patch = patch
}
