import TitleBar from './components/systemBar/Titlebar'
import './i18n/config'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const App = (): JSX.Element => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  //const theme = useTheme()

  return (
    // Setup theme and css baseline for the Material-UI app
    // https://mui.com/customization/theming/

    <Box
      sx={{
        /* eslint-disable @typescript-eslint/no-unused-vars */
        backgroundColor: (theme) => theme.palette.background.default,
        width: '100%',
        color: 'text.primary',
        height: '100vh'
      }}
    >
      <TitleBar></TitleBar>
      <Box sx={{ height: '100%', paddingBottom: '35px' }}>
        <Outlet />
      </Box>
    </Box>
  )
}
export default App
