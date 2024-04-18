import { TabValue } from '../shared/types'
import { BrowserWindow, WebContents } from 'electron'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'
import store from './store'

export type TabDetails = {
  tab: TabValue
  tabIndex: number
  zoomLevel: number
}

const tabWindowDetails = new Map<BrowserWindow, TabDetails>()

export const createTabWindow = (tabDetails: TabDetails): void => {
  const tabWindow = new BrowserWindow({
    width: 900,
    height: 670,
    frame: false,
    webPreferences: {
      preload: join(__dirname, '../preload/tab-window.js'),
      devTools: process.env.NODE_ENV !== 'production'
    }
  })

  tabWindowDetails.set(tabWindow, tabDetails)

  tabWindow.on('maximize', () => {
    tabWindow.webContents.send('maximized')
  })

  tabWindow.on('unmaximize', () => {
    tabWindow.webContents.send('unmaximized')
  })

  tabWindow.on('closed', () => {
    tabWindowDetails.delete(tabWindow)
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    tabWindow.loadURL(
      `${process.env['ELECTRON_RENDERER_URL']}/tab-window.html?tab=${encodeURIComponent(
        JSON.stringify(tabDetails.tab)
      )}&mediaSourceId=${encodeURIComponent(tabWindow.getMediaSourceId())}`
    )
    tabWindow.webContents.openDevTools()
  } else {
    tabWindow.loadFile(join(__dirname, '../renderer/tab-window.html'), {
      query: { tab: JSON.stringify(tabDetails.tab), mediaSourceId: tabWindow.getMediaSourceId() }
    })
  }
}

export const getTabWindowDetails = (tabWindow: BrowserWindow): TabDetails | undefined =>
  tabWindowDetails.get(tabWindow)

export const updateTabWindow = (
  browserWindow: BrowserWindow,
  tabDetails: TabDetails
): TabDetails[] => {
  tabWindowDetails.set(browserWindow, tabDetails)
  return [...tabWindowDetails.values()]
}

export const updateTabWindowTab = (browserWindow: BrowserWindow, tab: TabValue): TabDetails[] => {
  return updateTabWindow(browserWindow, { ...getTabWindowDetails(browserWindow)!, tab })
}

export const updateTabWindowZoom = (
  browserWindow: BrowserWindow,
  zoomLevel: number
): TabDetails[] => {
  return updateTabWindow(browserWindow, { ...getTabWindowDetails(browserWindow)!, zoomLevel })
}

export const forEachTabWebContents = (cb: (webContents: WebContents) => void): void =>
  tabWindowDetails.forEach((_, tabWindow) => cb(tabWindow.webContents))

export const openTabWindows = (): void => {
  store.get('tabWindows').forEach((tabWindow) => createTabWindow(tabWindow))
}

export const removeTabWebContents = (webContents: WebContents): TabDetails[] => {
  const tabWindow = BrowserWindow.fromWebContents(webContents)!

  tabWindowDetails.delete(tabWindow)

  return [...tabWindowDetails.values()]
}

export const closeAllTabWindows = (): void => {
  tabWindowDetails.forEach((_, tabWindow) => tabWindow.close())
}
