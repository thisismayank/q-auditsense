import React from "react";
import { Grid, TextField } from "@mui/material";
import { TextFieldQuestionnaire } from "./style";

const BusinessInformation = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Production % for lululemon"
            fullWidth
            value={formData.productionPercentage}
            onChange={handleChange("productionPercentage")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Primary Customers (one per line)"
            multiline
            rows={4}
            fullWidth
            value={formData.primaryCustomers}
            onChange={handleChange("primaryCustomers")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      {/* Add other fields similarly */}
    </Grid>
  );
};

export default BusinessInformation;
