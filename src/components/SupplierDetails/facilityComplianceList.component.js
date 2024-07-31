import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFactoryById } from "../../reducers/factory.reducer";
import { selectFactoryList } from "../../selectors/factory.selector";
import moment from "moment";
const FacilityComplianceList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const colorStatus = (status) => {
    switch (status) {
      case "past":
        return "error";
      case "inProgress":
        return "warning";
      case "noResponse":
        return "info";
      case "collected":
        return "success";
      default:
        return "primary";
    }
  };

  const facilities = useSelector(selectFactoryList);
  const navigateToFacilityDetails = (facilityId) => {
    dispatch(
      getFactoryById({ supplierId: params.supplierId, factoryId: facilityId })
    );
    navigate(`${location.pathname}/factory/${facilityId}`);
  };

  // error success primary secondary info warning default
  return (
    <Box mt={2}>
      {/* <Typography
        sx={{ fontWeight: 700, fontSize: 18, color: "#000", ml: 2, mt: 2 }}
      >
        Site Compliance
      </Typography> */}
      {facilities.length > 0 &&
        facilities.map((facility, index) => (
          <>
            <Paper
              key={index}
              elevation={1}
              sx={{
                py: 2,
                my: 4,
                mx: 3,
                boxShadow: "none",
              }}
            >
              <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
                <Grid container justifyContent="space-between" sx={{ pr: 4 }}>
                  <Grid item>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: 18,
                        color: "#000",
                        display: "inline-block",
                        mr: 2,
                      }}
                    >
                      {facility?.name}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Button
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
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        navigateToFacilityDetails(facility.factoryId);
                      }}
                    >
                      Go to site
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={3}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                  >
                    Location
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                  >
                    {facility.location}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                  >
                    Last Audit Date
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                  >
                    {facility.lastAuditDate
                      ? moment(facility.lastAuditDate).format("MMM. DD, YYYY")
                      : "-"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                  >
                    Enhanced Risk
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                    color={colorStatus(facility.status)}
                  >
                    {facility?.enhancedRisk || "-"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                  >
                    Inherent Risk
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                    color={colorStatus(facility.status)}
                  >
                    {facility?.inherentRisk || "-"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={0} sx={{ mb: 3 }}>
                <Grid item xs={3}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                  >
                    Issues
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                  >
                    {facility?.nc ?? "-"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                  >
                    High, Medium, Low
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                  >
                    {facility?.high || "-"}, {facility?.medium || "-"},{" "}
                    {facility?.low || "-"}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                  >
                    Open CAP
                  </Typography>
                  <Typography
                    sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                  >
                    {facility?.openCAP ?? "-"}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={0}>
                <Grid item xs={3}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#8B8D97",
                    }}
                  >
                    Next Report Due
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#45464E",
                      display: "inline-block",
                      mr: 2,
                    }}
                    color={colorStatus(facility.status)}
                  >
                    {facility?.metadata?.nextReportDate
                      ? moment(facility.metadata.nextReportDate).format(
                          "MMM. DD, YYYY"
                        )
                      : "-"}
                  </Typography>
                  <Chip
                    label={
                      facility.status === "inProgress" ? "Not Due Yet" : ""
                    }
                    color={
                      facility.status === "inProgress" ? "default" : "success"
                    } // error success primary secondary info warning default
                    size="small"
                    sx={{
                      padding: "3px 8px",
                      borderRadius: "6px",
                      minWidth: 114,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>
            <Divider sx={{ mx: 3 }} />
          </>
        ))}
    </Box>
  );
};

export default FacilityComplianceList;
