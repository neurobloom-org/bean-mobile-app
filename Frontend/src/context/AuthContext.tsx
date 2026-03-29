// src/context/AuthContext.tsx
// Global authentication context. Provides the current user, auth token,
// and login/logout actions to every component in the tree.

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'user' | 'guardian';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  fullName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AUTH_USER_KEY = 'bean_auth_user';
const AUTH_TOKEN_KEY = 'bean_auth_token';

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the previous session from AsyncStorage on cold launch.
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const [storedUser, storedToken] = await Promise.all([
          AsyncStorage.getItem(AUTH_USER_KEY),
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
        ]);
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        }
      } catch {
        // Corrupted storage — start unauthenticated.
      } finally {
        setIsLoading(false);
      }
    };
    restoreSession();
  }, []);

  const login = async (authUser: AuthUser, authToken: string) => {
    await Promise.all([
      AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(authUser)),
      AsyncStorage.setItem(AUTH_TOKEN_KEY, authToken),
    ]);
    setUser(authUser);
    setToken(authToken);
  };

  const logout = async () => {
    await Promise.all([
      AsyncStorage.removeItem(AUTH_USER_KEY),
      AsyncStorage.removeItem(AUTH_TOKEN_KEY),
    ]);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !isLoading && !!user && !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
