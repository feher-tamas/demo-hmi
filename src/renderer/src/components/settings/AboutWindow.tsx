import { ReactElement, useEffect, useState } from 'react'

import PopupWindow from '../popupWindow/PopupWindow'
import { useTranslation } from 'react-i18next'
import useWindow from '@renderer/context/DraggableWindowContext'
import { VersionType } from 'src/shared/types'
import { Stack, Typography } from '@mui/material'
import Logo from '@renderer/ui/Logo'

const AboutWindow = (): ReactElement => {
  const { windowOpen } = useWindow('about')

  return <>{windowOpen ? <AboutWindowInner /> : null}</>
}

const AboutWindowInner = (): ReactElement => {
  const { t } = useTranslation()

  const [frontEndVersion, setFrontEndVersion] = useState('')
  const [backEndVersion, setBackEndVersion] = useState('')

  useEffect(() => {
    const frontEndVersionListener = (_: Electron.IpcRenderer, version: VersionType): void => {
      setFrontEndVersion(version)
    }

    window.main.getAppVersion('frontend')
    window.main.onAppVersionChange('frontend', frontEndVersionListener)

    return () => {
      window.main.offAppVersionListener('frontend')
    }
  }, [])

  useEffect(() => {
    const backEndVersionListener = (_: Electron.IpcRenderer, version: VersionType): void => {
      setBackEndVersion(version)
    }

    window.main.getAppVersion('backend')
    window.main.onAppVersionChange('backend', backEndVersionListener)

    return () => {
      window.main.offAppVersionListener('backend')
    }
  }, [])

  return (
    <>
      <PopupWindow title={t('About')} windowType={'about'}>
        <Stack
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5rem' }}>
            <Logo width={200} height={200} />
            <Stack sx={{ display: 'flex' }}>
              <Typography fontSize={20}>Backend: v{backEndVersion}</Typography>
              <Typography fontSize={20}>Frontend: v{frontEndVersion}</Typography>
            </Stack>
          </Stack>
        </Stack>
      </PopupWindow>
    </>
  )
}
export default AboutWindow
