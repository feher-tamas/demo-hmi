import { MenuItem, styled } from '@mui/material'

const BorderedMenuItem = styled(MenuItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`
}))

export default BorderedMenuItem
