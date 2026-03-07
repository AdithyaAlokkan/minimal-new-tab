import { ThemeProvider } from '@/shared/Theme/ThemeProvider'
import AppShortcuts from '@/components/shortcuts/AppShortcuts'

export function App() {
  return (
    <>
      <ThemeProvider>
        <AppShortcuts />
      </ThemeProvider>
    </>
  )
}

export default App
