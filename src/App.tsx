import { SettingsProvider } from '@/shared/settings/SettingsProvider'
import Clock from '@/components/clock/Clock'
import Shortcuts from '@/components/shortcuts/Shortcuts'
import SettingsDialog from '@/components/settings/SettingsDialog'
import { ShortcutsProvider } from '@/shared/shortcuts/ShortcutsProvider'

export function App() {
  return (
    <>
      <SettingsProvider>
        <Clock />
        <ShortcutsProvider>
          <Shortcuts />
          <SettingsDialog />
        </ShortcutsProvider>
      </SettingsProvider>
    </>
  )
}

export default App
