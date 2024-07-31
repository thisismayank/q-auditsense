import React from "react";
import { Grid } from "@mui/material";

import SupplierTable from "../components/supplierTable.component";
import LeftSideNavbar from "../components/leftSideNavbar.component";
import FactoryTable from "../components/factoryTable.component";

const Factories = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftSideNavbar />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column">
          <FactoryTable />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Factories;
