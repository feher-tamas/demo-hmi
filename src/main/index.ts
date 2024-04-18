import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain, shell, WebContents } from 'electron'

import {
  closeAllTabWindows,
  createTabWindow,
  forEachTabWebContents,
  getTabWindowDetails,
  openTabWindows,
  removeTabWebContents,
  updateTabWindowTab,
  updateTabWindowZoom
} from './tab-window'
import store, { SchemaType } from './store'
import { appendFile, writeFile } from 'fs/promises'
import { mkdirSync } from 'fs'

import { join } from 'path'
import appSettings from './app-settings'
import { connection } from './connection'
import { appVersion } from './app-version'
import mapserviceClient from './mapservice-client'

mkdirSync(store.get('screenshotsDir'), { recursive: true })
mkdirSync(store.get('recordingsDir'), { recursive: true })

let mainWindow: Electron.BrowserWindow | null
function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, '../preload/main-window.js'),
      devTools: process.env.NODE_ENV !== 'production'
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
    mainWindow?.maximize()
    if (mainWindow) connection(mainWindow)
  })

  mainWindow?.on('closed', () => {
    mainWindow = null
  })
  mainWindow?.on('maximize', () => {
    mainWindow?.webContents.send('maximized')
  })
  mainWindow?.on('unmaximize', () => {
    mainWindow?.webContents.send('unmaximized')
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  ipcMain.on('minimize', (e) => {
    BrowserWindow.fromWebContents(e.sender)?.minimize()
  })
  ipcMain.on('maximize', (e) => {
    const window = BrowserWindow.fromWebContents(e.sender)

    if (window?.isMaximized()) {
      window?.webContents.send('maximized')
    } else {
      window?.maximize()
    }
  })
  ipcMain.on('unmaximize', (e) => {
    BrowserWindow.fromWebContents(e.sender)?.unmaximize()
  })
  ipcMain.on('close', () => {
    mapserviceClient.tryDisConnect()
    app.quit()
  })

  ipcMain.handle('takeScreenshot', async (e, windowName) => {
    const image = await e.sender.capturePage()

    const imageFileName = `sc_${windowName
      .toLowerCase()
      .replace(/\W/g, '_')}_${getFileDateTime()}.JPEG`

    await writeFile(join(store.get('screenshotsDir'), imageFileName), image.toJPEG(100))
  })

  const getFileDateTime = (timestamp?: number): string => {
    const [month, , day, , year, , hours, , minutes, , seconds, , milliseconds] =
      new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        fractionalSecondDigits: 3
      })
        .formatToParts(timestamp || new Date())
        .map((item) => item.value)
    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`
  }

  ipcMain.on('saveRecording', (_, windowName, data, startTimestamp) => {
    const videoFileName = `vc_${windowName.toLowerCase().replace(/\W/g, '_')}_${getFileDateTime(
      startTimestamp
    )}.webm`

    appendFile(join(store.get('recordingsDir'), videoFileName), data)
  })

  ipcMain.on('openTabWindow', (_, { tab, tabIndex }) => {
    const newTabs = [...store.get('tabs')]
    const newTabWindows = [...store.get('tabWindows')]

    const tabDetails = {
      tab,
      tabIndex,
      zoomLevel: 1
    }

    newTabs.splice(tabIndex, 1)
    newTabWindows.push(tabDetails)
    store.set({
      tabs: newTabs,
      tabWindows: newTabWindows
    })
    createTabWindow(tabDetails)
  })

  ipcMain.on('closeTabWindow', (e) => {
    store.set('tabWindows', removeTabWebContents(e.sender))
    e.sender.close()
  })

  ipcMain.on('returnTabWindow', (e) => {
    const { tab, tabIndex } = getTabWindowDetails(BrowserWindow.fromWebContents(e.sender)!)!

    const tabs = [...store.get('tabs')]
    tabs.splice(tabIndex, 0, tab)
    mainWindow?.webContents.send('returnTabWindow', { tabs, tab })

    store.set({
      tabs: tabs,
      tabWindows: removeTabWebContents(e.sender),
      selectedTab: tabs.indexOf(tab)
    })
    e.sender.close()
  })

  ipcMain.on('startDragging', (_, { sensorId }) => {
    mainWindow?.webContents.send('onStartDragging', { sensorId })
    forEachTabWebContents((webContents) => webContents.send('onStartDragging', { sensorId }))
  })

  ipcMain.on('stopDragging', () => {
    mainWindow?.webContents.send('onStopDragging')
    forEachTabWebContents((webContents) => webContents.send('onStopDragging'))
  })

  ipcMain.on('renameSensor', (_, { sensorId, name }) => {
    forEachTabWebContents((webContents) => webContents.send('renameSensor', { sensorId, name }))
  })

  ipcMain.on('setTabWindowTab', (e, { tab }) => {
    const tabWindows = updateTabWindowTab(BrowserWindow.fromWebContents(e.sender)!, tab)
    store.set({ tabWindows })
  })

  const getFromConfig = (getEventType: string, configKey: string, sendEventType: string): void => {
    ipcMain.on(getEventType, (event) => {
      const value = store.get(configKey)
      event.sender.send(sendEventType, value ?? null)
    })
  }

  ipcMain.on('get-windowLocation', (event, windowType) => {
    const value = store.get(`windowLocation.${windowType}`)
    event.sender.send(`windowLocation-change-${windowType}`, value || null)
  })

  ipcMain.on('set-windowLocation', (_, windowType, newValue) => {
    store.set(`windowLocation.${windowType}`, newValue)
  })

  ipcMain.on('openSensorInNewWindow', (_, { sensorName, sensorId }) => {
    const newTabWindows = [...store.get('tabWindows')]
    const tab = {
      sensors: sensorId,
      initialLabel: sensorName,
      label: sensorName,
      initialTabIndex: 0,
      overview: false
    }
    const tabIndex = store.get('tabs').length

    const tabDetails = {
      tab,
      tabIndex,
      zoomLevel: 1
    }

    newTabWindows.push(tabDetails)
    store.set('tabWindows', newTabWindows)
    createTabWindow(tabDetails)
  })

  ipcMain.on('resetSettings', () => {
    closeAllTabWindows()
    store.clear()
    mainWindow!.webContents.send('language-change', store.get('language'))
    mainWindow!.webContents.send('theme-change', store.get('theme'))
    mainWindow!.webContents.send('format-change', store.get('format'))
    mainWindow!.webContents.send('dateFormat-change', store.get('dateFormat'))
    mainWindow!.webContents.send('timeFormat-change', store.get('timeFormat'))
    mainWindow!.webContents.send('tabChange', store.get('selectedTab'))
    mainWindow!.webContents.send('load-tabs', store.get('tabs'))
    mainWindow!.webContents.send('sensorIdChange', store.get('selectedSensor'))
    mainWindow!.webContents.send('sensorGroupChange', store.get('selectedSensorGroup'))
    mainWindow!.webContents.send('infoPanelChange', store.get('selectedInfoPanel'))
  })

  ipcMain.on('setTabWindowZoomLevel', (event, zoomLevel) => {
    const tabWindows = updateTabWindowZoom(BrowserWindow.fromWebContents(event.sender)!, zoomLevel)
    store.set({ tabWindows })
  })

  ipcMain.on('getTabWindowZoomLevel', (event) => {
    const tabWindow = BrowserWindow.fromWebContents(event.sender)
    const tabDetails = getTabWindowDetails(tabWindow!)!

    event.sender.send('zoomChange', tabDetails.zoomLevel)
  })

  const updateConfig = (
    getEventType: string,
    configKey: keyof SchemaType,
    sendEventType?: string,
    broadcast?: boolean
  ): void => {
    ipcMain.on(getEventType, (e, newValue) => {
      if (newValue == null) {
        store.delete(configKey)
      } else {
        store.set(configKey, newValue)
      }

      if (broadcast) {
        forEachWebContents((webContents) => {
          if (webContents !== e.sender) {
            webContents.send(sendEventType!, newValue)
          }
        })
      }
    })
  }

  getFromConfig('get-language', 'language', 'language-change')
  getFromConfig('get-theme', 'theme', 'theme-change')
  getFromConfig('get-format', 'format', 'format-change')
  getFromConfig('get-tabs', 'tabs', 'load-tabs')
  getFromConfig('get-dateFormat', 'dateFormat', 'dateFormat-change')
  getFromConfig('get-timeFormat', 'timeFormat', 'timeFormat-change')
  getFromConfig('getSelectedSensorId', 'selectedSensor', 'sensorIdChange')
  getFromConfig('getSelectedSensorGroup', 'selectedSensorGroup', 'sensorGroupChange')
  getFromConfig('getSelectedTab', 'selectedTab', 'tabChange')
  getFromConfig('getSelectedInfoPanel', 'selectedInfoPanel', 'infoPanelChange')
  getFromConfig('getMainWindowZoomLevel', 'mainWindowZoomLevel', 'zoomChange')

  updateConfig('set-language', 'language', 'language-change', true)
  updateConfig('set-theme', 'theme', 'theme-change', true)
  updateConfig('set-format', 'format', 'format-change', true)
  updateConfig('set-tabs', 'tabs')
  updateConfig('set-dateFormat', 'dateFormat', 'dateFormat-change', true)
  updateConfig('set-timeFormat', 'timeFormat', 'timeFormat-change', true)
  updateConfig('selectSensorId', 'selectedSensor', 'sensorIdChange', true)
  updateConfig('selectSensorGroup', 'selectedSensorGroup')
  updateConfig('selectTab', 'selectedTab')
  updateConfig('selectInfoPanel', 'selectedInfoPanel')
  updateConfig('setMainWindowZoomLevel', 'mainWindowZoomLevel')

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(
      `${process.env['ELECTRON_RENDERER_URL']}/main-window.html?mediaSourceId=${encodeURIComponent(
        mainWindow.getMediaSourceId()
      )}`
    )
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/main-window.html'), {
      query: { mediaSourceId: mainWindow.getMediaSourceId() }
    })
  }
  openTabWindows()
  appVersion(appSettings)
  connection(mainWindow)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const forEachWebContents = (cb: (webContents: WebContents) => void): void => {
  cb(mainWindow!.webContents)
  forEachTabWebContents(cb)
}
