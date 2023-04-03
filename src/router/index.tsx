import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PATHS from 'constants/paths';
import PublicRoute from 'router/components/publicRoute';
import PrivateRoute from 'router/components/privateRoute';
import Layout from '../components/layout';
import DocumentsSearchScreen from 'screens/documentSearch';
import ProjectsSearchScreen from '../screens/projectsSearch';
import RobotsStatusScreen from '../screens/robotsStatus';

const LoginScreen = React.lazy(() => import('screens/login'));
const MonitorScreen = React.lazy(() => import('screens/monitor'));
const RecoverPasswordScreen = React.lazy(() => import('screens/recoverPassword'));
const ResetPasswordScreen = React.lazy(() => import('screens/resetPassword'));
const DocumentDetailsScreen = React.lazy(() => import('screens/documentDetails'));
const ProjectDetailsScreen = React.lazy(() => import('screens/projectDetails'));
const ProfileDetailsScreen = React.lazy(() => import('screens/profileDetails'));

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
            <Route path={PATHS.PROJECT_DETAILS} element={<ProjectDetailsScreen />}></Route>
            <Route path={PATHS.DOCUMENTS_SEARCH} element={<DocumentsSearchScreen />}></Route>
            <Route path={PATHS.PROJECTS_SEARCH} element={<ProjectsSearchScreen />}></Route>
            <Route path={PATHS.PROFILE_DETAILS} element={<ProfileDetailsScreen />}></Route>
            <Route path={PATHS.ROBOTS_STATUS} element={<RobotsStatusScreen />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
