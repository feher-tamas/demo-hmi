import PanIcon from '@renderer/components/systemBar/icons/PanIcon'
import SquareButton from '@renderer/ui/SquareButton'
import { LatLngExpression, Map } from 'leaflet'

import { ReactElement, useCallback } from 'react'
import { useMap } from 'react-leaflet'

type Props = {
  center: [number, number]
  offset: [number, number]
  rotate: number
}
const PanButton = ({ center, offset, rotate }: Props): ReactElement => {
  const map: Map = useMap()

  const handleClick = useCallback(() => {
    const newCenter = panToOffset(map, center as LatLngExpression, offset)
    map.setView(newCenter as LatLngExpression)
  }, [offset, center])

  return (
    <SquareButton onClick={handleClick}>
      <PanIcon rotate={rotate} />
    </SquareButton>
  )
}
export default PanButton
const panToOffset = (
  map: Map,
  latlng: LatLngExpression,
  offset: [number, number]
): [number, number] => {
  const x = map.latLngToContainerPoint(latlng).x - offset[0]
  const y = map.latLngToContainerPoint(latlng).y - offset[1]
  const point = map.containerPointToLatLng([x, y])
  return [point.lat, point.lng]
}
