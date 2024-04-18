import TabContent from './components/tabPanel/TabContent'
import TitleBar from './components/tabWindow/Titlebar'
import { useWindowContext } from './context/WindowContext'
import './i18n/config'
import { Box } from '@mui/material'

const TabWindow = (): JSX.Element => {
  const { tab, onSensorsChange } = useWindowContext()

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        width: '100%',
        color: 'text.primary',
        height: '100vh',
        paddingBottom: '35px'
      }}
    >
      {tab && (
        <>
          <TitleBar tab={tab!} />
          <Box sx={{ height: '100%', overflow: 'auto' }}>
            <TabContent tab={tab!} onSensorsChange={onSensorsChange} />
          </Box>
        </>
      )}
    </Box>
  )
}
export default TabWindow
