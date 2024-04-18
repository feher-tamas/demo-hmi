import { MouseEvent, ReactElement } from 'react'
import { ButtonBase, ButtonBaseProps, Icon, styled } from '@mui/material'
import PowerIcon from './PowerIcon'

type PowerButtonProps = {
  onClick?: ($event: MouseEvent<HTMLButtonElement>) => void
  power: boolean
}

const PowerButton = ({ onClick, power }: PowerButtonProps): ReactElement => {
  const CircleButton = styled(ButtonBase)<ButtonBaseProps>(({ theme }) => ({
    width: 30,
    height: 30,
    minWidth: 30,
    minHeight: 30,
    borderRadius: 50,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper
  }))

  return (
    <CircleButton onClick={onClick}>
      <Icon>
        <PowerIcon mode={power ? 'on' : 'off'}></PowerIcon>
      </Icon>
    </CircleButton>
  )
}

export default PowerButton
