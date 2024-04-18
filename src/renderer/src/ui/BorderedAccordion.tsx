import { Accordion, AccordionProps, styled } from '@mui/material'

const BorderedAccordion = styled(Accordion)<AccordionProps>(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: `inset 0px -1px 0px ${theme.palette.divider}`
}))
export default BorderedAccordion
