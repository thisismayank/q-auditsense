import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./login.reducer";
const initialState = {
  factories: [],
  searchResults: [],
  searchCount: null,
  factoryCache: {},
  count: null,
  factoryPageTab: "status",
  factoryData: null,
};

const factorySlice = createSlice({
  name: "factory",
  initialState,
  reducers: {
    getListOfAllFactories: (state) => {},
    getSearchResultOfFactories: (state) => {},
    getFactoryById: (state) => {},
    updateFactoryData: (state, action) => {},
    setListOfAllFactories: (state, action) => {
      state.factories = action.payload.factories || state.factories;
      state.searchResults = action.payload.searchResults || state.searchResults;
      state.count = action.payload.factoryCount || state.count;
      state.searchCount = action.payload.searchCount || state.searchCount;

      state.searchCount = action.payload.searchCount || state.searchCount;
    },
    setFactoriesDataCache: (state, action) => {
      state.factoryCache[action.payload.page] = action.payload.results;
    },

    clearFactories: (state) => {
      state.factories = [];
      state.count = null;
    },
    setFactoryPageTab: (state, action) => {
      state.factoryPageTab = action.payload;
    },
    setFactoryData: (state, action) => {
      state.factoryData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  getListOfAllFactories,
  getSearchResultOfFactories,
  setListOfAllFactories,
  setFactoriesDataCache,
  clearFactories,
  setFactoryPageTab,
  getFactoryById,
  setFactoryData,
  updateFactoryData,
} = factorySlice.actions;

export default factorySlice.reducer;
