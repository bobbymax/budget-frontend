import {createTheme} from '@material-ui/core'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#008a0e'
    },
    secondary: {
      main: '#ede82a'
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
})