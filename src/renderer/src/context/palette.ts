declare module '@mui/material/styles/createPalette' {
  interface TypeText {
    contrastText?: string
  }
  interface Palette {
    highlight: string
    icon: {
      primary: string
      secondary: string
    }
    battery: {
      critical: string
      low: string
      normal: string
    }
    tab: {
      selected: {
        background: string
      }
    }
    settingsWindow: {
      selected: {
        background: string
        color: string
      }
      notSelected: {
        background: string
        color: string
      }
    }
    connectionIndicator: {
      connected: string
      notConnected: string
    }
    button: {
      background: string
      color: string
    }
    disabled: string
  }
}
const lightPalette = {
  primary: {
    main: '#242424',
    dark: '#6F6F6F'
  },
  secondary: {
    main: '#62FF2B'
  },
  divider: '#D9D9D9',
  background: {
    default: '#D9D9D9',
    paper: '#FFFFFF'
  },
  text: {
    primary: '#242424',
    secondary: '#242424',
    disabled: '#6F6F6F',
    contrastText: '#FFFFFF'
  },
  icon: {
    primary: '#242424',
    secondary: '#242424'
  },
  highlight: '#62FF2B',
  tab: {
    selected: {
      background: '#D9D9D9'
    }
  },
  settingsWindow: {
    notSelected: {
      background: '#D9D9D9',
      color: 'D9D9D9'
    },
    selected: {
      background: '#FFFFFF',
      color: 'D9D9D9'
    }
  },
  battery: {
    critical: '#FE1C1C',
    low: '#FFA41B',
    normal: '#50B85E'
  },
  connectionIndicator: {
    connected: '#50B85E',
    notConnected: '#FE1C1C'
  },
  button: {
    background: '#D9D9D9',
    color: '#242424'
  },
  disabled: '#808080'
}
const darkPalette = {
  primary: {
    main: '#D9D9D9',
    dark: '#6F6F6F'
  },
  secondary: {
    main: '#62FF2B'
  },
  divider: '#494949',
  text: {
    primary: '#D9D9D9',
    secondary: '#D9D9D9',
    contrastText: '#D9D9D9'
  },
  icon: {
    primary: '#D9D9D9',
    secondary: '#242424'
  },
  background: {
    default: '#000000',
    paper: '#242424'
  },
  highlight: '#62FF2B',
  tab: {
    selected: {
      background: '#494949'
    }
  },
  settingsWindow: {
    notSelected: {
      background: '#1E1E1E',
      color: '#D9D9D9'
    },
    selected: {
      background: '#494949',
      color: '#D9D9D9'
    }
  },
  battery: {
    critical: '#FE1C1C',
    low: '#FFA41B',
    normal: '#50B85E'
  },
  connectionIndicator: {
    connected: '#50B85E',
    notConnected: '#FE1C1C'
  },
  button: {
    background: '#369DFD',
    color: '#FFFFFF'
  },
  disabled: '#808080'
}
const palette = {
  light: lightPalette,
  dark: darkPalette
}
export default palette
