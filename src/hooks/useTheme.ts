import { useEffect } from 'react'
import type { Settings } from '@/shared/settings/settings.types'

export function useTheme(settings: Settings) {
  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateTheme = () => {
      root.classList.remove('light', 'dark')

      if (settings.theme.mode === 'system') {
        const systemThemeMode = mediaQuery.matches ? 'dark' : 'light'
        root.classList.add(systemThemeMode)
        return
      }

      root.classList.add(settings.theme.mode)
    }

    updateTheme()
    mediaQuery.addEventListener('change', updateTheme)

    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [settings.theme])
}
