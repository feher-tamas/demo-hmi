import { contextBridge, ipcRenderer, webFrame } from 'electron'
import type { InfoPanelItem, SensorGroup, TabValue, VersionType, WindowType } from '../shared/types'

// Custom APIs for renderer
const api = {
  /**
   Here function for AppBar
   */
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
    ipcRenderer.send('close')
  },

  zoomIn: (): void => {
    const currentZoomFactor = webFrame.getZoomFactor()
    if (currentZoomFactor < 1.5) {
      const newZoomFactor = currentZoomFactor + 0.1
      const zoomFactorFixedValue = parseFloat(newZoomFactor.toFixed(2))
      webFrame.setZoomFactor(zoomFactorFixedValue)
      ipcRenderer.send('setMainWindowZoomLevel', zoomFactorFixedValue)
    }
  },

  zoomOut: (): void => {
    const currentZoomFactor = webFrame.getZoomFactor()
    if (currentZoomFactor > 0.5) {
      const newZoomFactor = currentZoomFactor - 0.1
      const zoomFactorFixedValue = parseFloat(newZoomFactor.toFixed(2))
      webFrame.setZoomFactor(zoomFactorFixedValue)
      ipcRenderer.send('setMainWindowZoomLevel', zoomFactorFixedValue)
    }
  },

  getZoomFactor: (): void => {
    ipcRenderer.send('getMainWindowZoomLevel')
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

  openTabWindow: ({ tab, tabIndex }: { tab: TabValue; tabIndex: number }): void => {
    ipcRenderer.send('openTabWindow', { tab, tabIndex })
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

  getBackendIpAddress: (
    callback: (e: Electron.IpcRendererEvent, backendIpAddress: string) => void
  ): void => {
    ipcRenderer.on('backendIpAddress', callback)
  },

  getCommandChannelPort: (
    callback: (e: Electron.IpcRendererEvent, commandChannelPort: string) => void
  ): void => {
    ipcRenderer.on('commandChannelPort', callback)
  },

  getPublishChannelPort: (
    callback: (e: Electron.IpcRendererEvent, publishChannelPort: string) => void
  ): void => {
    ipcRenderer.on('publishChannelPort', callback)
  },

  onReturnTabWindow: (
    callback: (e: Electron.IpcRendererEvent, data: { tabs: TabValue[]; tab: TabValue }) => void
  ): void => {
    ipcRenderer.on('returnTabWindow', callback)
  },

  getLanguage: (): void => ipcRenderer.send('get-language'),
  setLanguage: (newLanguage: string): void => ipcRenderer.send('set-language', newLanguage),

  onLanguageChange: (callback: (e: Electron.IpcRendererEvent, language: string) => void): void => {
    ipcRenderer.on('language-change', callback)
  },

  getTheme: (): void => ipcRenderer.send('get-theme'),

  setTheme: (newTheme: string): void => ipcRenderer.send('set-theme', newTheme),

  onThemeChange: (callback: (e: Electron.IpcRendererEvent, theme: string) => void): void => {
    ipcRenderer.on('theme-change', callback)
  },
  offThemeListener: (): void => {
    ipcRenderer.removeAllListeners('theme-change')
  },
  getFormat: (): void => ipcRenderer.send('get-format'),

  setFormat: (newFormat: string): void => ipcRenderer.send('set-format', newFormat),

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

  offReturnTabWindow: (): void => {
    ipcRenderer.removeAllListeners('returnTabWindow')
  },

  getTabs: (): void => ipcRenderer.send('get-tabs'),

  onLoadTabs: (callback: (e: Electron.IpcRendererEvent, tabs: TabValue[]) => void): void => {
    ipcRenderer.on('load-tabs', callback)
  },

  offLoadTabs: (): void => {
    ipcRenderer.removeAllListeners('load-tabs')
  },

  setTabs: (tabs: TabValue[]): void => {
    ipcRenderer.send('set-tabs', tabs)
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

  startDraggingSensor: ({ sensorId }: { sensorId: number }): void => {
    ipcRenderer.send('startDragging', { sensorId })
  },

  stopDraggingSensor: (): void => {
    ipcRenderer.send('stopDragging')
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

  openSensorInNewWindow: (sensorName: string, sensorId: number): void => {
    ipcRenderer.send('openSensorInNewWindow', { sensorName, sensorId })
  },

  resetSettings: (): void => {
    ipcRenderer.send('resetSettings')
  },

  renameSensor: (sensorId: number, name: string): void => {
    ipcRenderer.send('renameSensor', { sensorId, name })
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
  },

  onSensorGroupChange: (callback: (sensorGroup: number | void) => void): void => {
    ipcRenderer.on('sensorGroupChange', (_, sensorGroup) => {
      callback(sensorGroup)
    })
  },

  offSensorGroupChange: (): void => {
    ipcRenderer.removeAllListeners('sensorGroupChange')
  },

  getSelectedSensorGroup: (): void => {
    ipcRenderer.send('getSelectedSensorGroup')
  },

  selectTab: (tabIndex: number): void => {
    ipcRenderer.send('selectTab', tabIndex)
  },

  getSelectedTab: (): void => {
    ipcRenderer.send('getSelectedTab')
  },

  onTabChange: (callback: (tabIndex: number) => void): void => {
    ipcRenderer.on('tabChange', (_, tabIndex) => callback(tabIndex))
  },

  offTabChange: (): void => {
    ipcRenderer.removeAllListeners('tabChange')
  },

  selectInfoPanel: (infoPanel: InfoPanelItem | void): void => {
    ipcRenderer.send('selectInfoPanel', infoPanel)
  },

  getSelectedInfoPanel: (): void => {
    ipcRenderer.send('getSelectedInfoPanel')
  },

  onInfoPanelChange: (callback: (infoPanel: InfoPanelItem | void) => void): void => {
    ipcRenderer.on('infoPanelChange', (_, infoPanel) => callback(infoPanel))
  },

  offInfoPanelChange: (): void => {
    ipcRenderer.removeAllListeners('infoPanelChange')
  },
  onMapServiceConnected: (callback: (e: Electron.IpcRendererEvent) => void): void => {
    ipcRenderer.on('mapservice-connected', callback)
  },
  offMapServiceConnected: (): void => {
    ipcRenderer.removeAllListeners('mapservice-connected')
  },

  onMapServiceDisconnected: (callback: (e: Electron.IpcRendererEvent) => void): void => {
    ipcRenderer.on('mapservice-disconnected', callback)
  },
  offMapServiceDisconnected: (): void => {
    ipcRenderer.removeAllListeners('mapservice-disconnected')
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
