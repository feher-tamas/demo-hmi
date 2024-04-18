import appSettings from './app-settings'
import { ZeroMQClient } from './zeromq-client'

export default new ZeroMQClient(
  100,
  `${appSettings.mapServiceClientConfig.address}:${appSettings.mapServiceClientConfig.port}`
)
