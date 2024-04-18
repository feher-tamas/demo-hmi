import ReactDOM from 'react-dom/client'
import './assets/index.css'
import TabWindow from './TabWindow'
import { ColorModeProvider } from './context/ColormodeContext'
import { StrictMode } from 'react'
import { WindowProvider } from './context/WindowContext'
import { DraggableWindowProvider } from './context/DraggableWindowContext'
import { DragContextProvider } from './context/DragContext'
import { CommonSettingsProvider } from './context/CommonSettings'
import { SensorsContextProvider } from './context/SensorsContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <CommonSettingsProvider>
      <DraggableWindowProvider>
        <WindowProvider isTab>
          <SensorsContextProvider>
            <ColorModeProvider>
              <DragContextProvider>
                <TabWindow />
              </DragContextProvider>
            </ColorModeProvider>
          </SensorsContextProvider>
        </WindowProvider>
      </DraggableWindowProvider>
    </CommonSettingsProvider>
  </StrictMode>
)
