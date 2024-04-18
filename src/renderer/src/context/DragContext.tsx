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

type DragContextType = {
  isDragging: boolean
  sensorId?: number
}
const initDragContext = { isDragging: false }

const DragContext = createContext<DragContextType>(initDragContext)

export const useDragContext = (): DragContextType => {
  return useContext(DragContext)
}
export const DragContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [sensorId, setSensorId] = useState<number | undefined>()

  const onStartDragging = useCallback((sensorId: number): void => {
    setSensorId(sensorId)
  }, [])
  const onStopDragging = useCallback((): void => {
    setSensorId(undefined)
  }, [])

  useEffect(() => {
    window.main.onStartDragging((_, { sensorId }) => onStartDragging(sensorId))
    window.main.onStopDragging(onStopDragging)
    return () => {
      window.main.offStartDragging()
      window.main.offStopDragging()
    }
  }, [])

  const value = useMemo((): DragContextType => {
    return {
      isDragging: typeof sensorId !== 'undefined',
      sensorId
    }
  }, [sensorId])
  return <DragContext.Provider value={value}>{children}</DragContext.Provider>
}
