import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define what our vault holds
interface AuthContextType {
  userId: string | null;
  userName: string;
  login: (id: string, name: string) => void;
  logout: () => void;
}

// Create the Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the Provider wrapper
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('there'); // 'there' is the safe fallback

  const login = (id: string, name: string) => {
    setUserId(id);
    setUserName(name || 'there');
  };

  const logout = () => {
    setUserId(null);
    setUserName('there');
  };

  return (
    <AuthContext.Provider value={{ userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to make it easy to use in screens
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
