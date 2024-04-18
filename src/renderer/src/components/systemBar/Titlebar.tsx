import { AppBar, Menu, Stack, Toolbar, Typography } from '@mui/material'
import Logo from '@renderer/ui/Logo'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import BorderedIconButton from '../../ui/BorderedIconButton'
import WindowSizeButtons from '../window/WindowSizeButtons'
import BatteryConnectionSubMenu from './BatteryConnectionSubMenu'
import BatteryStatus from './BatteryStatus'
import CurrentDateTime from './CurrentDateTime'
import CameraIcon from './icons/CameraIcon'
import ConnectionIndicator from './icons/ConnectionIndicator'
import VideoIcon from './icons/VideoIcon'
import ZoomInIcon from './icons/ZoomInIcon'
import ZoomOutIcon from './icons/ZoomOutIcon'
import SettingMenu from './SettingsMenu'
import { useConnectionContext } from '@renderer/context/ConnectionContext'

export type Services = {
  id: number
  name: string
  isConnected: boolean
}

const TitleBar = (): ReactElement => {
  const [zoomLevel, setZoomLevel] = useState<number>(window.main.getZoomLevel())
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const { t } = useTranslation()
  const { connections } = useConnectionContext()
  // placeholder data until backend data is available

  connections.map((connection) => ({
    ...connection,
    name: connection.isConnected
      ? t(`ConnectedTo${connection.name}`)
      : t(`NotConnectedTo${connection.name}`)
  }))

  const onAnchorEl = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }, [])

  const onCloseSubMenu = useCallback((): void => {
    setAnchorEl(null)
  }, [])

  const zoomIn = useCallback((): void => {
    window.main.zoomIn()
    setZoomLevel(window.main.getZoomLevel())
  }, [])

  const zoomOut = useCallback((): void => {
    window.main.zoomOut()
    setZoomLevel(window.main.getZoomLevel())
  }, [])

  useEffect(() => {
    const zoomChangeListener = (newZoomLevel: number): void => {
      setZoomLevel(newZoomLevel)
      window.main.setZoomLevel(newZoomLevel)
    }

    window.main.onZoomChange(zoomChangeListener)
    window.main.getZoomFactor()

    return () => {
      window.main.offZoomChange()
    }
  }, [])

  return (
    <AppBar position="static" elevation={0} enableColorOnDark color="default">
      <Toolbar variant="dense" sx={{ WebkitAppRegion: 'drag' }}>
        <Menu
          id="battery-submenu"
          anchorEl={anchorEl}
          open={open}
          onClose={onCloseSubMenu}
          sx={{
            '& .MuiList-root': {
              paddingTop: 0,
              paddingBottom: 0
            }
          }}
        >
          <BatteryConnectionSubMenu services={connections} />
        </Menu>
        <Logo width={30} height={26} />
        <Typography variant="caption" component="div" sx={{ flexGrow: 1, m: 1 }}></Typography>
        <CurrentDateTime />

        <BorderedIconButton onClick={onAnchorEl} aria-label="menu">
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <BatteryStatus />
            <ConnectionIndicator
              isConnected={connections.every((connection) => connection.isConnected)}
            />
          </Stack>
        </BorderedIconButton>

        <CameraIcon />
        <VideoIcon />
        <BorderedIconButton onClick={zoomOut}>
          <ZoomOutIcon zoomFactor={zoomLevel} />
        </BorderedIconButton>
        <BorderedIconButton onClick={zoomIn}>
          <ZoomInIcon zoomFactor={zoomLevel} />
        </BorderedIconButton>

        <WindowSizeButtons />
        <SettingMenu></SettingMenu>
      </Toolbar>
    </AppBar>
  )
}
export default TitleBar
