import { PropsWithChildren, ReactElement } from 'react'
import { styled, Typography, TypographyProps } from '@mui/material'

type HighlightedLabelProps = {
  expanded: boolean
}

const HighlightedLabel = ({
  expanded,
  children
}: PropsWithChildren<HighlightedLabelProps>): ReactElement => {
  const HighlightedLabel = styled(Typography)<TypographyProps>(({ theme }) => ({
    backgroundColor: expanded
      ? theme.palette.background.paper
      : theme.palette.tab.selected.background,
    borderRadius: '2px',
    fontSize: 10,
    padding: '3px 5px'
  }))
  return (
    <HighlightedLabel variant="button" noWrap>
      {children}
    </HighlightedLabel>
  )
}

export default HighlightedLabel
