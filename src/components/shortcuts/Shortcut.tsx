import clsx from 'clsx'

import { useSortable } from '@dnd-kit/react/sortable'

import type { ShortcutType } from '@/types/ShortcutType'
import { useState } from 'react'

type ShortcutProps = ShortcutType & {
  index: number
}

const Shortcut = ({ id, name, url, icon, index }: ShortcutProps) => {
  const [isMouseOver, setIsMouseOver] = useState(false)

  const { ref, isDragging } = useSortable({ id: id, index: index })

  return (
    <a
      id={id}
      href={url}
      data-name={name}
      ref={ref}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      className={clsx(
        'bg-foreground/5! focus:bg-foreground/10! inset-shadow-border relative inline-flex size-18 items-center justify-center rounded-3xl backdrop-blur-sm transition duration-150 ease-in-out focus:inset-shadow-xs focus:outline-none',
        {
          'bg-foreground/10! inset-shadow-xs': isMouseOver || isDragging,
          'scale-105 shadow-lg': isDragging,
        },
      )}
    >
      {isDragging ? (
        <>
          <img
            src={icon}
            alt={`${name} icon`}
            className='pointer-events-none size-10 object-contain'
          />
        </>
      ) : (
        <>
          <img
            src={icon}
            alt={`${name} icon`}
            className='pointer-events-none size-10 object-contain'
          />
          <div className='label absolute -bottom-7 w-20 overflow-hidden text-center text-sm text-ellipsis whitespace-nowrap'>
            {name}
          </div>
        </>
      )}
    </a>
  )
}

export default Shortcut
