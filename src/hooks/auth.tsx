import React, { createContext, useCallback, useState, useContext } from 'react';
import jwt from 'jsonwebtoken';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  permission: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  name: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
  checkToken(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Brasucas.token');
    const user = localStorage.getItem('@Brasucas.user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ name, password }) => {
    const response = await api.post('sessions', { name, password });

    const { token, user } = response.data;
    localStorage.setItem('@Brasucas.token', token);
    localStorage.setItem('@Brasucas.user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@Brasucas.token');
    localStorage.removeItem('@Brasucas.user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@Brasucas.user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const checkToken = useCallback(() => {
    const token = localStorage.getItem('@Brasucas.token');
    if (token) {
      jwt.verify(
        token,
        process.env.REACT_APP_TOKEN_SECRET || 'default',
        (err) => {
          if (err) {
            signOut();
          }
        },
      );
    }
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, checkToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
