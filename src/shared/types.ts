export type TabValue = {
  sensors?: SensorsConfig
  label: string | null
  initialLabel: string
  initialTabIndex: number
  overview: boolean
}

export type WindowType = 'settings' | 'about'
export type WindowLocation = { x: number; y: number }
export type VersionType = 'frontend' | 'backend'
export type PopupLocation = { x: number; y: number }

export enum DropPosition {
  'TOP',
  'BOTTOM',
  'LEFT',
  'RIGHT',
  'CENTER',
  'NEW'
}

export type SensorGroup = 'REMOTE' | 'LOCAL'
export type SensorsConfig = Sensor | Horizontal | Vertical
export type MapConfig = { zoom: number; center: [number, number]; rotation: number }
export type Sensor = {
  sensorId?: number
  map: MapConfig
}
export type Horizontal = {
  left: Sensor | Vertical
  right: Sensor | Vertical
}
export type Vertical = {
  top: Sensor | Horizontal
  bottom: Sensor | Horizontal
}
export type AppSettings = {
  frontend: string
  backend: string
  mapServiceClientConfig: ServiceConfig
  mapServiceSubscriberConfig: ServiceConfig
  radarClientConfig: ServiceConfig
  radarSubscriberConfig: ServiceConfig
  language: string
  theme: string
  coordinateSystemFormat: string
  mainWindowLoadZoomFactor: number
  minZoomFactor: number
  maxZoomFactor: number
  selectedSensorGroup: SensorGroup | null
  selectedSensor: number | null
  selectedTab: number
  screenshotFolderPath: string
  videoCaptureFolderPath: string
  logsFolderPath: string
  dateFormat: string
  timeFormat: string
  aboutPopupLocation: PopupLocation
  settingsPopupLocation: PopupLocation
}
export type ServiceConfig = {
  address: string
  port: number
}

export type DevAppSettings = {
  mapServiceClientConfig: ServiceConfig
}

export type InfoPanelItem = 'DEVICE' | 'PLOT_TRACK' | 'ALARM'
