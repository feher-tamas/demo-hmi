import { ReactElement, useCallback } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import ZoomOutIcon from '@renderer/components/systemBar/icons/ZoomOutIcon'

type Props = {
  zoom: number
  onZoomChange: (zoom: number) => void
}
const min = 3
const ZoomOutButton = ({ zoom, onZoomChange }: Props): ReactElement => {
  const handleClick = useCallback(() => {
    const zoomLevel = zoom > min ? zoom - 1 : zoom
    onZoomChange(zoomLevel)
  }, [zoom, onZoomChange])

  return (
    <SquareButton onClick={handleClick}>
      <ZoomOutIcon zoomFactor={zoom} min={min} />
    </SquareButton>
  )
}
export default ZoomOutButton
