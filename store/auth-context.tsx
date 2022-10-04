import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from "../models/user";

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({
  token: '',
  userId: '',
  userName: '',
  email: '',
  password: '',
  date: '',
  isAuthenticated: false,
  authenticate: (token: string) => { },
  logout: () => { },
  setUser: (userData: IUser) => { },
})

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState('');
  const [userData, setUserData] = useState({
    userId: '',
    email: '',
    password: '',
    userName: '',
    date: ''
  });

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setAuthToken('');
    setUserData({
      userId: '',
      email: '',
      password: '',
      userName: '',
      date: ''
    });
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('userData');
  }

  function setUser(userData: IUser) {
    setUserData(userData);
    const localStorageUserData = {
      userName: userData.userName,
      userId: userData.userId
    }
    AsyncStorage.setItem('userData', JSON.stringify(localStorageUserData));
  }

  const value = {
    token: authToken,
    userId: userData.userId,
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
    date: userData.date,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    setUser: setUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;