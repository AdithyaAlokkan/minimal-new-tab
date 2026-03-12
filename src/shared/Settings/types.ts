export type Settings = {
  theme: {
    mode: 'dark' | 'system' | 'light'
  }
  layout: {
    contents: {
      clock: boolean
      shortcuts: boolean
    }
  }
}
