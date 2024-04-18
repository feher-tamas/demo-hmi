import { useTheme } from '@mui/material'
import { ReactElement } from 'react'

type Props = {
  isConnected?: boolean
}

const ConnectionIndicator = ({ isConnected }: Props): ReactElement => {
  const theme = useTheme()
  const borderColor = isConnected
    ? theme.palette.connectionIndicator.connected
    : theme.palette.connectionIndicator.notConnected

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.0002 11.6667C10.9206 11.6667 11.6668 10.9205 11.6668 10C11.6668 9.07957 10.9206 8.33337 10.0002 8.33337C9.07969 8.33337 8.3335 9.07957 8.3335 10C8.3335 10.9205 9.07969 11.6667 10.0002 11.6667Z"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5333 6.46661C13.9982 6.93098 14.367 7.48242 14.6186 8.08941C14.8703 8.6964 14.9998 9.34703 14.9998 10.0041C14.9998 10.6612 14.8703 11.3118 14.6186 11.9188C14.367 12.5258 13.9982 13.0772 13.5333 13.5416M6.46668 13.5333C6.0018 13.0689 5.633 12.5175 5.38138 11.9105C5.12976 11.3035 5.00024 10.6529 5.00024 9.99578C5.00024 9.3387 5.12976 8.68807 5.38138 8.08107C5.633 7.47408 6.0018 6.92264 6.46668 6.45828M15.8917 4.10828C17.4539 5.67101 18.3316 7.79024 18.3316 9.99994C18.3316 12.2096 17.4539 14.3289 15.8917 15.8916M4.10834 15.8916C2.54609 14.3289 1.66846 12.2096 1.66846 9.99994C1.66846 7.79024 2.54609 5.67101 4.10834 4.10828"
        stroke={borderColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ConnectionIndicator
