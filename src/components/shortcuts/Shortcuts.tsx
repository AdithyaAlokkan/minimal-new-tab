import Shortcut from '@/components/shortcuts/Shortcut'
import ShortcutTrash from '@/components/shortcuts/ShortcutTrash'

import { useState } from 'react'
import type { ShortcutType } from '@/shared/shortcuts/shortcut.types'

import { DragDropProvider } from '@dnd-kit/react'
import { PointerSensor, PointerActivationConstraints } from '@dnd-kit/dom'
import { move } from '@dnd-kit/helpers'
import NewShortcutDialogue from './NewShortcutDialog'
import { useSettings } from '@/shared/settings/SettingsContext'
import { useShortcuts } from '@/shared/shortcuts/ShortcutsContext'

const Shortcuts = () => {
  const { shortcuts, setShortcuts } = useShortcuts()
  const { settings } = useSettings()
  const [isDraggingActive, setIsDraggingActive] = useState(false)

  if (!settings.layout.shortcuts.show) return

  return (
    <>
      <DragDropProvider
        sensors={[
          PointerSensor.configure({
            activationConstraints: [
              new PointerActivationConstraints.Distance({ value: 5 }),
              new PointerActivationConstraints.Delay({
                value: 250,
                tolerance: 10,
              }),
            ],
          }),
        ]}
        onDragStart={() => {
          setIsDraggingActive(true)
        }}
        onDragOver={(event) => {
          const newShortcuts = move(shortcuts, event)
          setShortcuts(newShortcuts)
        }}
        onDragEnd={({ operation }) => {
          if (operation.target?.id == 'shortcutTrash') {
            setShortcuts(
              shortcuts.filter(
                (shortcut: ShortcutType) => shortcut.id != operation.source?.id,
              ),
            )
          } else {
            setShortcuts(shortcuts)
          }
          setIsDraggingActive(false)
        }}
      >
        <div className='mx-auto grid min-w-md grid-cols-[repeat(auto-fit,calc(var(--spacing)*18))] grid-rows-[calc(var(--spacing)*1)_auto] justify-center gap-x-5 gap-y-10 px-[100px] pb-20 first:pt-30 md:px-[150px] lg:px-[250px] xl:px-[350px]'>
          <div className='col-span-full text-lg'>
            <div className='flex items-center gap-2'>
              <span>Shortcuts</span>
            </div>
          </div>
          {shortcuts &&
            shortcuts.length > 0 &&
            shortcuts.map((shortcut: ShortcutType, index: number) => (
              <Shortcut
                key={shortcut.id}
                id={shortcut.id}
                name={shortcut.name}
                url={shortcut.url}
                icon={shortcut.icon}
                index={index}
              />
            ))}
          <NewShortcutDialogue />
        </div>

        {isDraggingActive ? <ShortcutTrash /> : null}
      </DragDropProvider>
    </>
  )
}

export default Shortcuts
