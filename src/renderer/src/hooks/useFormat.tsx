import { useCommonSettings } from '@renderer/context/CommonSettings'
import { formatCoordinate, isValidCoordinate } from '../utils/format-converter'
import { useMemo } from 'react'

export type CoordinateType = {
  lat: number
  lng: number
}

const useFormat = (coordinates: CoordinateType) => {
  const { format } = useCommonSettings()
  const { lat, lng } = coordinates

  const value = useMemo(() => {
    if (!isValidCoordinate(lat, lng)) {
      return null
    }

    return formatCoordinate(lat, lng, format)
  }, [lat, lng, format])
  return value
}

export default useFormat
