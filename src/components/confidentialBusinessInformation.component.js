import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Box } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { useSelector } from "react-redux";
import { selectSupplierConfidentialInformation } from "../selectors/supplier.selector";
import { selectFactoryConfidentialInformation } from "../selectors/factory.selector";

const ConfidentialBusinessInformation = ({
  title,

  confidential,
  type,
}) => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const handleToggleExpand = (index) => {
    setExpandedIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const details = useSelector(
    type === "supplier"
      ? selectSupplierConfidentialInformation
      : selectFactoryConfidentialInformation
  );

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "12px",
        border: "1px solid #EAECF0",
        background: "#FFF",
        boxShadow:
          "0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Grid container spacing={1}>
          {details &&
            details.length > 0 &&
            details.map((detailGroup, groupIndex) =>
              detailGroup.map((detail, detailIndex) => {
                const index = `${groupIndex}-${detailIndex}`;
                const isExpanded = expandedIndexes.includes(index);
                return (
                  <Grid item xs={detail.xs} key={index}>
                    <Typography
                      sx={{ color: "#8B8D97", fontSize: 16, fontWeight: 500 }}
                    >
                      {detail.heading}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography
                        noWrap={!isExpanded}
                        sx={{
                          color: "#45464E",
                          fontSize: 16,
                          fontWeight: 500,
                          width: "85%",
                          display: "inline-block",
                        }}
                      >
                        {detail.value}
                      </Typography>
                      {detail?.value?.length > 35 && (
                        <Typography
                          sx={{
                            color: "#3538CD",
                            textDecoration: "underline",
                            display: "inline-block",
                            fontSize: 16,
                            fontWeight: 500,
                            cursor: "pointer",
                          }}
                          onClick={() => handleToggleExpand(index)}
                        >
                          {isExpanded ? "Less" : "More"}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                );
              })
            )}
        </Grid>
        {confidential && (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="right"
            sx={{ mt: type === "factory" ? 3.5 : 1 }}
          >
            <WarningIcon color="warning" sx={{ mr: 1 }} />
            <Typography variant="body2" color="warning.main">
              Do not share externally
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ConfidentialBusinessInformation;
