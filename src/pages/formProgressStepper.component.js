import React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Facility Basic Information",
  "Employee Information",
  "Freedom of Association",
  "Business Information",
  "Production Information",
  "Subcontractor Information",
  "Current Certifications/Programs",
  "Other Information",
  "Best Practices",
];

const FormProgressStepper = ({ activeStep, setActiveStep }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => setActiveStep(index)}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  fontSize: "12px",
                  fontWeight: 500,
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormProgressStepper;
