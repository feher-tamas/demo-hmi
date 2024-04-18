import { ReactElement, useEffect, useState } from 'react'
import { formatDate, formatTime } from '@renderer/utils/date-time'
import { useCommonSettings } from '@renderer/context/CommonSettings'
import { Box } from '@mui/material'

const CurrentDateTime = (): ReactElement => {
  const { dateFormat, timeFormat } = useCommonSettings()
  const [dateTime, setDateTime] = useState<{ date: string; time: string } | null>()

  useEffect(() => {
    const interval = setInterval(() => {
      if (dateFormat && timeFormat) {
        setDateTime({
          date: formatDate(new Date(), dateFormat),
          time: formatTime(new Date(), timeFormat)
        })
      }
    }, 1e3)

    return () => clearInterval(interval)
  }, [dateFormat, timeFormat])

  return (
    <Box sx={{ marginRight: '18px' }}>
      <div>
        {dateTime && (
          <>
            {dateTime.date} - <b>{dateTime.time}</b>
          </>
        )}
      </div>
    </Box>
  )
}

export default CurrentDateTime
