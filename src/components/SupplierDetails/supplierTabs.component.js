import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectSupplierPageTab } from "../../selectors/supplier.selector";
import { setSupplierPageTab } from "../../reducers/supplier.reducer";

const SupplierTabs = () => {
  const dispatch = useDispatch();
  // const label1 = "Factories"
  // const label2 ="Audits"
  const label1 = "Supply Chain Overview";
  const label2 = "Site List";
  const handleChange = (event, newValue) => {
    dispatch(setSupplierPageTab(newValue));
  };
  const value = useSelector(selectSupplierPageTab);
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

export default SupplierTabs;
