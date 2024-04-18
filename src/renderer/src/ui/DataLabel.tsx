import { ReactElement } from 'react'
import { Stack, Typography } from '@mui/material'

type DataLabelProps = {
  label: string
  value: string | number
  prefix?: string
  suffix?: string
  color?: string
}

const DataLabel = ({ label, value, prefix, suffix, color }: DataLabelProps): ReactElement => {
  return (
    <Stack spacing="5px" direction="row">
      <Typography>{label}:</Typography>
      <Typography color={color}>{`${prefix ?? ''}${value}${suffix ?? ''}`}</Typography>
    </Stack>
  )
}

export default DataLabel
