import { Grid, GridProps, styled } from '@mui/material'

const BorderedGrid = styled(Grid)<GridProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: `inset 0px -1px 0px ${theme.palette.divider}`,
  margin: '-1px -1px 0 -1px'
}))
export default BorderedGrid
