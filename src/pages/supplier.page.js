import React from "react";
import { Grid } from "@mui/material";

import SupplierTable from "../components/supplierTable.component";
import LeftSideNavbar from "../components/leftSideNavbar.component";

const Suppliers = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftSideNavbar />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column">
          <SupplierTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Suppliers;
