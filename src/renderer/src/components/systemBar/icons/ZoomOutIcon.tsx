import { useTheme } from '@mui/material'
import { ReactElement } from 'react'

type ZoomInIconProps = {
  zoomFactor: number
  min?: number
}
const ZoomOutIcon = ({ zoomFactor, min }: ZoomInIconProps): ReactElement => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary

  const isDisabled =
    min != null
      ? zoomFactor <= min
      : // Default for window zoom
        zoomFactor <= 0.5
  const stroke = isDisabled ? theme.palette.disabled : borderColor

  return (
    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.5 9.5C7.70914 9.5 9.5 7.70914 9.5 5.5C9.5 3.29086 7.70914 1.5 5.5 1.5C3.29086 1.5 1.5 3.29086 1.5 5.5C1.5 7.70914 3.29086 9.5 5.5 9.5Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 10.5L8.32495 8.32501"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 5.5H7"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ZoomOutIcon
