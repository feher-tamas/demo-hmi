import { CSSProperties, ReactElement, useCallback, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { Box, BoxProps, Stack, styled, Typography } from '@mui/material'
import { DropPosition } from '../../../shared/types'
import { useDragContext } from '../context/DragContext'
import { useTranslation } from 'react-i18next'
import { useTabContentContext } from '@renderer/context/TabContentContext'

const centerVertically: CSSProperties = {
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  textAlign: 'center'
}
const centerHorizontally: CSSProperties = {
  marginTop: 'auto',
  marginBottom: 'auto',
  top: 0,
  bottom: 0,
  textAlign: 'center'
}
const horizontalSize: CSSProperties = {
  width: '80%',
  maxWidth: 'calc( 70% - 100px)',
  height: '20%',
  maxHeight: '220px'
}
const verticalSize: CSSProperties = {
  width: '15%',
  maxWidth: '220px',
  height: '80%'
}

const newStyles: CSSProperties = {
  width: 'calc( 100% - 50px)',
  height: 'calc( 100% - 50px)',
  top: '25px',
  left: '25px',
  textAlign: 'center'
}

const getTypeStyle = (type: DropPosition): CSSProperties => {
  switch (type) {
    case DropPosition.TOP:
      return {
        top: '25px',
        ...horizontalSize,
        ...centerVertically
      }
    case DropPosition.BOTTOM:
      return {
        bottom: '25px',
        ...horizontalSize,
        ...centerVertically
      }
    case DropPosition.LEFT:
      return {
        left: '25px',
        ...verticalSize,
        ...centerHorizontally
      }
    case DropPosition.RIGHT:
      return {
        right: '25px',
        ...verticalSize,
        ...centerHorizontally
      }
    case DropPosition.CENTER:
      return {
        margin: 'auto',
        width: '30%',
        maxWidth: '500px',
        height: '40%',
        maxHeight: '400px',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center'
      }
    case DropPosition.NEW:
      return newStyles
  }
}

type DeviceDropZoneProps = {
  type: DropPosition
  canDropMapPanel?: boolean
  onSensorDrop: (sensorId: number) => void
  onMapPanelDrop?: () => void
}

const DeviceDropZone = ({
  type,
  canDropMapPanel = false,
  onSensorDrop,
  onMapPanelDrop
}: DeviceDropZoneProps): ReactElement => {
  const { t } = useTranslation()
  const theme = useTheme()
  const [isOver, setIsOver] = useState<boolean>(false)
  const { isDragging, sensorId } = useDragContext()
  const { isDraggingMapPanel } = useTabContentContext()

  const onDragEnter = useCallback((event): void => {
    setIsOver(true)
    event.stopPropagation()
    event.preventDefault()
  }, [])
  const onDragLeave = useCallback((event): void => {
    setIsOver(false)
    event.stopPropagation()
    event.preventDefault()
  }, [])
  const onDragOver = useCallback((event): void => {
    event.stopPropagation()
    event.preventDefault()
  }, [])
  const onDrop = useCallback((): void => {
    setIsOver(false)

    if (sensorId != null) {
      onSensorDrop(sensorId)
    } else {
      onMapPanelDrop!()
    }
  }, [onSensorDrop, sensorId, onMapPanelDrop])

  return (
    <>
      {(isDragging || (canDropMapPanel && isDraggingMapPanel)) && (
        <DropBox
          type={type}
          isOver={isOver}
          isDraggingMapPanel={canDropMapPanel && isDraggingMapPanel}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Stack direction="column" sx={{ pointerEvents: 'none' }}>
            <Typography variant={isOver ? 'h1' : 'h2'} color={theme.palette.highlight}>
              +
            </Typography>
            {type === DropPosition.CENTER && (
              <Typography variant="subtitle2" color={theme.palette.text.primary}>
                {t('DragAndDrop.Replace')}
              </Typography>
            )}
          </Stack>
        </DropBox>
      )}
    </>
  )
}

export default DeviceDropZone

const DropBox = styled(Box, {
  shouldForwardProp: (prop: string) =>
    ['children', 'onDragEnter', 'onDragLeave', 'onDragOver', 'onDrop'].includes(prop)
})<BoxProps & { type: DropPosition; isOver: boolean; isDraggingMapPanel: boolean }>(
  ({ type, isOver, isDraggingMapPanel, theme }) => ({
    backgroundColor: `${theme.palette.highlight}${isOver ? '50' : '20'}`,
    border: `3px dashed ${theme.palette.highlight}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: '600',
    ...(isDraggingMapPanel ? newStyles : getTypeStyle(type))
  })
)
