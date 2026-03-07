import clsx from 'clsx'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { useDroppable } from '@dnd-kit/react'

const ShortcutTrash = () => {
  const { isDropTarget, ref } = useDroppable({
    id: 'shortcutTrash',
  })

  return (
    <>
      <Button
        variant={'outline'}
        size={'icon'}
        className={clsx(
          'animate-slide-up fixed bottom-25 left-1/2 size-18 -translate-x-1/2 translate-y-1/2 rounded-full transition-all duration-150 ease-in-out',
          isDropTarget && 'bg-destructive/30! size-21',
        )}
        ref={ref}
      ></Button>
      <Trash className='animate-slide-up fixed bottom-25 left-1/2 size-5 -translate-x-1/2 translate-y-1/2 transition-all duration-150 ease-in-out' />
    </>
  )
}

export default ShortcutTrash
