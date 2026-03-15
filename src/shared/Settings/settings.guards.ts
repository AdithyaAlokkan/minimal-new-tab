import type { Settings } from '@/shared/settings/settings.types'

export function isSettings(value: unknown): value is Settings {
  if (typeof value !== 'object' || value === null) return false

  const v = value as Record<string, unknown>

  /**
   * Check version
   */
  if (v.version !== 2) return false

  /**
   * Check theme
   */
  if (typeof v.theme !== 'object' || v.theme === null) return false
  // Check theme -> mode
  const theme = v.theme as Record<string, unknown>
  if (!['dark', 'system', 'light'].includes(theme.mode as string)) return false

  /**
   * Check layout
   */
  if (typeof v.layout !== 'object' || v.layout === null) return false
  const layout = v.layout as Record<string, unknown>

  /* layout -> clock */
  if (typeof layout.clock !== 'object' || layout.clock === null) return false
  const clock = layout.clock as Record<string, unknown>

  // layout -> clock -> show
  if (typeof clock.show !== 'boolean') return false

  // layout -> clock -> height
  const height = clock.height
  if (
    typeof height !== 'number' ||
    !Number.isInteger(height) ||
    height < 0 ||
    height > 100
  ) {
    return false
  }

  /* Check layout -> shortcuts */
  if (typeof layout.shortcuts !== 'object' || layout.shortcuts === null)
    return false
  const shortcuts = layout.shortcuts as Record<string, unknown>
  // layout -> shortcuts -> show
  if (typeof shortcuts.show !== 'boolean') return false

  return true
}
