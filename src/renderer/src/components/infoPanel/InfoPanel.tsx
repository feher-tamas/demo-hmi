import { ReactElement } from 'react'
import InfoDrawer from './infoDrawer/InfoDrawer'
import { Grid } from '@mui/material'
import BorderedGrid from '../../ui/BorderedGrid'
import SideBar from './sideBar/SideBar'

const InfoPanel = (): ReactElement => {
  return (
    <Grid container sx={{ height: '100%' }}>
      <BorderedGrid item>
        <SideBar />
      </BorderedGrid>
      <BorderedGrid item>
        <InfoDrawer />
      </BorderedGrid>
    </Grid>
  )
}

export default InfoPanel
