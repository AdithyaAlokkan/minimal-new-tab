import clsx from 'clsx'
import { Trash } from 'lucide-react'

import { useDroppable } from '@dnd-kit/react'

const ShortcutTrash = () => {
  const { isDropTarget, ref } = useDroppable({
    id: 'shortcutTrash',
  })

  return (
    <>
      <div
        className={clsx(
          'animate-slide-up transition-size bg-foreground/10 inset-shadow-border fixed bottom-25 left-1/2 flex size-18 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full inset-shadow-xs duration-150 ease-in-out',
          isDropTarget && 'bg-destructive/20! size-20',
        )}
        ref={ref}
      >
        <Trash />
      </div>
    </>
  )
}

export default ShortcutTrash
