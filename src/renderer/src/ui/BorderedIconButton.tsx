import { IconButton, styled } from '@mui/material'

const BorderedIconButton = styled(IconButton)(({ theme }) => ({
  borderLeft: `1px solid ${theme.palette.divider}`,
  WebkitAppRegion: 'no-drag',
  borderRadius: 0,
  ':hover': { backgroundColor: 'primary.light' },
  '& .MuiTouchRipple-root .MuiTouchRipple-child': {
    borderRadius: '8px'
  }
}))

export default BorderedIconButton
