import {
  useEffect,
  useRef,
  useState,
  ReactElement,
  PropsWithChildren,
  useMemo,
  createContext
} from 'react'

export type BatteryManager = {
  level: number
  addEventListener: (type: string, listener: (event: Event) => void) => void
  charging: boolean
  removeEventListener: (type: string, listener: (event: Event) => void) => void
  dischargingTime: number
  chargingTime: number
}

type ExtendedNavigator = Navigator & {
  getBattery: () => Promise<BatteryManager>
}

const maxBatteryCapacityWidth = 19
let batteryManager: BatteryManager

export const getBatteryManager = async (): Promise<BatteryManager | null> => {
  if (batteryManager) return batteryManager
  if ('getBattery' in navigator) {
    try {
      batteryManager = await (navigator as ExtendedNavigator).getBattery()
      return batteryManager
    } catch (error) {
      console.log('error in battery level fetch', error)
      return null
    }
  } else {
    return null
  }
}

export type BatteryContextType = {
  batteryLevel: number
  isCharging: boolean
  batteryManagerNotLoaded: boolean
  batteryCapacity: number
  dischargingTime: number
  hoursUntilDischarged: number
  minutesUntilDischarged: number
}

const defaultContextState: BatteryContextType = {
  batteryLevel: 0,
  isCharging: false,
  batteryManagerNotLoaded: false,
  batteryCapacity: 0,
  dischargingTime: 0,
  hoursUntilDischarged: 0,
  minutesUntilDischarged: 0
}

export const BatteryContext = createContext<BatteryContextType>(defaultContextState)

export const BatteryStatusProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [batteryLevel, setBatteryLevel] = useState(0)
  const [batteryManagerNotLoaded, setBatteryManagerNotLoaded] = useState(false)
  const [isCharging, setIsCharging] = useState(false)
  const [dischargingTime, setDischargingTime] = useState(0)

  const isMountedRef = useRef(false)

  const batteryCapacity = batteryLevel ? batteryLevel * maxBatteryCapacityWidth : 0

  useEffect(() => {
    isMountedRef.current = true

    const onLevelChange = (): void => {
      setBatteryLevel(batteryManager.level)
    }

    const onChargingChange = (): void => {
      setIsCharging(batteryManager.charging)
    }

    const onDischargingTimeChange = (): void => {
      setDischargingTime(batteryManager.dischargingTime)
    }

    getBatteryManager()
      .then((batteryManager) => {
        if (isMountedRef.current && batteryManager) {
          setBatteryLevel(batteryManager.level)
          setIsCharging(batteryManager.charging)
          setDischargingTime(batteryManager.dischargingTime)
          batteryManager.addEventListener('levelchange', onLevelChange)
          batteryManager.addEventListener('chargingchange', onChargingChange)
          batteryManager.addEventListener('dischargingtimechange', onDischargingTimeChange)
        }
      })
      .catch(() => {
        setBatteryManagerNotLoaded(true)
      })

    return () => {
      isMountedRef.current = false
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', onLevelChange)
        batteryManager.removeEventListener('chargingchange', onChargingChange)
        batteryManager.removeEventListener('dischargingtimechange', onDischargingTimeChange)
      }
    }
  }, [])

  const hoursUntilDischarged = Math.floor(dischargingTime / 3600)
  const minutesUntilDischarged = Math.floor((dischargingTime % 3600) / 60)

  const batteryContextValue: BatteryContextType = useMemo(
    () => ({
      batteryLevel,
      isCharging,
      batteryManagerNotLoaded,
      batteryCapacity,
      dischargingTime,
      hoursUntilDischarged,
      minutesUntilDischarged
    }),
    [
      batteryLevel,
      isCharging,
      batteryManagerNotLoaded,
      batteryCapacity,
      dischargingTime,
      hoursUntilDischarged,
      minutesUntilDischarged
    ]
  )

  return <BatteryContext.Provider value={batteryContextValue}>{children}</BatteryContext.Provider>
}

export default BatteryStatusProvider
