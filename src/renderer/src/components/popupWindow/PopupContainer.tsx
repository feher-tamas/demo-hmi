import { Container, styled } from '@mui/material'

const PopupContainer = styled(Container)<{ width?: number; height?: number; padding?: number }>(
  ({ theme, width, height, padding }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.paper
        : theme.palette.background.default,
    border: `1px solid #1E1E1E`,
    boxShadow: theme.shadows[5],
    borderRadius: '5px',
    margin: '-1px -1px 0 -1px',
    minWidth: width ?? '701px',
    minHeight: height ?? '539px',
    width: width ?? '701px',
    height: height ?? '539px',
    padding: padding ?? '0',
    [`@media (min-width: ${theme.breakpoints.values.xs}px)`]: {
      padding: padding ?? 0
    }
  })
)

export default PopupContainer
