import { Horizontal, SensorsConfig, Vertical, Sensor, MapConfig } from 'src/shared/types'

export const defaultMapConfig: MapConfig = {zoom: 15, center: [47.47491132731897, 19.081462579986113], rotation: 0}

export const isSinglePanel = (sensorsConfig: SensorsConfig): boolean => {
  return Object.hasOwn(sensorsConfig, 'sensorId')
}

export const isHorizontalPanel = (sensorsConfig: SensorsConfig): boolean => {
  return Object.hasOwn(sensorsConfig, 'left')
}

export const panelHasSensor = (sensorsConfig: SensorsConfig, sensorId: number): boolean => {
  return isSinglePanel(sensorsConfig)
    ? sensorId === (sensorsConfig as Sensor).sensorId
    : isHorizontalPanel(sensorsConfig)
    ? horizontalPanelHasSensor(sensorsConfig as Horizontal, sensorId)
    : verticalPanelHasSensor(sensorsConfig as Vertical, sensorId)
}

const horizontalPanelHasSensor = (sensorsConfig: Horizontal, sensorId: number): boolean => {
  return (
    panelHasSensor(sensorsConfig.left, sensorId) || panelHasSensor(sensorsConfig.right, sensorId)
  )
}

const verticalPanelHasSensor = (sensorsConfig: Vertical, sensorId: number): boolean => {
  return (
    panelHasSensor(sensorsConfig.top, sensorId) || panelHasSensor(sensorsConfig.bottom, sensorId)
  )
}
