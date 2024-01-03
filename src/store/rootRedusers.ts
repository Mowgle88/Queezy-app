/* eslint-disable import/no-cycle */
import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";
import user from "./slices/userSlice";

const reducers = combineReducers({
  auth,
  user,
});

export default reducers;
