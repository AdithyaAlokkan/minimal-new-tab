export type Settings = {
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
