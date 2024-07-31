import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAuditPageTab,
  selectAuditReportPageTab,
} from "../../selectors/audit.selector";
import {
  setAuditPageTab,
  setAuditReportPageTab,
} from "../../reducers/audit.reducer";

const AuditReportTabs = () => {
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setAuditReportPageTab(newValue));
  };
  const value = useSelector(selectAuditReportPageTab);
  return (
    <Box sx={{ width: "100%", px: 2, flexGrow: 1 }}>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        sx={{ textDecoration: "none" }}
      >
        <Tab value="issues" label="Issue List" sx={{ textTransform: "none" }} />
        <Tab value="info" label="Info" sx={{ textTransform: "none" }} />
      </Tabs>
    </Box>
  );
};

export default AuditReportTabs;
