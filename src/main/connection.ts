import mapserviceClient from './mapservice-client'

export function connection(mainWindow: Electron.BrowserWindow): void {
  mapserviceClient.on((isConnected: boolean) => {
    if (isConnected) {
      mainWindow?.webContents.send('mapservice-connected')
    } else {
      mainWindow?.webContents.send('mapservice-disconnected')
    }
  })
  mapserviceClient.tryConnect()
}
