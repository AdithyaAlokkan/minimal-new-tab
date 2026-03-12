import { SettingsProvider } from '@/shared/Settings/SettingsProvider'
import Clock from '@/components/Clock'
import Shortcuts from '@/components/shortcuts/Shortcuts'
import SettingsDialog from '@/components/settings/SettingsDialog'

export function App() {
  return (
    <>
      <SettingsProvider>
        <Clock />
        <Shortcuts />
        <SettingsDialog />
      </SettingsProvider>
    </>
  )
}

export default App
