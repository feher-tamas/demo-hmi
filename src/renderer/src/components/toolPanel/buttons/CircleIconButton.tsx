import { ReactElement } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import CircleIcon from './icons/CircleIcon'
import { useConnectionContext } from '@renderer/context/ConnectionContext'
import { ServiceIdentity } from '../../../../../shared/enums'

const CircleIconButton = (): ReactElement => {
  const { findConnectionById } = useConnectionContext()
  return (
    <SquareButton disabled={!findConnectionById(ServiceIdentity.MapService)?.isConnected}>
      <CircleIcon />
    </SquareButton>
  )
}
export default CircleIconButton
