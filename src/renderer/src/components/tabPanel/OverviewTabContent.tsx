import { useSensorsContext } from '../../context/SensorsContext'
import MapPanelContent from './MapPanelContent'
import Grid from '@mui/material/Grid'
import { Stack } from '@mui/material'
import MapButtons from './MapButtons'
import { useTabsContext } from '@renderer/context/TabsContext'
import { Sensor } from 'src/shared/types'

const OverviewTabContent = (): JSX.Element => {
  const { selectedSensor } = useSensorsContext()
  const { overviewTab, onUpdateSelectedTab } = useTabsContext()

  return (
    <Grid container direction="column" sx={{ height: '100%' }}>
      <Stack direction="row" sx={{ height: '100%' }}>
        <MapPanelContent
          isOverview
          sensorId={selectedSensor?.id}
          mapConfig={(overviewTab!.sensors as Sensor).map}
          onSensorsChange={(sensors) => onUpdateSelectedTab({ sensors })}
        />
        <MapButtons showSensorButtons={!!selectedSensor} />
      </Stack>
    </Grid>
  )
}

export default OverviewTabContent
