import { Horizontal, Sensor, SensorsConfig, Vertical } from '../../../../shared/types'
import { ReactElement } from 'react'
import { Grid } from '@mui/material'
import MapPanelContent from './MapPanelContent'
import { isHorizontalPanel, isSinglePanel } from '@renderer/utils/map-panel'

type MapPanelProps = {
  sensors: SensorsConfig
  isHorizontal: boolean
  isVertical: boolean
  halfWidth?: boolean
  onSensorsChange: (sensors: SensorsConfig) => void
  onCloseSensor: () => void
}

const MapPanel = ({
  sensors,
  isHorizontal,
  isVertical,
  halfWidth,
  onSensorsChange,
  onCloseSensor
}: MapPanelProps): ReactElement => {
  if (isSinglePanel(sensors)) {
    return (
      <Grid container item xs={halfWidth ? 6 : 12}>
        <MapPanelContent
          sensorId={(sensors as Sensor).sensorId}
          mapConfig={(sensors as Sensor).map}
          isHorizontal={isHorizontal}
          isVertical={isVertical}
          onSensorsChange={onSensorsChange}
          onCloseSensor={onCloseSensor}
        ></MapPanelContent>
      </Grid>
    )
  } else if (isHorizontalPanel(sensors)) {
    return (
      <Grid item container xs={halfWidth ? 6 : 12}>
        <MapPanel
          sensors={(sensors as Horizontal).left}
          halfWidth
          isHorizontal={true}
          isVertical={isVertical}
          onSensorsChange={(leftSensors): void =>
            onSensorsChange({ ...(sensors as Horizontal), left: leftSensors as Vertical })
          }
          onCloseSensor={(): void => {
            onSensorsChange((sensors as Horizontal).right)
          }}
        />
        <MapPanel
          sensors={(sensors as Horizontal).right}
          halfWidth
          isHorizontal={true}
          isVertical={isVertical}
          onSensorsChange={(rightSensors): void =>
            onSensorsChange({ ...(sensors as Horizontal), right: rightSensors as Vertical })
          }
          onCloseSensor={(): void => {
            onSensorsChange((sensors as Horizontal).left)
          }}
        />
      </Grid>
    )
  } else {
    return (
      <Grid item container xs={halfWidth ? 6 : 12}>
        <MapPanel
          sensors={(sensors as Vertical).top}
          isHorizontal={isHorizontal}
          isVertical={true}
          onSensorsChange={(topSensors): void =>
            onSensorsChange({ ...(sensors as Vertical), top: topSensors as Horizontal })
          }
          onCloseSensor={(): void => {
            onSensorsChange((sensors as Vertical).bottom)
          }}
        />
        <MapPanel
          sensors={(sensors as Vertical).bottom}
          isHorizontal={isHorizontal}
          isVertical={true}
          onSensorsChange={(bottomSensors): void =>
            onSensorsChange({ ...(sensors as Vertical), bottom: bottomSensors as Horizontal })
          }
          onCloseSensor={(): void => {
            onSensorsChange((sensors as Vertical).top)
          }}
        />
      </Grid>
    )
  }
}
export default MapPanel
