import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import {
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";

const CountrySelector = ({ formData, handleAddress }) => {
  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState();
  const [city, setCity] = useState();

  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
    handleAddress("facilityCountry", country?.name);
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
    handleAddress("facilityState", state?.name);
  }, [state]);

  useEffect(() => {
    handleAddress("facilityCity", city?.name);
  }, [city]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);

  //   useEffect(() => {
  //     handleChange("facilityCountry", country?.name);
  //     handleChange("facilityState", state?.name);
  //     handleChange("facilityCity", city?.name);
  //   }, [country, state, city]);

  return (
    <Box>
      {/* <Typography
        sx={{ fontSize: 14, fontWeight: 600 }}
        color="text.primary"
        gutterBottom
      >
        Country, State and City Selectors
      </Typography> */}
      <Grid
        container
        spacing={2}
        sx={{ bgcolor: "background.paper", borderRadius: 2 }}
      >
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
              label="Country"
            >
              {countryData.map((country) => (
                <MenuItem key={country.isoCode} value={country}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {state && (
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                value={state || ""}
                onChange={(e) => setState(e.target.value)}
                label="State"
              >
                {stateData.map((state) => (
                  <MenuItem key={state.isoCode} value={state}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {city && (
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                value={city || ""}
                onChange={(e) => setCity(e.target.value)}
                label="City"
              >
                {cityData.map((city) => (
                  <MenuItem key={city.name} value={city}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CountrySelector;
