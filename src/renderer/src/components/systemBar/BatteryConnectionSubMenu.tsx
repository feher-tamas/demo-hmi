import { CircularProgress, MenuItem, MenuItemProps, styled, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { BatteryContext } from '@renderer/context/BatteryContext'
import { ReactElement, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import BatteryStatus from './BatteryStatus'
import ConnectionIndicator from './icons/ConnectionIndicator'
import { Services } from './Titlebar'

type BatteryConnectionSubMenuProps = {
  services: Services[]
}

const BatteryConnectionSubMenu = ({ services }: BatteryConnectionSubMenuProps): ReactElement => {
  const theme = useTheme()
  const { t } = useTranslation()
  const {
    batteryLevel,
    isCharging,
    dischargingTime,
    hoursUntilDischarged,
    minutesUntilDischarged
  } = useContext(BatteryContext)

  const hoursString = t('Hour', { count: hoursUntilDischarged })
  const minutesString = t('Minute', { count: minutesUntilDischarged })

  return (
    <>
      <MenuItem
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '10px',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary
        }}
      >
        <BatteryStatus />
        <Typography variant="caption" component="span" sx={{ whiteSpace: 'nowrap' }}>
          {Math.trunc(batteryLevel * 100)}%
        </Typography>
        <Typography variant="caption" component="span" sx={{ whiteSpace: 'nowrap' }}>
          {!isCharging && dischargingTime !== Infinity ? (
            `${hoursUntilDischarged} ${hoursString} ${minutesUntilDischarged} ${minutesString} left`
          ) : batteryLevel === 1 ? (
            t('FullyCharged')
          ) : isCharging ? (
            t('Charging')
          ) : dischargingTime === Infinity ? (
            <>
              <span style={{ marginRight: '5px', color: theme.palette.text.primary }}>
                {t('CalculatingDischargeTime')}
              </span>
              <CircularProgress size={12} />
            </>
          ) : (
            ''
          )}
        </Typography>
      </MenuItem>

      <ConnectionIndicatorMenuItem services={services} />
    </>
  )
}

export default BatteryConnectionSubMenu

export const ConnectionIndicatorMenuItem = ({
  services
}: BatteryConnectionSubMenuProps): ReactElement => {
  return (
    <>
      {services.map((service) => (
        <SubMenuItem key={service.id}>
          <ConnectionIndicator isConnected={service.isConnected} />
          <Typography variant="caption" component="span" sx={{ whiteSpace: 'nowrap' }}>
            {service.name}
          </Typography>
        </SubMenuItem>
      ))}
    </>
  )
}

export const SubMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '10px',
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary
}))
