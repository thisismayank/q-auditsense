import React, { useState } from "react";
import { Grid, Box, Divider, Button } from "@mui/material";
import LeftSideNavbar from "../components/leftSideNavbar.component";
import FormProgressStepper from "./formProgressStepper.component";
import FacilityBasicInfo from "./FacilityBasicInfo";
import EmployeeInfo from "./EmployeeInfo";

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

const QuestionnairePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    vendorName: "",
    facilityName: "",
    facilityLegalName: "",
    businessLicense: "",
    facilityAddress: "",
    facilityCity: "",
    facilityState: "",
    facilityZip: "",
    yearWhenOperationInitiated: "",
    totalEmployees: "",
  });

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FacilityBasicInfo formData={formData} handleChange={handleChange} />
        );
      case 1:
        return <EmployeeInfo formData={formData} handleChange={handleChange} />;
      // Add cases for other components similarly
      default:
        return "Unknown step";
    }
  };

  return (
    <Grid container>
      <Grid item xs={2}>
        <LeftSideNavbar />
      </Grid>
      <Grid item xs={10}>
        <Grid container direction="column">
          <Box sx={{ flex: 1, overflow: "auto" }}>
            <Box sx={{ flex: 1, margin: "0 20px", padding: "12px 22px" }}>
              <FormProgressStepper
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Box>
            <Divider />
          </Box>
          <form onSubmit={handleSubmit}>
            {getStepContent(activeStep)}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionnairePage;
