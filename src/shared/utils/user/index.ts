import { updateUser } from "#api";
import { ISettings, IUser } from "#types";
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
  const userData = store.getState().user;

  dispatch(changeSettings(value));

  await updateUser(userData.userId, {
    ...userData,
    settings: {
      ...userData.settings,
      ...value,
    },
  });
};

export const updateInfo = async (
  value: Partial<IUser>,
  dispatch: AppDispatch,
) => {
  const userData = store.getState().user;

  dispatch(setUserData(value));

  await updateUser(userData.userId, {
    ...userData,
    ...value,
  });
};

export const changeEmail = async (
  value: Partial<IUser>,
  dispatch: AppDispatch,
) => {
  const token = store.getState().auth.token;

  await updateInfo(value, dispatch);

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
  await updateInfo({ date }, dispatch);

  const newToken = await changeUserPassword(password, token!);
  dispatch(authenticate({ token: newToken }));
};

export const updatePoints = async (points: number, dispatch: AppDispatch) => {
  const userData = store.getState().user;
  const totalPoints = userData.quizData.points + points;

  dispatch(updateQuizData({ points: totalPoints }));

  await updateUser(userData.userId, {
    ...userData,
    quizData: {
      ...userData.quizData,
      points: totalPoints,
    },
  });
};
