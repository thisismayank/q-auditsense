import React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import RiskCard from "../riskCard.component";
import { selectFactoryData } from "../../selectors/factory.selector";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FactoryRiskDashboard = () => {
  const factoryData = useSelector(selectFactoryData);

  return (
    <Box
      sx={{
        maxWidth: "90%",
        margin: "auto",
        maxHeight: "80vh",
        overflowY: factoryData ? "auto" : "hidden",
        pb: 4,
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          background: "white",
          zIndex: 1,
          py: "16px",
        }}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: "4px" }}
        >
          <Grid item>
            <Typography
              sx={{ color: "#8B8D97", fontWeight: 500, fontSize: "16px" }}
            >
              Site
            </Typography>
          </Grid>

          <Grid item>
            {factoryData && (
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",

                  px: "8px",
                  borderRadius: "8px",
                  border: "1px solid var(--Brand-300, #A4BCFD)",
                  background: "#FFF",
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                  color: "#3538CD",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                <Link
                  to={`/suppliers/${factoryData?.supplierId}/factory/${factoryData?._id}`}
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    textDecoration: "none",
                    color: "inherit",
                    textTransform: "none",
                  }}
                >
                  To Site Page
                </Link>
              </Button>
            )}
          </Grid>
        </Grid>
        {factoryData ? (
          <Grid item>
            <Typography
              sx={{
                color: "#182230",
                fontWeight: 700,
                fontSize: "18px",
                mb: 2,
              }}
            >
              {factoryData?.name}
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography
              sx={{
                color: "#182230",
                fontWeight: 700,
                fontSize: "18px",
              }}
            >
              Select a site to view risk profile
            </Typography>
          </Grid>
        )}
      </Box>
      {!factoryData &&
        [1, 2].map((risk, index) => (
          <RiskCard key={index} title={null} riskScore={null} details={null} />
        ))}
      {factoryData?.metadata?.enhancedRisk && (
        <RiskCard
          key={"enhancedRisk"}
          title={"Enhanced Risk"}
          riskScore={
            factoryData?.metadata?.enhancedRisk?.totalScore ?? "No Data"
          }
          details={[
            {
              label: "Category 1",
              subLabel: factoryData?.metadata?.inherentRisk?.category1 || "TBD",
              value: factoryData?.metadata?.enhancedRisk?.category1Score ?? "-",
            },
            {
              label: "Category 2",
              subLabel: factoryData?.metadata?.inherentRisk?.category2 || "TBD",
              value: factoryData?.metadata?.enhancedRisk?.category2Score ?? "-",
            },
          ]}
        />
      )}
      {factoryData?.metadata?.inherentRisk && (
        <RiskCard
          key={"inherentRisk"}
          title={"Inherent Risk"}
          riskScore={
            factoryData?.metadata?.inherentRisk?.totalScore ?? "No Data"
          }
          details={[
            {
              label: "Country",
              subLabel: factoryData?.metadata?.inherentRisk?.country || "-",
              value: factoryData?.metadata?.inherentRisk?.countryScore ?? "-",
            },
            {
              label: "Sourcing TML",
              subLabel: factoryData?.metadata?.inherentRisk?.sourcingTml ?? "-",
              value:
                factoryData?.metadata?.inherentRisk?.sourcingTmlScore ?? "-",
            },
            {
              label: "Audit Type",
              subLabel: factoryData?.metadata?.inherentRisk?.auditType || "-",
              value: factoryData?.metadata?.inherentRisk?.auditTypeScore ?? "-",
            },
            {
              label: "Frequency of Monitoring",
              subLabel: factoryData?.metadata?.inherentRisk?.frequency || "-",
              value: factoryData?.metadata?.inherentRisk?.frequencyScore ?? "-",
            },
          ]}
        />
      )}
    </Box>
  );
};

export default FactoryRiskDashboard;
