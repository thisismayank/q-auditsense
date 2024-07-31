import React from "react";
import { Box, Typography, Grid, Card, Button, Divider } from "@mui/material";

import SupplierFactoryRemediationStatus from "./supplierFactoryRemediationStatus.component";
import { selectSupplierData } from "../../selectors/supplier.selector";
import { useSelector } from "react-redux";

const SupplierSupplyChainOverview = () => {
  const supplierData = useSelector(selectSupplierData);
  return (
    <Box>
      <Typography sx={{ fontSize: "18px", fontWeight: 700, mb: 3, mt: 4 }}>
        Site Count
      </Typography>
      <Card
        sx={{
          py: 2,
          px: 4,
          borderRadius: "7px",
          border: "1px solid #D0D5DD",
          background: "#FFF",
          boxShadow:
            "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        }}
      >
        <Grid container sx={{ mb: "12px" }}>
          <Grid item xs={4}>
            <Typography
              sx={{
                color: "#344054",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Total
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                color: "#344054",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Tier 1
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                color: "#344054",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              Tier 2
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container sx={{ mt: "12px" }}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "12px",
                background: "#2D31A6",
                color: "#fff",
                fontSize: "36px",
                fontWeight: 700,
                padding: "0px 35px",
              }}
            >
              {supplierData?.factoryData?.totalFactories || "-"}
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{ color: "#344054", fontSize: "36px", fontWeight: 600 }}
            >
              {supplierData?.factoryData?.tier1 || "-"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{ color: "#344054", fontSize: "36px", fontWeight: 600 }}
            >
              {supplierData?.factoryData?.tier2 || "-"}
            </Typography>
          </Grid>
        </Grid>
      </Card>
      <SupplierFactoryRemediationStatus />
    </Box>
  );
};

export default SupplierSupplyChainOverview;
