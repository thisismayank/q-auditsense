import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./login.reducer";
const initialState = {
  editMode: false,
  saveStatus: null,
  editModeForAudit: false,
  filesUploadedIds: {},
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    toggleEditMode: (state, action) => {
      state.editMode = !state.editMode;
    },
    setSaveStatus: (state, action) => {
      state.saveStatus = action.payload;
    },
    toggleEditModeForAudit: (state, action) => {
      state.editModeForAudit = action.payload;
    },
    setFilesUploadedIds: (state, action) => {
      state.filesUploadedIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});
export const {
  toggleEditMode,
  toggleEditModeForAudit,
  setSaveStatus,
  setFilesUploadedIds,
} = miscSlice.actions;

export default miscSlice.reducer;
