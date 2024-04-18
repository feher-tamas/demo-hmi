import { ReactElement } from 'react'
import { List } from '@mui/material'
import PositioningButton from '../toolPanel/buttons/PositioningButton'
import SelfTestButton from '../toolPanel/buttons/SelfTestButton'
import StartSurveillanceButton from '../toolPanel/buttons/StartSurveillanceButton'
import SurveillanceSettingsButton from '../toolPanel/buttons/SurveillanceSettingsButton'
import ArtilleryModeButton from '../toolPanel/buttons/ArtilleryModeButton'
import AutoDACButton from '../toolPanel/buttons/AutoDACButton'
import ManualDACButton from '../toolPanel/buttons/ManualDACButton'
import ClutterMapButton from '../toolPanel/buttons/ClutterMapButton'
import SpotWindowButton from '../toolPanel/buttons/SpotWindowButton'
import POISettingsButton from '../toolPanel/buttons/POISettingsButton'
import PointButton from '../toolPanel/buttons/PointButton'
import PathButton from '../toolPanel/buttons/PathButton'
import CircleIconButton from '../toolPanel/buttons/CircleIconButton'
import PoligonIconButton from '../toolPanel/buttons/PoligonIconButton'
import RulerIconButton from '../toolPanel/buttons/RulerIconButton'
import GoToPositionButton from '../toolPanel/buttons/GoToPositionButton'

type Props = {
  showSensorButtons?: boolean
}

const MapButtons = ({ showSensorButtons = true }: Props): ReactElement => {
  return (
    <List sx={{ maxHeight: 'calc(100vh - 80px)', width: '40px', padding: 0, overflow: 'auto' }}>
      {showSensorButtons && (
        <>
          <StartSurveillanceButton />
          <PositioningButton />
          <SurveillanceSettingsButton />
          <SelfTestButton />
          <ArtilleryModeButton />
          <AutoDACButton />
          <ManualDACButton />
          <ClutterMapButton />
          <SpotWindowButton />
        </>
      )}
      <POISettingsButton />
      <PointButton />
      <PathButton />
      <CircleIconButton />
      <PoligonIconButton />
      <RulerIconButton />
      <GoToPositionButton />
    </List>
  )
}
export default MapButtons
