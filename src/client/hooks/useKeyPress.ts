import { useEffect, useState } from 'react'

/**
 * Creates a react state which listens for a specific keyboard event key
 * @param key - The key to listen for
 * @returns whether or not the key is pressed
 */
export default function useKeyPress(key: string) {
  const [keyPressed, setKeyPressed] = useState(false)
  const handleKeyDown = (e: KeyboardEvent) =>
    e.key === key && setKeyPressed(true)
  const handleKeyUp = (e: KeyboardEvent) =>
    e.key === key && setKeyPressed(false)
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  })
  return keyPressed
}
