import axios from "axios";
import { IUser, IUserBackendData, IUserData, IUserQuizData, IUserSettingsData } from "../models/user";

const BACKEND_URL = 'https://art-quiz-f71ff-default-rtdb.europe-west1.firebasedatabase.app/';

export async function addUserToDatabase(userData: IUserData) {
  const userBackendData = {
    ...userData,
    settings: {
      difficulty: 'medium',
      isTimeGame: false,
      timeOnAnswer: 60
    },
    quizData: {
      points: 0
    }
  }
  const response = await axios.post(`${BACKEND_URL}/users.json`, userBackendData);
  const id = response.data.name;
  return id;
}

type IFetchUsers = IUser & { settings: IUserSettingsData } & { quizData: IUserQuizData };

export async function fetchUsers() {
  const response = await axios.get<IFetchUsers[]>(`${BACKEND_URL}/users.json`);

  const users = [];

  for (const key in response.data) {
    const userObj = {
      user: {
        userId: key,
        email: response.data[key].email,
        password: response.data[key].password,
        userName: response.data[key].userName,
        date: response.data[key].date,
      },
      settings: {
        difficulty: response.data[key].settings.difficulty,
        isTimeGame: response.data[key].settings.isTimeGame,
        timeOnAnswer: response.data[key].settings.timeOnAnswer,
      },
      quizData: {
        points: response.data[key].quizData.points
      }
    };
    users.push(userObj);
  }

  return users;
}

export async function fetchUser(id: string) {
  const response = await axios.get<IFetchUsers>(`${BACKEND_URL}/users/${id}.json`)
  return response.data;
}

export async function deleteUser(id: string) {
  return axios.delete(`${BACKEND_URL}/users/${id}.json`)
}

export function updateUser(id: string, userData: IUserBackendData) {
  return axios.put(`${BACKEND_URL}/users/${id}.json`, userData)
}

export async function getQuizCategories() {
  const response = await axios.get(`${BACKEND_URL}/categories.json`);
  return response.data;
}