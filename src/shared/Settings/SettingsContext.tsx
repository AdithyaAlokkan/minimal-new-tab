import type { Settings } from '@/shared/settings/settings.types'
import { createContext, useContext } from 'react'

type Context = {
  settings: Settings
  setSettings: (settings: Settings) => void
}

export const SettingsContext = createContext<Context | undefined>(undefined)

export const useSettings = () => {
  const context = useContext(SettingsContext)

  if (context === undefined)
    throw new Error('useSettings must be used within a SettingsProvider')

  return context
}
