import { useEffect, useState } from 'react'
import { SettingsContext } from '@/shared/settings/SettingsContext'
import type { Settings } from '@/shared/settings/settings.types'
import { SettingsDefault } from '@/shared/settings/settings.default'
import { migrateSettings } from '@/shared/settings/settings.migrations'
import { isSettings } from '@/shared/settings/settings.guards'

interface SettingsProviderProps {
  children?: React.ReactNode
  initialSettings?: Settings
  settingsStorageKey?: string
}

export function SettingsProvider({
  children,
  initialSettings = SettingsDefault,
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
