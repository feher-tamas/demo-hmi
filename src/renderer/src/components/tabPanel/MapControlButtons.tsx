import { ReactElement, useEffect } from 'react'
import { useTheme, Stack, Box } from '@mui/material'
import ZoomInButton from '../toolPanel/buttons/ZoomInButton'
import ZoomOutButton from '../toolPanel/buttons/ZoomOutButton'
import PanButton from '../toolPanel/buttons/PanButton'
import { MapConfig } from 'src/shared/types'
import { useMap } from 'react-leaflet'

type Props = {
  mapConfig: MapConfig
  onMapConfigChange: (mapConfig: MapConfig) => void
}

const MapControlButtons = ({ mapConfig, onMapConfigChange }: Props): ReactElement => {
  const theme = useTheme()
  const color = theme.palette.background.paper
  const map = useMap()

  useEffect(() => {
    const onMoveEnd = (): void => {
      const center = map.getCenter()
      onMapConfigChange({ ...mapConfig, center: [center.lat, center.lng] })
    }

    map.on('moveend', onMoveEnd)

    return () => {
      map.off('moveend', onMoveEnd)
    }
  }, [map, mapConfig, onMapConfigChange])

  return (
    <>
      <Box
        sx={{
          zIndex: 500,
          position: 'absolute',
          left: '50%',
          bottom: '0px'
        }}
      >
        <PanButton center={mapConfig.center} rotate={270} offset={[0, -100]}></PanButton>
      </Box>
      <Box
        sx={{
          zIndex: 500,
          position: 'absolute',
          left: '50%',
          top: '0px'
        }}
      >
        <PanButton center={mapConfig.center} rotate={90} offset={[0, 100]}></PanButton>
      </Box>
      <Box
        sx={{
          zIndex: 500,
          position: 'absolute',
          right: '0px',
          top: '50%'
        }}
      >
        <PanButton center={mapConfig.center} rotate={180} offset={[-100, 0]}></PanButton>
      </Box>

      <Box
        sx={{
          zIndex: 500,
          position: 'absolute',
          left: '0px',
          top: '50%'
        }}
      >
        <PanButton center={mapConfig.center} rotate={0} offset={[100, 0]}></PanButton>
      </Box>
      <Stack
        direction="row"
        sx={{
          zIndex: 500,
          height: '40px',
          position: 'absolute',
          right: '15px',
          bottom: '15px',
          backgroundColor: color
        }}
      >
        <ZoomInButton
          zoom={mapConfig.zoom}
          onZoomChange={(zoom) => onMapConfigChange({ ...mapConfig, zoom })}
        />
        <ZoomOutButton
          zoom={mapConfig.zoom}
          onZoomChange={(zoom) => onMapConfigChange({ ...mapConfig, zoom })}
        />
      </Stack>
    </>
  )
}

export default MapControlButtons
