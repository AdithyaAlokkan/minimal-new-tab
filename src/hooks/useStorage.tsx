import { useState, useEffect } from 'react'

function useStorage(key: string) {
  // Load storedValue from local storage or use newValue
  const [storedValue, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item === null ? [] : JSON.parse(item)
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
    }
  })

  // Update localStorage whenever storedValue changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  return [storedValue, setValue] as const
}

export default useStorage
