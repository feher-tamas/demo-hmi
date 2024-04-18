import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { DraggableData, DraggableEvent } from 'react-draggable'
import { WindowType } from 'src/shared/types'

const defaultWindowState = {
  position: { x: 0, y: 0 },
  open: false
}

type WindowState = typeof defaultWindowState

type WindowStates = { [k in WindowType]: WindowState }

const initialContextState: WindowStates = {
  settings: { ...defaultWindowState },
  about: { ...defaultWindowState }
}

type WindowStatesContextValue = {
  windowStates: WindowStates
  activeWindow: string
  onUpdatePosition: (windowType: WindowType, position: { x: number; y: number }) => void
  setOpen: (windowType: WindowType, open: boolean) => void
  onActiveWindow: (windowType: WindowType) => void
}

export const DraggableWindowContext = createContext<WindowStatesContextValue>({
  windowStates: initialContextState,
  activeWindow: '',
  onUpdatePosition: () => {},
  setOpen: () => {},
  onActiveWindow: () => {}
})

export const DraggableWindowProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [windowStates, setWindowStates] = useState(initialContextState)
  const [activeWindow, setActiveWindow] = useState<string>('')

  const onUpdatePosition = useCallback(
    (windowType: WindowType, position: { x: number; y: number }) => {
      setWindowStates((prevState) => ({
        ...prevState,
        [windowType]: {
          ...prevState[windowType],
          position
        }
      }))
    },
    []
  )

  const setOpen = useCallback((windowType: WindowType, open: boolean) => {
    setWindowStates((prevState) => ({
      ...prevState,
      [windowType]: {
        ...prevState[windowType],
        open
      }
    }))
  }, [])

  const onActiveWindow = useCallback((windowType: WindowType) => {
    setActiveWindow(windowType)
  }, [])

  const value: WindowStatesContextValue = useMemo(
    () => ({
      activeWindow,
      windowStates,
      onUpdatePosition,
      setOpen,
      onActiveWindow
    }),
    [activeWindow, windowStates, onUpdatePosition, setOpen, onActiveWindow]
  )

  return <DraggableWindowContext.Provider value={value}>{children}</DraggableWindowContext.Provider>
}

type UseWindowStateValue = {
  position: { x: number; y: number }
  windowOpen: boolean
  isActive: boolean
  openWindow: () => void
  closeWindow: () => void
  onDragStop: (e: DraggableEvent, data: DraggableData) => void
  onActiveWindowTrigger: () => void
}

const useWindow = (windowType: WindowType): UseWindowStateValue => {
  const { activeWindow, windowStates, onUpdatePosition, setOpen, onActiveWindow } =
    useContext(DraggableWindowContext)

  const isActive = activeWindow === windowType

  const position = windowStates[windowType].position
  const open = windowStates[windowType].open

  const openWindow = useCallback(() => {
    setOpen(windowType, true)
    onActiveWindow(windowType)
  }, [setOpen, onActiveWindow])

  const closeWindow = useCallback(() => {
    setOpen(windowType, false)
  }, [setOpen])

  const onActiveWindowTrigger = useCallback(() => {
    onActiveWindow(windowType)
  }, [onActiveWindow])

  const onDragStop = useCallback(
    (e: DraggableEvent, data: DraggableData) => {
      e.stopPropagation()
      onUpdatePosition(windowType, { x: data.x, y: data.y })

      const newPosition = { x: data.x, y: data.y }

      window.main.setWindowLocation(windowType, newPosition)
    },
    [windowType, onUpdatePosition]
  )

  useEffect(() => {
    const locationListener = (
      _: Electron.IpcRenderer,
      location: { x: number; y: number }
    ): void => {
      onUpdatePosition(windowType, location)
    }
    window.main.getWindowLocation(windowType)
    window.main.onWindowLocationChange(windowType, locationListener)

    return () => {
      window.main.offWindowLocationListener(windowType)
    }
  }, [])

  const memoizedValues = useMemo(() => {
    return {
      position: position,
      windowOpen: open,
      isActive,
      openWindow,
      closeWindow,
      onDragStop,
      onActiveWindowTrigger
    }
  }, [position, open, isActive, openWindow, closeWindow, onDragStop, onActiveWindowTrigger])

  return memoizedValues
}

export default useWindow
