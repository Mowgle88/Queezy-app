import { setUserBackendData, updateUser } from "../../../shared/api";
import { ISettings } from "../../../shared/types";
import type { IUserContext } from "../../../store";

export const changeDifficulty = async (
  userSettingsData: ISettings,
  userCtx: IUserContext,
) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.settings.difficulty = userSettingsData.difficulty;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setSettings(userSettingsData);
};

export const setTimeGame = async (value: boolean, userCtx: IUserContext) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.settings.isTimeGame = value;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setUser({ ...userBackendData, userId: userCtx.user.userId });
  userCtx.setSettings(userBackendData.settings);
};

export const changeTimeGame = async (time: number, userCtx: IUserContext) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.settings.timeOnAnswer = time;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setSettings(userBackendData.settings);
};
