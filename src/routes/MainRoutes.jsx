import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// authentication routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register')));
const AuthLoginKeycloak = Loadable(lazy(() => import('views/pages/authentication/auth-forms/AuthLoginKeycloak')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
          <DashboardDefault />
      )
    },
    {
      path: 'pages',
      children: [
        {
          path: 'login',
          element: <AuthLoginKeycloak />
        },
        { 
          path: 'register',
          element: <AuthRegister />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: (
            //<PrivateRoute component={UtilsTypography}/>
            <UtilsTypography/>
          )
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element:(
            <UtilsColor/>
          )
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: (
            <UtilsShadow/>
          )
        }
      ]
    },
    {
      path: 'sample-page',
      element: (
        <SamplePage />
      )
    }
  ]
};

export default MainRoutes;
