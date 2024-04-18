import DataLabel from './DataLabel'
import { useTheme } from '@mui/material/styles'
import { useCommonSettings } from '@renderer/context/CommonSettings'
import { useTranslation } from 'react-i18next'
import { Grid, Stack } from '@mui/material'

type PropsType = {
  coordinateList: string[] | undefined
  inline?: boolean
  altitude: number
}

const CoordinateDataLabel = ({ coordinateList, inline, altitude }: PropsType) => {
  const theme = useTheme()
  const { format } = useCommonSettings()
  const { t } = useTranslation()

  const labelList =
    format === 'GEODD' || format === 'GEODMS'
      ? ['Coordinates.Lng', 'Coordinates.Lat']
      : format === 'MGRS'
      ? ['Coordinates.MGRS']
      : [
          'Coordinates.Easting',
          'Coordinates.Northing',
          'Coordinates.Zone',
          'Coordinates.Hemisphare'
        ]

  if (inline) {
    return (
      <>
        {labelList.map((label, index) => (
          <DataLabel
            key={index}
            label={t(label)}
            value={coordinateList ? coordinateList[index] : ''}
            color={theme.palette.highlight}
          />
        ))}
      </>
    )
  } else {
    if (format === 'GEODD' || format === 'GEODMS') {
      return (
        <>
          <Grid item>
            <DataLabel label={t('Sensors.Data.Altitude')} value={altitude} suffix="m" />
          </Grid>
          <Grid>
            <Grid item marginBottom={1.2}>
              <DataLabel
                label={t('Coordinates.Lng')}
                value={coordinateList ? coordinateList[0] : ''}
                color={theme.palette.highlight}
              />
            </Grid>
            <DataLabel
              label={t('Coordinates.Lat')}
              value={coordinateList ? coordinateList[1] : ''}
              color={theme.palette.highlight}
            />
          </Grid>
        </>
      )
    } else if (format === 'MGRS') {
      return (
        <>
          <Grid item marginBottom={0.8}>
            <DataLabel
              label={t('Coordinates.MGRS')}
              value={coordinateList ? coordinateList[0] : ''}
              color={theme.palette.highlight}
            />
          </Grid>
          <DataLabel label={t('Sensors.Data.Altitude')} value={altitude} suffix="m" />
        </>
      )
    } else {
      return (
        <>
          <Grid item marginBottom={1.2}>
            <DataLabel
              label={t('Coordinates.Easting')}
              value={coordinateList ? coordinateList[0] : ''}
              color={theme.palette.highlight}
            />
          </Grid>
          <Grid item marginBottom={1.2}>
            <DataLabel
              label={t('Coordinates.Northing')}
              value={coordinateList ? coordinateList[1] : ''}
              color={theme.palette.highlight}
            />
          </Grid>
          <Stack direction="row" spacing={1.5} marginBottom={0.8}>
            <DataLabel
              label={t('Coordinates.Zone')}
              value={coordinateList ? coordinateList[2] : ''}
              color={theme.palette.highlight}
            />
            <DataLabel
              label={t('Coordinates.Hemisphare')}
              value={coordinateList ? coordinateList[3] : ''}
              color={theme.palette.highlight}
            />
          </Stack>
          <DataLabel label={t('Sensors.Data.Altitude')} value={altitude} suffix="m" />
        </>
      )
    }
  }
}

export default CoordinateDataLabel
