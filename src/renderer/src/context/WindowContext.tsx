import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'
import { SensorsConfig, TabValue } from 'src/shared/types'

type WindowContext = {
  tab: TabValue | null
  isTab: boolean
  mediaSourceId: string
  onSensorsChange: (sensors?: SensorsConfig) => void
}

const windowContext = createContext<WindowContext>({
  tab: null,
  isTab: false,
  mediaSourceId: '',
  onSensorsChange: () => {}
})

export const useWindowContext = (): WindowContext => {
  return useContext(windowContext)
}

type Props = {
  isTab?: boolean
}
const params = new URL(window.location.href).searchParams

export const WindowProvider = ({
  children,
  isTab = false
}: PropsWithChildren<Props>): ReactElement => {
  const [tab, setTab] = useState<TabValue | null>(() =>
    isTab ? getTab(params.get('tab') ?? '') : null
  )

  const onSensorsChange = useCallback(
    (sensors?: SensorsConfig): void => {
      if (isTab && tab) {
        const newTab: TabValue = { ...tab, sensors }
        setTab(newTab)
        window.main.setTabWindowTab(newTab)
      }
    },
    [tab]
  )

  const contextValue = useMemo((): WindowContext => {
    return {
      tab,
      isTab,
      mediaSourceId: params.get('mediaSourceId') ?? '',
      onSensorsChange
    }
  }, [tab, isTab, onSensorsChange])

  return <windowContext.Provider value={contextValue}>{children}</windowContext.Provider>
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
