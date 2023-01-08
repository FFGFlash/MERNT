import Actions, { ActionTypes, AppState } from './types'

/**
 * Updates App Context Data based on Dispatch Actions
 * @param state - App Context Data
 * @param action - Dispatch action
 * @returns New App Context Data
 */
export default function AppReducer<K extends keyof ActionTypes>(
  state: AppState,
  action:
    | ActionTypes[K]
    | { type: Actions; payload: { status: number; message?: string } }
): AppState {
  let error: number | undefined, message: string | undefined
  if (typeof action.payload === 'object') {
    'status' in action.payload && (error = action.payload.status)
    'message' in action.payload && (message = action.payload.message)
  }

  switch (action.type) {
    case Actions.SET_LOADING:
      return typeof action.payload === 'string'
        ? {
            ...state,
            Loading: { ...state.Loading, [action.payload]: true },
            Error: error,
            Message: message
          }
        : {
            ...state,
            Error: error,
            Message: message
          }
    case Actions.SET_EXAMPLE:
      return 'results' in action.payload
        ? {
            ...state,
            Loading: { ...state.Loading, [action.type]: false },
            Example: action.payload.results.reduce(
              (obj, val) => ({ ...obj, [val.id]: val }),
              {}
            ),
            Error: error,
            Message: message
          }
        : {
            ...state,
            Loading: { ...state.Loading, [action.type]: false },
            Error: error,
            Message: message
          }
    default:
      throw new Error(
        `Invalid action type ${(action as { type: unknown }).type}`
      )
  }
}
