import { ReactElement, useEffect, useState } from 'react'
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen'
import MinimizeIcon from '@mui/icons-material/Minimize'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { useTheme } from '@mui/material/styles'
import BorderedIconButton from '../../ui/BorderedIconButton'

const WindowSizeButtons = (): ReactElement => {
  const [isMaximized, setIsMaximized] = useState(false)
  const theme = useTheme()

  useEffect(() => {
    window.main.onMaximized((): void => {
      setIsMaximized(true)
    })

    window.main.onUnMaximized((): void => {
      setIsMaximized(false)
    })

    return () => {
      window.main.offMaximized()
      window.main.offUnMaximized()
    }
  }, [])

  return (
    <>
      <BorderedIconButton
        onClick={window.main.minimize}
        color="inherit"
        sx={{
          '&:hover': { backgroundColor: theme.palette.action.hover },
          WebkitAppRegion: 'no-drag',
          height: 33,
          width: 35,
          padding: 1
        }}
      >
        <MinimizeIcon />
      </BorderedIconButton>
      {isMaximized ? (
        <BorderedIconButton
          onClick={window.main.unMaximize}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            },
            WebkitAppRegion: 'no-drag',
            height: 33,
            width: 35,
            padding: 1
          }}
        >
          <CloseFullscreenIcon fontSize="small" />
        </BorderedIconButton>
      ) : (
        <BorderedIconButton
          onClick={window.main.maximize}
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            },
            WebkitAppRegion: 'no-drag',
            height: 33,
            width: 35,
            padding: 1
          }}
        >
          <OpenInFullIcon fontSize="small" />
        </BorderedIconButton>
      )}
    </>
  )
}

export default WindowSizeButtons
