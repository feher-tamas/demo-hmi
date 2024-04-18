import { ReactElement } from 'react'
import { SensorData, useSensorsContext } from '../../../../../context/SensorsContext'
import SensorDataPanel from './sensorData/SensorDataPanel'

type SensorGroupProps = {
  sensors: SensorData[]
  isRemote?: boolean
}

const SensorGroup = ({ sensors, isRemote = false }: SensorGroupProps): ReactElement => {
  const { selectedSensor, toggleSelectSensor } = useSensorsContext()

  const content = sensors
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((sensor) => (
      <SensorDataPanel
        key={sensor.id}
        data={sensor}
        expanded={sensor.id === selectedSensor?.id}
        isRemote={isRemote}
        onToggleExpand={(): void => toggleSelectSensor(sensor.id)}
      ></SensorDataPanel>
    ))
  return <div>{content}</div>
}

export default SensorGroup
