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

export type { SettingsV1 as Settings }
