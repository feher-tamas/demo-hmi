import { useTheme } from '@mui/material/styles'
import { Tooltip } from '@mui/material'

type BatteryProps = {
  batteryLevel: number
}

const DeviceBatteryIcon = ({ batteryLevel }: BatteryProps) => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary
  let batteryWidth = 0.14 * batteryLevel
  let batteryColor
  if (batteryLevel <= 5) {
    batteryColor = theme.palette.battery.critical
    batteryWidth = batteryWidth < 1 ? 1 : batteryWidth
  } else if (batteryLevel <= 20) {
    batteryColor = theme.palette.battery.low
    batteryWidth = batteryWidth < 2 ? 2 : batteryWidth
  } else {
    batteryColor = theme.palette.battery.normal
  }

  return (
    <Tooltip title={`${batteryLevel}%`}>
      <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="15" height="7" rx="2.16667" stroke={borderColor} />
        <path
          d="M16.5601 2.32031V5.20031C17.1418 4.95639 17.5201 4.38897 17.5201 3.76031C17.5201 3.13166 17.1418 2.56423 16.5601 2.32031Z"
          fill={borderColor}
        />
        <rect x="1" y="1" width={batteryWidth} height="6" rx="1.33333" fill={batteryColor} />
      </svg>
    </Tooltip>
  )
}

export default DeviceBatteryIcon
