import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Divider,
  Tooltip,
  IconButton,
  Button,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import { selectFactoryIssuesData } from "../../selectors/factory.selector";
import { useSelector } from "react-redux";
import { selectAuditIssuesData } from "../../selectors/audit.selector";

const AuditIssuesTable = () => {
  const issuesData = useSelector(selectAuditIssuesData);

  const [filteredIssues, setFilteredIssues] = useState(
    issuesData.detailedIssues || []
  );
  useEffect(() => {
    setFilteredIssues(issuesData.detailedIssues || []);
  }, [issuesData.detailedIssues]);
  const [isSorted, setIsSorted] = useState(false);
  const handleSort = () => {
    const sortedData = [...filteredIssues].sort((a, b) => {
      if (isSorted) {
        return a.category.localeCompare(b.category);
      } else {
        return b.category.localeCompare(a.category);
      }
    });
    setFilteredIssues(sortedData);
    setIsSorted(!isSorted);
  };

  const handleFilter = (key) => {
    const filteredData = issuesData.detailedIssues.filter(
      (issue) => issue[key] > 0
    );
    setFilteredIssues(filteredData);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        py: 0,
        px: 3,
        borderRadius: "12px",
        border: "1px solid #EAECF0",
      }}
    >
      <Box sx={{ height: 300, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                borderBottom: "2px solid #3538CD",
                cursor: "pointer",
                py: 1.5,
                px: 0,
              }}
            ></TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                borderBottom: "2px solid #3538CD",
                color: "#101828",
                cursor: "pointer",
                py: 1.5,
                px: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 0,
                }}
                onClick={() => handleFilter("total")}
              >
                <Tooltip title="Filter Critical" placement="top">
                  <span>Issues</span>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                borderBottom: "2px solid #3538CD",
                color: "#101828",
                cursor: "pointer",
                py: 1.5,
                px: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleFilter("closed")}
              >
                <Tooltip title="Filter Critical" placement="top">
                  <span>Closed</span>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                borderBottom: "2px solid #3538CD",
                color: "#101828",
                cursor: "pointer",
                py: 1.5,
                px: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleFilter("critical")}
              >
                <Tooltip title="Filter Critical" placement="top">
                  <span>Open</span>
                </Tooltip>
              </Box>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#101828",
                borderBottom: "2px solid #3538CD",
                cursor: "pointer",
                py: 1.5,
                px: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleFilter("pastDue")}
              >
                <Tooltip title="Filter Critical" placement="top">
                  <span>(Past Due)</span>
                </Tooltip>
              </Box>
            </TableCell>
          </TableHead>
          <TableRow sx={{ cursor: "default" }}>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                borderBottom: "2px solid #3538CD",
                color: "#101828",
                cursor: "pointer",
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Tooltip title="Filter  Issues" placement="top">
                    <Typography
                      sx={{ fontWeight: 500, fontSize: 16, color: "#101828" }}
                      onClick={() =>
                        setFilteredIssues(issuesData.detailedIssues)
                      }
                    >
                      Total
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#101828",
                borderBottom: "2px solid #3538CD",
                borderRight: "1px dotted #101828",
                cursor: "pointer",
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleFilter("total")}
              >
                <Box>{issuesData.total}</Box>
              </Box>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#101828",
                borderBottom: "2px solid #3538CD",
                cursor: "pointer",
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleFilter("closed")}
              >
                <Box>{issuesData.issuesSummary.totalClosed}</Box>
              </Box>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#101828",
                borderBottom: "2px solid #3538CD",
                cursor: "pointer",
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleFilter("open")}
              >
                <Box>{issuesData.issuesSummary.open}</Box>
              </Box>
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#101828",
                borderBottom: "2px solid #3538CD",
                cursor: "pointer",
                py: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleFilter("pastDue")}
              >
                <Box>({issuesData.issuesSummary.pastDue})</Box>
              </Box>
            </TableCell>
          </TableRow>

          <TableBody>
            {filteredIssues.map((issue, index) => (
              <TableRow key={index} sx={{ cursor: "default" }}>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: issue.color,
                    maxWidth: "150px",
                    pr: 0,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    cursor: "default",
                    borderBottom: "none",
                    py: 1.5,
                  }}
                >
                  {issue.category.length > 15 ? (
                    <Tooltip
                      title={issue.category}
                      placement="top"
                      sx={{ width: "32px", color: issue.color }}
                    >
                      <span>{issue.category}</span>
                    </Tooltip>
                  ) : (
                    issue.category
                  )}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    borderBottom: "none",
                    borderRight: "1px dotted #101828",
                    py: 1.5,
                  }}
                >
                  {issue.open + issue.totalClosed || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    borderBottom: "none",
                    py: 1.5,
                  }}
                >
                  {issue.totalClosed || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    borderBottom: "none",
                    py: 1.5,
                  }}
                >
                  {issue.open || "-"}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    borderBottom: "none",
                    py: 1.5,
                  }}
                >
                  ({issue.pastDue || "-"})
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default AuditIssuesTable;
