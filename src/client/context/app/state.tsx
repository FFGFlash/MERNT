import { useReducer } from 'react'
import AppContext, { InitialState } from './context'
import AppReducer from './reducer'

/**
 * App Context Wrapper
 * @param props
 * @returns
 */
export default function AppState({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(AppReducer, InitialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}
