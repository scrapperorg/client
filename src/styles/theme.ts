import { createTheme, ThemeOptions } from '@mui/material/styles';

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: '#7582EB',
      dark: '#111827',
    },
    secondary: {
      // main: '#3696FC',
      main: '#81B9D7',
    },
    common: {
      white: '#fff',
      black: '#0B0F19',
    },
    text: {
      primary: '#0B0F19',
      secondary: '#A0AEC0',
    },
  },
  spacing: 4,
  typography: {
    h1: {
      fontSize: '32px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    h2: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '12px',
    },
    h3: {
      fontSize: '20px',
      fontWeight: '500'
    },
    h4: {
      fontSize: '18px',
      fontWeight: '500'
    },
    h5: {
      fontSize: '16px',
      fontWeight: '400'
    },
    h6: {
      fontSize: '14px',
      fontWeight: 'lighter',
      color: '#A0AEC0',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1480,
      xl: 1920,
    },
  },
});

theme.components = {
  MuiCard: {
    defaultProps: {
      sx: {
        borderRadius: '8px',
        width: '100%',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        marginBottom: '16px',
        // borderRadius: '8px',
        borderColor: `${theme.palette?.common?.white}`,
      },
    },
  },
};
