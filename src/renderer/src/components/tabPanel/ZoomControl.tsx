import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

type Props = {
  zoomLevel: number
  onZoomChange: (zoom: number) => void
}

const ZoomControl = ({ zoomLevel, onZoomChange }: Props) => {
  const map = useMap()
  // Updates if zoom changed either with button clicks or mouse wheel
  const updateZoomInTab = () => {
    map.on('zoom', () => {
      onZoomChange(map.getZoom())
    })
  }

  useEffect(() => {
    map.setZoom(zoomLevel)
    updateZoomInTab()
  }, [zoomLevel, map])

  return null
}

export default ZoomControl
