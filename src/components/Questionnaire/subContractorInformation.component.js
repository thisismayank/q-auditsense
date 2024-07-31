import React from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { TextFieldQuestionnaire } from "./style";

const SubcontractorInformation = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Does the Facility employ subcontractors?"
            select
            fullWidth
            value={formData.employSubcontractors}
            onChange={handleChange("employSubcontractors")}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Details of subcontractors"
            multiline
            rows={4}
            fullWidth
            value={formData.subcontractorDetails}
            onChange={handleChange("subcontractorDetails")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      {/* Add other fields similarly */}
    </Grid>
  );
};

export default SubcontractorInformation;
