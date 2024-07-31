import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import FacilityComplianceList from "./facilityComplianceList.component";

const SupplierCompliance = () => {
  const averageUpdatedRisk = 2.1;
  const averageInherentRisk = 3.2;

  return (
    <Box>
      {/* <Box sx={{ m: 2 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#344054" }}>
          Supplier Information
        </Typography>
      </Box>
      <Box sx={{ ml: 2 }}>
        <Grid container spacing={6}>
          <Grid item xs={3}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                textAlign: "center",
                boxShadow:
                  "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

                border: "1px solid #D0D5DD",
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 18, color: "#344054" }}
                gutterBottom
              >
                Average Updated Risk
              </Typography>
              <Typography
                sx={{ fontWeight: 500, fontSize: 36, color: "#EAAA08" }}
              >
                {averageUpdatedRisk}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                textAlign: "center",
                boxShadow:
                  "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
                border: "1px solid #D0D5DD",
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{ fontWeight: 700, fontSize: 18, color: "#344054" }}
                gutterBottom
              >
                Average Inherent Risk
              </Typography>
              <Typography
                sx={{ fontWeight: 500, fontSize: 36, color: "#D92D20" }}
              >
                {averageInherentRisk}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box> */}

      <FacilityComplianceList />
    </Box>
  );
};

export default SupplierCompliance;
