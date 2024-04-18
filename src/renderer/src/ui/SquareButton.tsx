import { ButtonBase, ButtonBaseProps, styled } from '@mui/material'

const SquareButton = styled(ButtonBase)<ButtonBaseProps>(({ theme }) => ({
  width: 40,
  height: 40,
  minWidth: 40,
  minHeight: 40,
  border: `1px solid ${theme.palette.divider}`
}))
export default SquareButton
