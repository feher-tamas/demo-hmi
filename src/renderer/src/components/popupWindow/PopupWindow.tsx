import { AppBar, Box, IconButton, Toolbar, Typography, useTheme } from '@mui/material'
import { PropsWithChildren, ReactElement, ReactNode } from 'react'
import Draggable from 'react-draggable'

import CloseIcon from '../settings/icons/CloseIcon'
import useWindow from '@renderer/context/DraggableWindowContext'
import { WindowType } from 'src/shared/types'
import PopupContainer from './PopupContainer'
type PopupWindowProps = PropsWithChildren & {
  title: string
  windowType: WindowType
  titleBarContent?: ReactNode
}

const PopupWindow = ({
  children,
  title,
  windowType,
  titleBarContent
}: PopupWindowProps): ReactElement => {
  const theme = useTheme()
  const { closeWindow, position, onDragStop, isActive, onActiveWindowTrigger } =
    useWindow(windowType)
  return (
    <>
      <Draggable position={position} onStop={onDragStop} handle=".draggable-handle">
        <Box
          onMouseDownCapture={onActiveWindowTrigger}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '30%',
            zIndex: isActive ? 800 : 700,
            WebkitAppRegion: 'no-drag'
          }}
        >
          <PopupContainer>
            <>
              <AppBar
                position="static"
                elevation={2}
                enableColorOnDark
                color="inherit"
                sx={{ borderRadius: '5px', cursor: 'pointer' }}
              >
                <Toolbar
                  className="draggable-handle"
                  variant="dense"
                  disableGutters
                  sx={{
                    padding: '8px',
                    backgroundColor: theme.palette.divider
                  }}
                >
                  <Typography sx={{ flexGrow: 1, padding: '8px' }}>{title}</Typography>
                  {titleBarContent}
                  <IconButton onPointerUp={closeWindow}>
                    <CloseIcon />
                  </IconButton>
                </Toolbar>
              </AppBar>
              {children}
            </>
          </PopupContainer>
        </Box>
      </Draggable>
    </>
  )
}

export default PopupWindow
