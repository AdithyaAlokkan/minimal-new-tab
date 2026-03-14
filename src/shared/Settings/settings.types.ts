interface SettingsV1 {
  version: 1
  theme: {
    mode: 'dark' | 'system' | 'light'
  }
  layout: {
    clock: {
      showHide: boolean
      height: number
    }
    shortcuts: boolean
  }
}

interface SettingsV2 {
  version: 2
  theme: {
    mode: 'dark' | 'system' | 'light'
  }
  layout: {
    clock: {
      show: boolean
      height: number
    }
    shortcuts: {
      show: boolean
    }
  }
}

export type { SettingsV2 as Settings }

export type SettingsLegacy = SettingsV1 | SettingsV2
