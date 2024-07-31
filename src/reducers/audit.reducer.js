import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./login.reducer";
const initialState = {
  audits: [],
  searchResults: [],
  count: null,
  auditPageTab: "issues",
  auditReportPageTab: "issues",
  auditData: null,
  selectedAuditIssueId: null,
  auditIssueCAPData: {},
  selectedAuditIssueId: null,
};

const auditSlice = createSlice({
  name: "audit",
  initialState,
  reducers: {
    getListOfAllAudits: (state, action) => {},
    getSearchResultOfAudits: (state) => {},
    getAuditById: (state) => {},
    updateAuditData: (state, action) => {},
    setListOfAllAudits: (state, action) => {
      state.audits = action.payload.audits || state.audits;
      state.searchResults = action.payload.searchResults || state.searchResults;
      state.count = action.payload.auditCount || state.count;
      state.searchCount = action.payload.searchCount || state.searchCount;
    },
    setAuditData: (state, action) => {
      state.auditData = action.payload;
    },
    setAuditPageTab: (state, action) => {
      state.auditPageTab = action.payload;
    },
    setAuditReportPageTab: (state, action) => {
      state.auditReportPageTab = action.payload;
    },
    setSelectedAuditIssueId: (state, action) => {
      state.selectedAuditIssueId = action.payload;
    },
    setAuditIssueCAPData: (state, action) => {
      state.auditIssueCAPData = action.payload;
    },
    uploadAuditReport: (state, action) => {},
    setUploadAuditReportFiles: (state, action) => {
      state.auditData = { ...state.auditData, files: action.payload };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const {
  getListOfAllAudits,
  getSearchResultOfAudits,
  getAuditById,
  setListOfAllAudits,
  setAuditsDataCache,
  setAuditData,
  updateAuditData,
  setAuditPageTab,
  setAuditReportPageTab,
  setSelectedAuditIssueId,
  setAuditIssueCAPData,
  uploadAuditReport,
  setUploadAuditReportFiles,
} = auditSlice.actions;

export default auditSlice.reducer;
