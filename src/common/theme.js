import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { jaJP } from '@material-ui/core/locale';
// import 'fontsource-roboto';
// import 'fontsource-noto-sans';

// Create a theme instance.
const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      error: {
        main: red.A400,
      },
      background: {
        default: '#ffffff',
      },
    },
    typography: {
      fontFamily: ['Noto Sans', 'sans-serif'].join(','),
      button: {
        textTransform: 'none', //ラベルが大文字になるのを防ぐ
      },
    },
    MuiTextField: {
      variant: 'outlined',
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiRadio: {
      color: 'primary',
    },
    MuiSwitch: {
      color: 'primary',
    },
  },
  jaJP,
);

export default theme;
