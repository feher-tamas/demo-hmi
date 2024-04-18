import { MouseEvent, ReactElement } from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { SensorStatus, SensorUsageMode } from '../../../../../../context/SensorsContext'
import { useTranslation } from 'react-i18next'
import UsersIcon from './icons/UsersIcon'
import { useTheme } from '@mui/material/styles'
import DeviceBatteryIcon from './icons/DeviceBatteryIcon'
import HighlightedLabel from './HighlightedLabel'
import PowerButton from '../../../../../../ui/PowerButton'
import SensorName from './SensorName'

type SensorDataPanelHeaderProps = {
  data: {
    id: number
    name: string
    usageMode: SensorUsageMode
    deviceUsers: number
    status: SensorStatus
    batteryLevel: number
    power: boolean
  }
  expanded: boolean
  isRemote: boolean
  onPower: () => void
  expand: () => void
}

const SensorDataPanelHeader = ({
  data,
  expanded,
  isRemote,
  onPower,
  expand
}: SensorDataPanelHeaderProps): ReactElement => {
  const { t } = useTranslation()
  const theme = useTheme()

  function clickPower(event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation()
    onPower()
  }

  const divider = (
    <Divider sx={{ borderColor: theme.palette.text.primary }} orientation="vertical" flexItem />
  )
  return (
    <Stack width={'100%'} direction="row" spacing="10px">
      <PowerButton onClick={clickPower} power={data.power}></PowerButton>
      <Box width={'100%'} maxWidth={'100%'}>
        <Stack
          direction="row"
          alignItems="center"
          spacing="3px"
          flexWrap="wrap"
          sx={{ minWidth: 0, maxWidth: '170px' }}
        >
          <SensorName
            id={data.id}
            name={data.name}
            isRemote={isRemote}
            expand={expand}
            expanded={expanded}
          ></SensorName>
          <Stack direction="row">
            <HighlightedLabel expanded={expanded}>
              {t(`Sensors.SensorUsageMode.${data.usageMode}`)}
            </HighlightedLabel>
            <HighlightedLabel expanded={expanded}>
              <UsersIcon></UsersIcon>
              {` ${data.deviceUsers}`}
            </HighlightedLabel>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" spacing="3px" divider={divider}>
          <Typography variant="button" sx={{ fontSize: 10 }}>
            {t(`Sensors.SensorStatus.${data.status}`)}
          </Typography>
          <DeviceBatteryIcon batteryLevel={data.batteryLevel}></DeviceBatteryIcon>
        </Stack>
      </Box>
    </Stack>
  )
}

export default SensorDataPanelHeader
