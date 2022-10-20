import { createTheme } from '@mui/material';

const themeOptions = {
  palette: {
    type: 'light',
    primary: {
      main: '#184890',
    },
    secondary: {
      main: '#3696FC',
    },
  },
};

const theme = createTheme(themeOptions);

export default theme;
