import React, { useEffect } from "react";
import { Grid, Box, Divider, Typography, Card } from "@mui/material";

import LeftSideNavbar from "../components/leftSideNavbar.component";
import TopBreadcrumbs from "../components/topBreadcrumbs.component";
import RiskBarChart from "../components/RiskDetails/riskBarChart.component";
import { useDispatch, useSelector } from "react-redux";
import { selectFactoryData } from "../selectors/factory.selector";
import FactoryRiskDashboard from "../components/RiskDetails/factoryRiskDashboard.component";
import { selectOrganisationId } from "../selectors/login.selector";
import { getChartData } from "../reducers/risk.reducer";
import RiskDropDown from "../components/RiskDetails/riskDropDown.component";
import { selectSelectedChartType } from "../selectors/risk.selector";

const Risks = () => {
  const selectFactory = useSelector(selectFactoryData);
  const dispatch = useDispatch();
  const organisationId = useSelector(selectOrganisationId);
  useEffect(() => {
    dispatch(getChartData({ organisationId }));
  }, []);
  const selectedChartType = useSelector(selectSelectedChartType);

  return (
    <Grid container sx={{ height: "100%", overflow: "auto" }}>
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
              {/* <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography
                    sx={{ pt: 1, pb: 0, fontWeight: 600, fontSize: 30 }}
                  >
                    Risk
                  </Typography>
                  <Typography
                    gutterBottom
                    sx={{
                      color: "var(--Gray-600, #475467)",
                      fontSize: "16px",
                      fontWeight: 400,
                    }}
                  >
                    View Site Risk
                  </Typography>
                </Grid>
                <Grid item><EditToggleSwitch /></Grid>
              </Grid> */}
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
          {/* <Card
            sx={{
              pl: 4,
              py: 4,
              mr: 4,
              ml: 0,
              mt: "18px",
              flex: 1,
              overflow: "hidden",
              maxHeight: "80vh",
              borderRadius: "12px",
              border: "1px solid var(--Gray-200, #EAECF0)",
              background: "var(--Base-White, #FFF)",
              boxShadow:
                "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={7.6}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  sx={{ height: "95%", width: "100%" }}
                >
                  <Grid item>
                    <Typography
                      sx={{
                        color: "#182230",
                        fontWeight: 600,
                        fontSize: "36px",
                      }}
                    >
                      Site Risk Map
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Grid container>
                      <RiskDropDown />
                    </Grid>
                  </Grid>
                  {selectedChartType === "Bar Chart" ? (
                    <RiskBarChart />
                  ) : (
                    <RiskBarChart />
                  )}
                </Grid>
              </Grid>
              <Box
                sx={{
                  width: "1px",
                  display: "flex",
                  alignItems: "center",
                  margin: 0,
                  padding: 0,
                }}
              >
                <Divider orientation="vertical" sx={{}} />
              </Box>
              <Grid item xs={4} sx={{ height: "100%", overflowY: "hidden" }}>
                <FactoryRiskDashboard />
              </Grid>
            </Grid>
          </Card> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Risks;
