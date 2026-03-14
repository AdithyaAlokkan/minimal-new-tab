import type { Settings } from './settings.types'

export const SettingsDefaults: Settings = {
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
