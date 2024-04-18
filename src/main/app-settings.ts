import { join } from 'path'
import { AppSettings, DevAppSettings } from '../shared/types'
import { readFileSync } from 'fs'
import { app } from 'electron'

const appGetPath = app.getPath('userData')

function loadAppSettingsFile(): AppSettings {
  const appSettings: AppSettings = readJsonFile('../../resources/appsettings.json')

  appSettings.screenshotFolderPath = join(appGetPath, 'screenshots')
  appSettings.videoCaptureFolderPath = join(appGetPath, 'recordings')

  if (process.env.NODE_ENV === 'development') {
    const devSettings: DevAppSettings = readJsonFile('../../resources/devsettings.json')

    appSettings.mapServiceClientConfig.address = devSettings.mapServiceClientConfig.address
    appSettings.mapServiceClientConfig.port = devSettings.mapServiceClientConfig.port
  }

  return appSettings
}

export default loadAppSettingsFile()

function readJsonFile<T>(relativePath: string): T {
  const pathToFile = join(__dirname, relativePath).replace('app.asar', 'app.asar.unpacked')

  try {
    const fileContent = readFileSync(pathToFile, { encoding: 'utf-8' })
    const result: T = JSON.parse(fileContent)

    return result
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}
