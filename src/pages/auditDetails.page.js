import React from "react";
import {
  Grid,
  Typography,
  Box,
  Divider,
  Button,
  Skeleton,
  Card,
  Switch,
  Drawer,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import TopBreadcrumbs from "../components/topBreadcrumbs.component";

import LeftSideNavbar from "../components/leftSideNavbar.component";

import {
  selectAuditNameFromId,
  selectAuditPageTab,
  selectAuditXlsxFile,
  selectSelectedAuditIssueId,
  selectAuditData,
} from "../selectors/audit.selector";
import AuditInformation from "../components/AuditDetails/auditInformation.component";
import ListOfAuditDocuments from "../components/AuditDetails/listOfAuditDocuments.component";
import AuditTabs from "../components/AuditDetails/auditTabs.component";
import AuditIframe from "../components/AuditDetails/auditIframe.component";
import {
  selectAuditPageFactoryDataTitle,
  selectFactoryData,
} from "../selectors/factory.selector";

import EditToggleSwitch from "../components/editToggleSwitch.component";
import AuditsTable from "../components/AuditDetails/auditsTable.component";
import FacilityIssuesCard from "../components/FacilityDetails/facilityIssuesCard.component";
import AuditIssuesTable from "../components/AuditDetails/auditIssuesTable.component";
import AuditReportDetails from "./auditReportDetails.page";
import { setSelectedAuditIssueId } from "../reducers/audit.reducer";
import AuditDocumentStorage from "../components/AuditDetails/auditDocumentStorage.component";
import { toggleEditModeForAudit } from "../reducers/misc.reducer";

const AuditDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  // Drawer state management
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  // Update the drawer based on the selectedAuditIssueId
  const selectedAuditIssueId = useSelector(selectSelectedAuditIssueId);
  React.useEffect(() => {
    // Ensure the drawer opens only if there is a valid, non-null `selectedAuditIssueId`
    if (selectedAuditIssueId) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  }, [selectedAuditIssueId]);

  // Handle close drawer
  const handleDrawerClose = () => {
    dispatch(setSelectedAuditIssueId(null));
    dispatch(toggleEditModeForAudit(false));
    setIsDrawerOpen(false);
  };
  const auditName = useSelector((state) =>
    selectAuditNameFromId(state, params.auditId)
  );
  const selectedAuditData = useSelector(selectAuditData);
  // const selectedIframeData = useSelector(selectAuditXlsxFile);
  const selectedFactoryData = useSelector(selectFactoryData);
  const selectedTab = useSelector(selectAuditPageTab);
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
            <Grid>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ pt: 1, pb: 0, fontWeight: 600, fontSize: 30 }}
              >
                {selectedAuditData?.metadata?.auditType} (
                {moment(selectedAuditData?.metadata?.lastAuditDate).format(
                  "MMM. DD, YYYY"
                )}
                )
              </Typography>
              {selectedAuditData?.state &&
                selectedAuditData.state === "test" && (
                  <Typography color="red" sx={{ fontSize: "10px" }}>
                    Internal - Not Approved
                  </Typography>
                )}
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
          {/* <Grid item xs={12}>
            <ListOfAuditDocuments />
          </Grid> */}
          {/* Internal Information */}
          <Grid item xs={12}>
            <Card
              style={{
                boxShadow:
                  "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

                border: "1px solid rgba(234, 236, 240, 1)",
                borderRadius: "12px",
                py: 2,
              }}
            >
              <Grid container>
                <Grid item xs={7}>
                  <AuditInformation />
                </Grid>
                <Grid item xs={5} sx={{ p: 2 }}>
                  <AuditIssuesTable />
                </Grid>
                <Grid item xs={12} sx={{ mt: 4, mb: 2 }}>
                  <AuditTabs />
                </Grid>
                <Grid item xs={12}>
                  {selectedTab === "issues" ? (
                    <AuditsTable />
                  ) : selectedTab === "document" ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgba(234, 236, 240, 0.5)",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          mb: 2,
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.6)",
                            fontWeight: 500,
                            fontStyle: "italic",
                            textAlign: "center",
                          }}
                        >
                          You can upload all your evidence and documents here
                        </Typography>
                        <Button
                          variant="outlined"
                          disabled
                          sx={{
                            mt: 1,
                            color: "#A4A4A4",
                            fontSize: "14px",
                            fontWeight: 600,
                            padding: "8px 12px",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "8px",
                            border: "1px solid #D0D5DD",
                            background: "#FFF",
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                            height: "fit-content",
                            textTransform: "none",
                          }}
                        >
                          Upload disabled
                        </Button>
                      </Box>
                      <ListOfAuditDocuments includeType="document" />
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgba(234, 236, 240, 0.5)",
                          padding: "8px 16px",
                          borderRadius: "8px",
                          mb: 2,
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "rgba(0, 0, 0, 0.6)",
                            fontWeight: 500,
                            fontStyle: "italic",
                            textAlign: "center",
                          }}
                        >
                          Download AI generated documents from here
                        </Typography>
                      </Box>
                      <ListOfAuditDocuments includeType="export" />
                    </>
                  )}
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Drawer
        anchor="bottom"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
            maxHeight: "98%",
            maxWidth: "98%",
            display: "flex",
            justifySelf: "center",
          },
        }}
      >
        <AuditReportDetails handleDrawerClose={handleDrawerClose} />
      </Drawer>
    </Box>
  );
};

export default AuditDetails;
