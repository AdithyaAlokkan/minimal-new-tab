import { useEffect, useState } from 'react'
import { SettingsContext } from './SettingsContext'
import type { Settings } from './settings.types'
import { SettingsDefaults } from './settings.default'
import { migrateSettings } from './settings.migrations'
import { isSettings } from './settings.guards'

interface SettingsProviderProps {
  children?: React.ReactNode
  initialSettings?: Settings
  settingsStorageKey?: string
}

export function SettingsProvider({
  children,
  initialSettings = SettingsDefaults,
  settingsStorageKey = 'settings',
  ...props
}: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('settings') ?? 'null')
      const migrated = migrateSettings(stored)
      return isSettings(migrated) ? migrated : initialSettings
    } catch {
      return initialSettings
    }
  })

  useEffect(() => {
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
