import { Typography, TypographyProps, styled } from '@mui/material'

type SettingsMenuItemsProps = TypographyProps & {
  selected: boolean
}

const SettingsMenuItems = styled(Typography)<SettingsMenuItemsProps>(({ theme, selected }) => ({
  backgroundColor: selected
    ? theme.palette.settingsWindow.selected.background
    : theme.palette.settingsWindow.notSelected.background,

  cursor: 'pointer',
  padding: '6px',
  color: selected
    ? theme.palette.settingsWindow.selected.color
    : theme.palette.settingsWindow.notSelected.color
}))

export default SettingsMenuItems
