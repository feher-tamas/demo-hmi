import { ReactElement } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import PointIcon from './icons/PointIcon'
import { useConnectionContext } from '@renderer/context/ConnectionContext'
import { ServiceIdentity } from '../../../../../shared/enums'

const PointButton = (): ReactElement => {
  const { findConnectionById } = useConnectionContext()
  return (
    <SquareButton disabled={!findConnectionById(ServiceIdentity.MapService)?.isConnected}>
      <PointIcon />
    </SquareButton>
  )
}
export default PointButton
