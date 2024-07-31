import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import { TextFieldQuestionnaire } from "./style";
const OtherInformation = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Does the facility use coal as a direct energy source?"
            select
            fullWidth
            value={formData.useCoal}
            onChange={handleChange("useCoal")}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Plans to phase out direct coal use"
            select
            fullWidth
            value={formData.phaseOutCoal}
            onChange={handleChange("phaseOutCoal")}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </TextFieldQuestionnaire>
      </Grid>
      {/* Add other fields similarly */}
    </Grid>
  );
};

export default OtherInformation;
