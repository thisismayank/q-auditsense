import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  Card,
} from "@mui/material";
import { TextFieldQuestionnaire } from "./style";
import moment from "moment";
import CountrySelector from "./country.component";

const FacilityBasicInformation = ({
  formData,
  handleChange,
  handleAddress,
}) => {
  const formControlLabelStyle = {
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
  };
  return (
    <>
      {/* <Typography sx={{ fontSize: 14, fontWeight: 600, float: "right" }}>
        {moment().format("MMMM Do, YYYY")}
      </Typography> */}

      <Grid container spacing={2} sx={{ mt: 0 }}>
        <Grid item xs={12} sm={6}>
          <TextFieldQuestionnaire>
            <TextField
              label="Vendor Name (English)"
              fullWidth
              value={formData.vendorName}
              onChange={handleChange("vendorName")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldQuestionnaire>
            <TextField
              label="Facility Name (English)"
              fullWidth
              value={formData.facilityName}
              onChange={handleChange("facilityName")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldQuestionnaire>
            <TextField
              label="Facility Legal Name (Local Language, as per Business License)"
              fullWidth
              value={formData.facilityName}
              onChange={handleChange("facilityName")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextFieldQuestionnaire>
            <TextField
              label="Business License #"
              fullWidth
              value={formData.businessLicense}
              onChange={handleChange("businessLicense")}
            />
          </TextFieldQuestionnaire>
        </Grid>

        {formData.facilityCity !== "" &&
          formData.facilityState !== "" &&
          formData.facilityCountry !== "" && (
            <Grid item xs={5}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#8B8D97",
                }}
              >
                Facility Address
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#45464E",
                  wordBreak: "break-word",
                }}
              >
                {formData.facilityAddress}
              </Typography>
            </Grid>
          )}

        {/* <Grid item xs={12} sm={3}>
          <TextFieldQuestionnaire>
            <TextField
              label="City"
              fullWidth
              value={formData.facilityCity}
              onChange={handleChange("facilityCity")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextFieldQuestionnaire>
            <TextField
              label="State/Province"
              fullWidth
              value={formData.facilityState}
              onChange={handleChange("facilityState")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextFieldQuestionnaire>
            <TextField
              label="Country"
              fullWidth
              value={formData.facilityCountry}
              onChange={handleChange("facilityCountry")}
            />
          </TextFieldQuestionnaire>
        </Grid> */}
        <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
          <CountrySelector formData={formData} handleAddress={handleAddress} />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Card
            variant="outlined"
            sx={{
              borderRadius: "12px",
              border: "1px solid #EAECF0",
              background: "#FFF",
              boxShadow:
                "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
              px: 3,
              py: 2,
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={2}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Are Dormitories Present?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="dormitoriesPresent"
                    name="dormitoriesPresent"
                    value={formData.dormitoriesPresent || ""}
                    onChange={handleChange("dormitoriesPresent")}
                  >
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {formData.dormitoriesPresent === "Yes" && (
                <Grid item xs={12} sm={2.5}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">
                      Are Dormitories Offsite/Onsite?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-label="dormitoriesLocation"
                      name="dormitoriesLocation"
                      value={formData.dormitoriesLocation || ""}
                      onChange={handleChange("dormitoriesLocation")}
                    >
                      <FormControlLabel
                        sx={formControlLabelStyle}
                        value="Offsite"
                        control={<Radio />}
                        label="Offsite"
                      />
                      <FormControlLabel
                        sx={formControlLabelStyle}
                        value="Onsite"
                        control={<Radio />}
                        label="Onsite"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              )}
              <Grid item xs={12} sm={2.5}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Are Kitchen / Canteen Present?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="kitchenPresent"
                    name="kitchenPresent"
                    value={formData.kitchenPresent || ""}
                    onChange={handleChange("kitchenPresent")}
                  >
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2.5}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Are there Multiple Tenants?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="multipleTenants"
                    name="multipleTenants"
                    value={formData.multipleTenants || ""}
                    onChange={handleChange("multipleTenants")}
                  >
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={2}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Facility owns building(s)?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="ownsBuildings"
                    name="ownsBuildings"
                    value={formData.ownsBuildings || ""}
                    onChange={handleChange("ownsBuildings")}
                  >
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      sx={formControlLabelStyle}
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextFieldQuestionnaire>
            <TextField
              label="Primary Facility Contact Name"
              fullWidth
              value={formData.primaryFacilityContactName}
              onChange={handleChange("primaryFacilityContactName")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextFieldQuestionnaire>
            <TextField
              label="Email"
              fullWidth
              value={formData.email}
              onChange={handleChange("email")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextFieldQuestionnaire>
            <TextField
              label="Phone Number"
              fullWidth
              value={formData.phoneNumber}
              onChange={handleChange("phoneNumber")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextFieldQuestionnaire>
            <TextField
              label="Social Compliance In Charge Name"
              fullWidth
              value={formData.socialComplianceInChargeName}
              onChange={handleChange("socialComplianceInChargeName")}
            />
          </TextFieldQuestionnaire>
        </Grid>
        {/* Add other fields similarly */}
      </Grid>
    </>
  );
};

export default FacilityBasicInformation;
