import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "#store";

const selectState = (state: RootState) => state;

export const auth = createSelector(selectState, state => state.auth);
