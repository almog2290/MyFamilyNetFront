import {useEffect,useContext } from 'react';
import {AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router'; 

const PrivateRoute = ({ component: Component }) => {
  const { keycloak, isAuthenticated , isLoading } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        keycloak.login();
      }
    }
  }, [isLoading]);


  if(isAuthenticated)
  {
    return (
      <Component />
    );
  }

  return ;
};

export default PrivateRoute;