import { Box, Button, IconButton, Stack, Typography, styled } from '@mui/material'
import { PropsWithChildren, ReactElement } from 'react'

import CloseIcon from '../settings/icons/CloseIcon'
import PopupContainer from './PopupContainer'
import { useTranslation } from 'react-i18next'

type Props = PropsWithChildren & {
  title: string
  width: number
  height: number
  onClose: () => void
}

const PopupWindow = ({ children, title, width, height, onClose }: Props): ReactElement => {
  const { t } = useTranslation()
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: `calc(50% - ${height / 2}px)`,
          left: `calc(50% - ${width / 2}px)`,
          zIndex: 900,
          WebkitAppRegion: 'no-drag'
        }}
      >
        <PopupContainer width={width} height={height} padding={16}>
          <Stack direction="row" alignItems="center">
            <Typography sx={{ flexGrow: 1 }}>{title}</Typography>
            <IconButton onPointerUp={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 2 }}>
            <CancelButton variant="outlined" onClick={onClose}>
              {t('Cancel')}
            </CancelButton>
            {children}
          </Stack>
        </PopupContainer>
      </Box>
    </>
  )
}

export default PopupWindow

const CancelButton = styled(Button)(() => ({
  textTransform: 'none'
}))
