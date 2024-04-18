import { ReactElement, useCallback, useRef } from 'react'
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import MoveIcon from './MoveIcon'
import { useTheme } from '@mui/material/styles'
import { useSensorsContext } from '../../context/SensorsContext'
import SensorDragGhost from '../../ui/SensorDragGhost'
import { Coordinates } from '../../context/SensorsContext'
import DataLabel from '../../ui/DataLabel'
import ExternalLinkIcon from '../icons/ExternalLinkIcon'
import CloseIcon from '../settings/icons/CloseIcon'
import { useTranslation } from 'react-i18next'
import { useTabContentContext } from '@renderer/context/TabContentContext'
import useFormat from '../../hooks/useFormat'
import CoordinateDataLabel from '../../ui/CoordinateDataLabel'

export type MouseMapPosition = {
  coordinates: Coordinates
  range: number
  azimuth: number
}

type MapPanelHeaderProps = {
  isOverview: boolean
  sensorId?: number
  mouse: MouseMapPosition
  canSwitch?: boolean
  onSwitch?: (sensorId: number) => void
  onStartDragging?: () => void
  onStopDragging?: () => void
  onCloseSensor?: () => void
}

const MapPanelHeader = ({
  isOverview,
  sensorId,
  mouse,
  canSwitch,
  onSwitch,
  onStartDragging,
  onStopDragging,
  onCloseSensor
}: MapPanelHeaderProps): ReactElement => {
  const coordinate = useFormat({ lat: mouse.coordinates.Lat, lng: mouse.coordinates.Lng })
  const coordinateList = coordinate?.split(',')
  const theme = useTheme()
  const { t } = useTranslation()
  const { findSensorById } = useSensorsContext()
  const {
    droppedOverMapPanelSensorId,
    isDroppingMapPanel,
    onMapPanelDragStart,
    onMapPanelDragEnd
  } = useTabContentContext()
  const ghostRef = useRef<HTMLDivElement>(null)
  const sensorData = sensorId == null ? null : findSensorById(sensorId)

  const onOpenSensorInNewWindow = useCallback(() => {
    onCloseSensor!()
    window.main.openSensorInNewWindow(sensorData!.name, sensorId)
  }, [onCloseSensor, sensorId, sensorData])

  const onDragStart = useCallback(
    (e) => {
      e.dataTransfer.setDragImage(ghostRef.current, 0, 0)
      setTimeout(() => {
        onStartDragging!()
        onMapPanelDragStart(sensorId!)
      })
    },
    [onStartDragging, sensorId, onMapPanelDragStart]
  )

  const onDragEnd = useCallback(() => {
    if (isDroppingMapPanel) {
      onSwitch!(droppedOverMapPanelSensorId!)
    }

    onStopDragging!()
    onMapPanelDragEnd()
  }, [isDroppingMapPanel, droppedOverMapPanelSensorId, onSwitch, onStopDragging, onMapPanelDragEnd])

  const divider = (
    <Divider
      sx={{ borderColor: theme.palette.text.primary, margin: '5px !important' }}
      orientation="vertical"
      flexItem
    />
  )

  return (
    <Stack
      direction="row"
      alignItems="top"
      justifyContent="space-between"
      bgcolor={theme.palette.background.default}
    >
      <Stack direction="row" spacing="5px" flexWrap="wrap" p="5px" divider={divider}>
        {sensorData && (
          <Stack direction="row" spacing="5px" alignItems="center" divider={divider}>
            <Typography noWrap>{sensorData.name}</Typography>
            <Typography variant="button">
              {t(`Sensors.SensorStatus.${sensorData.status}`)}
            </Typography>
          </Stack>
        )}
        <Stack direction="row" spacing="20px" alignItems="center" ml="0 !important">
          <CoordinateDataLabel
            coordinateList={coordinateList}
            inline
            altitude={0}
          />
          <DataLabel
            label={t('Coordinates.Range')}
            value={mouse.range}
            color={theme.palette.highlight}
            suffix={'m'}
          />
          <DataLabel
            label={t('Coordinates.Azimuth')}
            value={mouse.azimuth}
            color={theme.palette.highlight}
          />
        </Stack>
      </Stack>
      {!isOverview && (
        <Stack direction="row" alignItems="center">
          <Box>
            <IconButton onClick={onOpenSensorInNewWindow}>
              <ExternalLinkIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton draggable={canSwitch} onDragStart={onDragStart} onDragEnd={onDragEnd}>
              <MoveIcon />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={onCloseSensor}>
              <CloseIcon />
            </IconButton>
          </Box>
          <SensorDragGhost
            ref={ghostRef}
            name={sensorData!.name}
            power={sensorData!.power}
          ></SensorDragGhost>
        </Stack>
      )}
    </Stack>
  )
}

export default MapPanelHeader
