import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
  }
  interface PaletteOptions {
    white: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2F3347',
    },
    secondary: {
      main: '#DDA749',
    },

    background: {
      default: '#F2F4F8',
      paper: '#fff',
    },

    white: {
      main: '#fff',
    },
    text: {
      primary: '#000',
      secondary: '#404040',
      disabled: '#ABABAB',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
  components: {},
});
