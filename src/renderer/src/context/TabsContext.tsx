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
import { TabValue } from '../../../shared/types'
import { defaultMapConfig } from '@renderer/utils/map-panel'

type TabsContextType = {
  tabs: TabValue[]
  selectedTab: TabValue | undefined | null
  overviewTab: TabValue | undefined
  onOpenTabWindow: (tabValue: TabValue) => void
  onChangeTab: (tabValue: TabValue) => void
  onCreateTab: (id?: number, name?: string) => void
  onUpdateSelectedTab: (tabValue: Partial<TabValue>) => void
  onCloseTab: (tabValue: TabValue) => void
}

const initTabsContextType: TabsContextType = {
  tabs: [],
  selectedTab: undefined,
  overviewTab: undefined,
  onChangeTab: (): void => {},
  onCreateTab: (): void => {},
  onUpdateSelectedTab: (): void => {},
  onCloseTab: (): void => {},
  onOpenTabWindow: (): void => {}
}

function getMaxTabIndex(tabs: TabValue[]): number {
  return Math.max(...tabs.map((o) => o.initialTabIndex), 0)
}

function createNewTabValue(tabs: TabValue[], sensorId?: number, label?: string): TabValue {
  const isSensor = typeof sensorId !== 'undefined'
  return {
    sensors: isSensor ? {sensorId, map: defaultMapConfig} : undefined,
    initialLabel: label ?? 'NewTab',
    label: label ?? null,
    initialTabIndex: isSensor ? 0 : getMaxTabIndex(tabs) + 1,
    overview: false,
  }
}

const TabsContext = createContext<TabsContextType>(initTabsContextType)

export const useTabsContext = (): TabsContextType => {
  return useContext(TabsContext)
}
export const TabsContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [tabs, setTabs] = useState<TabValue[]>([])
  const [selectedTab, setSelectedTab] = useState<TabValue | undefined>()
  const overviewTab = tabs[0]

  const setTabsAndSelected = useCallback((newTabs: TabValue[], newTab: TabValue): void => {
    window.main.setTabs(newTabs)
    setTabs(newTabs)
    setSelectedTab(newTab)
  }, [])
  const removeTab = useCallback(
    (tabValue: TabValue): TabValue[] => {
      const newTabs = tabs.filter((tab) => tab !== tabValue)

      if (selectedTab === tabValue) {
        setSelectedTab(tabs[0])
        window.main.selectTab(0)
      }
      setTabs(newTabs)
      return newTabs
    },
    [tabs, selectedTab]
  )
  const onLoadTabs = useCallback((tabs: TabValue[], selectedTabIndex: number): void => {
    setTabs(tabs)
    setSelectedTab(tabs[selectedTabIndex])
  }, [])
  const onTabReturn = useCallback((tabs: TabValue[], tab: TabValue): void => {
    setTabs(tabs)
    setSelectedTab(tab)
  }, [])

  const onOpenTabWindow = useCallback(
    (tab: TabValue): void => {
      const tabIndex = tabs.indexOf(tab)
      window.main.openTabWindow({ tab, tabIndex })
      removeTab(tab)
    },
    [tabs, removeTab]
  )
  const onChangeTab = useCallback(
    (tabValue: TabValue): void => {
      setSelectedTab(tabValue)
      window.main.selectTab(tabs.indexOf(tabValue))
    },
    [tabs]
  )
  const onCreateTab = useCallback(
    (id?: number, name?: string): void => {
      const newTab = createNewTabValue(tabs, id, name)
      const newTabs = [...tabs, newTab]
      setTabsAndSelected(newTabs, newTab)
      window.main.selectTab(newTabs.length - 1)
    },
    [tabs, setTabsAndSelected]
  )
  const onUpdateSelectedTab = useCallback(
    (update: Partial<TabValue>): void => {
      if (selectedTab) {
        const tabValue = { ...selectedTab, ...update }
        const newTabs = tabs.map((tab) => {
          if (tab === selectedTab) {
            return tabValue
          }
          return tab
        })
        setTabsAndSelected(newTabs, tabValue)
      }
    },
    [tabs, selectedTab, setTabsAndSelected]
  )
  const onCloseTab = useCallback(
    (tabValue: TabValue): void => {
      window.main.setTabs(removeTab(tabValue))
    },
    [removeTab]
  )

  const value = useMemo((): TabsContextType => {
    return {
      tabs,
      selectedTab,
      overviewTab,
      onOpenTabWindow,
      onChangeTab,
      onCreateTab,
      onUpdateSelectedTab,
      onCloseTab
    }
  }, [
    tabs,
    selectedTab,
    overviewTab,
    onOpenTabWindow,
    onChangeTab,
    onCreateTab,
    onUpdateSelectedTab,
    onCloseTab
  ])

  useEffect(() => {
    let selectedTabIndex: number

    window.main.onTabChange((tabIndex) => {
      selectedTabIndex = tabIndex
    })
    window.main.onLoadTabs((_, tabs) => onLoadTabs(tabs, selectedTabIndex))
    window.main.onReturnTabWindow((_, { tabs, tab }) => onTabReturn(tabs, tab))
    window.main.getSelectedTab()
    window.main.getTabs()
    return () => {
      window.main.offReturnTabWindow()
      window.main.offTabChange()
      window.main.offLoadTabs()
    }
  }, [])

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>
}
