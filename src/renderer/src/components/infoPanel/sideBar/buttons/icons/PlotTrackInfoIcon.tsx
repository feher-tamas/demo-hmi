import { useTheme } from '@mui/material/styles'

type IconProps = {
  mode: 'primary' | 'secondary'
}

const PlotTrackInfoIcon = ({ mode }: IconProps) => {
  const theme = useTheme()
  const color = mode == 'primary' ? theme.palette.icon.primary : theme.palette.icon.secondary

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.99999 18.3334C14.6024 18.3334 18.3333 14.6025 18.3333 10.0001C18.3333 5.39771 14.6024 1.66675 9.99999 1.66675C5.39762 1.66675 1.66666 5.39771 1.66666 10.0001C1.66666 14.6025 5.39762 18.3334 9.99999 18.3334Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 13.3333V10"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 6.66675H10.0083"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PlotTrackInfoIcon
