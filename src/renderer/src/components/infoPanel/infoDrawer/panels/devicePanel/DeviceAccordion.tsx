import { PropsWithChildren, ReactElement } from 'react'
import BorderedAccordion from '../../../../../ui/BorderedAccordion'
import { AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type DeviceAccordionProps = {
  title: string
  disabled: boolean
  expanded: boolean
  onClick: () => void
}

const DeviceAccordion = ({
  title,
  disabled,
  expanded,
  onClick,
  children
}: PropsWithChildren<DeviceAccordionProps>): ReactElement => {
  return (
    <BorderedAccordion square disableGutters expanded={expanded && !disabled} disabled={disabled}>
      <AccordionSummary
        onClick={disabled ? (): void => {} : onClick}
        expandIcon={!disabled && <ExpandMoreIcon />}
        sx={{ padding: '0 10px' }}
      >
        <Typography variant="button" sx={{ fontSize: 10 }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>{children}</AccordionDetails>
    </BorderedAccordion>
  )
}

export default DeviceAccordion
