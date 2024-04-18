import { Grid } from '@mui/material'
import InfoPanel from '../components/infoPanel/InfoPanel'
import TabPanel from '../components/tabPanel/TabPanel'
import { ReactElement } from 'react'
import BorderedGrid from '../ui/BorderedGrid'

const MainPage = (): ReactElement => {
  return (
    <Grid container wrap="nowrap" sx={{ height: '100%', marginBottom: '1px' }}>
      <BorderedGrid item xs="auto">
        <InfoPanel></InfoPanel>
      </BorderedGrid>
      <BorderedGrid item xs sx={{ minWidth: 0 }}>
        <TabPanel></TabPanel>
      </BorderedGrid>
    </Grid>
  )
}

export default MainPage
