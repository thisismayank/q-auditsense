import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { selectAuditPageTab } from "../../selectors/audit.selector";
import { setAuditPageTab } from "../../reducers/audit.reducer";

const AuditTabs = () => {
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setAuditPageTab(newValue));
  };
  const value = useSelector(selectAuditPageTab);
  return (
    <Box sx={{ width: "100%", px: 2, flexGrow: 1, px: 4 }}>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        sx={{ textDecoration: "none" }}
      >
        <Tab
          value="issues"
          label="Issues & CAP"
          sx={{ textTransform: "none" }}
        />
        <Tab
          value="document"
          label="Supporting Documents"
          sx={{ textTransform: "none" }}
        />
        <Tab value="export" label="Export" sx={{ textTransform: "none" }} />
      </Tabs>
    </Box>
  );
};

export default AuditTabs;
