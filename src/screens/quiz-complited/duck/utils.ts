import { setUserBackendData, updateUser } from "../../../shared/api";
import type { IUserContext } from "../../../store";

export const setPoints = async (points: number, userCtx: IUserContext) => {
  const userBackendData = setUserBackendData(userCtx);
  userBackendData.quizData.points = userBackendData.quizData.points + points;

  updateUser(userCtx.user.userId, userBackendData);
  userCtx.setQuizData(userBackendData.quizData);
};
