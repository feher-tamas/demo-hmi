import '../../i18n/config'

import { Check } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { ListItemIcon, ListItemText, Menu, Paper } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuItemElement from '@renderer/ui/MenuItems'
import React from 'react'
import { useTranslation } from 'react-i18next'
import BorderedIconButton from '../../ui/BorderedIconButton'
import BorderedMenuItem from '../../ui/BorderedMenuItem'

import ColorModeContext from '../../context/ColormodeContext'
import { useCommonSettings } from '@renderer/context/CommonSettings'

import FormatOptions from './FormatOptions'
import LogOutIcon from './icons/LogOutIcon'
import SettingsIcon from './icons/SettingsIcon'
import SettingsWindow from '../settings/SettingsWindow'
import AboutWindow from '../settings/AboutWindow'
import useWindow from '@renderer/context/DraggableWindowContext'
import AboutIcon from './icons/AboutIcon'

const options = ['GEODD', 'GEODMS', 'UTM', 'MGRS']

const SettingMenu = (): JSX.Element => {
  const { i18n, t } = useTranslation()
  const i18nLanguage = i18n.language

  const changeLanguage = (language: string): void => {
    i18n.changeLanguage(language)
    window.main.setLanguage(language)
  }
  const colorMode = React.useContext(ColorModeContext)
  const theme = useTheme()
  const { format, onFormatChange: onSettingsFormatChange } = useCommonSettings()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const { openWindow: openSettings } = useWindow('settings')
  const { openWindow: openAbout } = useWindow('about')

  const handleDarkMode = (): void => {
    handleMenuClose()
    colorMode.toggleColorDarkMode()
  }
  const handleLightMode = (): void => {
    handleMenuClose()
    colorMode.toggleColorLightMode()
  }
  const handleMenuClose = (): void => {
    setAnchorEl(null)
  }

  const closeHandler = (): void => {
    //ipcRenderer.invoke('close-event')
    window.main.close()
  }

  return (
    <div>
      <BorderedIconButton
        onClick={handleClick}
        size="small"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ WebkitAppRegion: 'no-drag', m: 1, margin: 0 }}
      >
        <MenuIcon sx={{ height: 24 }} />
      </BorderedIconButton>
      <Paper>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          variant="menu"
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            dense: true
          }}
          PaperProps={{
            elevation: 1,
            style: {
              width: '20ch'
            }
          }}
        >
          <MenuItemElement>{t('Language')}</MenuItemElement>
          <BorderedMenuItem onClick={(): void => changeLanguage('en')}>
            {i18nLanguage === 'en' ? (
              <>
                <ListItemIcon>
                  <Check sx={{ color: '#62FF2B' }} />
                </ListItemIcon>
                {t('English')}
              </>
            ) : (
              <ListItemText inset>{t('English')}</ListItemText>
            )}
          </BorderedMenuItem>
          <BorderedMenuItem onClick={(): void => changeLanguage('hu')}>
            {i18nLanguage === 'hu' ? (
              <>
                <ListItemIcon>
                  <Check sx={{ color: '#62FF2B' }} />
                </ListItemIcon>
                {t('Hungarian')}
              </>
            ) : (
              <ListItemText inset>{t('Hungarian')}</ListItemText>
            )}
          </BorderedMenuItem>

          <MenuItemElement>{t('Theme')}</MenuItemElement>
          <BorderedMenuItem onClick={handleDarkMode}>
            {theme.palette.mode === 'dark' ? (
              <>
                <ListItemIcon>
                  <Check sx={{ color: '#62FF2B' }} />
                </ListItemIcon>
                {t('Dark')}
              </>
            ) : (
              <ListItemText inset> {t('Dark')}</ListItemText>
            )}
          </BorderedMenuItem>
          <BorderedMenuItem onClick={handleLightMode}>
            {theme.palette.mode === 'light' ? (
              <>
                <ListItemIcon>
                  <Check sx={{ color: '#62FF2B' }} />
                </ListItemIcon>
                {t('Light')}
              </>
            ) : (
              <ListItemText inset> {t('Light')}</ListItemText>
            )}
          </BorderedMenuItem>
          <MenuItemElement>{t('Format')}</MenuItemElement>

          {options.map((option, index) => (
            <FormatOptions
              key={index}
              name={option}
              isSelected={format === option}
              onSelect={() => onSettingsFormatChange(option)}
            />
          ))}
          <BorderedMenuItem onClick={openSettings}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            {t('Settings')}
          </BorderedMenuItem>
          <BorderedMenuItem onClick={openAbout}>
            <ListItemIcon>
              <AboutIcon />
            </ListItemIcon>
            {t('About')}
          </BorderedMenuItem>

          <BorderedMenuItem onClick={closeHandler}>
            <ListItemIcon>
              <LogOutIcon />
            </ListItemIcon>
            <ListItemText>{t('Quit')}</ListItemText>
          </BorderedMenuItem>
        </Menu>
        {/* popup Windows */}
        <SettingsWindow />
        <AboutWindow />
      </Paper>
    </div>
  )
}

export default SettingMenu
