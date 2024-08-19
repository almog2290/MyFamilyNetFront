import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {keycloak, isAuthenticated , isLoading} = useAuth();

  return (
    <AuthContext.Provider value={{keycloak, isAuthenticated , isLoading}}>
      {children}
    </AuthContext.Provider>
  );
};