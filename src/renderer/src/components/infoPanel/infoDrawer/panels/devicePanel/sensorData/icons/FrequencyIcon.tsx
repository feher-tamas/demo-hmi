import { ReactElement } from 'react'
import { useTheme } from '@mui/material/styles'

const FrequencyIcon = (): ReactElement => {
  const theme = useTheme()
  const color = theme.palette.text.primary
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13.3333 4.66699H2.66659C1.93021 4.66699 1.33325 5.26395 1.33325 6.00033V13.3337C1.33325 14.07 1.93021 14.667 2.66659 14.667H13.3333C14.0696 14.667 14.6666 14.07 14.6666 13.3337V6.00033C14.6666 5.26395 14.0696 4.66699 13.3333 4.66699Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.3333 1.33301L10 4.66634"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.58342 9.66634C6.58342 10.5408 5.87453 11.2497 5.00008 11.2497C4.12563 11.2497 3.41675 10.5408 3.41675 9.66634C3.41675 8.79189 4.12563 8.08301 5.00008 8.08301C5.87453 8.08301 6.58342 8.79189 6.58342 9.66634Z"
        stroke={color}
        strokeWidth="1.5"
      />
      <path d="M8.66675 10H12.6667" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.66675 8H12.6667" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.66675 12H12.6667" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default FrequencyIcon
