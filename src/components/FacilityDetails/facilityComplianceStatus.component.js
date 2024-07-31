import React from "react";
import { Typography, Grid, Box } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectFactoryActionNeededData,
  selectFactoryData,
} from "../../selectors/factory.selector";

import FactoryActionNeeded from "./factoryActionNeeded.component";

import FactoryMostRecentAuditDetails from "./factoryMostRecentAuditDetails.component";
import FactoryRiskCard from "./factoryRiskCard.component";

const FacilityComplianceStatus = () => {
  const selectFactory = useSelector(selectFactoryData);
  const selectFactoryActionNeeded = useSelector(selectFactoryActionNeededData);
  return (
    <>
      {/* <Typography
        sx={{
          color: "#000",
          fontSize: 18,
          fontWeight: 700,
          mb: 2,
          mt: 2,
        }}
      >
        Information from last audit
      </Typography>
      <Grid container spacing={4} style={{ marginTop: -16 }}>
        <Grid item xs={6}>
          <FactoryRiskCard
            key={"enhancedRisk"}
            title={"Enhanced Risk"}
            riskScore={
              selectFactory?.metadata?.enhancedRisk?.totalScore ?? "No Data"
            }
            details={[
              {
                label: "Category 1",
                subLabel:
                  selectFactory?.metadata?.inherentRisk?.category1 || "TBD",
                value:
                  selectFactory?.metadata?.enhancedRisk?.category1Score ?? "-",
              },
              {
                label: "Category 2",
                subLabel:
                  selectFactory?.metadata?.inherentRisk?.category2 || "TBD",
                value:
                  selectFactory?.metadata?.enhancedRisk?.category2Score ?? "-",
              },
              {
                label: "Category 3",
                subLabel:
                  selectFactory?.metadata?.inherentRisk?.category1 || "TBD",
                value:
                  selectFactory?.metadata?.enhancedRisk?.category1Score ?? "-",
              },
              {
                label: "Category 4",
                subLabel:
                  selectFactory?.metadata?.inherentRisk?.category2 || "TBD",
                value:
                  selectFactory?.metadata?.enhancedRisk?.category2Score ?? "-",
              },
            ]}
          />
        </Grid>
        <Grid item xs={6}>

          <FactoryRiskCard
            key={"inherentRisk"}
            title={"Inherent Risk"}
            riskScore={
              selectFactory?.metadata?.inherentRisk?.totalScore ?? "No Data"
            }
            details={[
              {
                label: "Country",
                subLabel: selectFactory?.metadata?.inherentRisk?.country || "-",
                value:
                  selectFactory?.metadata?.inherentRisk?.countryScore ?? "-",
              },
              {
                label: "Sourcing TML",
                subLabel:
                  selectFactory?.metadata?.inherentRisk?.sourcingTml ?? "-",
                value:
                  selectFactory?.metadata?.inherentRisk?.sourcingTmlScore ??
                  "-",
              },
              {
                label: "Audit Type",
                subLabel:
                  selectFactory?.metadata?.inherentRisk?.auditType || "-",
                value:
                  selectFactory?.metadata?.inherentRisk?.auditTypeScore ?? "-",
              },
              {
                label: "Frequency of Monitoring",
                subLabel:
                  selectFactory?.metadata?.inherentRisk?.frequency || "-",
                value:
                  selectFactory?.metadata?.inherentRisk?.frequencyScore ?? "-",
              },
            ]}
          />
        </Grid>
      </Grid> */}

      <FactoryMostRecentAuditDetails selectedFactory={selectFactory} />
      <Grid item>
        {selectFactoryActionNeeded && (
          <FactoryActionNeeded capDetails={selectFactoryActionNeeded} />
        )}
      </Grid>
    </>
  );
};

export default FacilityComplianceStatus;
