import { createContext, useEffect, useState } from "react";

interface AuthContextProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  authenticate: (token: string) => { },
  logout: () => { }
})

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authToken, setAuthToken] = useState('');

  function authenticate(token: string) {
    setAuthToken(token);
  }

  function logout() {
    setAuthToken('');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;