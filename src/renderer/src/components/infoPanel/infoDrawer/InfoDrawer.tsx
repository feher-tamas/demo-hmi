import { ReactElement } from 'react'
import styled from '@emotion/styled'
import DevicePanel from './panels/devicePanel/DevicePanel'
import PlotTrackPanel from './panels/PlotTrackPanel'
import AlarmPanel from './panels/AlarmPanel'
import { useInfoPanelContext } from '@renderer/context/InfoPanelContext'

const InfoDrawer = (): ReactElement => {
  const { selectedInfoPanel } = useInfoPanelContext()

  let content
  switch (selectedInfoPanel) {
    case 'DEVICE':
      content = <DevicePanel></DevicePanel>
      break
    case 'PLOT_TRACK':
      content = <PlotTrackPanel></PlotTrackPanel>
      break
    case 'ALARM':
      content = <AlarmPanel></AlarmPanel>
      break
    default:
      content = undefined
  }

  return <InfoDrawerDiv expanded={!!selectedInfoPanel}>{content}</InfoDrawerDiv>
}

export default InfoDrawer

const InfoDrawerDiv = styled.div(({ expanded }: { expanded: boolean }) => ({
  width: expanded ? 230 : 0,
  height: '100%',
  overflow: 'hidden'
}))
