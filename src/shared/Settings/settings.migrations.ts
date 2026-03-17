import type { Settings, SettingsLegacy } from '@/shared/settings/settings.types'

/**
 * Migration Functions
 */
function migrateV1toV2(
  settings: Extract<SettingsLegacy, { version: 1 }>,
): Extract<SettingsLegacy, { version: 2 }> {
  return {
    version: 2,
    theme: settings.theme,
    layout: {
      clock: {
        show: settings.layout.clock.showHide, // rename showHide → show
        height: settings.layout.clock.height,
      },
      shortcuts: {
        show: settings.layout.shortcuts, // wrap boolean in object
      },
    },
  }
}

function migrateV2toV3(
  settings: Extract<SettingsLegacy, { version: 2 }>,
): Extract<SettingsLegacy, { version: 3 }> {
  return {
    version: 3,
    theme: {
      mode: settings.theme.mode,
      color: {
        background: '',
        foreground: '',
        card: '',
        primary: '',
        secondary: '',
        accent: '',
        destructive: '',
      },
    },
    layout: settings.layout,
  }
}

/**
 * Map of Migration Functions by current version
 */
const migrations: {
  1: (
    settings: Extract<SettingsLegacy, { version: 1 }>,
  ) => Extract<SettingsLegacy, { version: 2 }>
  2: (
    settings: Extract<SettingsLegacy, { version: 2 }>,
  ) => Extract<SettingsLegacy, { version: 3 }>
} = {
  1: migrateV1toV2,
  2: migrateV2toV3,
}

/**
 * Orchestrator: migrate any old settings to the latest version
 */
export function migrateSettings(settings: SettingsLegacy): Settings {
  let current = settings
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type MigrationInput = any

  // Loop until the current version has no migration (i.e., it's the latest)
  while (current.version in migrations) {
    current = migrations[current.version as keyof typeof migrations](
      current as MigrationInput,
    )
  }

  return current as Settings
}
