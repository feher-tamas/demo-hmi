import PrimaryButton from '@renderer/ui/PrimaryButton'
import { ReactElement, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import StaticPopup from '../popupWindow/StaticPopup'

const ResetSettings = (): ReactElement => {
  const { t } = useTranslation()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const onToggleOpen = useCallback(() => {
    setIsConfirmOpen((isOpen) => !isOpen)
  }, [])

  const onConfirm = useCallback(() => {
    window.main.resetSettings()
    onToggleOpen()
  }, [onToggleOpen])

  return (
    <>
      <h3>{t('Reset.Label')}</h3>
      <p>{t('Reset.Description')}</p>
      <PrimaryButton variant="contained" sx={{ marginTop: 4 }} onClick={onToggleOpen}>
        {t('Reset.Button')}
      </PrimaryButton>
      {isConfirmOpen && (
        <StaticPopup
          width={360}
          height={116}
          title={t('Reset.ConfirmMessage')}
          onClose={onToggleOpen}
        >
          <PrimaryButton variant="contained" sx={{ marginLeft: 1 }} onClick={onConfirm}>
            {t('Reset.Button')}
          </PrimaryButton>
        </StaticPopup>
      )}
    </>
  )
}

export default ResetSettings
