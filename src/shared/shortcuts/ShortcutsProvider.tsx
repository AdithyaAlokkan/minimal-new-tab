import { useState } from 'react'
import type { SetStateAction } from 'react'

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
        localStorage.getItem('shortcuts') ?? JSON.stringify(initialShortcuts),
      )
      return stored
    } catch {
      return initialShortcuts
    }
  })

  const value = {
    shortcuts,
    setShortcuts: (action: SetStateAction<ShortcutType[]>) => {
      setShortcuts((prev) => {
        const next =
          typeof action === 'function'
            ? (action as (prev: ShortcutType[]) => ShortcutType[])(prev)
            : action

        localStorage.setItem(ShortcutsStorageKey, JSON.stringify(next))

        return next
      })
    },
  }

  return (
    <ShortcutsContext.Provider {...props} value={value}>
      {children}
    </ShortcutsContext.Provider>
  )
}
