import { ReactElement, useCallback } from 'react'
import { dateFormats, timeFormats, formatDate, formatTime } from '../../utils/date-time'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import { useCommonSettings } from '@renderer/context/CommonSettings'
import { useTranslation } from 'react-i18next'

const now = new Date(Date.now())

type Props = {
  onSettingsChange: () => void
}

const GeneralSettings = ({ onSettingsChange }: Props): ReactElement => {
  const { t } = useTranslation()
  const {
    dateFormat,
    timeFormat,
    onDateFormatChange: onSettingsDateFormatChange,
    onTimeFormatChange: onSettingsTimeFormatChange
  } = useCommonSettings()

  const onDateFormatChange = useCallback(
    (dateFormat: string) => {
      onSettingsDateFormatChange(dateFormat)
      onSettingsChange()
    },
    [onSettingsDateFormatChange, onSettingsChange]
  )

  const onTimeFormatChange = useCallback(
    (timeFormat: string) => {
      onSettingsTimeFormatChange(timeFormat)
      onSettingsChange()
    },
    [onSettingsTimeFormatChange, onSettingsChange]
  )

  return (
    <>
      {dateFormat && (
        <>
          {t('DateFormat')}
          <RadioGroup value={dateFormat} onChange={(_, value): void => onDateFormatChange(value)}>
            {dateFormats.map((dateFormat) => (
              <FormControlLabel
                key={dateFormat}
                value={dateFormat}
                control={<Radio color="success" />}
                label={`${formatDate(now, dateFormat)} (${dateFormat})`}
              />
            ))}
          </RadioGroup>
          {t('TimeFormat')}
          <RadioGroup value={timeFormat} onChange={(_, value): void => onTimeFormatChange(value)}>
            {timeFormats.map((timeFormat) => (
              <FormControlLabel
                key={timeFormat}
                value={timeFormat}
                control={<Radio color="success" />}
                label={`${formatTime(now, timeFormat)} (${timeFormat})`}
              />
            ))}
          </RadioGroup>
        </>
      )}
    </>
  )
}

export default GeneralSettings
