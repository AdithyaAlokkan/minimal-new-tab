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

  if (!settings.layout.clock) return

  return (
    <div
      className={`flex w-full items-center justify-center p-10`}
      style={{
        height: `${settings.layout.clock.height}%`,
        minHeight: 'fit-content',
      }}
    >
      <div className='flex'>
        <div className='text-6xl'>
          <span>{hour}</span> : <span>{minute}</span>
        </div>
        <div className='ml-3 self-end text-lg'>
          <span>{amPm}</span>
        </div>
      </div>
    </div>
  )
}

export default Clock
