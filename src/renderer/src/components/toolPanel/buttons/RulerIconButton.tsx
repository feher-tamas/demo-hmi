import { ReactElement } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import RulerIcon from './icons/RulerIcon'
import { useConnectionContext } from '@renderer/context/ConnectionContext'
import { ServiceIdentity } from '../../../../../shared/enums'

const RulerIconButton = (): ReactElement => {
  const { findConnectionById } = useConnectionContext()
  return (
    <SquareButton disabled={!findConnectionById(ServiceIdentity.MapService)?.isConnected}>
      <RulerIcon />
    </SquareButton>
  )
}

export default RulerIconButton
