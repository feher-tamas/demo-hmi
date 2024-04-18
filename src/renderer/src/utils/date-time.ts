export const dateFormats = ['YYYY.MM.DD', 'YYYY/MM/DD', 'DD.MM.YYYY', 'DD/MM/YYYY']

export const timeFormats = ['hh:mm:ss', 'hh:mm', 'hh:mm:ss xm', 'hh:mm xm']

export const formatDate = (date: Date, dateFormat: string): string => {
  const { year, month, day } = getDateTimeParts(date)
  const yearFirst = dateFormat[0] === 'Y'
  const separator = dateFormat.includes('.') ? '.' : '/'

  return `${yearFirst ? year : day}${separator}${month}${separator}${yearFirst ? day : year}`
}

const getDateTimeParts = (
  date: Date,
  hour12?: boolean
): {
  day: string
  month: string
  year: string
  hour: string
  minute: string
  second: string
  dayPeriod: string | undefined
} => {
  const format = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12
  })
  const [
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: second },
    ,
    dayPeriodResult
  ] = format.formatToParts(date)

  return {
    day,
    month,
    year,
    hour,
    minute,
    second,
    dayPeriod: dayPeriodResult?.value
  }
}

export const formatTime = (date: Date, timeFormat: string): string => {
  const hour12 = timeFormat?.endsWith('xm')
  const { hour, minute, second, dayPeriod } = getDateTimeParts(date, hour12)
  const includeSeconds = timeFormat.includes('ss')

  return `${hour}:${minute}${includeSeconds ? `:${second}` : ''}${hour12 ? ` ${dayPeriod}` : ''}`
}
