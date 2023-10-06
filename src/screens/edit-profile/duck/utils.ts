import { setUserBackendData, updateUser } from "#api";
import { UserData, ISettings } from "#types";
import { changeUserEmail, changeUserPassword } from "#utils";
import type { IAuthContext, IUserContext } from "#store";

export const changeUserName = (userData: UserData, userCtx: IUserContext) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.userName = userData.userName;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
};

export const changeEmail = async (
  userData: UserData,
  authCtx: IAuthContext,
  userCtx: IUserContext,
) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.email = userData.email;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  const token = await changeUserEmail(userBackendData.email, authCtx.token);
  authCtx.authenticate(token);
};

export const changePassword = async (
  userData: UserData,
  authCtx: IAuthContext,
  userCtx: IUserContext,
) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.password = userData.password;
  userBackendData.date = userData.date;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  const token = await changeUserPassword(
    userBackendData.password,
    authCtx.token,
  );
  authCtx.authenticate(token);
};

export const changeDifficulty = async (
  userSettingsData: ISettings,
  userCtx: IUserContext,
) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.settings.difficulty = userSettingsData.difficulty;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setSettings(userSettingsData);
};
