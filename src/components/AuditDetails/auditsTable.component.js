import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Box,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ErrorIcon from "@mui/icons-material/Error";
import NoteIcon from "@mui/icons-material/Note";
import CustomChipLabel from "./customChipLabel.component";
import AuditReport from "./auditReport.component";
import AuditReportLeftSideNavigationBar from "./auditReportDetailsLeftSideNavigationBar.component";
import AuditReportTabs from "./auditReportTabs.component";
import AuditReportDetails from "../../pages/auditReportDetails.page";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedAuditIssueId } from "../../reducers/audit.reducer";
import { selectAuditIssueCAPData } from "../../selectors/audit.selector";

const AuditsTable = () => {
  const dispatch = useDispatch();
  const handleClick = (id) => {
    dispatch(setSelectedAuditIssueId(id));
  };

  const issuesData = useSelector(selectAuditIssueCAPData);
  return (
    <>
      <Box
        elevation={1}
        sx={{
          p: 3,
          borderRadius: "12px",
          border: "1px solid #EAECF0",
          borderTop: "0px",
        }}
      >
        <Table aria-label="issues table">
          <TableHead>
            <TableRow>
              <TableCell>Issue ID</TableCell>
              <TableCell>Issue</TableCell>
              <TableCell sx={{ width: "12px" }}></TableCell>
              <TableCell sx={{ p: 0 }}>Category</TableCell>
              <TableCell sx={{ p: 0 }}>Severity</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell sx={{ width: "8px" }}>Note</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {issuesData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.id}</TableCell>
                <TableCell
                  sx={{
                    wordBreak: "break-word",
                    mr: 0,
                    pr: 1,
                    maxWidth: "470px",
                  }}
                >
                  {row.issue}
                </TableCell>
                <TableCell
                  sx={{
                    width: "16px",
                    cursor: "pointer",
                    paddingRight: "40px",
                    opacity: 0.5,
                  }}
                  onClick={() => {
                    handleClick(row.id);
                  }}
                >
                  <IconButton
                    sx={{
                      color: "rgba(0, 0, 0, 0.6)",
                      padding: 0,
                      margin: 0,
                      height: "100%",
                      width: "100%",
                    }}
                  >
                    <OpenInFullIcon className="icon" />
                    <Typography variant="caption" sx={{ ml: 1 }}>
                      See detail
                    </Typography>
                  </IconButton>
                </TableCell>
                <TableCell sx={{ p: 0 }}>{row.type}</TableCell>
                <TableCell sx={{ p: 0 }}>
                  <CustomChipLabel severity={row.severity} />
                </TableCell>
                <TableCell>
                  <CustomChipLabel
                    cap={row.statusChipLabel}
                    capLabel={row.status}
                  />
                  {row.status != "Closed" && (
                    <span style={{ marginLeft: 8 }}>{row.timeline}</span>
                  )}
                </TableCell>
                {/* <TableCell sx={{ width: "8px" }}>
                  {row.note && (
                    <Tooltip title="View Note">
                      <IconButton>
                        <NoteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* {selectedIssueId && <AuditReportDetails />} */}
    </>
  );
};

export default AuditsTable;
