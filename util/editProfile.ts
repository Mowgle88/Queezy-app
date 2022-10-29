import { IUserData, IUserSettingsData } from "../models/user";
import { IAuthContext } from "../store/auth-context";
import { IUserContext } from "../store/user-context";
import { changeUserPassword, changeUserEmail } from "./auth";
import { updateUser } from "./http";

function setUserBackendData(userCtx: IUserContext) {
  const userBackendData = {
    ...userCtx.user,
    settings: userCtx.settings,
    quizData: userCtx.quizData
  };
  Reflect.deleteProperty(userBackendData, 'userId');
  return userBackendData;
}

export function changeUserName(userData: IUserData, userCtx: IUserContext) {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.userName = userData.userName;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId })
}

export async function changeEmail(userData: IUserData, authCtx: IAuthContext, userCtx: IUserContext) {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.email = userData.email;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  const token = await changeUserEmail(userBackendData.email, authCtx.token);
  authCtx.authenticate(token);
}

export async function changePassword(userData: IUserData, authCtx: IAuthContext, userCtx: IUserContext) {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.password = userData.password;
  userBackendData.date = userData.date;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  const token = await changeUserPassword(userBackendData.password, authCtx.token);
  authCtx.authenticate(token);
}

export async function changeDifficulty(userSettingsData: IUserSettingsData, userCtx: IUserContext) {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.settings.difficulty = userSettingsData.difficulty;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setSettings(userSettingsData);
}

export async function setTimeGame(value: boolean, userCtx: IUserContext) {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.settings.isTimeGame = value;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  userCtx.setSettings(userBackendData.settings);
}

export async function changeTimeGame(time: number, userCtx: IUserContext) {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.settings.timeOnAnswer = time;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setSettings(userBackendData.settings);
}

export async function setPoints(points: number, userCtx: IUserContext) {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.quizData.points = userBackendData.quizData.points + points;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setSettings(userBackendData.settings);
}