import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import ThreeLineCard from "../threeLineCard.component";
import { selectSupplierRemediationStatusData } from "../../selectors/supplier.selector";
import { useSelector } from "react-redux";

const SupplierFactoryRemediationStatus = () => {
  const supplierData = useSelector(selectSupplierRemediationStatusData);
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
        Site Remediation Statuses
      </Typography>

      {supplierData.map((tierData) => (
        <Grid container spacing={4} key={tierData.tier}>
          {tierData.cards.map((card) => (
            <Grid item xs={4} key={card.title}>
              <ThreeLineCard
                title={`${card.title} - Tier ${tierData.tier}`}
                details={card.details}
                key={card.key}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </>
  );
};

export default SupplierFactoryRemediationStatus;
