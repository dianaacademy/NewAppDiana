import React, { createContext, useState, useContext, useEffect } from 'react';
import Services from '../Shared/Services';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Load user data from AsyncStorage when the app starts
    const loadUserData = async () => {
      const storedUserData = await Services.getUserAuth();
      if (storedUserData) {
        setUserData(storedUserData);
      }
    };
    loadUserData();
  }, []);

  const login = async (user) => {
    await Services.setUserAuth(user);
    setUserData(user);
  };

  const logout = async () => {
    await Services.Logout();
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;