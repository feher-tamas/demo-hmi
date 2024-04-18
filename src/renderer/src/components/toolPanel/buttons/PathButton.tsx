import { ReactElement } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import PathIcon from './icons/PathIcon'
import { useConnectionContext } from '@renderer/context/ConnectionContext'
import { ServiceIdentity } from '../../../../../shared/enums'

const PathButton = (): ReactElement => {
  const { findConnectionById } = useConnectionContext()
  return (
    <SquareButton disabled={!findConnectionById(ServiceIdentity.MapService)?.isConnected}>
      <PathIcon />
    </SquareButton>
  )
}
export default PathButton
