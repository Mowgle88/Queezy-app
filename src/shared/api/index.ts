import axios from "axios";
import { IUser, IUserBackendData, IQuizData, ISettings } from "../types";
import { store } from "#store";

type IFetchUsers = IUser & { settings: ISettings } & {
  quizData: IQuizData;
};

const DATABASE_URL =
  "https://art-quiz-f71ff-default-rtdb.europe-west1.firebasedatabase.app/";

export const fetchUsers = async () => {
  const token = store.getState().auth.token;

  const response = await axios.get<IFetchUsers[]>(
    `${DATABASE_URL}/users.json?auth=${token}`,
  );

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
    `${DATABASE_URL}/users/${id}.json`,
  );
  return response.data;
};

export const deleteUser = async (id: string) => {
  const token = store.getState().auth.token;

  return axios.delete(`${DATABASE_URL}/users/${id}.json?auth=${token}`);
};

export const updateUser = async (id: string, userData: IUserBackendData) => {
  const token = store.getState().auth.token;
  return axios.put(`${DATABASE_URL}/users/${id}.json?auth=${token}`, userData);
};

export const getQuizCategories = async () => {
  const response = await axios.get(`${DATABASE_URL}/categories.json`);
  return response.data;
};
