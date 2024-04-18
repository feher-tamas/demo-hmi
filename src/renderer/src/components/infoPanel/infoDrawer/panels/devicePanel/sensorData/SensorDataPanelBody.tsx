import { ReactElement } from 'react'
import { Coordinates } from '../../../../../../context/SensorsContext'
import DataLabel from '../../../../../../ui/DataLabel'
import { Divider, Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import PowerIcon from '../../../../../../ui/PowerIcon'
import IconLabel from '../../../../../../ui/IconLabel'
import RangeIcon from './icons/RangeIcon'
import FrequencyIcon from './icons/FrequencyIcon'
import useFormat from '../../../../../../hooks/useFormat'
import CoordinateDataLabel from '../../../../../../ui/CoordinateDataLabel'
import { useTranslation } from 'react-i18next'

type SensorDataPanelBodyProps = {
  data: {
    emittedPowerLevel: number
    surveillanceSectorMaxRange: number
    operationalFrequencyBand: number
    direction: number
    surveillanceSectorWidth: number
    surveillanceScanPaneElevation: number
    dspTemp: number
    psuTemp: number
    powerAmplifierTemp: number
    location: Coordinates
    altitude: number
  }
}

const SensorDataPanelBody = ({ data }: SensorDataPanelBodyProps): ReactElement => {
  const theme = useTheme()
  const { t } = useTranslation()
  const coordinate = useFormat({ lat: data.location.Lat, lng: data.location.Lng })
  const coordinateList = coordinate?.split(',')

  return (
    <Grid
      container
      alignItems="end"
      rowSpacing="10px"
      justifyContent="space-between"
      sx={{ padding: '5px' }}
    >
      <Grid item xs={5}>
        <IconLabel
          icon={<PowerIcon mode="off"></PowerIcon>}
          value={data.emittedPowerLevel}
          suffix="mw"
        />
      </Grid>
      <Grid item xs={4}>
        <IconLabel
          icon={<RangeIcon></RangeIcon>}
          value={data.surveillanceSectorMaxRange}
          suffix="m"
        />
      </Grid>
      <Grid item xs={3}>
        <IconLabel icon={<FrequencyIcon></FrequencyIcon>} value={data.operationalFrequencyBand} />
      </Grid>

      <Grid item xs={4}>
        <DataLabel label={t('Sensors.Data.Direction')} value={data.direction} suffix="°" />
      </Grid>
      <Grid item xs={4}>
        <DataLabel
          label={t('Sensors.Data.SurveillanceSectorWidth')}
          value={data.surveillanceSectorWidth}
          suffix="°"
        />
      </Grid>
      <Grid item xs={4}>
        <DataLabel
          label={t('Sensors.Data.SurveillanceScanPaneElevation')}
          value={data.surveillanceScanPaneElevation}
          suffix="°"
        />
      </Grid>

      <Grid item xs={4}>
        <DataLabel label={t('Sensors.Data.DspTemp')} value={data.dspTemp} suffix=" c°" />
      </Grid>
      <Grid item xs={4}>
        <DataLabel label={t('Sensors.Data.PsuTemp')} value={data.psuTemp} suffix=" c°" />
      </Grid>
      <Grid item xs={4}>
        <DataLabel
          label={t('Sensors.Data.PowerAmplifierTemp')}
          value={data.powerAmplifierTemp}
          suffix=" c°"
        />
      </Grid>

      <Grid item xs={12}>
        <Divider sx={{ borderColor: theme.palette.primary.dark }}></Divider>
      </Grid>

      <Grid
        container
        marginTop={1.5}
        marginBottom={0.8}
        alignItems="end"
        justifyContent="space-between"
      >
        <CoordinateDataLabel coordinateList={coordinateList} altitude={data.altitude} />
      </Grid>
    </Grid>
  )
}

export default SensorDataPanelBody
