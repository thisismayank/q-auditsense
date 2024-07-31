import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import moment from "moment";

const ListCard = ({ data, type }) => {
  const issuesColorScheme = (status) => {
    switch (status) {
      case "zt":
        return "#B42318";
      case "critical":
        return "#FF692E";
      case "major":
        return "#EAAA08";
      default:
        return "#667085";
    }
  };

  return (
    <Table sx={{ px: 0, mx: 0 }}>
      <TableBody>
        <TableRow sx={{ borderBottom: "none" }}>
          {type === "factory" && (
            <TableCell
              sx={{
                minWidth: "100px",
                borderBottom: "none",
                pl: 0,
                py: 0,
                borderRight: "1px solid rgba(224, 224, 224, 1)",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#8B8D97",
                }}
              >
                Country
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#45464E",
                }}
              >
                {data?.location || "-"}
              </Typography>
            </TableCell>
          )}
          <TableCell
            sx={{
              width: "135px",
              minWidth: "135px",
              borderBottom: "none",
              py: 0,
              pl: type === "factory" ? 2 : 0,
              pr: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#8B8D97",
              }}
            >
              {type === "factory" ? "Last Audit Date" : "Audit Date"}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#45464E",
              }}
            >
              {type === "factory"
                ? data?.lastAuditDate
                  ? moment(data?.lastAuditDate).format("MMM. DD, YYYY")
                  : "-"
                : data?.lastAuditDate
                ? moment(data?.lastAuditDate).format("MMM. DD, YYYY")
                : "-"}
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              width: "165px",
              minWidth: "165px",
              borderBottom: "none",
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              py: 0,
              pr: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#8B8D97",
                px: 0,
              }}
            >
              {type === "factory" ? "Next Audit Due In" : "Audit Type"}
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#45464E",
              }}
              color={issuesColorScheme(data?.status)}
            >
              {type === "factory"
                ? data?.nextReportDate
                  ? `${moment(data?.nextReportDate).diff(
                      moment(),
                      "days"
                    )} Days`
                  : "-"
                : data?.auditType
                ? data?.auditType
                : "-"}
            </Typography>
          </TableCell>
          <TableCell
            sx={{
              width: "120px",
              minWidth: "120px",
              borderBottom: "none",
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              py: 0,
              pr: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#8B8D97",
                px: 0,
              }}
            >
              Audit Rating
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#45464E",
              }}
            >
              {data?.auditScore || "-"}
            </Typography>
          </TableCell>
          <TableCell sx={{ borderBottom: "none", py: 0 }}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#8B8D97",
              }}
            >
              Issues
            </Typography>
            <Box
              variant="outlined"
              sx={{
                borderRadius: "6px",
                border: "1px solid var(--Gray-300, #D0D5DD)",
                padding: "3px 8px",
                color: "#344054",
                fontSize: "12px",
                fontWeight: 500,
                width: "fit-content",
              }}
            >
              {data?.issueDetails?.total ||
                [
                  parseInt(data?.ztCount || 0, 10),
                  parseInt(data?.criticalCount || 0, 10),
                  parseInt(data?.majorCount || 0, 10),
                  parseInt(data?.minorCount || 0, 10),
                ]
                  .reduce((acc, count) => acc + count, 0)
                  .toString() ||
                "-"}
            </Box>
          </TableCell>
          {Object.entries(data.severityCategories).map(
            ([severityCategory, color], index) => (
              <TableCell
                key={index}
                sx={{
                  borderBottom: "none",
                  py: 0,
                  ...(severityCategory === "Minor"
                    ? { borderRight: "1px solid rgba(224, 224, 224, 1)" }
                    : {}),
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  {severityCategory}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color:
                      data.issueDetails[severityCategory] &&
                      (data.issueDetails[severityCategory] !== 0 ||
                        data.issueDetails[severityCategory] !== "0" ||
                        data.issueDetails[severityCategory] !== "-")
                        ? color
                        : "#8B8D97",
                  }}
                >
                  {data.issueDetails[severityCategory] ?? "0"}
                </Typography>
              </TableCell>
            )
          )}
          <TableCell
            sx={{
              minWidth: "120px",
              borderBottom: "none",
              py: 0,
            }}
          >
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#8B8D97",
              }}
            >
              Open CAP
            </Typography>

            <Box
              variant="contained"
              sx={{
                borderRadius: "6px",
                background: "#EAECF0",
                border: "1px solid var(--Gray-300, #D0D5DD)",
                padding: "3px 8px",
                color: issuesColorScheme(data?.status),
                fontSize: "12px",
                fontWeight: 500,
                width: "fit-content",
              }}
            >
              {!data.openCAP ? "No" : data.openCAP == "0" ? "No" : "Yes"}
            </Box>
          </TableCell>

          <TableCell sx={{ minWidth: "150px", borderBottom: "none", py: 0 }}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 16,
                color: "#8B8D97",
              }}
            >
              Past Due CAP
            </Typography>

            <Box
              variant="contained"
              sx={{
                borderRadius: "6px",
                background: "#EAECF0",
                border: "1px solid var(--Gray-300, #D0D5DD)",
                padding: "3px 8px",
                color: issuesColorScheme(data?.status),
                fontSize: "12px",
                fontWeight: 500,
                width: "fit-content",
              }}
            >
              {/* // TODO: Remove hardcoded stuff */}
              {!data.pastDueCAP ? "No" : data.pastDueCAP == "0" ? "No" : "Yes"}
            </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
export default ListCard;
