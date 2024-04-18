import { contextBridge, ipcRenderer, webFrame } from 'electron'
import { SensorGroup, TabValue, VersionType, WindowType } from '../shared/types'

// Custom APIs for renderer
const api = {
  minimize: (): void => {
    ipcRenderer.send('minimize')
  },

  maximize: (): void => {
    ipcRenderer.send('maximize')
  },

  unMaximize: (): void => {
    ipcRenderer.send('unmaximize')
  },

  close: (): void => {
    ipcRenderer.send('closeTabWindow')
  },

  returnTabWindow: (): void => {
    ipcRenderer.send('returnTabWindow')
  },

  onMaximized: (callback: () => void): void => {
    ipcRenderer.on('maximized', callback)
  },

  offMaximized: (): void => {
    ipcRenderer.removeAllListeners('maximized')
  },

  onUnMaximized: (callback: () => void): void => {
    ipcRenderer.on('unmaximized', callback)
  },

  offUnMaximized: (): void => {
    ipcRenderer.removeAllListeners('unmaximized')
  },

  getLanguage: (): void => ipcRenderer.send('get-language'),

  onLanguageChange: (callback: (e: Electron.IpcRendererEvent, language: string) => void): void => {
    ipcRenderer.on('language-change', callback)
  },

  getTheme: (): void => ipcRenderer.send('get-theme'),

  onThemeChange: (callback: (e: Electron.IpcRendererEvent, theme: string) => void): void => {
    ipcRenderer.on('theme-change', callback)
  },

  offThemeListener: (): void => {
    ipcRenderer.removeAllListeners('theme-change')
  },

  getFormat: (): void => ipcRenderer.send('get-format'),

  onFormatChange: (callback: (format: string) => void): void => {
    ipcRenderer.on('format-change', (_, format) => callback(format))
  },

  offFormatListener: (): void => {
    ipcRenderer.removeAllListeners('format-change')
  },

  getDateFormat: (): void => ipcRenderer.send('get-dateFormat'),

  setDateFormat: (dateFormat: string): void => ipcRenderer.send('set-dateFormat', dateFormat),

  onDateFormatChange: (callback: (dateFormat: string) => void): void => {
    ipcRenderer.on('dateFormat-change', (_, dateFormat) => callback(dateFormat))
  },

  offDateFormatChange: (): void => {
    ipcRenderer.removeAllListeners('dateFormat-change')
  },

  getTimeFormat: (): void => ipcRenderer.send('get-timeFormat'),

  setTimeFormat: (timeFormat: string): void => ipcRenderer.send('set-timeFormat', timeFormat),

  onTimeFormatChange: (callback: (timeFormat: string) => void): void => {
    ipcRenderer.on('timeFormat-change', (_, timeFormat) => callback(timeFormat))
  },

  offTimeFormatChange: (): void => {
    ipcRenderer.removeAllListeners('timeFormat-change')
  },

  takeScreenshot: (windowName: string): Promise<void> => {
    return ipcRenderer.invoke('takeScreenshot', windowName)
  },
  getWindowLocation: (windowType: WindowType): void => {
    ipcRenderer.send('get-windowLocation', windowType)
  },

  setWindowLocation: (windowType: WindowType, newLocation: string): void => {
    ipcRenderer.send('set-windowLocation', windowType, newLocation)
  },

  onWindowLocationChange: (
    windowType: WindowType,
    callback: (e: Electron.IpcRendererEvent, location: string) => void
  ): void => {
    ipcRenderer.on(`windowLocation-change-${windowType}`, callback)
  },

  offWindowLocationListener: (windowType: WindowType): void => {
    ipcRenderer.removeAllListeners(`windowLocation-change-${windowType}`)
  },

  saveRecording: (windowName: string, data: ArrayBuffer, startTimestamp: number): void => {
    return ipcRenderer.send('saveRecording', windowName, data, startTimestamp)
  },

  zoomIn: (): void => {
    const currentZoomFactor = webFrame.getZoomFactor()
    if (currentZoomFactor < 1.5) {
      const newZoomFactor = currentZoomFactor + 0.1
      const zoomFactorFixedValue = parseFloat(newZoomFactor.toFixed(2))
      webFrame.setZoomFactor(zoomFactorFixedValue)
      ipcRenderer.send('setTabWindowZoomLevel', zoomFactorFixedValue)
    }
  },

  zoomOut: (): void => {
    const currentZoomFactor = webFrame.getZoomFactor()
    if (currentZoomFactor > 0.5) {
      const newZoomFactor = currentZoomFactor - 0.1
      const zoomFactorFixedValue = parseFloat(newZoomFactor.toFixed(2))
      webFrame.setZoomFactor(zoomFactorFixedValue)
      ipcRenderer.send('setTabWindowZoomLevel', zoomFactorFixedValue)
    }
  },

  getZoomFactor: (): void => {
    ipcRenderer.send('getTabWindowZoomLevel')
  },

  getZoomLevel: (): number => {
    const currentZoomFactor = webFrame.getZoomFactor()
    return currentZoomFactor
  },

  setZoomLevel: (zoomLevel: number): void => {
    webFrame.setZoomFactor(zoomLevel)
  },

  onZoomChange: (callback: (zoomFactor: number) => void): void => {
    ipcRenderer.on('zoomChange', (_, zoomFactor) => callback(zoomFactor))
  },

  offZoomChange: (): void => {
    ipcRenderer.removeAllListeners('zoomChange')
  },
  getAppVersion: (appVersion: VersionType): void => {
    ipcRenderer.send('get-appVersion', appVersion)
  },

  onAppVersionChange: (
    appVersion: VersionType,
    callback: (e: Electron.IpcRendererEvent, appVersion: VersionType) => void
  ): void => {
    ipcRenderer.on(`appVersion-change-${appVersion}`, callback)
  },

  offAppVersionListener: (appVersion: VersionType): void => {
    ipcRenderer.removeAllListeners(`appVersion-change-change-${appVersion}`)
  },

  onStartDragging: (callback: (e: Electron.IpcRendererEvent, { sensorId }) => void): void => {
    ipcRenderer.on('onStartDragging', callback)
  },

  onStopDragging: (callback: (e: Electron.IpcRendererEvent) => void): void => {
    ipcRenderer.on('onStopDragging', callback)
  },

  offStartDragging: (): void => {
    ipcRenderer.removeAllListeners('onStartDragging')
  },

  offStopDragging: (): void => {
    ipcRenderer.removeAllListeners('onStopDragging')
  },

  setTabWindowTab: (tab: TabValue): void => {
    ipcRenderer.send('setTabWindowTab', { tab })
  },

  openSensorInNewWindow: (sensorName: string, sensorId: number): void => {
    ipcRenderer.send('openSensorInNewWindow', { sensorName, sensorId })
  },

  onRenameSensor: (
    callback: ({ sensorId, name }: { sensorId: number; name: string }) => void
  ): void => {
    ipcRenderer.on('renameSensor', (_, { sensorId, name }) => {
      callback({ sensorId, name })
    })
  },

  offRenameSensor: (): void => {
    ipcRenderer.removeAllListeners('renameSensor')
  },

  selectSensorId: (sensorId: number | void): void => {
    ipcRenderer.send('selectSensorId', sensorId)
  },

  onSensorIdChange: (callback: (sensorId: number | void) => void): void => {
    ipcRenderer.on('sensorIdChange', (_, sensorId) => {
      callback(sensorId)
    })
  },

  offSensorIdChange: (): void => {
    ipcRenderer.removeAllListeners('sensorIdChange')
  },

  getSelectedSensorId: (): void => {
    ipcRenderer.send('getSelectedSensorId')
  },

  selectSensorGroup: (sensorGroup: SensorGroup | void): void => {
    ipcRenderer.send('selectSensorGroup', sensorGroup)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('main', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
