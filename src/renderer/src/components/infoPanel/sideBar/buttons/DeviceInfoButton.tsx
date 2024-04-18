import { Icon } from '@mui/material'
import DeviceInfoIcon from './icons/DeviceInfoIcon'
import { SelectableButton, SelectableButtonProps } from '../../../../ui/SelectableButton'
import { ReactElement } from 'react'

const DeviceInfoButton = (props: SelectableButtonProps): ReactElement => {
  const iconColor = props.selected ? 'secondary' : 'primary'
  return (
    <SelectableButton {...props}>
      <Icon>
        <DeviceInfoIcon mode={iconColor} />
      </Icon>
    </SelectableButton>
  )
}

export default DeviceInfoButton
