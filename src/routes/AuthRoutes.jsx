import {lazy} from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import PrivateRoute from './PrivateRoute';

// Catalog routing
const Catalog = Loadable(lazy(() => import('views/catalog')));

//User Creation Details routing
const UserDetailsCard = Loadable(lazy(() => import('views/pages/UserDetailsCard')));

// Page Creation routing
const CreatePageCard = Loadable(lazy(() => import('views/pages/CreatePageCard')));

//Page Component routing
const Page = Loadable(lazy(() => import('views/page')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// authentication routing (keycloak implimentation)
//const PrivateRoute = Loadable(lazy(() => import('routes/PrivateRoute')));
const AuthLoginKeycloak = Loadable(lazy(() => import('views/authentication/AuthLoginKeycloak')));
const AuthRegisterKeycloak = Loadable(lazy(() => import('views/authentication/AuthRegisterKeycloak')));

// authentication routing (local implimentation)
// const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login')));
// const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));



// ==============================|| MAIN ROUTING ||============================== //


const AuthRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: (
        <Catalog />
      )
    },
    {
      path: '/dashboard',
      element: (
        <DashboardDefault />
      )
    },
    {
      path: '/page',
      element: (
        <PrivateRoute>
          <Page />
        </PrivateRoute>
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
          element: <AuthRegisterKeycloak />
        },
        {
          path: 'user-details',
          element:(
            <PrivateRoute>
              <UserDetailsCard />
            </PrivateRoute>
          )
        },
        {
          path: 'create-page',
          element: (
            <PrivateRoute>
              <CreatePageCard />
            </PrivateRoute>
          )
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: (
            // <PrivateRoute component={UtilsTypography}/>
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
            // <PrivateRoute component={UtilsColor}/>
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
            // <PrivateRoute component={UtilsShadow}/>
            <UtilsShadow/>
          )
        }
      ]
    },
    {
      path: 'sample-page',
      element: (
        // <PrivateRoute component={SamplePage}/>
        <SamplePage />
      )
    },
  ]
};

export default AuthRoutes;
