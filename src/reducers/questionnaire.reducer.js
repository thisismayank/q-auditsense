import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendorName: "",
  facilityName: "",
  facilityLegalName: "",
  businessLicense: "",
  facilityAddress: "",
  facilityCity: "",
  facilityState: "",
  facilityZip: "",
  yearWhenOperationInitiated: "",
  totalEmployees: "",
  // Add all other necessary fields
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateField } = formSlice.actions;
export default formSlice.reducer;
