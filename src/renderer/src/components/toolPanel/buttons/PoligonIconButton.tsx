import { ReactElement } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import PoligonIcon from './icons/PoligonIcon'
import { useConnectionContext } from '@renderer/context/ConnectionContext'
import { ServiceIdentity } from '../../../../../shared/enums'

const PoligonIconButton = (): ReactElement => {
  const { findConnectionById } = useConnectionContext()
  return (
    <SquareButton disabled={!findConnectionById(ServiceIdentity.MapService)?.isConnected}>
      <PoligonIcon />
    </SquareButton>
  )
}
export default PoligonIconButton
