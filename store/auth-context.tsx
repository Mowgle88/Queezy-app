import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({
  token: '',
  userId: '',
  userName: '',
  isAuthenticated: false,
  authenticate: (token: string) => { },
  logout: () => { },
  setUser: (userId: string, userName: string) => { },
})

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken('');
    setUserId('');
    setUserName('');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userId');
    AsyncStorage.removeItem('userName');
  }

  function setUser(userId: string, userName: string) {
    setUserId(userId);
    setUserName(userName);
    AsyncStorage.setItem('userId', userId);
    AsyncStorage.setItem('userName', userName);
  }

  const value = {
    token: authToken,
    userId: userId,
    userName: userName,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setUser: setUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;