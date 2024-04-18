import { Icon } from '@mui/material'
import AlarmIcon from './icons/AlarmIcon'
import { SelectableButton, SelectableButtonProps } from '../../../../ui/SelectableButton'
import { ReactElement } from 'react'

const AlarmButton = (props: SelectableButtonProps): ReactElement => {
  const iconColor = props.selected ? 'secondary' : 'primary'
  return (
    <SelectableButton {...props}>
      <Icon>
        <AlarmIcon mode={iconColor} />
      </Icon>
    </SelectableButton>
  )
}

export default AlarmButton
