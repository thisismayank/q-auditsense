import React from "react";
import { Divider, Grid, Box } from "@mui/material";

import AuditReportTabs from "../components/AuditDetails/auditReportTabs.component";
import AuditReportLeftSideNavigationBar from "../components/AuditDetails/auditReportDetailsLeftSideNavigationBar.component";
import AuditReport from "../components/AuditDetails/auditReport.component";
import AuditReportDetailsAppbar from "../components/AuditDetails/auditReportDetailsAppbar.component";
import { useSelector } from "react-redux";
import {
  selectAuditIssueDetails,
  selectAuditReportPageTab,
} from "../selectors/audit.selector";
import AuditReportFactoryInfo from "../components/AuditDetails/auditReportFactoryInfo.component";
import EditAuditReport from "../components/AuditDetails/EditModals/editAuditReport.component";
import {
  selectEditModeForAuditState,
  selectEditModeState,
} from "../selectors/misc.selector";

const AuditReportDetails = ({ handleDrawerClose }) => {
  const auditReportTabValue = useSelector(selectAuditReportPageTab);
  const data = useSelector(selectAuditIssueDetails);
  const selectedEditState = useSelector(selectEditModeForAuditState);
  return (
    <Grid container>
      <Box sx={{ width: "100%", position: "sticky", top: 0, zIndex: 1000 }}>
        <AuditReportDetailsAppbar handleDrawerClose={handleDrawerClose} />
        {/* <Divider flexItem style={{ width: "98%", margin: "1px 16px" }} /> */}
      </Box>

      <Grid item xs={2.8}>
        <AuditReportTabs />
        {auditReportTabValue === "issues" ? (
          <AuditReportLeftSideNavigationBar />
        ) : (
          <AuditReportFactoryInfo />
        )}
      </Grid>
      <Grid item xs={0.2}>
        <Divider orientation="vertical" style={{ margin: "2px 2px" }} />
      </Grid>
      <Grid item xs={9} sx={{ overflowY: "auto", height: "100vh" }}>
        {" "}
        {selectedEditState ? <EditAuditReport data={data} /> : <AuditReport />}
        {/* <AuditReport /> */}
      </Grid>
    </Grid>
  );
};

export default AuditReportDetails;
