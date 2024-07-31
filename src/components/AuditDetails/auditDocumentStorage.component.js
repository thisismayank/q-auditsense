import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { uploadAuditReport } from "../../reducers/audit.reducer";

const files = {
  auditDocuments: [
    "SMETA_2023_12_14.PDF",
    "SMETA_CAP_2023_12_14.PDF",
    "SMETA_CAP_2023_12_14.PDF",
    "SMETA_CAP_2023_12_14.PDF",
  ],
  capEvidence: ["Time Record.excel", "Time clock.png"],
};
const CustomButton = ({ id, label }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => document.getElementById(id).click()}
      sx={{
        color: "#3538CD",
        fontSize: "14px",
        fontWeight: 600,
        padding: "8px 12px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        border: "1px solid #A4BCFD",
        background: "#FFF",
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        height: "fit-content",
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );
};
const AuditDocumentStorage = ({
  organisationId,
  auditId,
  supplierId,
  factoryId,
}) => {
  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      dispatch(
        uploadAuditReport(
          { organisationId, auditId, supplierId, factoryId, file },
          { file }
        )
      );
    }
  };

  const handleDelete = (fileName) => {
    console.log(`Delete ${fileName}`);
    // Implement delete logic here
  };

  const downloadAll = () => {
    console.log("Download all as zip");
    // Implement download all logic here
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <CustomButton
          id="download-all"
          label="Download All as Zip"
          onChange={downloadAll}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Aligns items vertically center
          gap: 2, // Adds gap between items
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 500,
            color: "#000",
            display: "inline-block",
          }}
        >
          Audit Document
        </Typography>

        <Box sx={{ padding: 3 }}>
          <input
            type="file"
            id="file-upload-input"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <CustomButton id="file-upload-input-cap" label="Upload" />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List>
        {files.auditDocuments.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDelete(file)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Box
        sx={{
          display: "flex",
          alignItems: "center", // Aligns items vertically center
          gap: 2,
          mt: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 500,
            color: "#000",
            display: "inline-block",
          }}
        >
          CAP Evidence
        </Typography>
        <Box sx={{ padding: 3 }}>
          <input
            type="file"
            id="file-upload-input-cap"
            style={{ display: "none" }}
            onChange={handleFileSelect}
          />
          <CustomButton id="file-upload-input-cap" label="Upload" />
        </Box>
      </Box>
      <Divider sx={{ my: 2 }} />
      <List>
        {files.capEvidence.map((file, index) => (
          <ListItem key={index}>
            <ListItemText primary={file} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleDelete(file)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AuditDocumentStorage;
