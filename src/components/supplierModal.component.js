import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import { CopyAll } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectOrganisationId } from "../selectors/login.selector";

const SupplierModal = ({ open, handleClose }) => {
  const [supplierName, setSupplierName] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  useEffect(() => {
    setSupplierName("");
    setGeneratedLink("");
  }, [open]);

  useEffect(() => {
    if (supplierName === "") {
      setGeneratedLink("");
    }
  }, [supplierName]);
  const organisationId = useSelector(selectOrganisationId);
  const generateUniqueIdentifier = () => {
    return `org-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleGenerateLink = () => {
    const uniqueIdentifier = generateUniqueIdentifier();
    let link = `http://localhost:8000/${organisationId.substring(18)}`;
    if (supplierName !== "") {
      link = `${link}?supplier=${supplierName}`;
    }
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink).then(() => {
      alert("Link copied to clipboard");
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,

          p: 4,
          boxShadow:
            "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

          border: "1px solid rgba(234, 236, 240, 1)",
          borderRadius: "12px",
          py: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Add Supplier
        </Typography>
        <TextField
          label="Supplier Name"
          fullWidth
          value={supplierName}
          onChange={(e) => setSupplierName(e.target.value)}
          sx={{ mb: 2 }}
        />
        {generatedLink !== "" && (
          <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {generatedLink}
            </Typography>
            <Tooltip title="Copy link">
              <IconButton onClick={handleCopyLink} size="small">
                <CopyAll />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        {!generatedLink && (
          <Button
            variant="contained"
            onClick={handleGenerateLink}
            sx={{
              backgroundColor: "#6172F3",
              color: "white",
              "&:hover": {
                backgroundColor: "#5667e2",
                fontWeight: "bold",
              },
              textTransform: "none",
              width: "120px",
              height: "40px",
              borderRadius: "8px",
              mr: 2,
            }}
            size="small"
          >
            Generate Link
          </Button>
        )}

        <Button
          variant="contained"
          onClick={handleClose}
          sx={{
            backgroundColor: "grey",
            color: "white",
            "&:hover": {
              backgroundColor: "black",
              fontWeight: "bold",
            },
            textTransform: "none",
            width: "120px",
            height: "40px",
            borderRadius: "8px",
          }}
          size="small"
        >
          Close
        </Button>
      </Card>
    </Modal>
  );
};

export default SupplierModal;
