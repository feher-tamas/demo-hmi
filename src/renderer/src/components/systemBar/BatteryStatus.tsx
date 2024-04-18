import { BatteryContext } from '@renderer/context/BatteryContext'
import { ReactElement, useContext } from 'react'
import { useTheme } from '@mui/material/styles'

const BatteryStatus = (): ReactElement => {
  const { batteryManagerNotLoaded } = useContext(BatteryContext)

  return batteryManagerNotLoaded ? <p>Unable to fetch battery status.</p> : <BatteryIcon />
}

export default BatteryStatus

export const BatteryIcon = (): ReactElement => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary

  const { batteryCapacity, batteryLevel, isCharging } = useContext(BatteryContext)

  return (
    <svg width="25" height="17" viewBox="0 0 25 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.833008" width="21" height="10.3333" rx="2.16667" stroke={borderColor} />
      <path
        d="M23 4V8C23.8079 7.66122 24.3333 6.87313 24.3333 6C24.3333 5.12687 23.8079 4.33878 23 4Z"
        fill={borderColor}
      />

      <rect
        x="2"
        y="2"
        width={batteryCapacity}
        height="8"
        rx="1.33333"
        fill={
          batteryLevel >= 0.2
            ? '#50B85E'
            : batteryLevel > 0.05 && batteryLevel < 0.2
            ? '#FFA41B'
            : '#FE1C1C'
        }
      />
      {isCharging && (
        <path
          d="M12 3L10 6H13L11 9"
          stroke={borderColor}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}
