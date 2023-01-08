import { get, Params } from './utils/request'

export interface GetExampleActionParams extends Params {
  /** Optional id to get a specific result */
  id?: string | string[]
}

export interface GetExampleResponse {
  /** List of Example */
  results: {
    /** The id of the specific result */
    id: string
    /** The name of the specific result */
    name: string
  }[]
}

/**
 * Sends a 'get' request to '/example'
 * @param params - The query parameters to be sent to the server
 * @returns The response from the server
 */
export function getExample(params?: GetExampleActionParams) {
  return get<GetExampleResponse>('/rest/example', params)
}
