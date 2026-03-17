import { useEffect } from 'react'
import type { Settings } from '@/shared/settings/settings.types'

export function useTheme(settings: Settings) {
  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateTheme = () => {
      root.classList.remove('light', 'dark', 'custom')

      if (settings.theme.mode === 'system') {
        const systemThemeMode = mediaQuery.matches ? 'dark' : 'light'
        root.classList.add(systemThemeMode)
        return
      }

      if (settings.theme.mode === 'custom') {
        document.documentElement.style.setProperty(
          '--custom-background',
          settings.theme.color.background,
        )
        document.documentElement.style.setProperty(
          '--custom-foreground',
          settings.theme.color.foreground,
        )
        document.documentElement.style.setProperty(
          '--custom-card',
          settings.theme.color.card,
        )
        document.documentElement.style.setProperty(
          '--custom-primary',
          settings.theme.color.primary,
        )
        document.documentElement.style.setProperty(
          '--custom-secondary',
          settings.theme.color.secondary,
        )
        document.documentElement.style.setProperty(
          '--custom-accent',
          settings.theme.color.accent,
        )
        document.documentElement.style.setProperty(
          '--custom-destructive',
          settings.theme.color.destructive,
        )
      }

      root.classList.add(settings.theme.mode)
    }

    updateTheme()
    mediaQuery.addEventListener('change', updateTheme)

    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [settings.theme])
}
