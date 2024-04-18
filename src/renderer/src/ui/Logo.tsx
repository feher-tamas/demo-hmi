import { styled, useTheme } from '@mui/material'
import logoDark from '../assets/logoDark.svg'
import logoLight from '../assets/logoLight.svg'
import { ReactElement } from 'react'
type LogoProps = {
  width: number
  height: number
}

const Logo = ({ width, height }: LogoProps): ReactElement => {
  const theme = useTheme()

  return (
    <Img
      width={width}
      height={height}
      src={theme.palette.mode === 'dark' ? logoLight : logoDark}
      alt="logo"
      onDragStart={(e: React.DragEvent<HTMLImageElement>): void => e.preventDefault()}
    />
  )
}

export default Logo

const Img = styled('img')(({ width, height }) => ({
  width: `${width}px`,
  height: `${height}px`,
  WebkitAppRegion: 'no-drag',
  margin: '8px'
}))
