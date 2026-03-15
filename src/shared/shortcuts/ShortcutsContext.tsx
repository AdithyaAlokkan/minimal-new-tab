import type { ShortcutType } from '@/shared/shortcuts/shortcut.types'
import { createContext, useContext } from 'react'

type Context = {
  shortcuts: ShortcutType[]
  setShortcuts: (shortcuts: ShortcutType[]) => void
}

export const ShortcutsContext = createContext<Context | undefined>(undefined)

export const useShortcuts = () => {
  const context = useContext(ShortcutsContext)

  if (context === undefined)
    throw new Error('useShortcuts must be used within a ShortcutsProvider')

  return context
}
