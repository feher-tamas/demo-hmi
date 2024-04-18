import { ReactElement } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import POISettingsIcon from './icons/POISettingsIcon'
import { useConnectionContext } from '@renderer/context/ConnectionContext'
import { ServiceIdentity } from '../../../../../shared/enums'
const POISettingsButton = (): ReactElement => {
  const { findConnectionById } = useConnectionContext()
  return (
    <SquareButton disabled={!findConnectionById(ServiceIdentity.MapService)?.isConnected}>
      <POISettingsIcon />
    </SquareButton>
  )
}
export default POISettingsButton
