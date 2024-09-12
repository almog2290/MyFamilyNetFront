import {useEffect,useContext } from 'react';
import {AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom'; 

const PrivateRoute = ({children}) => {
  
  const { keycloak, isAuthenticated , isLoading } = useContext(AuthContext);
  return !isLoading && isAuthenticated ? children : <Navigate to="/pages/login" />;
  
};

export default PrivateRoute;