import React, { useEffect, useState } from "react";
import { Grid, Typography, Box, Divider, Card, Switch } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectSupplierNameFromId } from "../selectors/supplier.selector";

import TopBreadcrumbs from "../components/topBreadcrumbs.component";

import LeftSideNavbar from "../components/leftSideNavbar.component";
import {
  selectFacilityPageTab,
  selectFactoryData,
  selectFactoryNameFromId,
  selectFactoryTierFromId,
} from "../selectors/factory.selector";
import FacilityInformation from "../components/FacilityDetails/facilityInformation.component";
import FacilityInternalInformation from "../components/FacilityDetails/facilityInternalInformation.component";
import FacilityTabs from "../components/FacilityDetails/facilityTabs.component";
import FacilityComplianceStatus from "../components/FacilityDetails/facilityComplianceStatus.component";
import FacilityAuditList from "../components/FacilityDetails/facilityAuditList.component";

import EditToggleSwitch from "../components/editToggleSwitch.component";
import ConfidentialBusinessInformation from "../components/confidentialBusinessInformation.component";
import AdditionalFactoryInformation from "../components/FacilityDetails/facilityAdditionalInformation.component";

const FacilityDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const selectedFactoryData = useSelector(selectFactoryData);

  const selectedTab = useSelector(selectFacilityPageTab);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <LeftSideNavbar />
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <Box
          sx={{
            flex: 1,
            margin: "0 20px",
            padding: "12px 22px",
          }}
        >
          <TopBreadcrumbs />
          <Grid container justifyContent="space-between">
            <Grid item>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                  pt: 1,
                  pb: 0,
                  fontWeight: 600,
                  fontSize: 30,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {selectedFactoryData?.name}
                {selectedFactoryData?.metadata?.tier && (
                  <Box
                    sx={{
                      textTransform: "none",
                      ml: 2,
                      p: "3px 8px",
                      borderRadius: "6px",
                      border: "1px solid var(--Brand-300, #D0D5DD)",
                      background: "#FFF",
                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                      color: "#344054",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Tier {selectedFactoryData?.metadata?.tier}
                  </Box>
                )}
                {selectedFactoryData?.metadata?.privateLabel === "Yes" && (
                  <Box
                    sx={{
                      textTransform: "none",
                      ml: 2,
                      p: "3px 8px",
                      borderRadius: "6px",
                      border: "1px solid var(--Brand-300, #D0D5DD)",
                      background: "#FFF",
                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                      color: "#344054",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Private Label
                  </Box>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <EditToggleSwitch />
            </Grid>
          </Grid>
        </Box>
        <Divider />

        <Grid
          container
          spacing={2}
          sx={{
            p: "0px 24px 24px 24px",
            backgroundColor: "var(--Gray-50, #F9FAFB)",
          }}
        >
          <Grid item xs={8}>
            <FacilityInformation />
          </Grid>
          {/* Internal Information */}
          {/* <Grid item xs={12}>
            <FacilityInternalInformation />
          </Grid> */}
          <Grid item xs={4}>
            <ConfidentialBusinessInformation
              title="Confidential Business Information"
              confidential={true}
              type={"factory"}
            />
          </Grid>
          <Grid item xs={12}>
            <AdditionalFactoryInformation />
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                boxShadow:
                  "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

                border: "1px solid rgba(234, 236, 240, 1)",
                borderRadius: "12px",
                px: 5,
                pb: 4,
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <FacilityTabs />
                </Grid>
                <Grid item xs={12}>
                  {selectedTab === "status" ? (
                    <FacilityComplianceStatus />
                  ) : (
                    <FacilityAuditList />
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FacilityDetails;
