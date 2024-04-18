import { ReactElement } from 'react'
import BorderedGrid from '../../ui/BorderedGrid'
import { Alert, AlertTitle } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { useDragContext } from '../../context/DragContext'
import DeviceDropZone from '../../ui/DeviceDropZone'
import { DropPosition } from '../../../../shared/types'
import { Sensor } from 'src/shared/types'
import { defaultMapConfig } from '@renderer/utils/map-panel'

type NewTabProps = {
  addSensor: (sensor: Sensor) => void
}

const NewTab = ({ addSensor }: NewTabProps): ReactElement => {
  const { t } = useTranslation()
  const theme = useTheme()
  const { isDragging } = useDragContext()

  const info = (
    <Alert
      severity="info"
      variant="filled"
      icon={false}
      sx={{ color: theme.palette.text.primary, position: 'absolute', top: '20px', left: '20px' }}
    >
      <AlertTitle>{t('DragAndDrop.Title')}</AlertTitle>
      {t('DragAndDrop.Label')}{' '}
    </Alert>
  )
  const dropZone = <DeviceDropZone type={DropPosition.NEW} onSensorDrop={(sensorId) => {
    addSensor({sensorId, map: defaultMapConfig})
  }} />

  return (
    <BorderedGrid item container sx={{ height: '100%', position: 'relative' }}>
      {!isDragging ? info : dropZone}
    </BorderedGrid>
  )
}

export default NewTab
