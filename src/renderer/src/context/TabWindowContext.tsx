import { createContext, PropsWithChildren, ReactElement, useContext, useMemo } from 'react'
import { TabValue } from 'src/shared/types'

type TabWindowContext = {
  tab: TabValue | null
}

const tabWindowContext = createContext<TabWindowContext>({
  tab: null
})

export const useTabWindowContext = (): TabWindowContext => {
  return useContext(tabWindowContext)
}

export const TabWindowProvider = ({ children }: PropsWithChildren): ReactElement => {
  const contextValue = useMemo(() => {
    const tabParam = new URL(window.location.href).searchParams.get('tab') ?? ''
    const tab = getTab(tabParam)

    return { tab }
  }, [])

  return <tabWindowContext.Provider value={contextValue}>{children}</tabWindowContext.Provider>
}

const getTab = (tabParam: string): TabValue => {
  try {
    return JSON.parse(tabParam)
  } catch {
    return {
      label: null,
      initialLabel: 'NewTab',
      initialTabIndex: 0,
      overview: false
    }
  }
}
