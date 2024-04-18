import {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { useWindowContext } from './WindowContext'
import { SensorGroup } from 'src/shared/types'
import { useInfoPanelContext } from './InfoPanelContext'

export type SensorData = {
  id: number
  name: string
  usageMode: SensorUsageMode
  deviceUsers: number
  status: SensorStatus
  batteryLevel: number
  power: boolean
  emittedPowerLevel: number
  surveillanceSectorMaxRange: number
  operationalFrequencyBand: number
  direction: number
  surveillanceSectorWidth: number
  surveillanceScanPaneElevation: number
  dspTemp: number
  psuTemp: number
  powerAmplifierTemp: number
  location: Coordinates
  altitude: number
  detailedStatus: string
}

export type Coordinates = {
  Lat: number
  Lng: number
}

export enum SensorUsageMode {
  CONTROLLER = 'CONTROLLER',
  LISTENER = 'LISTENER'
}

export enum SensorStatus {
  SURVEILLANCE_CM = 'SURVEILLANCE_CM'
}

type SensorsContextType = {
  remoteSensors: SensorData[]
  localSensors: SensorData[]
  selectedSensor: SensorData | void
  selectedSensorGroup: SensorGroup | void
  toggleSelectSensor: (id: number, forceSelect?: boolean) => void
  updateSensorName: (id: number, name: string, isRemote: boolean) => void
  findSensorById: (id: number) => SensorData
  toggleSelectSensorGroup: (sensorGroup: SensorGroup) => void
}

export const dummyRemoteSensors: SensorData[] = [
  {
    id: 2,
    name: 'MLU 70',
    usageMode: SensorUsageMode.CONTROLLER,
    deviceUsers: 2,
    status: SensorStatus.SURVEILLANCE_CM,
    batteryLevel: 100,
    power: true,
    emittedPowerLevel: 3000,
    surveillanceSectorMaxRange: 1000,
    operationalFrequencyBand: 23,
    direction: 232,
    surveillanceSectorWidth: 12,
    surveillanceScanPaneElevation: 0,
    dspTemp: 32,
    psuTemp: 82,
    powerAmplifierTemp: 32,
    location: {
      Lat: 47.5857773,
      Lng: 47.5857773
    },
    altitude: 0,
    detailedStatus: 'Loading...'
  }
]

export const dummyLocalSensors: SensorData[] = [
  {
    id: 0,
    name: 'MLU 59',
    usageMode: SensorUsageMode.CONTROLLER,
    deviceUsers: 2,
    status: SensorStatus.SURVEILLANCE_CM,
    batteryLevel: 100,
    power: true,
    emittedPowerLevel: 3000,
    surveillanceSectorMaxRange: 1000,
    operationalFrequencyBand: 23,
    direction: 232,
    surveillanceSectorWidth: 12,
    surveillanceScanPaneElevation: 0,
    dspTemp: 32,
    psuTemp: 82,
    powerAmplifierTemp: 32,
    location: {
      Lat: 47.5857773,
      Lng: 47.5857773
    },
    altitude: 0,
    detailedStatus: 'Loading...'
  },
  {
    id: 1,
    name: 'MLU 60',
    usageMode: SensorUsageMode.LISTENER,
    deviceUsers: 2,
    status: SensorStatus.SURVEILLANCE_CM,
    batteryLevel: 10,
    power: true,
    emittedPowerLevel: 3000,
    surveillanceSectorMaxRange: 1000,
    operationalFrequencyBand: 23,
    direction: 232,
    surveillanceSectorWidth: 12,
    surveillanceScanPaneElevation: 0,
    dspTemp: 32,
    psuTemp: 82,
    powerAmplifierTemp: 32,
    location: {
      Lat: 47.5857773,
      Lng: 47.5857773
    },
    altitude: 0,
    detailedStatus: 'Loading...'
  }
]

const SensorsContext = createContext<SensorsContextType>({
  remoteSensors: [],
  localSensors: [],
  selectedSensor: undefined,
  selectedSensorGroup: undefined,
  toggleSelectSensor: () => {},
  updateSensorName: () => {},
  findSensorById: () => {
    return dummyLocalSensors[0]
  },
  toggleSelectSensorGroup: () => {}
})

export const useSensorsContext = (): SensorsContextType => {
  return useContext(SensorsContext)
}

export const SensorsContextProvider = ({ children }: PropsWithChildren): ReactElement => {
  const { selectInfoPanel } = useInfoPanelContext()
  const [selectedSensor, setSelectedSensor] = useState<SensorData>()
  const [selectedSensorGroup, setSelectedSensorGroup] = useState<SensorGroup>()
  const [localSensors, setLocalSensors] = useState(dummyLocalSensors)
  const [remoteSensors, setRemoteSensors] = useState(dummyRemoteSensors)
  const { isTab } = useWindowContext()

  const renameSensor = useCallback((id: number, name: string, isRemote: boolean): void => {
    if (isRemote) {
      setRemoteSensors((sensors) =>
        sensors.map((sensor) => (sensor.id === id ? { ...sensor, name } : sensor))
      )
    } else {
      setLocalSensors((sensors) =>
        sensors.map((sensor) => (sensor.id === id ? { ...sensor, name } : sensor))
      )
    }
  }, [])

  const updateSensorName = useCallback(
    (id: number, name: string, isRemote: boolean): void => {
      renameSensor(id, name, isRemote)
      window.main.renameSensor(id, name)
    },
    [renameSensor]
  )

  const findSensorAndGroupById = useCallback(
    (id: number): { sensor: SensorData; group: SensorGroup } => {
      const remoteSensor = remoteSensors.find((sensor) => sensor.id === id)

      if (remoteSensor != null) {
        return { sensor: remoteSensor, group: 'REMOTE' }
      }

      return {
        sensor: localSensors.find((sensor) => sensor.id === id)!,
        group: 'LOCAL'
      }
    },
    [remoteSensors, localSensors]
  )

  const findSensorById = useCallback(
    (id: number): SensorData => {
      return findSensorAndGroupById(id).sensor
    },
    [findSensorAndGroupById]
  )

  const setSelectedSensorAndGroup = useCallback(
    (id: number) => {
      const { sensor, group } = findSensorAndGroupById(id)
      setSelectedSensor(sensor)
      setSelectedSensorGroup(group)
      selectInfoPanel('DEVICE')
      return { group }
    },
    [findSensorAndGroupById]
  )

  const toggleSelectSensor = useCallback(
    (id: number, forceSelect?: boolean) => {
      if (selectedSensor?.id !== id) {
        const { group } = setSelectedSensorAndGroup(id)
        window.main.selectSensorId(id)

        if (selectedSensorGroup !== group) {
          window.main.selectSensorGroup(group)
        }
      } else if (!forceSelect) {
        setSelectedSensor(undefined)
        window.main.selectSensorId(undefined)
      }
    },
    [selectedSensor, selectedSensorGroup, setSelectedSensorAndGroup]
  )

  const toggleSelectSensorGroup = useCallback(
    (sensorGroup: SensorGroup) => {
      const newSelectedSensorGroup = selectedSensorGroup === sensorGroup ? undefined : sensorGroup

      setSelectedSensorGroup(newSelectedSensorGroup)
      window.main.selectSensorGroup(newSelectedSensorGroup)
    },
    [selectedSensorGroup]
  )

  const value = useMemo((): SensorsContextType => {
    return {
      selectedSensor,
      selectedSensorGroup,
      remoteSensors,
      localSensors,
      updateSensorName,
      findSensorById,
      toggleSelectSensor,
      toggleSelectSensorGroup
    }
  }, [
    selectedSensor,
    selectedSensorGroup,
    remoteSensors,
    localSensors,
    updateSensorName,
    findSensorById,
    toggleSelectSensor,
    toggleSelectSensorGroup
  ])

  useEffect(() => {
    if (isTab) {
      window.main.onRenameSensor(({ sensorId, name }) => {
        renameSensor(sensorId, name, !!remoteSensors.find((sensor) => sensor.id === sensorId))
      })
    } else {
      window.main.onSensorGroupChange((sensorGroup: SensorGroup | undefined) => {
        setSelectedSensorGroup(sensorGroup)
      })
    }

    window.main.onSensorIdChange((sensorId: number | undefined) => {
      if (sensorId == null || selectedSensor?.id === sensorId) {
        setSelectedSensor(undefined)
      } else {
        setSelectedSensorAndGroup(sensorId)
      }
    })

    return () => {
      if (isTab) {
        window.main.offRenameSensor()
      } else {
        window.main.offSensorGroupChange()
      }

      window.main.offSensorIdChange()
    }
  }, [isTab, selectedSensor, remoteSensors, renameSensor, setSelectedSensorAndGroup])

  useEffect(() => {
    window.main.getSelectedSensorId()

    if (!isTab) {
      window.main.getSelectedSensorGroup()
    }
  }, [isTab])

  return <SensorsContext.Provider value={value}>{children}</SensorsContext.Provider>
}
