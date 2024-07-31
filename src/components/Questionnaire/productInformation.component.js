import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { TextFieldQuestionnaire } from "./style";

const ProductionInformation = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Main Production processes at facility"
            fullWidth
            value={formData.mainProductionProcesses}
            onChange={handleChange("mainProductionProcesses")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Facility Type"
            select
            fullWidth
            value={formData.facilityType}
            onChange={handleChange("facilityType")}
          >
            <MenuItem value="Type1">Type 1</MenuItem>
            <MenuItem value="Type2">Type 2</MenuItem>
          </TextField>
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Main Product Type"
            select
            fullWidth
            value={formData.mainProductType}
            onChange={handleChange("mainProductType")}
          >
            <MenuItem value="Product1">Product 1</MenuItem>
            <MenuItem value="Product2">Product 2</MenuItem>
          </TextField>
        </TextFieldQuestionnaire>
      </Grid>
      {/* Add other fields similarly */}
    </Grid>
  );
};

export default ProductionInformation;
