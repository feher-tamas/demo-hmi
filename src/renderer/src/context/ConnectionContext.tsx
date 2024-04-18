import {
  PropsWithChildren,
  ReactElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { ServiceIdentity } from '../../../shared/enums'

export type ConnectionItemType = {
  id: number
  name: string
  isConnected: boolean
}
const initSate: ConnectionItemType[] = [
  {
    id: ServiceIdentity.MapService,
    isConnected: false,
    name: 'MapService'
  },
  {
    id: ServiceIdentity.MapServer,
    isConnected: false,
    name: 'MapServer'
  },
  {
    id: ServiceIdentity.Radar,
    isConnected: false,
    name: 'Radar'
  }
]
export type UseConnectionContextType = {
  connections: ConnectionItemType[]
  findConnectionById: (id: number) => ConnectionItemType | undefined
}
const defaultContextState: UseConnectionContextType = {
  connections: initSate,
  findConnectionById: () => {
    return undefined
  }
}
export const ConnectionContext = createContext<UseConnectionContextType>(defaultContextState)
export const useConnectionContext = (): UseConnectionContextType => {
  return useContext(ConnectionContext)
}

export function ConnectionContextProvider({ children }: PropsWithChildren<object>): ReactElement {
  const [connections, setConnections] = useState<ConnectionItemType[]>(initSate)

  useEffect(() => {
    window.main.onMapServiceConnected((): void => {
      updateConnection(1, true)
    })
    window.main.onMapServiceDisconnected((): void => {
      updateConnection(1, false)
    })
    return () => {
      window.main.offMapServiceConnected()
      window.main.offMapServiceDisconnected()
    }
  }, [])

  const updateConnection = useCallback((id: number, isConnected: boolean): void => {
    setConnections((connections) =>
      connections.map((connection) =>
        connection.id === id ? { ...connection, isConnected } : connection
      )
    )
  }, [])

  const findConnectionById = useCallback(
    (id: number): ConnectionItemType | undefined => {
      return connections.find((connection) => {
        return connection.id === id
      })
    },
    [connections]
  )

  const value = useMemo(() => {
    return {
      connections,
      findConnectionById
    }
  }, [connections])
  return <ConnectionContext.Provider value={value}>{children}</ConnectionContext.Provider>
}
