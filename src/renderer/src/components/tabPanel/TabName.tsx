import { KeyboardEvent, ReactElement, useCallback, useState } from 'react'
import { Input } from '@mui/material'

type TabNameInputProps = {
  isEditing: boolean
  name: string
  onFinishEditing: (label: string) => void
}

const TabName = ({ isEditing, name, onFinishEditing }: TabNameInputProps): ReactElement => {
  const [editedLabel, setEditedLabel] = useState<string>(name)

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        onFinishEditing(editedLabel)
      }
    },
    [editedLabel, onFinishEditing]
  )

  return (
    <>
      {isEditing ? (
        <Input
          value={editedLabel}
          onChange={(e): void => setEditedLabel(e.target.value)}
          onBlur={(): void => onFinishEditing(editedLabel)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        name
      )}
    </>
  )
}

export default TabName
