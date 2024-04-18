import { useTheme } from '@mui/material'
import { ReactElement } from 'react'

const CloseIcon = (): ReactElement => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4L4 12"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 4L12 12"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CloseIcon
