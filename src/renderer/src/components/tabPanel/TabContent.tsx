import type { SensorsConfig, TabValue } from '../../../../shared/types'
import NewTab from './NewTab'
import { Grid, Stack } from '@mui/material'
import MapPanel from './MapPanel'
import { TabContentContextProvider } from '@renderer/context/TabContentContext'
import MapButtons from './MapButtons'
import { useSensorsContext } from '@renderer/context/SensorsContext'
import { panelHasSensor } from '@renderer/utils/map-panel'

type Props = {
  tab: TabValue
  onSensorsChange: (sensors?: SensorsConfig) => void
}

const TabContent = ({ tab, onSensorsChange }: Props): JSX.Element => {
  const isNewTab = tab.sensors == null

  const { selectedSensor } = useSensorsContext()
  const tabHasSelectedSensor =
    !!selectedSensor && tab.sensors != null && panelHasSensor(tab.sensors, selectedSensor.id)

  return (
    <>
      {isNewTab ? (
        <NewTab addSensor={onSensorsChange}></NewTab>
      ) : (
        <TabContentContextProvider>
          <Grid container direction="column" sx={{ height: '100%', minWidth: '1116px' }}>
            <Stack direction="row" sx={{ height: '100%' }}>
              <MapPanel
                sensors={tab.sensors!}
                onSensorsChange={onSensorsChange}
                isHorizontal={false}
                isVertical={false}
                onCloseSensor={(): void => onSensorsChange(undefined)}
              ></MapPanel>
              {tabHasSelectedSensor && <MapButtons></MapButtons>}
            </Stack>
          </Grid>
        </TabContentContextProvider>
      )}
    </>
  )
}

export default TabContent
