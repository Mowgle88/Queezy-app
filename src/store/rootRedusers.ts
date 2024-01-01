/* eslint-disable import/no-cycle */
import { combineReducers } from "@reduxjs/toolkit";
import auth from "./slices/authSlice";

const reducers = combineReducers({
  auth,
});

export default reducers;
