import { KeyboardEvent, ReactElement, useCallback, useState } from 'react'
import { Input, Typography, useTheme } from '@mui/material'
import { useSensorsContext } from '../../../../../../context/SensorsContext'
import useSingleAndDoubleClick from './useSingleAndDoubleClick'

type SensorNameProps = {
  id: number
  name: string
  isRemote: boolean
  expanded: boolean
  expand: () => void
}

const SensorName = ({ id, name, isRemote, expand, expanded }: SensorNameProps): ReactElement => {
  const { updateSensorName } = useSensorsContext()
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedName, setEditedName] = useState<string>(name)

  const theme = useTheme()

  const onSingleClick = useCallback((): void => {
    setIsEditing(true)
  }, [])
  const onMouseClick = !expanded ? expand : onSingleClick

  const saveName = useCallback((): void => {
    if (name !== editedName && editedName !== '') {
      updateSensorName(id, editedName, isRemote)
    }
  }, [id, name, editedName, isRemote, updateSensorName])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setIsEditing(false)
        setEditedName(name)
      } else if (event.key === 'Enter') {
        saveName()
      }
    },
    [saveName]
  )

  const label = (
    <Typography
      noWrap
      marginRight={'auto'}
      onClick={useSingleAndDoubleClick(onMouseClick)}
      sx={{
        '&:hover': expanded
          ? { border: `1px solid ${theme.palette.primary.dark}`, px: '2px', borderRadius: '2px' }
          : ''
      }}
    >
      {name}
    </Typography>
  )
  const input = (
    <Input
      value={editedName}
      error={!editedName}
      onChange={(event): void => setEditedName(event.target.value)}
      onBlur={saveName}
      onKeyDown={handleKeyDown}
      onClick={($event): void => $event.stopPropagation()}
      autoFocus
      sx={{ marginBottom: '3px' }}
    />
  )

  return <>{isEditing ? input : label}</>
}

export default SensorName
