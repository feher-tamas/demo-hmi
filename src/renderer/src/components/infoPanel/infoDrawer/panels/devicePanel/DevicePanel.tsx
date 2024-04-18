import { ReactElement } from 'react'
import SensorGroupItem from './SensorGroup'
import { useSensorsContext } from '../../../../../context/SensorsContext'
import DeviceAccordion from './DeviceAccordion'
import { useTranslation } from 'react-i18next'

const DevicePanel = (): ReactElement => {
  const { t } = useTranslation()
  const { remoteSensors, localSensors, selectedSensorGroup, toggleSelectSensorGroup } =
    useSensorsContext()

  return (
    <>
      <DeviceAccordion
        title={t('Sensors.Remote.Title', { count: remoteSensors.length })}
        disabled={remoteSensors.length === 0}
        expanded={selectedSensorGroup === 'REMOTE'}
        onClick={(): void => toggleSelectSensorGroup('REMOTE')}
      >
        <SensorGroupItem sensors={remoteSensors} isRemote></SensorGroupItem>
      </DeviceAccordion>
      <DeviceAccordion
        title={t('Sensors.Local.Title', { count: localSensors.length })}
        disabled={localSensors.length === 0}
        expanded={selectedSensorGroup === 'LOCAL'}
        onClick={(): void => toggleSelectSensorGroup('LOCAL')}
      >
        <SensorGroupItem sensors={localSensors}></SensorGroupItem>
      </DeviceAccordion>
    </>
  )
}

export default DevicePanel
