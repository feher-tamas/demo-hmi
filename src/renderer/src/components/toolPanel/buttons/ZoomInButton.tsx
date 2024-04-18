import { ReactElement, useCallback } from 'react'
import SquareButton from '@renderer/ui/SquareButton'
import ZoomInIcon from '@renderer/components/systemBar/icons/ZoomInIcon'

type Props = {
  zoom: number
  onZoomChange: (zoom: number) => void
}
const max = 18
const ZoomInButton = ({ zoom, onZoomChange }: Props): ReactElement => {
  const handleClick = useCallback(() => {
    const zoomLevel = zoom < max ? zoom + 1 : zoom
    onZoomChange(zoomLevel)
  }, [zoom, onZoomChange])

  return (
    <SquareButton onClick={handleClick}>
      <ZoomInIcon zoomFactor={zoom} max={max} />
    </SquareButton>
  )
}
export default ZoomInButton
