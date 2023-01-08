import { useState } from 'react'

/**
 * Creates a react state that can be toggled
 * @param defaultValue - The initial state of the toggle
 * @returns The value and setter function
 */
export default function useToggle(defaultValue = false): [boolean, () => void] {
  const [value, setValue] = useState(defaultValue)
  const toggle = () => setValue(prev => !prev)
  return [value, toggle]
}
