import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { TabValue } from 'src/shared/types'

export const useTabName = (): { getTabName: (tab: TabValue) => string } => {
  const { t } = useTranslation()

  const getTabName = useCallback(
    (tab: TabValue) => {
      return tab.label ?? t(tab.initialLabel, { count: tab.initialTabIndex })!
    },
    [t]
  )

  return { getTabName }
}
