/* eslint-disable @typescript-eslint/ban-types */
import { useState } from 'react'

/**
 * Creates a react state that is also stored in localStorage
 * @param name - The name to use inside of localStorage
 * @param defaultValue - The default value to use
 * @returns The value and setter function
 */
export default function useStorage<T>(
  name: string,
  defaultValue: Exclude<T, Function>
): [
  Exclude<T, Function>,
  (
    newValue:
      | ((prev: Exclude<T, Function>) => Exclude<T, Function>)
      | Exclude<T, Function>
  ) => void
] {
  const storedValue = localStorage[name] && JSON.parse(localStorage[name])
  const [value, setValue] = useState(storedValue || defaultValue)
  return [
    value,
    newValue => {
      if (newValue instanceof Function) newValue = newValue(value)
      localStorage[name] = JSON.stringify(newValue)
      setValue(newValue)
    }
  ]
}
