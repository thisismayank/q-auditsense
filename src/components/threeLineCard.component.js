import React from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";

const redColor = "#B42318";
const yellowColor = "#FDB022";
const orangeColor = "#FF692E";
const ThreeLineCard = ({ title, details }) => {
  const getValueColor = (key, value) => {
    switch (key) {
      case "pastDue":
        return value > 0 ? redColor : "#45464E";
      case "openDue":
        return value > 0 ? yellowColor : "#45464E";
      case "zt":
        return value > 0 ? redColor : "#45464E";
      case "critical":
        return value > 0 ? orangeColor : "#45464E";
      case "in30":
        return value > 0 ? yellowColor : "#45464E";
      default:
        return "#45464E";
    }
  };

  return (
    <Card
      variant="outlined"
      style={{
        marginBottom: 24,
        borderRadius: 7,
        border: "1px solid var(--Gray-300, #D0D5DD)",
        background: "#FFF",
        boxShadow:
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
        minHeight: 182,
      }}
    >
      <CardContent style={{ padding: "16px 32px" }}>
        {title && (
          <Typography
            sx={{
              color: "#344054",
              fontSize: "18px",
              fontWeight: 700,
              py: "12px",
            }}
          >
            {title}
          </Typography>
        )}
        <Divider />

        {details.map((data, index) => (
          <Box key={index} sx={{ py: "12px" }}>
            <Typography
              sx={{
                color: "#8B8D97",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {data.title}
            </Typography>

            <Typography
              sx={{
                color: getValueColor(data.key, data.value),
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              {data.value == null || data.value == "-" ? "-" : data.value}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default ThreeLineCard;
