import React, { useEffect, useState } from "react";
import { Grid, Box, Divider, Button, Card, Typography } from "@mui/material";

import FacilityBasicInformation from "../components/Questionnaire/facilityBasicInformation.component";

import FreedomOfAssociation from "../components/Questionnaire/freedomOfAssociation.component";
import { Country, State, City } from "country-state-city";

import CurrentCertifications from "../components/Questionnaire/currentCertifications.component";
import BestPractices from "../components/Questionnaire/bestPractices.component";
import LeftSideNavbar from "../components/leftSideNavbar.component";
import FormProgressStepper from "./formProgressStepper.component";
import ProductionInformation from "../components/Questionnaire/productInformation.component";
import SubcontractorInformation from "../components/Questionnaire/subContractorInformation.component";
import EmployeeInformation from "../components/Questionnaire/employeeInformation.component";
import BusinessInformation from "../components/Questionnaire/businessInformation.component";
import OtherInformation from "../components/Questionnaire/otherInformation.component";
import moment from "moment";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useParams } from "react-router-dom";
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
  const params = useParams();

  console.log("params", params);
  const [activeStep, setActiveStep] = useState(0);
  let initialData = {
    date: moment().format("MMMM Do YYYY"),
    vendorName: "",
    facilityName: "",
    facilityLegalName: "",
    businessLicense: "",
    facilityAddress: "",
    facilityCity: "",
    facilityState: "",
    facilityCountry: "",
    facilityZip: "",
    dormitoriesPresent: "",
    dormitoriesLocation: "",

    kitchenPresent: "",
    multipleTenants: "",
    ownsBuildings: "",
    yearWhenOperationInitiated: "",
    totalEmployees: 0,
    maleEmployees: 0,
    femaleEmployees: 0,
    managementStaff: 0,
    productionWorkers: 0,
    localProductionWorkers: 0,
    domesticMigrantWorkers: 0,
    foreignMigrantWorkers: 0,
    laborAgentsUsed: "",
    domesticLaborAgents: 0,
    overseasLaborAgents: 0,
    unionInFacility: "",
    unionRep: "",
    cbaInPlace: "",
    productionPercentage: "",
    primaryCustomers: "",
    mainProductionProcesses: "",
    facilityType: "",
    mainProductType: "",
    employSubcontractors: "",
    subcontractorDetails: "",
    bsciCertification: "",
    bsciExpiryDate: "",
    useCoal: "",
    phaseOutCoal: "",
    transparencyBusinessIntegrity: "",
    managementSystems: "",
    hiringDisciplinaryTermination: "",
    // Add other fields similarly
  };
  const [formData, setFormData] = useState(initialData);

  const handleChange = (field) => (event) => {
    // console.log("event", event);
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleAddress = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  useEffect(() => {
    if (
      formData.facilityCity !== "" &&
      formData.facilityState !== "" &&
      formData.facilityCountry !== ""
    ) {
      let address = `${formData.facilityCity || ""} ${
        formData.facilityState || ""
      } ${formData.facilityCountry}`;
      address = address.trim().split(" ").join(", ");
      setFormData({
        ...formData,
        facilityAddress: address,
      });
    }
  }, [formData.facilityCity, formData.facilityState, formData.facilityCountry]);
  console.log("fromdata", formData);
  useEffect(() => {
    setFormData({
      ...formData,
      totalEmployees:
        (parseInt(formData.maleEmployees) || 0) +
        (parseInt(formData.femaleEmployees) || 0),
    });
  }, [formData.maleEmployees, formData.femaleEmployees]);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== initialData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});
    console.log("event", changes);
    // Handle form submission
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <FacilityBasicInformation
            formData={formData}
            handleChange={handleChange}
            handleAddress={handleAddress}
          />
        );
      case 1:
        return (
          <EmployeeInformation
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <FreedomOfAssociation
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 3:
        return (
          <BusinessInformation
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 4:
        return (
          <ProductionInformation
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 5:
        return (
          <SubcontractorInformation
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 6:
        return (
          <CurrentCertifications
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 7:
        return (
          <OtherInformation formData={formData} handleChange={handleChange} />
        );
      case 8:
        return (
          <BestPractices formData={formData} handleChange={handleChange} />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Grid container>
      <Grid item xs={1}>
        <LeftSideNavbar activeStep={activeStep} setActiveStep={setActiveStep} />
      </Grid>
      <Grid item xs={11}>
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
            <Box sx={{ p: 4 }}>{getStepContent(activeStep)}</Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 2,
                mx: 4,
              }}
            >
              <Button
                disabled={activeStep === 0}
                variant="outlined"
                startIcon={<NavigateBeforeIcon />}
                onClick={handleBack}
                sx={{
                  width: "111px",
                  height: "36px",
                  padding: "8px 12px",
                  gap: "4px",
                  borderRadius: "8px",
                  border: "1px solid #D0D5DD",
                  backgroundColor: "white",
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: "white",
                    color: "text.primary",
                    fontWeight: "bold",
                  },
                  textTransform: "none",
                }}
              >
                Back
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  endIcon={<NavigateNextIcon />}
                  onClick={handleNext}
                  sx={{
                    width: "111px",
                    height: "36px",
                    padding: "8px 12px",
                    gap: "4px",
                    borderRadius: "8px",
                    border: "1px solid #D0D5DD",
                    backgroundColor: "white",
                    color: "text.secondary",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "text.primary",
                      fontWeight: "bold",
                    },

                    textTransform: "none",
                  }}
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
