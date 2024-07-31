import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./login.reducer";
const initialState = {
  leftSideNavigationBarSelected: "/suppliers",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setLeftSideNavigationSelected: (state, action) => {
      state.leftSideNavigationBarSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});
export const { setLeftSideNavigationSelected } = navigationSlice.actions;

export default navigationSlice.reducer;
