import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { selectAdditionalFactoryInformation } from "../../selectors/factory.selector";
import { useSelector } from "react-redux";

const AdditionalFactoryInformation = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  const selectedAdditionalFactoryInformation = useSelector(
    selectAdditionalFactoryInformation
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
        px: 3,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="bold">
            Additional Site Information
          </Typography>
          <Button onClick={handleToggleExpand} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </Button>
        </Box>
        {expanded && (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={3}>
              <Box
                display="flex"
                flexDirection="column"
                sx={{ display: "inline-flex" }}
                gap={2}
              >
                {selectedAdditionalFactoryInformation.map((section, index) => (
                  <Box
                    key={index}
                    variant="outlined"
                    sx={{
                      width: "auto",
                      justifyContent: "flex-start",
                      borderRadius: "6px",
                      border: "1px solid #D0D5DD",
                      background: "#FFF",
                      textTransform: "none",
                      fontSize: "14px",
                      fontWeight: 500,
                      display: "flex",
                      padding: "4px 10px",
                      mb: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "3px",
                      color: "#344054",
                      fontFamily: "Inter",
                      fontSize: "14px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "20px",
                      textAlign: "center",
                    }}
                  >
                    {section.heading}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2}>
                {selectedAdditionalFactoryInformation.map(
                  (section, sectionIndex) =>
                    section.values.map((item, itemIndex) => (
                      <Grid item xs={3} key={`${sectionIndex}-${itemIndex}`}>
                        <Typography variant="body2" color="textSecondary">
                          {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.value}
                        </Typography>
                      </Grid>
                    ))
                )}
              </Grid>
            </Grid>
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};

export default AdditionalFactoryInformation;
