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
import moment from "moment";
import { getAuditById, getListOfAllAudits } from "../reducers/audit.reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuditList,
  selectAuditListForFactory,
} from "../selectors/audit.selector";
import { selectFactoryList } from "../selectors/factory.selector";
import { getListOfAllFactories } from "../reducers/factory.reducer";

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

const AuditList = ({ selectAudits }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState([]);

  const selectFactories = useSelector(selectFactoryList);

  // useEffect(() => {
  //   if (selectFactories.length === 0) {
  //     dispatch(getListOfAllFactories());
  //   }
  // }, [selectFactories]);
  const factoryIdToFactoryName = selectFactories.reduce((acc, factory) => {
    acc[factory.factoryId] = factory.name;
    return acc;
  }, {});

  //   const handleChange = (event) => {
  //     setFacility(event.target.value);
  //   };

  const handleFilterChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };
  const handleNaivgationToAuditDetails = (factoryId, auditId) => {
    dispatch(
      getAuditById({
        supplierId: params.supplierId,
        factoryId: factoryId,
        auditId: auditId,
      })
    );
    navigate(`${location.pathname}/audit/${auditId}`);
  };
  return (
    <>
      {/* DROPDOWN CODE */}
      {/* <FormControl
        sx={{
          mb: 2,
          p: 0,
          mr: 2,
          minWidth: 100,
          color: "#344054",
          fontSize: "14px",
        }}
        size="small"
      >
        <InputLabel sx={{ color: "#344054", fontSize: "14px" }}>
          Facility
        </InputLabel>
        <Select
          value={facility}
          onChange={handleChange}
          autoWidth
          label="Facility"
          sx={{
            p: 0,
            borderRadius: "12px",
            border: "1px solid var(--Gray-200, #EAECF0)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            color: "#344054",
            fontSize: "14px",
          }}
          MenuProps={MenuProps}
        >
          <MenuItem sx={{ color: "#344054", fontSize: "14px" }} value="">
            <em>None</em>
          </MenuItem>
          {facilities.map((facility) => (
            <MenuItem
              sx={{ color: "#344054", fontSize: "14px" }}
              value={facility.id}
            >
              {facility.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {/* FILTERS CODE */}
      <FormControl
        sx={{ mb: 2, minWidth: 100, color: "#344054", fontSize: "14px" }}
        size="small"
      >
        <InputLabel
          shrink={personName.length > 0}
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
          {selectAudits?.length > 0 &&
            selectAudits.map((audit) => (
              <MenuItem
                key={audit.auditId}
                value={factoryIdToFactoryName[audit.factoryId]}
              >
                <Checkbox
                  checked={
                    personName.indexOf(
                      factoryIdToFactoryName[audit.factoryId]
                    ) > -1
                  }
                  sx={{ color: "#344054" }}
                />
                <ListItemText
                  primary={factoryIdToFactoryName[audit.factoryId]}
                  primaryTypographyProps={{
                    style: { color: "#344054", fontSize: "14px" },
                  }}
                />
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      {selectAudits?.length > 0 &&
        selectAudits.map((audit) => (
          <Card
            variant="outlined"
            sx={{
              // px: 2,
              py: 1,
              borderRadius: "12px",
              border: "1px solid var(--Gray-200, #EAECF0)",
              boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
              mb: 4,
              // mx: 2,
              cursor: "pointer",
            }}
            key={audit.auditId}
            onClick={() =>
              handleNaivgationToAuditDetails(audit.factoryId, audit.auditId)
            }
          >
            <CardContent>
              <Grid
                container
                spacing={0}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Grid item xs={1}>
                  <Typography
                    sx={{
                      color: "#3538CD",
                      fontSize: "18px",
                      fontWeight: 600,
                    }}
                  >
                    {audit.year}
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#000",
                      display: "inline-block",
                      mr: 2,
                    }}
                  >
                    {factoryIdToFactoryName[audit.factoryId]}
                  </Typography>

                  <Grid container spacing={0} sx={{ marginTop: 2 }}>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#8B8D97",
                          mb: "4px",
                        }}
                      >
                        Latest Audit Date
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                      >
                        {moment(audit.lastAuditDate).format("MMM. DD, YYYY")}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#8B8D97",
                          mb: "4px",
                        }}
                      >
                        Audit Type
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                      >
                        {audit.auditType}
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#8B8D97",
                          mb: "4px",
                        }}
                      >
                        High, Medium, Low
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                      >
                        {audit?.high || "-"}, {audit?.medium || "-"},{" "}
                        {audit?.low || "-"}
                      </Typography>
                    </Grid>

                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#8B8D97",
                          mb: "4px",
                        }}
                      >
                        Open CAP
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                      >
                        {!audit.openCAP
                          ? "No"
                          : audit.openCAP == "0"
                          ? "No"
                          : "Yes"}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#8B8D97",
                          mb: "4px",
                        }}
                      >
                        Past Due CAP
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 16, color: "#45464E" }}
                      >
                        {!audit.pastDueCAP
                          ? "No"
                          : audit.pastDueCAP == "0"
                          ? "No"
                          : "Yes"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default AuditList;
