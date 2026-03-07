import { useEffect, useState } from 'react'
import { ThemeContext } from '@/shared/Theme/ThemeContext'

type ThemeMode = 'system' | 'light' | 'dark'

interface ThemeProviderProps {
  children?: React.ReactNode
  defaultThemeMode?: ThemeMode
  themeStorageKey?: string
}

export function ThemeProvider({
  children,
  defaultThemeMode = 'system',
  themeStorageKey = 'settingThemeMode',
  ...props
}: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    (localStorage.getItem(themeStorageKey) as ThemeMode) || defaultThemeMode,
  )

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateTheme = () => {
      root.classList.remove('light', 'dark')

      if (themeMode === 'system') {
        const systemThemeMode = mediaQuery.matches ? 'dark' : 'light'

        root.classList.add(systemThemeMode)

        return
      }

      root.classList.add(themeMode)
    }
    updateTheme()

    mediaQuery.addEventListener('change', updateTheme)

    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [themeMode])

  const value = {
    themeMode,
    setThemeMode: (themeMode: ThemeMode) => {
      localStorage.setItem(themeStorageKey, themeMode)
      setThemeMode(themeMode)
    },
  }

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
