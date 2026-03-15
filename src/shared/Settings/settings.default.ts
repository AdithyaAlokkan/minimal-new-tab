import type { Settings } from '@/shared/settings/settings.types'

export const SettingsDefault: Settings = {
  version: 2,
  theme: {
    mode: 'system',
  },
  layout: {
    clock: {
      show: false,
      height: 100,
    },
    shortcuts: {
      show: true,
    },
  },
}
