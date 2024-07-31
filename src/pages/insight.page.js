import React, { useEffect } from "react";
import { Grid, Box, Divider } from "@mui/material";

import TopBreadcrumbs from "../components/topBreadcrumbs.component";
import LeftSideNavbar from "../components/leftSideNavbar.component";

const Insights = () => {
  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftSideNavbar />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column">
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Box
              sx={{
                flex: 1,
                margin: "0 20px",
                padding: "12px 22px",
              }}
            >
              <TopBreadcrumbs />
            </Box>
            <Divider />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <img
              src="/comingSoon.jpeg"
              alt="comingSoon"
              style={{ maxWidth: "70%", maxHeight: "60%" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Insights;
