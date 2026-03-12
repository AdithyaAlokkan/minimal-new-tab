import { useEffect, useState } from 'react'
import { SettingsContext } from './SettingsContext'
import type { Settings } from './types'
import { defaultSettings } from './defaultSettings'

interface SettingsProviderProps {
  children?: React.ReactNode
  initialSettings?: Settings
  settingsStorageKey?: string
}

export function SettingsProvider({
  children,
  initialSettings = defaultSettings,
  settingsStorageKey = 'settings',
  ...props
}: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(() => {
    const stored = localStorage.getItem(settingsStorageKey)
    return stored ? JSON.parse(stored) : initialSettings
  })

  useEffect(() => {
    console.log('Settings Effect Run')
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateTheme = () => {
      root.classList.remove('light', 'dark')
      if (settings.theme.mode === 'system') {
        const systemThemeMode = mediaQuery.matches ? 'dark' : 'light'
        root.classList.add(systemThemeMode)
        return
      }
      root.classList.add(settings.theme.mode)
    }
    updateTheme()
    mediaQuery.addEventListener('change', updateTheme)
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [settings.theme])

  const value = {
    settings,
    setSettings: (settings: Settings) => {
      localStorage.setItem(settingsStorageKey, JSON.stringify(settings))
      setSettings(settings)
    },
  }

  return (
    <SettingsContext.Provider {...props} value={value}>
      {children}
    </SettingsContext.Provider>
  )
}
