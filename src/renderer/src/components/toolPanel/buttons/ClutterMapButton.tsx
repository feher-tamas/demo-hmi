import { ReactElement } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import ClutterMapIcon from './icons/ClutterMapIcon'

const ClutterMapButton = (): ReactElement => {
  return (
    <SquareButton>
      <ClutterMapIcon />
    </SquareButton>
  )
}
export default ClutterMapButton
