import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

type CommonSettingsContext = {
  dateFormat: string | null
  timeFormat: string | null
  format: string | null
  onDateFormatChange: (dateFormat: string) => void
  onTimeFormatChange: (timeFormat: string) => void
  onFormatChange: (format: string) => void
}

const commonSettingsContext = createContext<CommonSettingsContext>({
  dateFormat: null,
  timeFormat: null,
  format: null,
  onDateFormatChange: () => {},
  onTimeFormatChange: () => {},
  onFormatChange: () => {}
})

export function CommonSettingsProvider({ children }: PropsWithChildren<object>): ReactElement {
  const [dateFormat, setDateFormat] = useState<string | null>(null)
  const [timeFormat, setTimeFormat] = useState<string | null>(null)
  const [format, setFormat] = useState<string | null>(null)

  const onDateFormatChange = useCallback((dateFormat: string) => {
    setDateFormat(dateFormat)
    window.main.setDateFormat(dateFormat)
  }, [])

  const onTimeFormatChange = useCallback((timeFormat: string) => {
    setTimeFormat(timeFormat)
    window.main.setTimeFormat(timeFormat)
  }, [])

  const onFormatChange = useCallback((format: string) => {
    setFormat(format)
    window.main.setFormat(format)
  }, [])

  useEffect(() => {
    window.main.onDateFormatChange(setDateFormat)
    window.main.onTimeFormatChange(setTimeFormat)
    window.main.onFormatChange(setFormat)
    window.main.getDateFormat()
    window.main.getTimeFormat()
    window.main.getFormat()
    return () => {
      window.main.offDateFormatChange()
      window.main.offTimeFormatChange()
      window.main.offFormatListener()
    }
  }, [])

  const value = useMemo(() => {
    return {
      dateFormat,
      timeFormat,
      onDateFormatChange,
      onTimeFormatChange,
      format,
      onFormatChange
    }
  }, [dateFormat, timeFormat, onDateFormatChange, onTimeFormatChange, format, onFormatChange])

  return <commonSettingsContext.Provider value={value}>{children}</commonSettingsContext.Provider>
}

export function useCommonSettings(): CommonSettingsContext {
  return useContext(commonSettingsContext)
}
