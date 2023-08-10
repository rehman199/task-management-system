import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, accessToken: null, loggedIn: false },
  reducers: {
    login: (state, { payload }) => {
      return { ...state, user: payload.user, loggedIn: true };
    },
    logout: (_state) => ({ user: null, accessToken: null, loggedIn: false }),
    setAccessToken: (state, action) => ({
      ...state,
      accessToken: action.payload.accessToken,
    }),
  },
});

export const { login, logout, setAccessToken } = authSlice.actions;

export default authSlice.reducer;
