import { useTheme } from '@mui/material/styles'
import { ReactElement } from 'react'

const AboutIcon = (): ReactElement => {
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.54492 4.4998C4.66247 4.16563 4.8945 3.88385 5.1999 3.70436C5.5053 3.52488 5.86437 3.45927 6.21351 3.51915C6.56265 3.57904 6.87933 3.76056 7.10746 4.03156C7.33559 4.30256 7.46045 4.64556 7.45992 4.9998C7.45992 5.9998 5.95992 6.4998 5.95992 6.4998"
        stroke={borderColor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 8.5H6.005"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default AboutIcon
