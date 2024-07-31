import React, { useState, useEffect } from "react";
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

const FacilityIssuesCard = () => {
  const issuesData = useSelector(selectFactoryIssuesData);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    setFilteredIssues(issuesData.detailedIssues);
  }, [issuesData]);

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
        p: 3,
        borderRadius: "12px",
        border: "1px solid #EAECF0",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Issues
      </Typography>
      <Divider sx={{ my: "12px" }} />
      <Box sx={{ height: 282, overflow: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ cursor: "default" }}>
              <TableCell
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  borderBottom: "2px solid #3538CD",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Tooltip title="Filter Total Issues" placement="top">
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 16, color: "#8B8D97" }}
                        onClick={() =>
                          setFilteredIssues(issuesData.detailedIssues)
                        }
                      >
                        Total Issues
                      </Typography>
                    </Tooltip>
                    {/* <Button
                      onClick={handleSort}
                      sx={{ color: "#1976d2", p: 0 }}
                      size="small"
                    >
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: 16,
                          textTransform: "none",
                        }}
                      >
                        <span style={{ marginRight: 4 }}>⇅</span> Sort
                      </Typography>
                    </Button> */}
                  </Box>
                  <Box>{issuesData.totalIssues}</Box>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#B42318",
                  borderBottom: "2px solid #3538CD",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onClick={() => handleFilter("zt")}
                >
                  <Tooltip title="Filter ZT" placement="top">
                    <span>ZT</span>
                  </Tooltip>
                  <Box>{issuesData.issuesSummary.zt}</Box>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#FF692E",
                  borderBottom: "2px solid #3538CD",
                  cursor: "pointer",
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
                    <span>Critical</span>
                  </Tooltip>
                  <Box>{issuesData.issuesSummary.critical}</Box>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#EAAA08",
                  borderBottom: "2px solid #3538CD",

                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onClick={() => handleFilter("major")}
                >
                  <Tooltip title="Filter Major" placement="top">
                    <span>Major</span>
                  </Tooltip>
                  <Box>{issuesData.issuesSummary.major}</Box>
                </Box>
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#667085",
                  borderBottom: "2px solid #3538CD",

                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onClick={() => handleFilter("minor")}
                >
                  <Tooltip title="Filter Minor" placement="top">
                    <span>Minor</span>
                  </Tooltip>
                  <Box>{issuesData.issuesSummary.minor}</Box>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIssues.map((issue, index) => (
              <TableRow key={index} sx={{ cursor: "default" }}>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                    maxWidth: "90px",
                    pr: 0,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "normal",
                    cursor: "default",
                    borderBottom: "none",
                  }}
                >
                  {issue.category.length > 20 ? (
                    <Tooltip title={issue.category} placement="top">
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
                    color: issue.zt ? "#B42318" : "#45464E",
                    borderBottom: "none",
                  }}
                >
                  {issue.zt}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: issue.critical ? "#FF692E" : "#45464E",
                    borderBottom: "none",
                  }}
                >
                  {issue.critical}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: issue.major ? "#EAAA08" : "#45464E",
                    borderBottom: "none",
                  }}
                >
                  {issue.major}
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: issue.minor ? "#667085" : "#45464E",
                    borderBottom: "none",
                  }}
                >
                  {issue.minor}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default FacilityIssuesCard;
