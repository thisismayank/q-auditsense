import React, { useCallback, useState, useEffect } from "react";

import {
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  TextField,
  Paper,
  Tooltip,
} from "@mui/material";
import CustomChipLabel from "./customChipLabel.component";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuditIssueDetails,
  selectSelectedAuditIssueId,
} from "../../selectors/audit.selector";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { getValidData } from "../../utils/lib";
import { debounce } from "lodash";
import {
  selectAutoSaveTimer,
  selectSaveStatus,
} from "../../selectors/misc.selector";
import { saveStatus, setSaveStatus } from "../../reducers/misc.reducer";
import { useParams } from "react-router-dom";
import { updateAuditData } from "../../reducers/audit.reducer";
import { CheckCircleOutline } from "@mui/icons-material";

const RecommendationsList = ({ title, items }) => (
  <Paper elevation={0} sx={{ mb: 2, p: 2 }}>
    <Typography
      sx={{
        color: "#475467",
        fontSize: "16px",
        fontWeight: 700,
      }}
    >
      {title}
    </Typography>
    <List dense>
      {items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemText
            primary={
              <Typography
                sx={{
                  color: "var(--text-primary, rgba(0, 0, 0, 0.90))",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {item}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  </Paper>
);

const AiGeneratedField = ({ label, children }) => (
  <Box>
    <Typography
      sx={{
        color: "#475467",
        fontSize: "16px",
        fontWeight: 700,
        mb: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      {label}
      <Tooltip title="Generated by AI">
        <AutoAwesomeIcon sx={{ fontSize: 16, ml: 0.5, color: "darkgrey" }} />
      </Tooltip>
    </Typography>
    {children}
  </Box>
);

const AuditReport = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const data = useSelector(selectAuditIssueDetails);
  const saveStatus = useSelector(selectSaveStatus);

  const selectedIssueId = useSelector(selectSelectedAuditIssueId);

  const debouncedSaveNote = useCallback(
    debounce((newNote) => {
      dispatch(
        updateAuditData({
          auditId: params?.auditId,
          supplierId: params?.supplierId,
          factoryId: params?.factoryId,
          changes: { capDetailsNote: newNote },
          issueId: selectedIssueId,
        })
      );
    }, 1000),
    []
  );

  useEffect(() => {
    if (saveStatus === "saved") {
      setTimeout(() => dispatch(setSaveStatus("")), 1000);
    }
  }, [saveStatus]);
  const [note, setNote] = useState("");
  useEffect(() => {
    setNote("");
    setNote(getValidData(data.note));
  }, [selectedIssueId]);
  const handleNoteChange = (event) => {
    const newValue = event.target.value;
    dispatch(setSaveStatus("saving"));
    setNote(newValue);

    debouncedSaveNote(newValue);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ p: 2 }}>
        {/* Header Section */}
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
          {data?.issueTitle || "-"}
        </Typography>

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
              Category
            </Typography>
            <Typography
              sx={{
                color: "#45464E",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              {data?.type || "-"}
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
              {data?.subType || "-"}
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
              Repeat Issue
            </Typography>

            <Chip
              label={data?.repeatedIssue || "-"}
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
              Issue Details
            </Typography>
            <Typography
              sx={{
                color: "#45464E",
                fontSize: "16px",
                fontWeight: 400,
              }}
            >
              {data?.issueDetail || "-"}
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
              {data?.auditCode || "-"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ my: 2 }}>
          <Grid item xs={3}>
            <AiGeneratedField label="Severity">
              <Typography variant="body1" sx={{ color: "error.main" }}>
                <CustomChipLabel severity={data.severity} />
              </Typography>
            </AiGeneratedField>
          </Grid>

          <Grid item xs={3}>
            <AiGeneratedField label="Remediation Timeline">
              <Typography
                sx={{
                  color: "#45464E",
                  fontSize: "16px",
                  fontWeight: 400,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data?.timeline || "-"}
              </Typography>
            </AiGeneratedField>
          </Grid>
          {/* Rating Explanation */}
          <Grid item xs={6}>
            <AiGeneratedField label="Rating Explanation">
              <Typography
                sx={{
                  color: "#45464E",
                  fontSize: "16px",
                  fontWeight: 400,
                }}
              >
                {data?.ratingExplanation || "-"}
              </Typography>
            </AiGeneratedField>
          </Grid>

          {/* Internal Note */}
          <Grid item xs={12}>
            <Typography
              sx={{
                color: "#475467",
                fontSize: "16px",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Internal Note
            </Typography>
            <TextField
              fullWidth
              multiline
              variant="outlined"
              value={note}
              onChange={handleNoteChange}
              helperText={
                saveStatus === "saving" ? (
                  <Typography
                    sx={{
                      color: "error.main",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Saving...
                  </Typography>
                ) : saveStatus === "saved" ? (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{
                        color: "success.main",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      Saved
                    </Typography>
                    <CheckCircleOutline
                      color="success"
                      sx={{ ml: 1 }}
                      fontSize="small"
                    />
                  </Box>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{
                sx: {
                  ml: 0, // Adjust the left margin as needed
                },
              }}
              inputProps={{
                style: {
                  WebkitTextFillColor: "#45464E",
                  color: "#45464E",
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
                mb: 2, // Added margin bottom for spacing
              }}
            >
              CAP Recommendations
            </Typography>
            <AiGeneratedField label="Immediate Corrective Action Plan">
              <RecommendationsList
                title=""
                items={
                  data?.capRecommendations?.immediateCAP
                    ? String(data.capRecommendations.immediateCAP).split("\n")
                    : []
                }
              />
            </AiGeneratedField>
            <AiGeneratedField label="Long Term Preventative Action">
              <RecommendationsList
                title=""
                items={
                  data?.capRecommendations?.longTermPreventativeAction
                    ? String(
                        data.capRecommendations.longTermPreventativeAction
                      ).split("\n")
                    : []
                }
              />
            </AiGeneratedField>
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
              <Grid item xs={8} sx={{ my: 3 }}>
                <Typography
                  sx={{
                    color: "#475467",
                    fontSize: "16px",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Accountable Person
                </Typography>
                <Typography
                  sx={{
                    color: "#45464E",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                >
                  {data?.responsiblePerson || "-"}
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ my: 3 }}>
                <Typography
                  sx={{
                    color: "#475467",
                    fontSize: "16px",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Target Deadline
                </Typography>
                <Typography
                  sx={{
                    color: "#45464E",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                >
                  {data?.targetDeadline || "-"}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              sx={{
                color: "#475467",
                fontSize: "16px",
                fontWeight: 700,
                mb: 1,
              }}
            >
              Immediate Corrective Action Plan
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {data?.immediateCorrectiveActionPlan || "To be filled by site"}
            </Typography>
            <Typography
              sx={{
                color: "#475467",
                fontSize: "16px",
                fontWeight: 700,
                mb: 1,
                mt: 2,
              }}
            >
              Long Term Preventative Action Plan
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(0, 0, 0, 0.6)",
              }}
            >
              {data?.longTermPreventativeActionPlan || "To be filled by site"}
            </Typography>

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
              <Grid item xs={8}>
                <Typography
                  sx={{
                    color: "#475467",
                    fontSize: "16px",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Status
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CustomChipLabel
                    cap={data.statusChipLabel}
                    capLabel={data.status}
                  />
                  <Box sx={{ minWidth: "8px" }}></Box>
                  {data.status &&
                    !data.status.includes("Closed") &&
                    data.timeline && (
                      <CustomChipLabel
                        cap={"default"}
                        capLabel={data.timeline}
                      />
                    )}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    color: "#475467",
                    fontSize: "16px",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Completion Date
                </Typography>
                <Typography
                  sx={{
                    color: "#45464E",
                    fontSize: "16px",
                    fontWeight: 400,
                  }}
                >
                  {data?.completionDate || "-"}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              sx={{
                color: "#475467",
                fontSize: "16px",
                fontWeight: 700,
                mt: 3,
              }}
            >
              Verification Note
            </Typography>
            <Typography
              sx={{
                color: "#45464E",
                fontSize: "16px",
                fontWeight: 400,
                mb: 3,
              }}
            >
              {data?.verificationNote || "-"}
            </Typography>
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
          Last Updated by AuditSense AI
        </Typography>
      </Box>
    </Container>
  );
};

export default AuditReport;