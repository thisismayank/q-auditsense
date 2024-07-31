import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./login.reducer";
const initialState = {
  suppliers: [],
  searchResults: [],
  limit: 8,
  offset: 0,
  count: null,
  searchCount: null,
  supplierCache: {},
  supplierPageTab: "status",
  supplierData: null,
  ui: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    getListOfAllSuppliers: (state) => {},
    getSearchResultOfSuppliers: (state) => {},
    getSupplierById: (state) => {},
    setListOfAllSuppliers: (state, action) => {
      state.suppliers = action.payload.suppliers
        ? [...state.suppliers, ...action.payload.suppliers]
        : [...state.suppliers];
      state.searchResults = action.payload.searchResults || state.searchResults;
      state.count = action.payload.supplierCount || state.count;
      state.searchCount = action.payload.searchCount || state.searchCount;
      state.ui = action.payload.uiConfig;
    },
    setSuppliersDataCache: (state, action) => {
      state.supplierCache[action.payload.page] = action.payload.results;
    },
    updateSupplierData: (state, action) => {},
    clearSuppliers: (state) => {
      state.suppliers = [];
      state.count = null;
    },
    setSupplierPageTab: (state, action) => {
      state.supplierPageTab = action.payload;
    },
    setSupplierData: (state, action) => {
      state.supplierData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  getListOfAllSuppliers,
  getSearchResultOfSuppliers,
  setListOfAllSuppliers,
  setSuppliersDataCache,
  clearSuppliers,
  setSupplierPageTab,
  getSupplierById,
  setSupplierData,
  updateSupplierData,
} = supplierSlice.actions;

export default supplierSlice.reducer;
