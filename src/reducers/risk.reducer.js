import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./login.reducer";
const initialState = {
  chartData: {},
  factoryData: {},
  chartTypes: ["Bar Chart", "Scatter Plot", "Table"],
  selectedChartType: "Bar Chart",
};

const riskSlice = createSlice({
  name: "risk",
  initialState,
  reducers: {
    getChartData: (state, action) => {},
    setChartData: (state, action) => {
      state.chartData = { ...state.chartData, ...action.payload };
    },
    getFactoryData: (state, action) => {},
    setFactoryData: (state, action) => {
      state.factoryData = { ...state.factoryData, ...action.payload };
    },
    setSelectedChartType: (state, action) => {
      state.selectedChartType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});
export const {
  setChartData,
  getChartData,
  setFactoryData,
  getFactoryData,
  setSelectedChartType,
} = riskSlice.actions;

export default riskSlice.reducer;
