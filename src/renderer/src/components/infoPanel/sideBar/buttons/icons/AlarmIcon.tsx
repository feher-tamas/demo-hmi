import { useTheme } from '@mui/material/styles'

type IconProps = {
  mode: 'primary' | 'secondary'
}

const AlarmIcon = ({ mode }: IconProps) => {
  const theme = useTheme()
  const color = mode == 'primary' ? theme.palette.icon.primary : theme.palette.icon.secondary

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 6.66663C15 5.34054 14.4732 4.06877 13.5355 3.13109C12.5979 2.19341 11.3261 1.66663 10 1.66663C8.67392 1.66663 7.40215 2.19341 6.46447 3.13109C5.52678 4.06877 5 5.34054 5 6.66663C5 12.5 2.5 14.1666 2.5 14.1666H17.5C17.5 14.1666 15 12.5 15 6.66663Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4417 17.5C11.2951 17.7526 11.0849 17.9622 10.8318 18.1079C10.5788 18.2537 10.292 18.3304 9.99999 18.3304C9.708 18.3304 9.42114 18.2537 9.16813 18.1079C8.91512 17.9622 8.70483 17.7526 8.55832 17.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default AlarmIcon
