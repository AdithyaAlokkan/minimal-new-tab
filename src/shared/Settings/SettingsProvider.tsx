import { useState } from 'react'
import { SettingsContext } from '@/shared/settings/SettingsContext'
import type { Settings } from '@/shared/settings/settings.types'
import { SettingsDefault } from '@/shared/settings/settings.default'
import { migrateSettings } from '@/shared/settings/settings.migrations'
import { isSettings } from '@/shared/settings/settings.guards'
import { useTheme } from '@/hooks/useTheme'

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
      if (isSettings(migrated)) return migrated
      else {
        localStorage.setItem(
          settingsStorageKey,
          JSON.stringify(initialSettings),
        )
        return initialSettings
      }
    } catch {
      localStorage.setItem(settingsStorageKey, JSON.stringify(initialSettings))
      return initialSettings
    }
  })

  /*
   * Apply settings
   */
  useTheme(settings)
  /**/

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
