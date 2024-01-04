import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (state, action) => {
      const { payload } = action;
      state.token = payload.token;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
