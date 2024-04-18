import { Check } from '@mui/icons-material'
import { ListItemIcon, ListItemText } from '@mui/material'
import { ReactElement } from 'react'
import BorderedMenuItem from '@renderer/ui/BorderedMenuItem'

type FormatProps = {
  name: string
  onSelect: (name: string) => void
  isSelected: boolean
}

const FormatOptions = ({ name, onSelect, isSelected }: FormatProps): ReactElement => {
  return (
    <BorderedMenuItem onClick={(): void => onSelect(name)}>
      {isSelected ? (
        <>
          <ListItemIcon>
            <Check sx={{ color: '#62FF2B' }} />
          </ListItemIcon>
          {name}
        </>
      ) : (
        <ListItemText inset>{name}</ListItemText>
      )}
    </BorderedMenuItem>
  )
}

export default FormatOptions
