import React from "react";
import { Chip } from "@mui/material";

const severityColorMap = {
  ZT: {
    border: "1px solid rgba(0, 0, 0, 0.40)",
    background: "#B423181A",
    color: "#B42318",
  },
  Critical: {
    border: "1px solid rgba(180, 35, 24, 0.30)",
    background: "#FF692E1A",
    color: "#FF692E",
  },
  Major: {
    border: "1px solid rgba(255, 105, 46, 0.30)",
    background: "#EAAA081A",
    color: "#EAAA08",
  },
  Moderate: {
    border: "1px solid rgba(234, 170, 8, 0.30)",
    background: "#6670851A",
    color: "#667085",
  },
  Minor: {
    border: "1px solid #D0D5DD",
    background: "#6670851A",
    color: "#667085",
  },
  "CAP-Open-PastDue": {
    border: "1px solid rgba(180, 35, 24, 0.30)",
    background: "rgba(180, 35, 24, 0.10)",
    color: "#B42318",
  },
  "CAP-Open-DueInLessThan30Days": {
    border: "1px solid rgba(234, 170, 8, 0.30)",
    background: "rgba(234, 170, 8, 0.10)",
    color: "#EAAA08",
  },
  "CAP-Open-DueInMoreThan30Days": {
    border: "1px solid #D0D5DD",
    background: "#FFF",
    color: "#344054",
  },
  "CAP-Closed": {
    border: "1px solid rgba(59, 124, 15, 0.30)",
    background: "rgba(59, 124, 15, 0.10)",
    color: "#3B7C0F",
  },
  "CAP-NotRequired": {
    border: "1px solid #D0D5DD",
    background: "#FFF",
    color: "#344054",
  },
  default: {
    border: "1px solid #D0D5DD",
    background: "#FFF",
    color: "#344054",
  },
};

const CustomChipLabel = ({ severity, cap, capLabel }) => {
  const styling = severity ? severityColorMap[severity] : severityColorMap[cap];
  const label = severity ? severity : capLabel;

  return (
    <Chip
      label={label}
      sx={{
        ...styling,
        fontSize: "14px",
        fontWeight: 500,
        textAlign: "center",
        borderRadius: "6px",
        padding: "4px 10px",
      }}
    />
  );
};

export default CustomChipLabel;
