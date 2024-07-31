import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: null,
  error: null,
  userInfo: {
    userId: null,
    firstName: null,
    lastName: null,
    token: null,
  },
  loggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    submitLoginRequest: (state, action) => {
      state.email = action.payload.email;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userInfo = { ...action.payload, userId: action.payload._id };
      state.email = action.payload.email || state.email;
      state.loggedIn = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("loginState"); // Clear local storage
      state.email = null;
      state.userInfo = {
        userId: null,
        firstName: null,
        lastName: null,
        token: null,
      };
      state.loggedIn = false;
    },
  },
});
export const { submitLoginRequest, loginSuccess, loginFailure, logout } =
  loginSlice.actions;

export default loginSlice.reducer;
