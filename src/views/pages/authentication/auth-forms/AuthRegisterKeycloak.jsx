import { useEffect , useContext , useRef } from 'react';
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const AuthRegisterKeycloak = () => {
    const {keycloak} = useContext(AuthContext)
    const navigate = useNavigate();

  useEffect(() => {
    keycloak.register({redirectUri: window.location.origin});
  }, []);

  return navigate('/');
};

export default AuthRegisterKeycloak;