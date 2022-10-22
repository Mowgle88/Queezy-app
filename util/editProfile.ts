import { IUserData, IUserSettingsData } from "../models/user";
import { IAuthContext } from "../store/auth-context";
import { IUserContext } from "../store/user-context";
import { changeUserPassword, changeUserEmail } from "./auth";
import { updateUser } from "./http";

export function changeUserName(userData: IUserData, userCtx: IUserContext) {
  const userBackendData = {
    ...userCtx.user,
    settings: userCtx.settings,
    quizData: userCtx.quizData
  };
  Reflect.deleteProperty(userBackendData, 'userId');
  userBackendData.userName = userData.userName;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId })
}

export async function changeEmail(userData: IUserData, authCtx: IAuthContext, userCtx: IUserContext) {
  const userBackendData = {
    ...userCtx.user,
    settings: userCtx.settings,
    quizData: userCtx.quizData
  };
  Reflect.deleteProperty(userBackendData, 'userId');
  userBackendData.email = userData.email;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  const token = await changeUserEmail(userBackendData.email, authCtx.token);
  authCtx.authenticate(token);
}

export async function changePassword(userData: IUserData, authCtx: IAuthContext, userCtx: IUserContext) {

  const userBackendData = {
    ...userCtx.user,
    settings: userCtx.settings,
    quizData: userCtx.quizData
  };
  Reflect.deleteProperty(userBackendData, 'userId');
  userBackendData.password = userData.password;
  userBackendData.date = userData.date;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  const token = await changeUserPassword(userBackendData.password, authCtx.token);
  authCtx.authenticate(token);
}

export async function changeDifficulty(userData: IUserSettingsData, authCtx: IAuthContext, userCtx: IUserContext) {

  const userBackendData = {
    ...userCtx.user,
    settings: userCtx.settings,
    quizData: userCtx.quizData
  };
  Reflect.deleteProperty(userBackendData, 'userId');
  userBackendData.settings.difficulty = userData.difficulty;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  userCtx.setSettings(userBackendData.settings);
  const token = await changeUserPassword(userBackendData.password, authCtx.token);
  authCtx.authenticate(token);
}