import React from "react";
import { Grid, Typography, Box, Divider, Card, Switch } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSupplierNameFromId,
  selectSupplierPageTab,
} from "../selectors/supplier.selector";

import TopBreadcrumbs from "../components/topBreadcrumbs.component";

import SupplierInformation from "../components/SupplierDetails/supplierInformation.component";
import InternalInformation from "../components/SupplierDetails/internalInformation.component";
import SupplierTabs from "../components/SupplierDetails/supplierTabs.component";
import SupplierCompliance from "../components/SupplierDetails/supplierComplianceStatus.component";

import LeftSideNavbar from "../components/leftSideNavbar.component";

import SupplierFacilityAuditsTabList from "../components/SupplierDetails/supplierFacilityAuditsTabList.component";

import EditToggleSwitch from "../components/editToggleSwitch.component";
import ConfidentialBusinessInformation from "../components/confidentialBusinessInformation.component";
import SupplierInternalInformationEditModal from "../components/SupplierDetails/EditModals/editSupplierInternalInformation.component";
import SupplierSupplyChainOverview from "../components/SupplierDetails/supplierSupplyChainOverview.component";
import SupplierFactoryList from "../components/SupplierDetails/supplierFactoryList.component";
import { selectSupplierData } from "../selectors/supplier.selector";


const SupplierDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const supplierName = useSelector((state) =>
    selectSupplierNameFromId(state, params.supplierId)
  );
  const supplierData = useSelector(selectSupplierData);

  const selectedTab = useSelector(selectSupplierPageTab);
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
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ pt: 1, pb: 0, fontWeight: 600, fontSize: 30, display: 'flex', alignItems: 'center' }}
              >
                {supplierName || "-"}
                {supplierData?.metadata?.privateLabel === "Yes" && (
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
                      fontWeight: 600,
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
            <SupplierInformation />
          </Grid>
          {/* Internal Information */}
          {/* <Grid item xs={12}>
            <InternalInformation />
          </Grid> */}
          <Grid item xs={4}>
            <ConfidentialBusinessInformation
              title="Confidential Business Information"
              confidential={true}
              type={"supplier"}
            />
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
                  <SupplierTabs />
                </Grid>
                <Grid item xs={12}>
                  {selectedTab === "status" ? (
                    <SupplierSupplyChainOverview />
                  ) : (
                    <SupplierFactoryList />
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

export default SupplierDetails;
