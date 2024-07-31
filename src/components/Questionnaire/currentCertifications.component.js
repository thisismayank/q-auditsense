import React from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { TextFieldQuestionnaire } from "./style";
const CurrentCertifications = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="BSCI Certification"
            select
            fullWidth
            value={formData.bsciCertification}
            onChange={handleChange("bsciCertification")}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Expiry Date"
            type="date"
            fullWidth
            value={formData.bsciExpiryDate}
            onChange={handleChange("bsciExpiryDate")}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </TextFieldQuestionnaire>
      </Grid>
      {/* Add other fields similarly */}
    </Grid>
  );
};

export default CurrentCertifications;
