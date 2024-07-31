import React from "react";
import { Grid, MenuItem, TextField } from "@mui/material";
import { TextFieldQuestionnaire } from "./style";

const FreedomOfAssociation = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Is there union in facility?"
            select
            fullWidth
            value={formData.unionInFacility}
            onChange={handleChange("unionInFacility")}
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Name(s) of union Rep."
            fullWidth
            value={formData.unionRep}
            onChange={handleChange("unionRep")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextFieldQuestionnaire>
          <TextField
            label="Is there a CBA in place?"
            select
            fullWidth
            value={formData.cbaInPlace}
            onChange={handleChange("cbaInPlace")}
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

export default FreedomOfAssociation;
