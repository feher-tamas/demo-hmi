import { ReactElement } from 'react'
import { Stack, Typography } from '@mui/material'

type IconLabelProps = {
  icon: ReactElement
  value: string | number
  prefix?: string
  suffix?: string
  color?: string
}

const IconLabel = ({ icon, value, prefix, suffix, color }: IconLabelProps): ReactElement => {
  return (
    <Stack spacing="5px" direction="row">
      {icon}
      <Typography color={color}>{`${prefix ?? ''}${value}${suffix ?? ''}`}</Typography>
    </Stack>
  )
}

export default IconLabel
