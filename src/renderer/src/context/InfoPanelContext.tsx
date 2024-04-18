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
import { InfoPanelItem } from 'src/shared/types'

type InfoPanelContext = {
  selectedInfoPanel: InfoPanelItem | void
  toggleSelectInfoPanel: (infoPanel: InfoPanelItem) => void
  selectInfoPanel: (infoPanel: InfoPanelItem) => void
}

const infoPanelContext = createContext<InfoPanelContext>({
  selectedInfoPanel: undefined,
  toggleSelectInfoPanel: () => {},
  selectInfoPanel: () => {}
})

export const useInfoPanelContext = (): InfoPanelContext => {
  return useContext(infoPanelContext)
}

export const InfoPanelContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [selectedInfoPanel, setSelectedInfoPanel] = useState<InfoPanelItem>()

  const toggleSelectInfoPanel = useCallback(
    (infoPanel: InfoPanelItem): void => {
      const newSelectedInfoPanel = infoPanel === selectedInfoPanel ? undefined : infoPanel

      setSelectedInfoPanel(newSelectedInfoPanel)
      window.main.selectInfoPanel(newSelectedInfoPanel)
    },
    [selectedInfoPanel]
  )

  const selectInfoPanel = useCallback(
    (infoPanel: InfoPanelItem) => {
      if (selectedInfoPanel !== infoPanel) {
        setSelectedInfoPanel(infoPanel)
        window.main.selectInfoPanel(infoPanel)
      }
    },
    [selectedInfoPanel]
  )

  const value = useMemo((): InfoPanelContext => {
    return {
      selectedInfoPanel,
      toggleSelectInfoPanel,
      selectInfoPanel
    }
  }, [selectedInfoPanel, toggleSelectInfoPanel, selectInfoPanel])

  useEffect(() => {
    window.main.onInfoPanelChange((selectedInfoPanel: InfoPanelItem | undefined) => {
      setSelectedInfoPanel(selectedInfoPanel)
    })

    window.main.getSelectedInfoPanel()

    return () => {
      window.main.offInfoPanelChange()
    }
  }, [])

  return <infoPanelContext.Provider value={value}>{children}</infoPanelContext.Provider>
}
