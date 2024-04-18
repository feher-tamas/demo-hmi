import styled from '@emotion/styled'
import type { TabValue } from '../../../../shared/types'
import Menu from '@mui/material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import CloseIcon from '@mui/icons-material/Close'
import MenuItem from '@mui/material/MenuItem'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { MouseEvent, ReactElement, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ExternalLinkIcon from '../icons/ExternalLinkIcon'
import { useTabName } from './useTabName'
import { useTabsContext } from '../../context/TabsContext'
import TabName from './TabName'

const TabList = (): ReactElement => {
  const { selectedTab, tabs, onOpenTabWindow, onChangeTab, onCloseTab, onUpdateSelectedTab } =
    useTabsContext()

  const [isEditing, setIsEditing] = useState(false)
  const [openMenuTab, setOpenMenuTab] = useState<TabValue>()
  const [tabMenuAnchorEl, setTabMenuAnchorEl] = useState<HTMLDivElement>()
  const { t } = useTranslation()
  const { getTabName } = useTabName()

  const onMenuTriggerClick = (e: MouseEvent<HTMLDivElement>, tab: TabValue): void => {
    e.stopPropagation()
    setOpenMenuTab(tab)
    setTabMenuAnchorEl(e.currentTarget)
  }

  const onCloseMenu = useCallback(() => {
    setOpenMenuTab(undefined)
    setTabMenuAnchorEl(undefined)
  }, [])

  const onOpenTabInNewWindow = useCallback(() => {
    onOpenTabWindow(openMenuTab!)
    onCloseMenu()
  }, [openMenuTab, onOpenTabWindow, onCloseMenu])

  const onCloseMenuTab = useCallback(() => {
    onCloseTab(openMenuTab!)
    onCloseMenu()
  }, [openMenuTab, onCloseTab, onCloseMenu])

  const onFinishEditing = useCallback(
    (editedLabel: string): void => {
      if (selectedTab) {
        onUpdateSelectedTab({ label: editedLabel })
        setIsEditing(false)
      }
    },
    [selectedTab, onUpdateSelectedTab]
  )

  const onStartEditing = useCallback((): void => {
    if (selectedTab && !selectedTab.overview) {
      setIsEditing(true)
    }
  }, [selectedTab, getTabName])

  return (
    <>
      <Tabs
        value={selectedTab}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ minHeight: 40 }}
        TabIndicatorProps={{ sx: { display: 'none' } }}
        onChange={(_, tab): void => onChangeTab(tab)}
      >
        {tabs.map((tab, index) => {
          const tabName = getTabName(tab)
          return (
            <Tab
              key={index}
              value={tab}
              label={
                <TabName
                  isEditing={isEditing && selectedTab === tab}
                  name={
                    tab.overview || selectedTab === tab || tabName.length <= 10
                      ? tabName
                      : tabName.slice(0, 10) + '...'
                  }
                  onFinishEditing={onFinishEditing}
                ></TabName>
              }
              onDoubleClick={onStartEditing}
              icon={
                !tab.overview ? (
                  <Dots onClick={(e): void => onMenuTriggerClick(e, tab)}>
                    <MoreHorizIcon />
                  </Dots>
                ) : undefined
              }
              iconPosition="end"
              sx={{
                minHeight: 40,
                minWidth: 0,
                borderLeftWidth: index && 1,
                borderLeftStyle: 'solid',
                borderLeftColor: 'divider',
                '&.Mui-selected': {
                  backgroundColor: 'tab.selected.background'
                }
              }}
            />
          )
        })}
      </Tabs>

      <Menu open={!!openMenuTab} anchorEl={tabMenuAnchorEl} onClose={onCloseMenu}>
        <MenuItem onClick={onCloseMenuTab}>
          <ListItemIcon>
            <CloseIcon color="primary" />
          </ListItemIcon>{' '}
          {t('CloseTab')}
        </MenuItem>
        <MenuItem onClick={onOpenTabInNewWindow}>
          <ListItemIcon>
            <ExternalLinkIcon />
          </ListItemIcon>{' '}
          {t('OpenTab')}
        </MenuItem>
      </Menu>
    </>
  )
}

export default TabList

const Dots = styled.div`
  display: flex;
`
