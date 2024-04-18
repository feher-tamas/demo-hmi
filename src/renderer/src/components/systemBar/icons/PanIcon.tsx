import { useTheme } from '@mui/material'
import { ReactElement } from 'react'

type PanIconProps = {
  rotate: number
}

const PanIcon = ({ rotate = 180 }: PanIconProps): ReactElement => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary

  const fill =
    theme.palette.mode === 'light' ? theme.palette.background.paper : theme.palette.icon.secondary
  const stroke = borderColor
  const rotateTo = `rotate(${rotate} 0 0)`
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={rotateTo}
    >
      <mask id="path-1-inside-1_2061_30433" fill="white">
        <path d="M40 0L40 40L-1.74846e-06 40L0 -1.74846e-06L40 0Z" />
      </mask>
      <path d="M40 0L40 40L-1.74846e-06 40L0 -1.74846e-06L40 0Z" fill={fill} />
      <path
        d="M23 14L17 20L23 26"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 0L41 4.37114e-08L41 -1L40 -1L40 0ZM40 40L40 41L41 41L41 40L40 40ZM39 -4.37114e-08L39 40L41 40L41 4.37114e-08L39 -4.37114e-08ZM40 39L-1.70474e-06 39L-1.79217e-06 41L40 41L40 39ZM-4.37114e-08 0.999998L40 1L40 -1L4.37114e-08 -1L-4.37114e-08 0.999998Z"
        fill={fill}
        mask="url(#path-1-inside-1_2061_30433)"
      />
    </svg>
  )
}
export default PanIcon
