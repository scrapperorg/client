import React, { Suspense, } from 'react';
import { ThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import Loading from 'components/loading';
import AuthProvider from 'contexts/authContext';
import CustomRouter from 'router';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <CustomRouter />
          </Suspense>
        </AuthProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
