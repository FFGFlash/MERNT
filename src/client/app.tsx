import { ChangeEvent, useContext, useEffect } from 'react'
import tw from 'twin.macro'
import { getExample } from './actions'

import React from './assets/images/react.svg'
import { Actions, AppContext } from './context/app'
import useHash from './hooks/useHash'
import useKeyPress from './hooks/useKeyPress'
import useStorage from './hooks/useStorage'
import useToggle from './hooks/useToggle'

export default function App() {
  //* Get our HTML tag's classList
  const classes = document.documentElement.classList

  //* Create a storage state for darkMode - useful for remembering things even when the user refreshes
  const [darkMode, setDarkMode] = useStorage('darkMode', false)

  //* Update the classList on our HTML tag depending on the darkMode storage state
  classes[darkMode ? 'add' : 'remove']('dark')

  //* Remove the preload class from the HTML tag after initial page render
  useEffect(() => classes.remove('preload'), [])

  //* Declare toggle function for toggling the darkMode storage state
  const toggleDarkMode = () => setDarkMode(prev => !prev)

  //* Create a hash hook - allows for easy access to updating the hash location in the url
  const [hash, setHash] = useHash()

  //* Add a handler for changing the hash state
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setHash(e.target.value as string)

  //* Use App Context State
  const context = useContext(AppContext)
  const { Loading, Example, dispatch } = context

  //* Load data from the server and store it in App Context
  useEffect(() => {
    dispatch({ type: Actions.SET_LOADING, payload: Actions.SET_EXAMPLE })
    getExample({ id: hash.replace('#', '') }).then(res =>
      dispatch({ type: Actions.SET_EXAMPLE, payload: res })
    )
  }, [hash])

  //* Add a key press hook - simple key press handler that remembers between renders
  const pressingD = useKeyPress('d')

  //* Toggle dark mode storage state when user presses 'd' on their keyboard
  useEffect(() => {
    if (pressingD) {
      toggleDarkMode()
      toggleCheck()
    }
  }, [pressingD])

  //* Create a toggle hook - simple true or false toggle that remembers between renders
  const [check, toggleCheck] = useToggle()

  return (
    <AppWrapper data-testid="app-wrapper">
      <AppContainer>
        {/* Attach our toggleDarkMode function to IconButton */}
        <IconButton onClick={toggleDarkMode}>
          <ReactIcon />
        </IconButton>
        <h1>Your new app!</h1>
        <p>Built with NodeJS, ExpressJS, React, MongoDB and Typescript</p>
        <input type="text" onChange={handleChange} />
        <input type="checkbox" onChange={toggleCheck} checked={check} />
        <p>{hash || '#'}</p>
        {Loading[Actions.SET_EXAMPLE] ? (
          <p>Loading...</p>
        ) : (
          Object.values(Example).map(data => (
            <p key={data.id}>
              {data.id}: {data.name}
            </p>
          ))
        )}
      </AppContainer>
    </AppWrapper>
  )
}

const AppWrapper = tw.div`w-screen min-h-screen flex flex-col items-center justify-center text-center`
const AppContainer = tw.div`w-fit h-fit flex flex-col items-center justify-center gap-1 bg-blue-400 dark:bg-blue-600 rounded-xl px-10 py-7 shadow-lg border border-gray-900 dark:border-neutral-100`
const IconButton = tw.button`rounded-full border border-gray-900 dark:border-neutral-100 bg-neutral-100 dark:bg-neutral-800 overflow-visible hover:bg-neutral-200 hover:dark:bg-neutral-700`
const ReactIcon = tw(React)`w-64 h-64 p-10`
