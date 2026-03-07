import { createContext, useContext } from 'react'

type ThemeMode = 'system' | 'light' | 'dark'

type Context = {
  themeMode: ThemeMode
  setThemeMode: (theMode: ThemeMode) => void
}

export const ThemeContext = createContext<Context | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
