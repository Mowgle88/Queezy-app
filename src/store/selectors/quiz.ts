import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "#store";

const selectState = (state: RootState) => state;

export const categories = createSelector(
  selectState,
  state => state.quiz.categories,
);
