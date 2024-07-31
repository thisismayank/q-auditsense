import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Divider,
} from "@mui/material";

const FactoryActionNeeded = ({ capDetails }) => {
  return (
    <>
      <Typography sx={{ fontWeight: 700, fontSize: 18, color: "#000", my: 3 }}>
        Action Needed
      </Typography>
      {capDetails.length > 0 &&
        capDetails.map((capData) => (
          <Box
            elevation={1}
            sx={{
              py: 2,
              px: 4,
              border: "1px solid #EAECF0",
              borderRadius: "7px",
              border: "1px solid #D0D5DD",
              background: "#FFF",
              boxShadow:
                "box-shadow: 0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
              mb: 4,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {capData.title}
            </Typography>
            <Divider sx={{ my: "10px" }} />
            <Table>
              <TableBody>
                {capData.data.map((cap, index) => (
                  <TableRow key={index} sx={{ pb: "10px" }}>
                    <TableCell sx={{ borderBottom: "none", pl: 0, py: 0 }}>
                      <Typography
                        sx={{
                          color: "#8B8D97",
                          fontSize: "16px",
                          fontWeight: 500,
                        }}
                      >
                        Status
                      </Typography>
                      <Box
                        sx={{
                          color: cap.key === "past" ? "#FFF" : "#45464E",
                          textTransform: "none",
                          padding: "3px 8px",
                          fontSize: "12px",
                          fontWeight: 500,
                          borderRadius: "6px",
                          border: "1px solid #D0D5DD",
                          background:
                            cap.key === "past" ? "#DC6803" : "#EAECF0",
                          width: "fit-content",
                        }}
                      >
                        {cap.status}
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#8B8D97",
                        fontSize: "16px",
                        fontWeight: 500,
                        borderBottom: "none",
                        pb: 0,
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 14, color: "#8B8D97" }}
                      >
                        Due Date
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 14, color: "#45464E" }}
                      >
                        {cap.dueDate}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#8B8D97",
                        fontSize: "16px",
                        fontWeight: 500,
                        borderBottom: "none",
                        pb: 0,
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 14, color: "#8B8D97" }}
                      >
                       Issues 
                      </Typography>
                      <Typography
                        sx={{ fontWeight: 500, fontSize: 14, color: "#45464E" }}
                      >
                        {cap.findings}
                      </Typography>
                    </TableCell>
                    {/* <TableCell sx={{ borderBottom: "none", pl: 0, py: 1 }}>
                <Button
                  variant="text"
                  sx={{ color: "#1976d2", textTransform: "none" }}
                >
                  Details
                </Button>
              </TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        ))}
    </>
  );
};

// Example usage

export default FactoryActionNeeded;
