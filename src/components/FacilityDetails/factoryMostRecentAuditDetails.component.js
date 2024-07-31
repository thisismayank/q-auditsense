import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectFactoryData } from "../../selectors/factory.selector";
import RiskCard from "../riskCard.component";
import FacilityIssuesCard from "./facilityIssuesCard.component";
import PastCAP from "./factoryActionNeeded.component";
import FactoryActionNeeded from "./factoryActionNeeded.component";
import TwoLineCard from "../twoLineCard.component";

const FactoryMostRecentAuditDetails = ({ selectedFactory }) => {
  return (
    <>
      <Typography
        sx={{
          color: "#000",
          fontSize: "18px",
          fontWeight: "700",
          my: 3,
        }}
      >
        Details from Most Recent Audit
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <FacilityIssuesCard />
        </Grid>
        <Grid item xs={6}>
          <TwoLineCard
            title="Audit Rating"
            nextAuditDate={selectedFactory?.risk?.riskScore || "Coming Soon."}
          />
          <TwoLineCard
            title="Next Audit Due Date"
            nextAuditDate={selectedFactory?.metadata?.nextAuditDate || "-"}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default FactoryMostRecentAuditDetails;
