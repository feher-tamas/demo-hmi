import { PropsWithChildren, ReactElement } from 'react'
import SquareButton from './SquareButton'
import { keyframes, useTheme } from '@mui/material/styles'

type SelectableButtonProps = {
  selected: boolean
  onClick: (selected: boolean) => void
}

const SelectableButton = ({
  selected,
  onClick,
  children
}: PropsWithChildren<SelectableButtonProps>): ReactElement => {
  const theme = useTheme()
  const onSelectEffect = keyframes`
    0% {
        background-color: ${theme.palette.background.paper};
    }
    100% {
        background-color: ${theme.palette.highlight};
    }
`
  const style = selected
    ? {
        backgroundColor: theme.palette.highlight,
        animation: `${onSelectEffect} 0.5s 1 ease`
      }
    : { backgroundColor: theme.palette.background.paper }

  return (
    <SquareButton sx={style} onClick={(): void => onClick(!selected)}>
      {children}
    </SquareButton>
  )
}

export { SelectableButton }
export type { SelectableButtonProps }
