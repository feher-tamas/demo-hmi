import { ReactElement, useCallback, useRef } from 'react'
import SensorDataPanelHeader from './SensorDataPanelHeader'
import { SensorData } from '../../../../../../context/SensorsContext'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryProps,
  Box,
  styled,
  Typography
} from '@mui/material'
import SensorDataPanelBody from './SensorDataPanelBody'
import { useTheme } from '@mui/material/styles'
import useSingleAndDoubleClick from './useSingleAndDoubleClick'
import { useTabsContext } from '../../../../../../context/TabsContext'
import SensorDragGhost from '../../../../../../ui/SensorDragGhost'

type SensorDataPanelProps = {
  data: SensorData
  expanded: boolean
  isRemote: boolean
  onToggleExpand: () => void
}

const SensorDataPanel = ({
  data,
  expanded,
  isRemote,
  onToggleExpand
}: SensorDataPanelProps): ReactElement => {
  const theme = useTheme()
  const { onCreateTab } = useTabsContext()
  const ghostRef = useRef<HTMLDivElement>(null)

  const NoMarginAccordionSummary = styled(AccordionSummary)<AccordionSummaryProps>(() => ({
    padding: 0,
    '& .MuiAccordionSummary-content': {
      margin: 0
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'transparent'
    }
  }))

  const onOpenSensorTab = useCallback(() => {
    onCreateTab(data.id, data.name)
  }, [data, onCreateTab])

  const onDragStart = useCallback(
    (event): void => {
      event.dataTransfer.setDragImage(ghostRef.current, 0, 0)
      window.main.startDraggingSensor({ sensorId: data.id })
    },
    [data]
  )
  const onDragEnd = useCallback((): void => {
    window.main.stopDraggingSensor()
  }, [])

  return (
    <>
      <Accordion
        onClick={useSingleAndDoubleClick(onToggleExpand, onOpenSensorTab)}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        draggable
        expanded={expanded}
        sx={{
          padding: '10px',
          backgroundColor: expanded
            ? theme.palette.tab.selected.background
            : theme.palette.background.paper
        }}
        disableGutters
        square
      >
        <NoMarginAccordionSummary>
          <SensorDataPanelHeader
            data={data}
            expanded={expanded}
            isRemote={isRemote}
            onPower={(): void => {}}
            expand={onToggleExpand}
          ></SensorDataPanelHeader>
        </NoMarginAccordionSummary>
        <AccordionDetails sx={{ padding: 0 }}>
          <SensorDataPanelBody data={data}></SensorDataPanelBody>
          <Box
            m={'-10px'}
            mt={0}
            textAlign="center"
            bgcolor={theme.palette.primary.dark}
            color={theme.palette.text.contrastText}
          >
            <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
              {data.detailedStatus}
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <SensorDragGhost ref={ghostRef} name={data.name} power={data.power}></SensorDragGhost>
    </>
  )
}

export default SensorDataPanel
