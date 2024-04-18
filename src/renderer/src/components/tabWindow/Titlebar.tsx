import { AppBar, Toolbar, Typography } from '@mui/material'
import { TabValue } from 'src/shared/types'
import CloseIcon from '@mui/icons-material/Close'
import ExternalLinkIcon from '../icons/ExternalLinkIcon'
import { useTabName } from '../tabPanel/useTabName'
import WindowSizeButtons from '../window/WindowSizeButtons'
import CameraIcon from '../systemBar/icons/CameraIcon'
import Logo from '@renderer/ui/Logo'
import CurrentDateTime from '../systemBar/CurrentDateTime'
import VideoIcon from '../systemBar/icons/VideoIcon'
import ZoomInIcon from '../systemBar/icons/ZoomInIcon'
import ZoomOutIcon from '../systemBar/icons/ZoomOutIcon'
import { useCallback, useEffect, useState } from 'react'
import BorderedIconButton from '../../ui/BorderedIconButton'

type Props = {
  tab: TabValue
}

const TitleBar = ({ tab }: Props): JSX.Element => {
  const { getTabName } = useTabName()
  const [zoomLevel, setZoomLevel] = useState<number>(window.main.getZoomLevel())

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
    <AppBar position="static" elevation={0} enableColorOnDark color="inherit">
      <Toolbar variant="dense" disableGutters sx={{ WebkitAppRegion: 'drag' }}>
        <Logo width={30} height={26} />
        <Typography
          variant="subtitle2"
          component="div"
          sx={{ flexGrow: 1, m: 1, fontWeight: 'bold' }}
        >
          {getTabName(tab)}
        </Typography>
        <CurrentDateTime />

        <CameraIcon />
        <VideoIcon />

        <BorderedIconButton onClick={zoomOut}>
          <ZoomOutIcon zoomFactor={zoomLevel} />
        </BorderedIconButton>
        <BorderedIconButton onClick={zoomIn}>
          <ZoomInIcon zoomFactor={zoomLevel} />
        </BorderedIconButton>

        <BorderedIconButton onClick={window.main.returnTabWindow}>
          <ExternalLinkIcon inverse large />
        </BorderedIconButton>
        <WindowSizeButtons />
        <BorderedIconButton onClick={window.main.close}>
          <CloseIcon />
        </BorderedIconButton>
      </Toolbar>
    </AppBar>
  )
}
export default TitleBar
