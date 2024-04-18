import { Grid, GridProps, styled } from '@mui/material'

const SettingsGrid = styled(Grid)<GridProps>(({ theme }) => ({
  '&.MuiGrid-root': {
    height: '100%',
    borderRight: `1px solid ${
      theme.palette.mode === 'dark'
        ? theme.palette.divider
        : theme.palette.settingsWindow.selected.background
    }`,
    padding: '0px'
  }
}))
export default SettingsGrid
