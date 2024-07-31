import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFactoryById,
  getListOfAllFactories,
} from "../../reducers/factory.reducer";
import {
  selectFactoryList,
  selectFactoryListBySupplierId,
} from "../../selectors/factory.selector";
import moment from "moment";
import ListCard from "../listCard.component";
const FacilityComplianceList = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const issuesColorScheme = (status) => {
    switch (status) {
      case "zt":
        return "#B42318";
      case "critical":
        return "#FF692E";
      case "major":
        return "#EAAA08";
      default:
        return "#667085";
    }
  };

  const facilities = useSelector((state) =>
    selectFactoryListBySupplierId(state, params.supplierId)
  );
  const navigateToFacilityDetails = (facilityId) => {
    dispatch(
      getFactoryById({ supplierId: params.supplierId, factoryId: facilityId })
    );
    navigate(`${location.pathname}/factory/${facilityId}`);
  };

  useEffect(() => {
    dispatch(
      getListOfAllFactories({
        limit: 100,
        offset: 0,
        supplierId: params.supplierId,
        supplierFactoryList: true,
      })
    );
  }, []);
  return (
    <Box mt={2}>
      {facilities.length > 0 &&
        facilities.map((facility, index) => (
          <Paper
            key={facility.factoryId}
            elevation={1}
            sx={{
              py: 3,
              px: 4,
              my: 4,
              boxShadow: "none",

              overflowY: "scroll",
              borderRadius: "12px",
              border: "1px solid #EAECF0",
              background: "#FFF",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              cursor: "pointer",
            }}
            onClick={() => {
              navigateToFacilityDetails(facility.factoryId);
            }}
          >
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <Grid container sx={{ pr: 4, alignItems: "center" }}>
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
                  <Box
                    sx={{
                      textTransform: "none",
                      p: "3px 8px",
                      borderRadius: "6px",
                      border: "1px solid var(--Brand-300, #D0D5DD)",
                      background: "#FFF",
                      boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                      color: "#344054",
                      fontSize: "12px",
                      fontWeight: 600,
                      fontFamily: "Inter, sans-serif",
                    }}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      navigateToFacilityDetails(facility.factoryId);
                    }}
                  >
                    Tier {facility.tier}
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <ListCard data={facility} type="factory" />
          </Paper>
        ))}
    </Box>
  );
};

export default FacilityComplianceList;
