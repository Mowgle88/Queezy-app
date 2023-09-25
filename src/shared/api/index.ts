import axios from "axios";
import {
  IUser,
  IUserBackendData,
  UserData,
  UserQuizData,
  ISettings,
} from "../types";
import { IUserContext } from "../../store";

type IFetchUsers = IUser & { settings: ISettings } & {
  quizData: UserQuizData;
};

const BACKEND_URL =
  "https://art-quiz-f71ff-default-rtdb.europe-west1.firebasedatabase.app/";

export const addUserToDatabase = async (userData: UserData) => {
  const userBackendData = {
    ...userData,
    settings: {
      difficulty: "medium",
      isTimeGame: false,
      timeOnAnswer: 60,
    },
    quizData: {
      points: 0,
    },
  };
  const response = await axios.post(
    `${BACKEND_URL}/users.json`,
    userBackendData,
  );
  const id = response.data.name;
  return id;
};

export const fetchUsers = async () => {
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

export const setUserBackendData = (userCtx: IUserContext) => {
  const userBackendData = {
    ...userCtx.user,
    settings: userCtx.settings,
    quizData: userCtx.quizData,
  };
  Reflect.deleteProperty(userBackendData, "userId");
  return userBackendData;
};
