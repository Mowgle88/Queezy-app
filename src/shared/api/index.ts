import axios from "axios";
import { IUser, IUserBackendData, IQuizData, ISettings } from "../types";

type IFetchUsers = IUser & { settings: ISettings } & {
  quizData: IQuizData;
};

const BACKEND_URL =
  "https://art-quiz-f71ff-default-rtdb.europe-west1.firebasedatabase.app/";

export const fetchUsers = async () => {
  const response = await axios.get<IFetchUsers[]>(`${BACKEND_URL}/users.json`);

  const users = [];

  for (const key in response.data) {
    const userObj = {
      userId: key,
      email: response.data[key].email,
      userName: response.data[key].userName,
      date: response.data[key].date,
      settings: {
        difficulty: response.data[key].settings.difficulty,
        isTimeGame: response.data[key].settings.isTimeGame,
        timeOnAnswer: response.data[key].settings.timeOnAnswer,
      },
      quizData: {
        points: response.data[key].quizData?.points,
      },
    };
    users.push(userObj);
  }

  return users;
};

export const fetchUser = async (id: string) => {
  const response = await axios.get<IFetchUsers>(
    `${BACKEND_URL}/users/${id}.json`,
  );
  return response.data;
};

export const deleteUser = async (id: string) => {
  return axios.delete(`${BACKEND_URL}/users/${id}.json`);
};

export const updateUser = async (id: string, userData: IUserBackendData) => {
  return axios.put(`${BACKEND_URL}/users/${id}.json`, userData);
};

export const getQuizCategories = async () => {
  const response = await axios.get(`${BACKEND_URL}/categories.json`);
  return response.data;
};
