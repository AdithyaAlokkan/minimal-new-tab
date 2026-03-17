import type { Settings } from '@/shared/settings/settings.types'

export const SettingsDefault: Settings = {
  version: 3,
  theme: {
    mode: 'system',
    color: {
      background: '#0a0a0a',
      foreground: '#fafafa',
      card: '#171717',
      primary: '#d4d4d4',
      secondary: '#404040',
      accent: '#404040',
      destructive: '#ff6467',
    },
  },
  layout: {
    clock: {
      show: false,
      height: 45,
    },
    shortcuts: {
      show: true,
    },
  },
}
