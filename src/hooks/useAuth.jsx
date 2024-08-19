import { useState , useEffect , useRef } from "react";
import Keycloak from "keycloak-js";

const keycloakConfig = {
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    url: import.meta.env.VITE_KEYCLOAK_URL,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
};

const keycloak = new Keycloak(keycloakConfig);

const useAuth = () => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const isRunFirst = useRef(false);
        
    useEffect(() => {

        const initializeKeycloak = async () => {

            if (isRunFirst.current) return;
            isRunFirst.current = true;

            console.log(keycloak);

            try {
              const authenticated = await keycloak.init({ onLoad: "check-sso" });
              setIsAuthenticated(authenticated);
              console.log(keycloak);
            } catch (error) {
              console.error("Keycloak error => ", error);
            } finally {
              setLoading(false);
            }
          };
      
        initializeKeycloak();
        
    }, [isRunFirst]);
    
    return { keycloak, isAuthenticated , isLoading};
};

export default useAuth;





