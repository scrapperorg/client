import React, { Suspense } from 'react';
import { ThemeProvider } from '@mui/material';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { FullScreenLoading as Loading } from 'components/loading';
import AuthProvider from 'contexts/authContext';
import CustomRouter from 'router';
import { InteractiveComponentsProvider } from 'contexts/interactiveComponentsContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <AuthProvider>
          <InteractiveComponentsProvider>
            <Suspense fallback={<Loading />}>
              <CustomRouter />
            </Suspense>
          </InteractiveComponentsProvider>
        </AuthProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
