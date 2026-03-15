import { useSortable } from '@dnd-kit/react/sortable'

import type { ShortcutType } from '@/shared/shortcuts/shortcut.types'
import { Button } from '@/components/ui/button'

type ShortcutProps = ShortcutType & {
  index: number
}

const Shortcut = ({ id, name, url, icon, index }: ShortcutProps) => {
  const { ref, isDragging } = useSortable({ id: id, index: index })

  return (
    <Button
      onClick={() => (window.location.href = url)}
      variant={'shortcut'}
      size={'shortcut'}
      className={isDragging ? 'shadow-2xl' : ''}
      id={id}
      data-name={name}
      ref={ref}
    >
      <img
        src={icon}
        alt={`${name} icon`}
        className='pointer-events-none size-9 object-contain'
      />
      {!isDragging && (
        <span className='pointer-events-none absolute top-full left-1/2 mt-1 w-20 -translate-x-1/2 overflow-hidden text-center text-sm font-normal text-ellipsis whitespace-nowrap'>
          {name}
        </span>
      )}
    </Button>
  )
}

export default Shortcut
