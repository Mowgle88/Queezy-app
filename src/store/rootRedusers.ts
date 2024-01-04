/* eslint-disable import/no-cycle */
import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import user from "./slices/userSlice";
import quiz from "./slices/quizSlice";

const reducers = combineReducers({
  auth,
  user,
  quiz,
});

export default reducers;
