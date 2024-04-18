import { ForwardedRef, forwardRef, ReactElement } from 'react'
import { Stack, StackProps, styled, Typography } from '@mui/material'
import PowerButton from './PowerButton'

type SensorDragGhostProps = {
  name: string
  power: boolean
}

const SensorDragGhost = forwardRef(
  ({ name, power }: SensorDragGhostProps, ref: ForwardedRef<HTMLDivElement>): ReactElement => {
    return (
      <HiddenStack ref={ref} direction="row" alignItems="center" spacing="10px">
        <PowerButton power={power}></PowerButton>
        <Typography noWrap marginRight={'auto'}>
          {name}
        </Typography>
      </HiddenStack>
    )
  }
)
SensorDragGhost.displayName = 'SensorDragGhost'

export default SensorDragGhost

const HiddenStack = styled(Stack)<StackProps>(({ theme }) => ({
  width: '170px',
  padding: '10px',
  position: 'absolute',
  transform: 'translate(-10000px, -10000px)',
  backgroundColor: theme.palette.background.paper
}))
