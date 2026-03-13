import type { Settings } from './SettingsType'

export const SettingsDefaults: Settings = {
  version: 1,
  theme: {
    mode: 'system',
  },
  layout: {
    clock: {
      showHide: false,
      height: 100,
    },
    shortcuts: true,
  },
}
