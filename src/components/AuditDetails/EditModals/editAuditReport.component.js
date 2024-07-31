import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  TextField,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Fab,
  InputLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CustomChipLabel from "./../customChipLabel.component";
import { getValidData } from "../../../utils/lib";
import { updateAuditData } from "../../../reducers/audit.reducer";
// import { selectAuditIssueDetails } from "../../../selectors/audit.selector";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { setSaveStatus } from "../../../reducers/misc.reducer";
const EditAuditReport = ({ data }) => {
  const params = useParams();

  const initData = {
    capDetailsSeverity: getValidData(data?.severity),
    capDetailsTimeline: getValidData(data?.timeline),
    capDetailsRatingExplanation: getValidData(data?.ratingExplanation),
    capDetailsImmediateCAP:
      getValidData(data?.capRecommendations?.immediateCAP) || "",
    capDetailsLongTermPreventativeAction:
      getValidData(data?.capRecommendations?.longTermPreventativeAction) || "",
    capDetailsTargetDeadline: getValidData(data?.targetDeadline),
    capDetailsCompletionDate: getValidData(data?.completionDate),
    capDetailsStatus: getValidData(data?.status),
    capDetailsManufacturerComment: getValidData(data?.manufacturerComment),
    capDetailsVerificationNote: getValidData(data?.verificationNote),
    capDetailsResponsiblePerson: getValidData(data?.responsiblePerson),
    capDetailsNote: getValidData(data?.note),
  };

  const [formData, setFormData] = useState(initData);

  // Store initial data to compare against
  const [initialData, setInitialData] = useState({});
  const [somethingUpdated, setSomethingUpdated] = useState(false);

  useEffect(() => {
    setInitialData(initData);
    setFormData(initData);
  }, [data]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSomethingUpdated(true);
    setFormData({
      ...formData,
      [name]: value,
    });
    dispatch(setSaveStatus("updated"));
  };
  const handleDateChange = (newValue, name) => {
    setSomethingUpdated(true);
    setFormData({
      ...formData,
      [name]: dayjs(newValue).format("YYYY-MM-DD"),
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== initialData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (Object.keys(changes).length > 0) {
      dispatch(
        updateAuditData({
          auditId: params?.auditId,
          supplierId: params?.supplierId,
          factoryId: params?.factoryId,
          changes,
          issueId: data.id,
        })
      );
      dispatch(setSaveStatus(null));
      setSomethingUpdated(null);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 2 }}>
          {/* Header Section */}
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "30px",
                  fontWeight: 500,
                  textDecorationLine: "underline",
                }}
                gutterBottom
              >
                Issue
              </Typography>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "24px",
                  fontWeight: 400,
                  mt: 2,
                  mb: 3,
                }}
              >
                {data.issueTitle}
              </Typography>
            </Grid>
            <Grid>
              <Fab
                variant="extended"
                color="primary"
                type="submit"
                sx={{
                  backgroundColor: "#585aeb",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
                disabled={!somethingUpdated}
              >
                Save Changes
              </Fab>
            </Grid>
          </Grid>

          {/* Details Section */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={3}>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                Type
              </Typography>
              <Typography
                sx={{
                  color: "#45464E",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {data.type}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                Subcategory
              </Typography>
              <Typography
                sx={{
                  color: "#45464E",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {data.subType}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
              >
                Repeated Issue
              </Typography>

              <Chip
                label={data.repeatedIssue}
                sx={{
                  fontSize: "14px",
                  color: "#344054",
                  fontWeight: 500,
                  textAlign: "center",
                  borderRadius: "6px",
                  border: "1px solid #D0D5DD",
                  background: "#FFF",
                  padding: "4px 10px",
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ my: 2 }}>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Issue Detail
              </Typography>
              <Typography
                sx={{
                  color: "#45464E",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {data.issueDetail}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ mb: 2 }}>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "16px",
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                Audit Code or Legal Reference
              </Typography>
              <Typography
                sx={{
                  color: "#45464E",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {data.auditCode}
              </Typography>
            </Grid>
          </Grid>

          {/* Finding Category */}
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={3}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="demo-simple-select-label">Severity</InputLabel>
                <Select
                  label="Severity"
                  name="capDetailsSeverity"
                  value={formData.capDetailsSeverity}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "8px", // Set the border-radius here
                      },
                    },
                  }}
                >
                  <MenuItem value="ZT">ZT</MenuItem>
                  <MenuItem value="Critical">Critical</MenuItem>
                  <MenuItem value="Major">Major</MenuItem>
                  <MenuItem value="Minor">Minor</MenuItem>
                  <MenuItem value="Irrelevant">Irrelevant</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Timeframe */}
            <Grid item xs={2}>
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel id="timeframe">Timeframe</InputLabel>
                <Select
                  label="Timeframe"
                  name="capDetailsTimeline"
                  value={formData.capDetailsTimeline}
                  onChange={handleChange}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderRadius: "8px", // Set the border-radius here
                      },
                    },
                  }}
                >
                  <MenuItem value="Immediate">Immediate</MenuItem>
                  <MenuItem value="30 days">30 days</MenuItem>
                  <MenuItem value="60 days">60 days</MenuItem>
                  <MenuItem value="No timeline">No timeline</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Rating Explanation */}
            <Grid item xs={7}>
              <TextField
                fullWidth
                label="Rating Explanation"
                name="capDetailsRatingExplanation"
                variant="outlined"
                value={formData.capDetailsRatingExplanation} // Use formData here
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "8px", // Set the border-radius here
                    },
                  },
                }}
              />
            </Grid>

            {/* Internal Note */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Internal Note"
                name="capDetailsNote"
                variant="outlined"
                value={formData.capDetailsNote} // Use formData here
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "8px", // Set the border-radius here
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {/* CAP Recommendation Section */}
            <Grid item xs={6}>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "30px",
                  fontWeight: 500,
                  textDecorationLine: "underline",
                }}
              >
                CAP Recommendations
              </Typography>

              <TextField
                fullWidth
                label="Immediate Corrective Action Plan"
                name="capDetailsImmediateCAP"
                variant="outlined"
                value={formData.capDetailsImmediateCAP} // Use formData here
                onChange={handleChange}
                multiline
                maxRows={6}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "8px", // Set the border-radius here
                    },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Long Term Preventative Action"
                name="capDetailsLongTermPreventativeAction"
                variant="outlined"
                value={formData.capDetailsLongTermPreventativeAction} // Use formData here
                onChange={handleChange}
                multiline
                maxRows={6}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "8px", // Set the border-radius here
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "30px",
                  fontWeight: 500,
                  textDecorationLine: "underline",
                }}
              >
                Site Comment
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ my: 3 }}>
                  <TextField
                    fullWidth
                    label="Accountable Person"
                    name="capDetailsResponsiblePerson"
                    variant="outlined"
                    value={formData.capDetailsResponsiblePerson} // Use formData here
                    onChange={handleChange}
                    margin="normal"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderRadius: "8px", // Set the border-radius here
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sx={{ mt: 5 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Target Deadline"
                      value={
                        dayjs(formData.capDetailsTargetDeadline).isValid()
                          ? dayjs(formData.capDetailsTargetDeadline)
                          : null
                      }
                      onChange={(newValue) =>
                        handleDateChange(newValue, "capDetailsTargetDeadline")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              {/* <TextField
                fullWidth
                label="Manufacturer Comment"
                name="capDetailsManufacturerComment"
                variant="outlined"
                value={formData.capDetailsManufacturerComment} // Use formData here
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "8px", // Set the border-radius here
                    },
                  },
                }}
              /> */}

              <Typography
                sx={{
                  color: "#475467",
                  fontSize: "30px",
                  fontWeight: 500,
                  textDecorationLine: "underline",
                  my: 3,
                }}
              >
                CAP Progress
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="status">Status</InputLabel>
                    <Select
                      label="Status"
                      name="capDetailsStatus"
                      value={formData.capDetailsStatus}
                      onChange={handleChange}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "8px", // Set the border-radius here
                          },
                        },
                      }}
                    >
                      <MenuItem value="Open">Open</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Completion Date"
                      value={
                        dayjs(formData.capDetailsCompletionDate).isValid()
                          ? dayjs(formData.capDetailsCompletionDate)
                          : null
                      }
                      onChange={(newValue) =>
                        handleDateChange(newValue, "capDetailsCompletionDate")
                      }
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Verification Note"
                name="capDetailsVerificationNote"
                variant="outlined"
                value={formData.capDetailsVerificationNote} // Use formData here
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "8px", // Set the border-radius here
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
          <Typography
            sx={{
              color: "#000",
              textAlign: "right",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Last Updated by {data.lastUpdatedBy} - {data.lastUpdatedDate}
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default EditAuditReport;
