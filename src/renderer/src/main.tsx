import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './assets/index.css'
import App from './App'
import { ColorModeProvider } from './context/ColormodeContext'
import MainPage from './pages/MainPage'
import { SensorsContextProvider } from './context/SensorsContext'
import { TabsContextProvider } from './context/TabsContext'
import { WindowProvider } from './context/WindowContext'
import { DraggableWindowProvider } from './context/DraggableWindowContext'
import { DragContextProvider } from './context/DragContext'
import { CommonSettingsProvider } from './context/CommonSettings'
import BatteryStatusProvider from './context/BatteryContext'
import { InfoPanelContextProvider } from './context/InfoPanelContext'
import { ConnectionContextProvider } from './context/ConnectionContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CommonSettingsProvider>
    <BatteryStatusProvider>
      <ConnectionContextProvider>
        <DraggableWindowProvider>
          <WindowProvider>
            <ColorModeProvider>
              <InfoPanelContextProvider>
                <SensorsContextProvider>
                  <TabsContextProvider>
                    <DragContextProvider>
                      <HashRouter>
                        <Routes>
                          <Route path="/" element={<App />}>
                            <Route index element={<MainPage />} />
                          </Route>
                        </Routes>
                      </HashRouter>
                    </DragContextProvider>
                  </TabsContextProvider>
                </SensorsContextProvider>
              </InfoPanelContextProvider>
            </ColorModeProvider>
          </WindowProvider>
        </DraggableWindowProvider>
      </ConnectionContextProvider>
    </BatteryStatusProvider>
  </CommonSettingsProvider>
)
