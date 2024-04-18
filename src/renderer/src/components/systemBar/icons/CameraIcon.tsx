import { ReactElement, useCallback, useState } from 'react'
import { useTheme } from '@mui/material/styles'
import { useWindowContext } from '@renderer/context/WindowContext'
import { useTabName } from '@renderer/components/tabPanel/useTabName'
import BorderedIconButton from '@renderer/ui/BorderedIconButton'

const CameraIcon = (): ReactElement => {
  const [isActive, setIsActive] = useState(false)
  const { tab } = useWindowContext()
  const { getTabName } = useTabName()
  const theme = useTheme()
  const borderColor =
    theme.palette.mode === 'light' ? theme.palette.text.primary : theme.palette.text.secondary

  const onScreenshot = useCallback(async () => {
    setIsActive(true)

    await window.main.takeScreenshot(tab ? getTabName(tab) : 'mainwindow')

    setIsActive(false)
  }, [getTabName])

  return (
    <BorderedIconButton
      onClick={onScreenshot}
      sx={{
        '&.MuiButtonBase-root:hover': {
          bgcolor: 'transparent'
        }
      }}
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 20 20"
        fill={
          isActive && theme.palette.mode === 'light'
            ? '#62FF2B'
            : isActive && theme.palette.mode === 'dark'
            ? 'green'
            : 'none'
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.1666 15.8333C19.1666 16.2754 18.991 16.6993 18.6785 17.0118C18.3659 17.3244 17.942 17.5 17.5 17.5H2.49998C2.05795 17.5 1.63403 17.3244 1.32147 17.0118C1.00891 16.6993 0.833313 16.2754 0.833313 15.8333V6.66667C0.833313 6.22464 1.00891 5.80072 1.32147 5.48816C1.63403 5.17559 2.05795 5 2.49998 5H5.83331L7.49998 2.5H12.5L14.1666 5H17.5C17.942 5 18.3659 5.17559 18.6785 5.48816C18.991 5.80072 19.1666 6.22464 19.1666 6.66667V15.8333Z"
          stroke={borderColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 14.1667C11.841 14.1667 13.3334 12.6743 13.3334 10.8333C13.3334 8.99238 11.841 7.5 10 7.5C8.15907 7.5 6.66669 8.99238 6.66669 10.8333C6.66669 12.6743 8.15907 14.1667 10 14.1667Z"
          stroke={borderColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </BorderedIconButton>
  )
}

export default CameraIcon
