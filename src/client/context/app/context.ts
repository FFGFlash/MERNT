import { createContext } from 'react'
import Actions, { ActionTypes, AppState } from './types'

//* Define the initial state of the App Context Data
export const InitialState: AppState = {
  Error: undefined,
  Message: undefined,
  Loading: {},
  Example: {}
}

//* Create the App Context
export const AppContext = createContext<
  AppState & { dispatch: React.Dispatch<ActionTypes[Actions]> }
>({
  ...InitialState,
  dispatch: () => undefined
})

export default AppContext
