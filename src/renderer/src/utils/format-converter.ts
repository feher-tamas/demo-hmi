import { forward } from 'mgrs'
import utmObj from 'utm-latlng-orabazu'

function convertToGeoDD(lat: number, lng: number) {
  return `${lat.toFixed(7)}, ${lng.toFixed(7)}`
}

function convertToGeoDMS(lat: number, lng: number) {
  return convertToDMS(lat, lng, false, true)
}

function convertToUTM(lat: number, lng: number) {
  const newUtmObj = new utmObj()
  // @ts-ignore
  const utmObject = newUtmObj.convertLatLngToUtm(lat, lng, 0)

  if (typeof utmObject !== 'string') {
    return `${utmObject.Easting}, ${utmObject.Northing}, ${utmObject.ZoneNumber}, ${utmObject.ZoneLetter}`
  } else {
    return null
  }
}

function convertToMGRS(lat: number, lng: number) {
  try {
    const MGRS = forward([lng, lat], 5)

    const GZD = MGRS.slice(0, MGRS.length - 12)
    const Ident = MGRS.slice(MGRS.length - 12, MGRS.length - 10)
    const Eastings = MGRS.slice(MGRS.length - 10, MGRS.length - 5)
    const Northings = MGRS.slice(MGRS.length - 5)

    return `${GZD} ${Ident} ${Eastings} ${Northings}`
  } catch (e) {
    if (e instanceof TypeError) {
      return 'Coordinate outside MGRS limits.'
    } else {
      return null
    }
  }
}

function padCoordinate(coordinate: number): string {
  return coordinate < 10 ? '0' + coordinate.toString() : coordinate.toString()
}

function toDegreesMinutesAndSeconds(coordinate: number, padding: boolean): string {
  const absolute = Math.abs(coordinate)
  const degrees = Math.floor(absolute)
  const minutesNotTruncated = (absolute - degrees) * 60
  const minutes = Math.floor(minutesNotTruncated)
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(2)

  if (padding) {
    return `${padCoordinate(degrees)}° ${padCoordinate(minutes)}' ${seconds}"`
  }

  return `${degrees}° ${minutes}' ${seconds}"`
}

function convertToDMS(lat: number, lng: number, cardinal: boolean, padding: boolean): string {
  const latitude = toDegreesMinutesAndSeconds(lat, padding)
  const longitude = toDegreesMinutesAndSeconds(lng, padding)

  if (cardinal) {
    const latitudeCardinal = lat >= 0 ? 'N' : 'S'
    const longitudeCardinal = lng >= 0 ? 'E' : 'W'

    return `${latitude} ${latitudeCardinal}, ${longitude} ${longitudeCardinal}`
  }

  return `${latitude}, ${longitude}`
}

export function isValidCoordinate(lat: number, lng: number): boolean {
  const regexExpLat = /^((-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?))$/gi
  const regexExpLng = /^(s*(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?))$/gi
  return regexExpLat.test(lat.toString()) && regexExpLng.test(lng.toString())
}

export function formatCoordinate(lat: number, lng: number, format: string | null) {
  switch (format) {
    case 'GEODD':
      return convertToGeoDD(lat, lng)
    case 'GEODMS':
      return convertToGeoDMS(lat, lng)
    case 'UTM':
      return convertToUTM(lat, lng)
    case 'MGRS':
      return convertToMGRS(lat, lng)
    default:
      return convertToGeoDD(lat, lng)
  }
}
