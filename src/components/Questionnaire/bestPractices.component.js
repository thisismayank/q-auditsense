import React from "react";
import { Grid, TextField } from "@mui/material";
import { TextFieldQuestionnaire } from "./style";

const BestPractices = ({ formData, handleChange }) => {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid item xs={12}>
        <TextFieldQuestionnaire>
          <TextField
            label="Transparency & Business Integrity"
            multiline
            rows={4}
            fullWidth
            value={formData.transparencyBusinessIntegrity}
            onChange={handleChange("transparencyBusinessIntegrity")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12}>
        <TextFieldQuestionnaire>
          <TextField
            label="Management Systems"
            multiline
            rows={4}
            fullWidth
            value={formData.managementSystems}
            onChange={handleChange("managementSystems")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      <Grid item xs={12}>
        <TextFieldQuestionnaire>
          <TextField
            label="Hiring, Disciplinary & Termination"
            multiline
            rows={4}
            fullWidth
            value={formData.hiringDisciplinaryTermination}
            onChange={handleChange("hiringDisciplinaryTermination")}
          />
        </TextFieldQuestionnaire>
      </Grid>
      {/* Add other fields similarly */}
    </Grid>
  );
};

export default BestPractices;
