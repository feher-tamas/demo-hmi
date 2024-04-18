import { ReactElement, useCallback, useState } from 'react'
import Compass from './Compass'
import { Grid, useTheme } from '@mui/material'
import emotionStyled from '@emotion/styled'
import DeviceDropZone from '../../ui/DeviceDropZone'
import {
  DropPosition,
  Horizontal,
  SensorsConfig,
  Vertical,
  MapConfig
} from '../../../../shared/types'
import MapPanelHeader, { MouseMapPosition } from './MapPanelHeader'
import { useTabContentContext } from '@renderer/context/TabContentContext'
import Map from './Map'
import { useSensorsContext } from '@renderer/context/SensorsContext'
import { defaultMapConfig } from '@renderer/utils/map-panel'

type MapPanelContentProps = {
  sensorId?: number
  mapConfig: MapConfig
  isOverview?: boolean
  isHorizontal?: boolean
  isVertical?: boolean
  onSensorsChange?: (sensors: SensorsConfig) => void
  onCloseSensor?: () => void
}

const dummyMouseData: MouseMapPosition = {
  coordinates: {
    Lat: 47.5858407,
    Lng: 19.3098179
  },
  range: 38194.0,
  azimuth: 2.5
}

const MapPanelContent = ({
  sensorId,
  mapConfig,
  isOverview = false,
  isHorizontal = false,
  isVertical = false,
  onSensorsChange,
  onCloseSensor
}: MapPanelContentProps): ReactElement => {
  const { selectedSensor, toggleSelectSensor } = useSensorsContext()
  const { draggingMapPanelSensorId, onMapPanelDrop: onTabContentContextMapPanelDrop } =
    useTabContentContext()
  const [isDragging, setIsDragging] = useState(false)
  const theme = useTheme()

  const onMapPanelDrop = useCallback(() => {
    onSensorsChange!({ sensorId: draggingMapPanelSensorId!, map: defaultMapConfig })
    onTabContentContextMapPanelDrop(sensorId!)
  }, [draggingMapPanelSensorId, sensorId, onSensorsChange, onTabContentContextMapPanelDrop])

  const onStartDragging = useCallback(() => {
    setIsDragging(true)
  }, [])

  const onStopDragging = useCallback(() => {
    setIsDragging(false)
  }, [])

  const onClickPanel = useCallback(() => {
    if (!isOverview) {
      toggleSelectSensor(sensorId!, true)
    }
  }, [isOverview, sensorId, toggleSelectSensor])

  return (
    <Grid
      container
      direction="column"
      sx={{
        visibility: isDragging ? 'hidden' : 'visible',
        border: `1px solid ${
          !isOverview && !!selectedSensor && selectedSensor.id === sensorId
            ? theme.palette.highlight
            : 'transparent'
        }`
      }}
      onClick={onClickPanel}
    >
      <MapPanelHeader
        isOverview={isOverview}
        sensorId={sensorId}
        mouse={dummyMouseData}
        canSwitch={isVertical || isHorizontal}
        onSwitch={(sensorId) => {
          onSensorsChange!({ sensorId, map: defaultMapConfig })
        }}
        onStartDragging={onStartDragging}
        onStopDragging={onStopDragging}
        onCloseSensor={onCloseSensor}
      ></MapPanelHeader>
      <Grid item xs>
        <TabContentWrapper>
          <Map
            mapConfig={mapConfig}
            onMapConfigChange={(mapConfig) => {
              onSensorsChange!({ sensorId, map: mapConfig })
            }}
          />
          <Compass rotate={20} />
          {!isVertical && !isOverview && (
            <>
              <DeviceDropZone
                type={DropPosition.TOP}
                onSensorDrop={(newSensorId): void =>
                  onSensorsChange!({
                    top: { sensorId: newSensorId, map: defaultMapConfig },
                    bottom: { sensorId, map: mapConfig }
                  } as Vertical)
                }
              />
              <DeviceDropZone
                type={DropPosition.BOTTOM}
                onSensorDrop={(newSensorId): void =>
                  onSensorsChange!({
                    bottom: { sensorId: newSensorId, map: defaultMapConfig },
                    top: { sensorId, map: mapConfig }
                  } as Vertical)
                }
              />
            </>
          )}
          {!isHorizontal && !isOverview && (
            <>
              <DeviceDropZone
                type={DropPosition.LEFT}
                onSensorDrop={(newSensorId): void =>
                  onSensorsChange!({
                    left: { sensorId: newSensorId, map: defaultMapConfig },
                    right: { sensorId, map: mapConfig }
                  } as Horizontal)
                }
              />
              <DeviceDropZone
                type={DropPosition.RIGHT}
                onSensorDrop={(newSensorId): void =>
                  onSensorsChange!({
                    right: { sensorId: newSensorId, map: defaultMapConfig },
                    left: { sensorId, map: mapConfig }
                  } as Horizontal)
                }
              />
            </>
          )}
          {!isOverview && (
            <DeviceDropZone
              type={DropPosition.CENTER}
              canDropMapPanel
              onSensorDrop={(sensorId) => {
                onSensorsChange!({ sensorId, map: defaultMapConfig })
              }}
              onMapPanelDrop={onMapPanelDrop}
            />
          )}
        </TabContentWrapper>
      </Grid>
    </Grid>
  )
}

export default MapPanelContent

const TabContentWrapper = emotionStyled.div`
  position: relative;
  height: 100%;
`
