import axios from 'axios';

const API_KEY = 'AIzaSyDwYyv4wXD1iRHPG8f0spPPmXlH2ManpxQ';

export async function createUser(email: string, password: string) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    { email: email, password: password, returnSecureToken: true }
  )
}