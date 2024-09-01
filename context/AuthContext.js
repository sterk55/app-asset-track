// context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simular el inicio de sesión
  const login = (userData) => {
    setUser(userData);
  };

  // Simular el cierre de sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
