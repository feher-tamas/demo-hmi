import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ZoomControl from './ZoomControl'
import { MapConfig } from 'src/shared/types'
import MapControlButtons from './MapControlButtons'

type Props = {
  mapConfig: MapConfig
  onMapConfigChange: (mapConfig: MapConfig) => void
}

const Map = ({ mapConfig, onMapConfigChange }: Props) => {
  const { zoom } = mapConfig

  return (
    <MapContainer
      center={mapConfig.center}
      zoom={zoom}
      minZoom={3}
      maxZoom={18}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%' }}
      doubleClickZoom={false}
      attributionControl={false}
      zoomControl={false}
    >
      <TileLayer
        // Using OpenStreetMap for now
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapControlButtons mapConfig={mapConfig} onMapConfigChange={onMapConfigChange} />
      <ZoomControl
        zoomLevel={zoom}
        onZoomChange={(zoom) => onMapConfigChange({ ...mapConfig, zoom })}
      />
    </MapContainer>
  )
}

export default Map
