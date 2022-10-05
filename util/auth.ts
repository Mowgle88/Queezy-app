import axios, { AxiosResponse } from 'axios';

type mode = 'signInWithPassword' | 'signUp';

interface IAuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean
}

interface IChengeEmailResponse {
  localId: string,
  email: string,
  passwordHash: string,
  providerUserInfo: { providerId: string, federatedId: string }[],
  idToken: string,
  refreshToken: string,
  expiresIn: string
}

const API_KEY = 'AIzaSyDwYyv4wXD1iRHPG8f0spPPmXlH2ManpxQ';

export async function authenticate(mode: mode, email: string, password: string) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response: AxiosResponse<IAuthResponseData> = await axios.post(
    URL,
    {
      email: email,
      password: password,
      returnSecureToken: true
    }
  )

  const token = response.data.idToken;
  return token;
}

export function createUser(email: string, password: string) {
  return authenticate('signUp', email, password);
}

export function login(email: string, password: string) {
  return authenticate('signInWithPassword', email, password);
}

export async function chengeEmail(email: string, token: string) {
  const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  const response: AxiosResponse<IChengeEmailResponse> = await axios.post(
    URL,
    {
      email: email,
      idToken: token,
      returnSecureToken: true
    }
  )

  const newToken = response.data.idToken;
  return newToken;
}