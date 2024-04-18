import { ReactElement } from 'react'
import { Grid, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BorderedGrid from '../../ui/BorderedGrid'
import SquareButton from '../../ui/SquareButton'
import TabContent from './TabContent'
import OverviewTabContent from './OverviewTabContent'
import TabList from './TabList'
import { useTabsContext } from '../../context/TabsContext'

const maxTabsCount = 20

const TabPanel = (): ReactElement => {
  const { selectedTab, tabs, onCreateTab, onUpdateSelectedTab } = useTabsContext()

  return (
    <>
      {!!selectedTab && (
        <Grid container direction="column" sx={{ height: '100%', flexWrap: 'nowrap' }}>
          <Stack direction="row" width="100%">
            <TabList />
            {tabs.length < maxTabsCount && (
              <SquareButton onClick={(): void => onCreateTab()}>
                <AddIcon />
              </SquareButton>
            )}
          </Stack>
          <BorderedGrid item xs sx={{ overflowX: 'auto' }}>
            <Stack direction="row" sx={{ height: '100%' }}>
              <BorderedGrid item xs>
                {selectedTab.overview ? (
                  <OverviewTabContent />
                ) : (
                  <TabContent
                    tab={selectedTab!}
                    onSensorsChange={(sensors): void => onUpdateSelectedTab({ sensors })}
                  />
                )}
              </BorderedGrid>
            </Stack>
          </BorderedGrid>
        </Grid>
      )}
    </>
  )
}

export default TabPanel
