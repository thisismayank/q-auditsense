import React from "react";
import {
  Grid,
  TextField,
  Typography,
  Card,
  Box,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { TextFieldQuestionnaire } from "./style";
import { toContainElement } from "@testing-library/jest-dom/matchers";

const EmployeeInformation = ({ formData, handleChange }) => {
  const handleNonNegativeChange = (field) => (event) => {
    const value = parseInt(
      Math.max(0, parseInt(event.target.value) || 0)
        .toString()
        .substring(0)
    );
    console.log("value", value, "formdata", formData.maleEmployees);
    handleChange(field)({ target: { value: value } });
  };

  const boxStyle = {
    width: "auto",
    justifyContent: "flex-start",
    borderRadius: "10px",
    border: "1px solid #D0D5DD",
    background: "#FFF",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 500,
    display: "flex",
    padding: "8px 10px",
    mb: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "3px",
    color: "#344054",
    fontFamily: "Inter",

    lineHeight: "20px",
    textAlign: "center",
  };

  const inputPropStyle = {
    style: { padding: "10px 12px" }, // Adjust this value as needed
  };
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <Box variant="outlined" sx={boxStyle}>
            Worker Gender
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextFieldQuestionnaire>
                <TextField
                  inputProps={inputPropStyle}
                  type="number"
                  min={0}
                  label="Male"
                  value={formData.maleEmployees}
                  onChange={handleNonNegativeChange("maleEmployees")}
                />
              </TextFieldQuestionnaire>
            </Grid>
            <Grid item xs={4}>
              <TextFieldQuestionnaire>
                <TextField
                  inputProps={inputPropStyle}
                  type="number"
                  min={0}
                  label="Female"
                  value={formData.femaleEmployees}
                  onChange={handleNonNegativeChange("femaleEmployees")}
                />
              </TextFieldQuestionnaire>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <Box variant="outlined" sx={boxStyle}>
            Production Worker Demographics
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextFieldQuestionnaire>
                <TextField
                  inputProps={inputPropStyle}
                  type="number"
                  label="Local Production Workers"
                  fullWidth
                  disabled={formData.totalEmployees === 0}
                  min={0}
                  max={formData.totalEmployees}
                  value={formData.localProductionWorkers}
                  onChange={handleNonNegativeChange("localProductionWorkers")}
                />
              </TextFieldQuestionnaire>
            </Grid>
            <Grid item xs={4}>
              <TextFieldQuestionnaire>
                <TextField
                  inputProps={inputPropStyle}
                  type="number"
                  label="Domestic Migrant Workers"
                  fullWidth
                  disabled={formData.totalEmployees === 0}
                  min={0}
                  max={formData.totalEmployees}
                  value={formData.domesticMigrantWorkers}
                  onChange={handleNonNegativeChange("domesticMigrantWorkers")}
                />
              </TextFieldQuestionnaire>
            </Grid>
            <Grid item xs={4}>
              <TextFieldQuestionnaire>
                <TextField
                  inputProps={inputPropStyle}
                  type="number"
                  label="Foreign Migrant Workers"
                  disabled={formData.totalEmployees === 0}
                  fullWidth
                  min={0}
                  value={formData.foreignMigrantWorkers}
                  onChange={handleNonNegativeChange("foreignMigrantWorkers")}
                />
              </TextFieldQuestionnaire>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {formData.totalEmployees !== 0 && (
          <>
            <Grid item xs={5}>
              <Box variant="outlined" sx={{ ...boxStyle, fontWeight: 700 }}>
                Management and Non-Production Staff:{" "}
                {(parseInt(formData.totalEmployees) || 0) -
                  ((parseInt(formData.localProductionWorkers) || 0) +
                    (parseInt(formData.domesticMigrantWorkers) || 0) +
                    (parseInt(formData.foreignMigrantWorkers) || 0))}
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box variant="outlined" sx={{ ...boxStyle, fontWeight: 700 }}>
                Production Staff:{" "}
                {(parseInt(formData.localProductionWorkers) || 0) +
                  (parseInt(formData.domesticMigrantWorkers) || 0) +
                  (parseInt(formData.foreignMigrantWorkers) || 0)}
              </Box>
            </Grid>
            <Grid item xs={4}>
              {formData.totalEmployees !== 0 && (
                <Box variant="outlined" sx={{ ...boxStyle, fontWeight: 700 }}>
                  Total No. of Employees: {formData.totalEmployees}
                </Box>
              )}
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={3}>
          <Box variant="outlined" sx={{ ...boxStyle, py: 3 }}>
            <FormControl component="fieldset">
              <FormLabel
                component="legend"
                sx={{ fontSize: "14px", fontWeight: 500, color: "#344054" }}
              >
                Labor Agents Used?
              </FormLabel>
              <RadioGroup
                row
                aria-label="laborAgentsUsed"
                name="laborAgentsUsed"
                value={formData.laborAgentsUsed || ""}
                onChange={handleChange("laborAgentsUsed")}
              >
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#344054",
                    },
                    "& .MuiRadio-root": {
                      "& svg": {
                        width: "16px",
                        height: "16px",
                      },
                    },
                  }}
                  value="Yes"
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "#344054",
                    },
                    "& .MuiRadio-root": {
                      "& svg": {
                        width: "16px",
                        height: "16px",
                      },
                    },
                  }}
                  value="No"
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Grid>
        {formData.laborAgentsUsed === "Yes" && (
          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={2.68}>
                <TextFieldQuestionnaire>
                  <TextField
                    inputProps={inputPropStyle}
                    type="number"
                    min={0}
                    label="Domestic Labor Agents"
                    value={formData.domesticLaborAgents}
                    onChange={handleNonNegativeChange("domesticLaborAgents")}
                  />
                </TextFieldQuestionnaire>
                <TextFieldQuestionnaire>
                  <TextField
                    inputProps={inputPropStyle}
                    type="number"
                    min={0}
                    label="Overseas Labor Agents"
                    value={formData.overseasLaborAgents}
                    onChange={handleNonNegativeChange("overseasLaborAgents")}
                  />
                </TextFieldQuestionnaire>
              </Grid>
              <Grid item xs={9.3}>
                {(formData.domesticLaborAgents !== 0 ||
                  formData.overseasLaborAgents !== 0) && (
                  <Box
                    variant="outlined"
                    sx={{
                      ...boxStyle,
                      py: 3,
                      fontWeight: 700,
                    }}
                  >
                    <Grid container>
                      <Grid item xs={3.5}>
                        % of Total Production Workers:
                      </Grid>
                      <Grid item xs={5}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ ml: 3 }}
                        >
                          Domestic Labor Agents:{" "}
                          {(
                            ((parseInt(formData.domesticLaborAgents) || 0) /
                              ((parseInt(formData.localProductionWorkers) ||
                                0) +
                                (parseInt(formData.domesticMigrantWorkers) ||
                                  0) +
                                (parseInt(formData.foreignMigrantWorkers) ||
                                  0))) *
                            100
                          ).toFixed(2)}{" "}
                          %
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          sx={{ ml: 3, mt: 1 }}
                        >
                          Overseas Labor Agents:{" "}
                          {(
                            ((parseInt(formData.overseasLaborAgents) || 0) /
                              ((parseInt(formData.localProductionWorkers) ||
                                0) +
                                (parseInt(formData.domesticMigrantWorkers) ||
                                  0) +
                                (parseInt(formData.foreignMigrantWorkers) ||
                                  0))) *
                            100
                          ).toFixed(2)}{" "}
                          %
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default EmployeeInformation;
