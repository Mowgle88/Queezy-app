import { updateUser } from "#api";
import { ISettings, UserData } from "#types";
import { store, type AppDispatch } from "#store";
import {
  authenticate,
  changeSettings,
  setUserData,
  updateQuizData,
} from "#store/slices";
import { changeUserEmail, changeUserPassword } from "#utils";

export const updateSettings = async (
  value: Partial<ISettings>,
  dispatch: AppDispatch,
) => {
  const { userId, ...userData } = store.getState().user;

  dispatch(changeSettings(value));

  await updateUser(userId, {
    ...userData,
    settings: {
      ...userData.settings,
      ...value,
    },
  });
};

export const updateInfo = async (
  value: Partial<UserData>,
  dispatch: AppDispatch,
) => {
  const { userId, ...userData } = store.getState().user;

  dispatch(setUserData(value));

  await updateUser(userId, {
    ...userData,
    ...value,
  });
};

export const changeEmail = async (
  value: Partial<UserData>,
  dispatch: AppDispatch,
) => {
  const token = store.getState().auth.token;

  updateInfo(value, dispatch);

  const newToken = await changeUserEmail(value.email!, token!);
  dispatch(authenticate({ token: newToken }));
};

export const changePassword = async (
  value: {
    password: string;
    date: string;
  },
  dispatch: AppDispatch,
) => {
  const token = store.getState().auth.token;

  const { date, password } = value;
  updateInfo({ date }, dispatch);

  const newToken = await changeUserPassword(password, token!);
  dispatch(authenticate({ token: newToken }));
};

export const updatePoints = async (points: number, dispatch: AppDispatch) => {
  const { userId, ...userData } = store.getState().user;
  const totalPoints = userData.quizData.points + points;

  dispatch(updateQuizData({ points: totalPoints }));

  await updateUser(userId, {
    ...userData,
    quizData: {
      ...userData.quizData,
      points: totalPoints,
    },
  });
};
