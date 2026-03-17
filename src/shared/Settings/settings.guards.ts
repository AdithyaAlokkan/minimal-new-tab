import type { Settings } from '@/shared/settings/settings.types'

function isHexColor(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
  )
}

export function isSettings(value: unknown): value is Settings {
  if (typeof value !== 'object' || value === null) return false

  const v = value as Record<string, unknown>

  /**
   * Check version
   */
  if (v.version !== 3) return false

  /**
   * Check theme
   */
  if (typeof v.theme !== 'object' || v.theme === null) return false
  const theme = v.theme as Record<string, unknown>

  // theme -> mode
  if (!['dark', 'system', 'light', 'custom'].includes(theme.mode as string))
    return false

  // theme -> color
  if (typeof theme.color !== 'object' || theme.color === null) return false
  const color = theme.color as Record<string, unknown>

  if (!isHexColor(color.background)) return false
  if (!isHexColor(color.foreground)) return false
  if (!isHexColor(color.card)) return false
  if (!isHexColor(color.primary)) return false
  if (!isHexColor(color.secondary)) return false
  if (!isHexColor(color.accent)) return false
  if (!isHexColor(color.destructive)) return false

  /**
   * Check layout
   */
  if (typeof v.layout !== 'object' || v.layout === null) return false
  const layout = v.layout as Record<string, unknown>

  /* layout -> clock */
  if (typeof layout.clock !== 'object' || layout.clock === null) return false
  const clock = layout.clock as Record<string, unknown>

  if (typeof clock.show !== 'boolean') return false

  const height = clock.height
  if (
    typeof height !== 'number' ||
    !Number.isInteger(height) ||
    height < 0 ||
    height > 100
  ) {
    return false
  }

  /* layout -> shortcuts */
  if (typeof layout.shortcuts !== 'object' || layout.shortcuts === null)
    return false
  const shortcuts = layout.shortcuts as Record<string, unknown>

  if (typeof shortcuts.show !== 'boolean') return false

  return true
}
