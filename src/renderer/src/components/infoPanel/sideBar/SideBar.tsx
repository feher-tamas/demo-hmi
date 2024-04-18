import { ReactElement } from 'react'
import { List } from '@mui/material'
import DeviceInfoButton from './buttons/DeviceInfoButton'
import PlotTrackInfoButton from './buttons/PlotTrackInfoButton'
import AlarmButton from './buttons/AlarmButton'
import { useInfoPanelContext } from '@renderer/context/InfoPanelContext'

const SideBar = (): ReactElement => {
  const { selectedInfoPanel, toggleSelectInfoPanel } = useInfoPanelContext()

  return (
    <List sx={{ height: '100%', width: '40px', padding: 0 }}>
      <DeviceInfoButton
        selected={selectedInfoPanel === 'DEVICE'}
        onClick={(): void => toggleSelectInfoPanel('DEVICE')}
      ></DeviceInfoButton>
      <PlotTrackInfoButton
        selected={selectedInfoPanel === 'PLOT_TRACK'}
        onClick={(): void => toggleSelectInfoPanel('PLOT_TRACK')}
      ></PlotTrackInfoButton>
      <AlarmButton
        selected={selectedInfoPanel === 'ALARM'}
        onClick={(): void => toggleSelectInfoPanel('ALARM')}
      ></AlarmButton>
    </List>
  )
}

export default SideBar
