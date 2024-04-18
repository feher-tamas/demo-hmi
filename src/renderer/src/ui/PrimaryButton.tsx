import { Button, styled } from '@mui/material'

const PrimaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.button.background,
  color: theme.palette.button.color,
  textTransform: 'none'
}))

export default PrimaryButton
