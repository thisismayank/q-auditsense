import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Switch,
  Grid,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HistoryIcon from "@mui/icons-material/History";
import EditToggleSwitch from "../editToggleSwitch.component";
import EditAuditReportToggleSwitch from "./editAuditReportToggleSwitch.component";

const AuditReportDetailsAppbar = ({ handleDrawerClose }) => {
  const [type, setType] = useState("");
  const [findingCategory, setFindingCategory] = useState("");
  const [capStatus, setCapStatus] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <AppBar
      color="inherit"
      position="static"
      sx={{
        textAlign: "center",
        fontSize: "16px",
        fontWeight: 500,
        borderBottom: "1px solid #E0E0E0",
      }}
      elevation={0}
    >
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ alignItems: "flex-start", display: "flex" }}
              onClick={handleDrawerClose}
            >
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                flexGrow: 1,
                textAlign: "center",

                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Audit Review and CAP management
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {/* <EditAuditReportToggleSwitch /> */}
            {/* <Button
              color="inherit"
              startIcon={<OpenInNewRoundedIcon />}
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                color: "#475467",
                fontSize: "14px",
                fontWeight: 600,
              }}
              disabled
            >
              <Typography variant="body2">View Audit Report</Typography>
            </Button> */}

            {/* <Button
              color="inherit"
              startIcon={<HistoryIcon />}
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "none",
                color: "#475467",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "not-allowed",
              }}
              disabled={true}
            >
              <Typography variant="body2">Version History</Typography>
            </Button> */}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AuditReportDetailsAppbar;
