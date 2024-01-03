import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "#store";

const selectState = (state: RootState) => state;

export const user = createSelector(selectState, state => state.user);

export const userData = createSelector(selectState, state => ({
  userId: state.user.userId,
  email: state.user.email,
  userName: state.user.userName,
  date: state.user.date,
}));

export const settings = createSelector(selectState, state => ({
  difficulty: state.user.settings.difficulty,
  isTimeGame: state.user.settings.isTimeGame,
  timeOnAnswer: state.user.settings.timeOnAnswer,
}));

export const points = createSelector(
  selectState,
  state => state.user.quizData.points,
);
