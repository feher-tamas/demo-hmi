import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

type TabContentContextType = {
  draggingMapPanelSensorId: number | void
  droppedOverMapPanelSensorId: number | void
  isDraggingMapPanel: boolean
  isDroppingMapPanel: boolean
  onMapPanelDragStart: (sensorId: number) => void
  onMapPanelDragEnd: () => void
  onMapPanelDrop: (sensorId: number) => void
}

const TabContentContext = createContext<TabContentContextType>({
  draggingMapPanelSensorId: undefined,
  droppedOverMapPanelSensorId: undefined,
  isDraggingMapPanel: false,
  isDroppingMapPanel: false,
  onMapPanelDragStart: () => {},
  onMapPanelDragEnd: () => {},
  onMapPanelDrop: () => {}
})

export const useTabContentContext = (): TabContentContextType => {
  return useContext(TabContentContext)
}
export const TabContentContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [draggingMapPanelSensorId, setDraggingMapPanelSensorId] = useState<number>()
  const [droppedOverMapPanelSensorId, setDroppedOverMapPanelSensorId] = useState<number>()

  const onMapPanelDragEnd = useCallback(() => {
    setDraggingMapPanelSensorId(undefined)
    setDroppedOverMapPanelSensorId(undefined)
  }, [])

  const value = useMemo((): TabContentContextType => {
    return {
      draggingMapPanelSensorId,
      droppedOverMapPanelSensorId,
      isDraggingMapPanel: draggingMapPanelSensorId != null,
      isDroppingMapPanel: droppedOverMapPanelSensorId != null,
      onMapPanelDragStart: setDraggingMapPanelSensorId,
      onMapPanelDragEnd,
      onMapPanelDrop: setDroppedOverMapPanelSensorId
    }
  }, [draggingMapPanelSensorId, droppedOverMapPanelSensorId, onMapPanelDragEnd])
  return <TabContentContext.Provider value={value}>{children}</TabContentContext.Provider>
}
