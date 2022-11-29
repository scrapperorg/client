import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import PATHS from 'constants/paths';
import PublicRoute from 'router/components/publicRoute';
import PrivateRoute from 'router/components/privateRoute';
import Layout from '../components/layout';

const LoginScreen = React.lazy(() => import('screens/login'));
const MonitorScreen = React.lazy(() => import('screens/monitor'));
const RecoverPasswordScreen = React.lazy(() => import('screens/recoverPassword'))
const ResetPasswordScreen = React.lazy(() => import('screens/resetPassword'))
const DocumentDetailsScreen = React.lazy(() => import('screens/documentDetails'))

export default function CustomRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to={PATHS.MONITOR} />} />
        {/* Public non-auth routes */}
        <Route element={<PublicRoute />}>
          <Route path={PATHS.LOGIN} element={<LoginScreen />}></Route>
          <Route path={PATHS.RECOVER_PASSWORD} element={<RecoverPasswordScreen />}></Route>
          <Route path={PATHS.RESET_PASSWORD} element={<ResetPasswordScreen />}></Route>
        </Route>
        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path={PATHS.MONITOR} element={<MonitorScreen />}></Route>
            <Route path={PATHS.DOCUMENT_DETAILS} element={<DocumentDetailsScreen />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
