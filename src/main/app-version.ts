import { ipcMain } from 'electron'
import { AppSettings } from '../shared/types'

export function appVersion(appsettings: AppSettings): void {
  ipcMain.on('get-appVersion', (event, versionType) => {
    event.sender.send(`appVersion-change-${versionType}`, appsettings[versionType] || null)
  })
}
