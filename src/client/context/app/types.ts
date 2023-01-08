import { GetExampleResponse } from 'src/client/actions'
import { ErrorResponse } from 'src/client/utils/request'

//* Define AppContext's Data Structure
export interface AppState {
  Error?: number
  Message?: string
  Loading: { [key: string]: boolean }
  Example: { [key: string]: { id: string; name: string } }
}

//* Define Dispatch Actions
export enum Actions {
  SET_LOADING = 'SET_LOADING',
  SET_EXAMPLE = 'SET_EXAMPLE'
}

//* Define Dispatch Actions' Data Structure
export interface ActionTypes {
  SET_LOADING: {
    payload: Exclude<Actions, Actions.SET_LOADING>
    type: Actions.SET_LOADING
  }
  SET_EXAMPLE: {
    payload: GetExampleResponse | ErrorResponse
    type: Actions.SET_EXAMPLE
  }
}

export default Actions
