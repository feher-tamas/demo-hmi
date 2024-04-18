import { Grid, IconButton, Stack, useTheme } from '@mui/material'
import SettingsGrid from '@renderer/ui/SettingsGrid'
import SettingsMenuItems from '@renderer/ui/SettingsMenuItems'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'

import PopupWindow from '../popupWindow/PopupWindow'
import SettingsIcon from './icons/SettingsIcon'
import { useTranslation } from 'react-i18next'
import useWindow from '@renderer/context/DraggableWindowContext'
import GeneralSettings from './GeneralSettings'
import { Check } from '@mui/icons-material'
import ResetSettings from './ResetSettings'

type SectionToShow = 'General' | 'Reset'

const SettingsWindow = (): ReactElement => {
  const { windowOpen } = useWindow('settings')

  return <>{windowOpen ? <SettingsWindowInner /> : null}</>
}

const SettingsWindowInner = (): ReactElement => {
  const [sectionToShow, setSectionToShow] = useState<SectionToShow>('General')
  const [showChangesSaved, setShowChangesSaved] = useState(false)
  const changesSavedTimeoutRef = useRef<NodeJS.Timeout>()
  const theme = useTheme()
  const { t } = useTranslation()

  const onSettingsChange = useCallback(() => {
    setShowChangesSaved(true)
    clearTimeout(changesSavedTimeoutRef.current)
    changesSavedTimeoutRef.current = setTimeout(() => {
      setShowChangesSaved(false)
    }, 1e3)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(changesSavedTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <PopupWindow
        title={t('Settings')}
        titleBarContent={
          showChangesSaved && (
            <Stack direction="row" alignItems="center" sx={{ marginRight: 1 }}>
              <Check /> <i>{t('ChangesSaved')}</i>
            </Stack>
          )
        }
        windowType={'settings'}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="stretch"
          margin="0"
          width="100%"
          height="505px"
        >
          <SettingsGrid
            item
            xs={3}
            sx={{
              height: '100%',
              borderRight: `1px solid ${theme.palette.divider}`
            }}
          >
            <SettingsMenuItems
              selected={sectionToShow === 'General'}
              onClick={(): void => setSectionToShow('General')}
            >
              <IconButton>
                <SettingsIcon selected={sectionToShow === 'General'} />
              </IconButton>
              {t('General')}
            </SettingsMenuItems>
            <SettingsMenuItems
              selected={sectionToShow === 'Reset'}
              onClick={(): void => setSectionToShow('Reset')}
            >
              {t('Reset.Label')}
            </SettingsMenuItems>
          </SettingsGrid>

          <Grid item xs={9}>
            {sectionToShow === 'General' && <GeneralSettings onSettingsChange={onSettingsChange} />}
            {sectionToShow === 'Reset' && <ResetSettings />}
          </Grid>
        </Grid>
      </PopupWindow>
    </>
  )
}

export default SettingsWindow
