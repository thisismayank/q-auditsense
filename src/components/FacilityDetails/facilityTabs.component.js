import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSupplierPageTab } from "../../selectors/supplier.selector";
import { setSupplierPageTab } from "../../reducers/supplier.reducer";
import { setFactoryPageTab } from "../../reducers/factory.reducer";
import { selectFacilityPageTab } from "../../selectors/factory.selector";

const FacilityTabs = () => {
  const dispatch = useDispatch();
  const handleChange = (event, newValue) => {
    dispatch(setFactoryPageTab(newValue));
  };
  const value = useSelector(selectFacilityPageTab);

  // const label1 = "Compliance Summary";
  // const label2 = "Audits";

  const label1 = "Site Status";
  const label2 = "Audit History";
  return (
    <Box sx={{ width: "100%", mt: 1, flexGrow: 1 }}>
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        sx={{ textDecoration: "none" }}
      >
        <Tab value="status" label={label1} sx={{ textTransform: "none" }} />
        <Tab value="audits" label={label2} sx={{ textTransform: "none" }} />
      </Tabs>
    </Box>
  );
};

export default FacilityTabs;
