import { useState } from 'react'
import { ShortcutsContext } from '@/shared/shortcuts/ShortcutsContext'
import type { ShortcutType } from '@/shared/shortcuts/shortcut.types'

interface ShortcutsProviderProps {
  children?: React.ReactNode
  initialShortcuts?: ShortcutType[]
  ShortcutsStorageKey?: string
}

export function ShortcutsProvider({
  children,
  initialShortcuts = [],
  ShortcutsStorageKey = 'shortcuts',
  ...props
}: ShortcutsProviderProps) {
  const [shortcuts, setShortcuts] = useState<ShortcutType[]>(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem('shortcuts') ?? `${initialShortcuts}`,
      )
      return stored
    } catch {
      return initialShortcuts
    }
  })

  const value = {
    shortcuts,
    setShortcuts: (shortcuts: ShortcutType[]) => {
      localStorage.setItem(ShortcutsStorageKey, JSON.stringify(shortcuts))
      setShortcuts(shortcuts)
    },
  }

  return (
    <ShortcutsContext.Provider {...props} value={value}>
      {children}
    </ShortcutsContext.Provider>
  )
}
