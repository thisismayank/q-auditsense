import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListSubheader,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuditIssueCAPData,
  selectAuditIssueCAPDataGroupedByType,
  selectSelectedAuditIssueId,
} from "../../selectors/audit.selector";
import { setSelectedAuditIssueId } from "../../reducers/audit.reducer";
import { selectSaveStatus } from "../../selectors/misc.selector";

const AuditReportLeftSideNavigationBar = () => {
  const dispatch = useDispatch();
  const itemRefs = useRef({});

  const isSomethingUnsaved = useSelector(selectSaveStatus);
  const selectedIssueId = useSelector(selectSelectedAuditIssueId);

  const issuesDataGroupedByType = useSelector(
    selectAuditIssueCAPDataGroupedByType
  );

  const handleIssueSelect = (issueId) => {
    // setSelectedIssueId(issueId);
    if (isSomethingUnsaved === "updated") {
      alert("Are you sure you want to navigate to this issue?");
    } else {
      dispatch(setSelectedAuditIssueId(issueId));
    }
  };

  useEffect(() => {
    if (selectedIssueId && itemRefs.current[selectedIssueId]) {
      itemRefs.current[selectedIssueId].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [selectedIssueId]);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        height: "calc(86vh - 64px)",
        overflowY: "scroll",
        pl: 3,
      }}
    >
      <List component="nav" aria-label="issue categories">
        {Object.entries(issuesDataGroupedByType).map(([type, issues]) => (
          <Box key={type} sx={{ mb: 3 }}>
            <ListSubheader
              sx={{
                color: "#000",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              {type}
            </ListSubheader>
            {issues.map((issue) => (
              <ListItem
                key={issue.id}
                ref={(el) => (itemRefs.current[issue.id] = el)}
              >
                <ListItemText>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color:
                        selectedIssueId === issue.id
                          ? "#303F9F"
                          : "rgba(0, 0, 0, 0.70)",
                      ":hover": {
                        fontSize: "14.1px",
                      },
                      fontSize: "14px",
                      fontWeight: 500,
                      letterSpacing: "0.4px",
                    }}
                    onClick={() => handleIssueSelect(issue.id)}
                  >
                    {issue.issue}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default AuditReportLeftSideNavigationBar;
