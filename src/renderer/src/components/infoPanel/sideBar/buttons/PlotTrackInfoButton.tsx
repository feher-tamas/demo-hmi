import { Icon } from '@mui/material'
import PlotTrackInfoIcon from './icons/PlotTrackInfoIcon'
import { SelectableButton, SelectableButtonProps } from '../../../../ui/SelectableButton'
import { ReactElement } from 'react'

const PlotTrackInfoButton = (props: SelectableButtonProps): ReactElement => {
  const iconColor = props.selected ? 'secondary' : 'primary'
  return (
    <SelectableButton {...props}>
      <Icon>
        <PlotTrackInfoIcon mode={iconColor} />
      </Icon>
    </SelectableButton>
  )
}

export default PlotTrackInfoButton
