import { useCallback, useEffect, useState } from 'react'

/**
 * Creates a react state for storing the hash location
 * @returns the hash location and setter function
 */
export default function useHash(): [string, (newHash: string) => void] {
  const [hash, setHash] = useState(() => window.location.hash)
  const handleHashChange = useCallback(() => setHash(window.location.hash), [])
  const updateHash = useCallback(
    (newHash: string) => newHash !== hash && (window.location.hash = newHash),
    [hash]
  )
  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  })
  return [hash, updateHash]
}
