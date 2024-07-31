import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
const FactoryRiskCard = ({ title, riskScore, details }) => {
  return (
    <Card
      sx={
        title
          ? {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              mb: 2,
              padding: "16px 16px",
              borderRadius: "7px",
              border: "1px solid #D0D5DD",
              background: "#FFF",
              boxShadow:
                "0px 1px 3px rgba(16, 24, 40, 0.10), 0px 1px 2px rgba(16, 24, 40, 0.06)",
              // Adjust the width as needed
            }
          : {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              mb: 2,
              padding: "16px 16px",
              borderRadius: "7px",
              boxShadow: "none",
              minHeight: 300,
              overflowY: "hidden",
            }
      }
    >
      {title ? (
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ textAlign: "center", width: "100%" }}
          >
            {title ? title : ""}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 36,
              color: title?.toLowerCase().includes("enhance")
                ? "#F04438"
                : "#667085",
              textAlign: "center",
              width: "100%",
            }}
          >
            {riskScore}
          </Typography>
          <Divider sx={{ width: "100%" }} />

          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              border: "transparent",
              marginTop: "8px",
              padding: 0,
            }}
          >
            <Grid container spacing={2}>
              {details &&
                details.map((detail, index) => {
                  return (
                    <>
                      <Grid item xs={6}>
                        <Table>
                          <TableBody>
                            <TableRow key={`label-${index}`}>
                              <TableCell
                                align="left"
                                sx={{
                                  border: "none",
                                  fontWeight: 500,
                                  fontSize: 16,
                                  pb: 0,
                                  color: "#8B8D97",
                                }}
                              >
                                {detail.label || "-"}
                              </TableCell>
                            </TableRow>
                            <TableRow key={`subvalue-${index}`}>
                              {detail.subLabel && (
                                <TableCell
                                  align="left"
                                  sx={{
                                    border: "none",
                                    fontWeight: 500,
                                    fontSize: 16,
                                    py: 0,
                                  }}
                                >
                                  {detail.subLabel || "-"}
                                </TableCell>
                              )}
                              {detail.value ?? (
                                <TableCell
                                  align="right"
                                  sx={{
                                    border: "none",
                                    fontWeight: 500,
                                    fontSize: 16,
                                  }}
                                >
                                  {detail.value || "-"}
                                </TableCell>
                              )}
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>
                    </>
                  );
                })}
            </Grid>
          </TableContainer>
        </CardContent>
      ) : (
        <Typography></Typography>
      )}
    </Card>
  );
};

export default FactoryRiskCard;
