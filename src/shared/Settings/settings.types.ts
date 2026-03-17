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

interface SettingsV3 {
  version: 3
  theme: {
    mode: 'dark' | 'system' | 'light' | 'custom'
    color: {
      background: string
      foreground: string
      card: string
      primary: string
      secondary: string
      accent: string
      destructive: string
    }
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

export type { SettingsV3 as Settings }

export type SettingsLegacy = SettingsV1 | SettingsV2 | SettingsV3
