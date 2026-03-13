import { useSettings } from '@/shared/Settings/SettingsContext'
import { useState, useEffect } from 'react'

const Clock = () => {
  const { settings } = useSettings()

  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [amPm, setAmPm] = useState('')

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })

    const updateTime = () => {
      const parts = formatter.formatToParts(new Date())
      setHour(parts.find((p) => p.type === 'hour')?.value || '')
      setMinute(parts.find((p) => p.type === 'minute')?.value || '')
      setAmPm(parts.find((p) => p.type === 'dayPeriod')?.value || '')
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!settings.layout.clock.showHide) return

  return (
    <div
      className={'flex w-full items-center justify-center'}
      style={{
        height: `${settings.layout.clock.height}%`,
        minHeight: 'fit-content',
      }}
    >
      <div className='m-10 flex'>
        <div className='text-6xl'>
          <span>
            {hour}:{minute}
          </span>
        </div>
        <div className='ml-3 self-end text-lg'>
          <span>{amPm}</span>
        </div>
      </div>
    </div>
  )
}

export default Clock
