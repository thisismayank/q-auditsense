import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  InputAdornment,
  Box,
  Chip,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import {
  selectChartTypes,
  selectSelectedChartType,
} from "../../selectors/risk.selector";
import { setSelectedChartType } from "../../reducers/risk.reducer";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      color: "#344054",
      fontSize: "14px",
      borderRadius: "12px",
    },
  },
};
const RiskDropDown = () => {
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState([]);

  const chartTypes = useSelector(selectChartTypes);
  const selectedChartType = useSelector(selectSelectedChartType);

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const [chartType, setChartType] = React.useState([]);
  const handleChartTypeChange = (event) => {
    dispatch(setSelectedChartType(event.target.value));
  };

  const [dataRange, setDataRange] = React.useState([]);
  const handleDataRangeChange = (event) => {
    setDataRange(event.target.value);
  };

  return (
    <Grid container justifyContent={"space-between"}>
      <Grid item>
        <FormControl
          sx={{ mb: 2, minWidth: 140, color: "#344054", fontSize: "14px" }}
          size="small"
        >
          <InputLabel id="demo-simple-select-label">Data View</InputLabel>
          <Select
            value={selectedChartType}
            label="Chart Type"
            onChange={handleChartTypeChange}
            sx={{
              borderRadius: "12px",
              border: "1px solid var(--Gray-200, #EAECF0)",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              color: "#344054",
              fontSize: "14px",
              "& .MuiOutlinedInput-input": {
                paddingLeft: "16px", // Increase padding to make room for the icon
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
            }}
            MenuProps={MenuProps}
          >
            {chartTypes.map((chartType, index) => (
              <MenuItem value={chartType}>
                <ListItemText
                  primary={chartType}
                  primaryTypographyProps={{
                    style: { color: "#344054", fontSize: "14px" },
                  }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Grid container>
          <Grid item>
            <FormControl
              sx={{ mb: 2, minWidth: 100, color: "#344054", fontSize: "14px" }}
              size="small"
            >
              <InputLabel
                shrink={true}
                sx={{
                  color: "#344054",
                  fontSize: "14px",
                  // position: "relative",
                  left: "32px", // Adjust this value to better align the label next to the icon
                  top: "0px", // Adjust top to vertically center it when not shrunk
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    transform: "translate(0, -1.5rem) scale(0)",
                  },
                }}
              >
                Filters
              </InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleFilterChange}
                input={<OutlinedInput notched={false} label="Filters" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                IconComponent={() => null}
                MenuProps={MenuProps}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid var(--Gray-200, #EAECF0)",
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: "#344054",
                  fontSize: "14px",
                  "& .MuiOutlinedInput-input": {
                    paddingLeft: "16px", // Increase padding to make room for the icon
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <img
                      src="/filter.svg"
                      alt="filter icon"
                      sx={{ color: "#344054", position: "absolute", left: 8 }}
                    />
                  </InputAdornment>
                }
              >
                {[1, 2]?.length > 0 &&
                  ["Bar Chart", "Scatter Chart"].map((audit, index) => (
                    <MenuItem key={index} value={audit}>
                      <ListItemText
                        primary={audit}
                        primaryTypographyProps={{
                          style: { color: "#344054", fontSize: "14px" },
                        }}
                      />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl
              sx={{
                mb: 2,
                minWidth: 150,
                color: "#344054",
                fontSize: "14px",
                ml: 2,
              }}
              size="small"
            >
              <InputLabel id="demo-simple-select-label">Data Range</InputLabel>
              <Select
                value={dataRange}
                label="Data Range"
                onChange={handleDataRangeChange}
                MenuProps={MenuProps}
                sx={{
                  borderRadius: "12px",
                  border: "1px solid var(--Gray-200, #EAECF0)",
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                  color: "#344054",
                  fontSize: "14px",
                  "& .MuiOutlinedInput-input": {
                    paddingLeft: "16px", // Increase padding to make room for the icon
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent",
                  },
                }}
              >
                {["Bar Chart", "Scatter Plot", "Table"].map((audit, index) => (
                  <MenuItem value={index}>
                    <ListItemText
                      primary={audit}
                      primaryTypographyProps={{
                        style: { color: "#344054", fontSize: "14px" },
                      }}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RiskDropDown;
