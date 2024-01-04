import { updateUser } from "#api";
import { ISettings, UserData } from "#types";
import type { AppDispatch } from "#store";
import { authenticate, changeSettings } from "#store/slices";
import {
  UserState,
  setUserData,
  updateQuizData,
} from "#store/slices/userSlice";
import { changeUserEmail, changeUserPassword } from "#utils";

export const updateSettings = async (
  value: Partial<ISettings>,
  user: UserState,
  dispatch: AppDispatch,
) => {
  const { userId, ...userBackendData } = user;

  dispatch(changeSettings(value));

  await updateUser(userId, {
    ...userBackendData,
    settings: {
      ...user.settings,
      ...value,
    },
  });
};

export const updateInfo = async (
  value: Partial<UserData>,
  user: UserState,
  dispatch: AppDispatch,
) => {
  const { userId, ...userBackendData } = user;

  dispatch(setUserData(value));

  await updateUser(userId, {
    ...userBackendData,
    ...value,
  });
};

export const changeEmail = async (
  value: Partial<UserData>,
  user: UserState,
  token: string,
  dispatch: AppDispatch,
) => {
  updateInfo(value, user, dispatch);

  const newToken = await changeUserEmail(value.email!, token);
  dispatch(authenticate({ token: newToken }));
};

export const changePassword = async (
  value: {
    password: string;
    date: string;
  },
  user: UserState,
  token: string,
  dispatch: AppDispatch,
) => {
  const { date, password } = value;
  updateInfo({ date }, user, dispatch);

  const newToken = await changeUserPassword(password, token);
  dispatch(authenticate({ token: newToken }));
};

export const updatePoints = async (
  points: number,
  user: UserState,
  dispatch: AppDispatch,
) => {
  const { userId, ...userBackendData } = user;

  dispatch(updateQuizData({ points }));

  await updateUser(userId, {
    ...userBackendData,
    quizData: {
      ...user.quizData,
      points: points,
    },
  });
};
