import { Typography, styled } from '@mui/material'

const MenuItemElement = styled(Typography)(({ theme }) => ({
  WebkitAppRegion: 'no-drag',
  fontSize: 10,
  fontWeight: 700,
  color: theme.palette.text.disabled,
  lineHeight: '12px',
  margin: 8
}))

export default MenuItemElement
