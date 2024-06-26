import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'

const LogOutIcon = (): ReactElement => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V2.5C1.5 2.23478 1.60536 1.98043 1.79289 1.79289C1.98043 1.60536 2.23478 1.5 2.5 1.5H4.5"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.5L10.5 6L8 3.5"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 6H4.5"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default LogOutIcon
