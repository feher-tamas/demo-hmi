import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'

type PowerIconProps = {
  mode: 'on' | 'off'
}

const PowerIcon = ({ mode }: PowerIconProps): ReactElement => {
  const theme = useTheme()
  const color = mode == 'on' ? theme.palette.highlight : theme.palette.primary.main

  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.24 4.42676C13.0789 5.26595 13.6502 6.33505 13.8815 7.49888C14.1129 8.66272 13.9939 9.86902 13.5398 10.9653C13.0856 12.0615 12.3165 12.9985 11.3299 13.6577C10.3432 14.3169 9.18328 14.6687 7.99668 14.6687C6.81007 14.6687 5.65011 14.3169 4.66346 13.6577C3.67681 12.9985 2.90777 12.0615 2.45359 10.9653C1.9994 9.86902 1.88047 8.66272 2.11182 7.49888C2.34317 6.33505 2.91442 5.26595 3.75334 4.42676"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 1.33325V7.99992"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PowerIcon
