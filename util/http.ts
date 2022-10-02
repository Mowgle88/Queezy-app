import axios from "axios";
import { IUser, IUserData } from "../models/user";

const BACKEND_URL = 'https://art-quiz-f71ff-default-rtdb.europe-west1.firebasedatabase.app/';

export async function addUserToDatabase(userData: IUserData) {
  const response = await axios.post(`${BACKEND_URL}/users.json`, userData);
  const id = response.data.name;
  return id;
}

export async function fetchUsers() {
  const response = await axios.get<IUser[]>(`${BACKEND_URL}/users.json`);

  const users = [];

  for (const key in response.data) {
    const userObj = {
      userId: key,
      email: response.data[key].email,
      password: response.data[key].password,
      userName: response.data[key].userName,
      date: response.data[key].date
    };
    users.push(userObj);
  }

  return users;
}

export async function fetchUser(id: string) {
  const response = await axios.get<IUserData>(`${BACKEND_URL}/users/${id}.json`)
  return response.data;
}

export async function deleteUser(id: string) {
  return axios.delete(`${BACKEND_URL}/users/${id}.json`)
}

export function updateUser(id: string, userData: IUser) {
  return axios.put(`${BACKEND_URL}/users/${id}.json`, userData)
}