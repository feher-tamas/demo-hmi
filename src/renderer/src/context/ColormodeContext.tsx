import CssBaseline from '@mui/material/CssBaseline'
import { PaletteMode, ThemeProvider } from '@mui/material'
import createTheme from '@mui/material/styles/createTheme'
import { createContext, useEffect, useMemo, useState } from 'react'
import palette from './palette'

interface Props {
  children: React.ReactNode
}

interface IColorModeContext {
  toggleColorDarkMode: () => void
  toggleColorLightMode: () => void
}
const ColorModeContext = createContext<IColorModeContext>({
  toggleColorDarkMode: () => {},
  toggleColorLightMode: () => {}
})

export const ColorModeProvider: React.FC<Props> = ({ children }: Props) => {
  const [mode, setMode] = useState<PaletteMode>('dark')
  const colorMode = useMemo(
    () => ({
      toggleColorDarkMode: (): void => {
        setMode('dark')
        window.main.setTheme?.('dark')
      },
      toggleColorLightMode: (): void => {
        setMode('light')
        window.main.setTheme?.('light')
      }
    }),
    []
  )

  const breakPoints = {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  }

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontSize: 12
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                margin: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                userSelect: 'none',
                padding: 0
              }
            }
          },
          MuiToolbar: {
            styleOverrides: {
              dense: {
                height: 35,
                minHeight: 35,
                [`@media (min-width: ${breakPoints.values.xs}px)`]: {
                  paddingLeft: 0,
                  paddingRight: 0
                }
              }
            }
          },

          MuiContainer: {
            styleOverrides: {
              root: {
                fontSize: 12
              }
            }
          }
        },
        palette: {
          mode,
          ...(mode == 'light' ? palette.light : palette.dark)
        }
      }),
    [mode]
  )

  useEffect(() => {
    const themeListener = (_: Electron.IpcRendererEvent, theme: string): void => {
      if (theme === 'dark') {
        colorMode.toggleColorDarkMode()
      } else {
        colorMode.toggleColorLightMode()
      }
    }

    window.main.onThemeChange(themeListener)
    window.main.getTheme()

    return () => {
      window.main.offThemeListener()
    }
  }, [])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}
export default ColorModeContext
