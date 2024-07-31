import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Card,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getValidData } from "../../../utils/lib";
import { updateAuditData } from "../../../reducers/audit.reducer";

const AuditInformationEditModal = ({
  open = false,
  onClose,
  factoryData,
  auditData,
}) => {
  const initData = {
    auditType: getValidData(auditData?.metadata?.auditType),
    auditStartDate: getValidData(auditData?.metadata?.auditStartDate),
    auditEndDate: getValidData(auditData?.metadata?.auditEndDate),
    auditScheduler: getValidData(auditData?.metadata?.auditScheduler),
    auditFunder: getValidData(auditData?.metadata?.auditFunder),
    auditFirm: getValidData(auditData?.metadata?.auditFirm),
    auditor: getValidData(auditData?.auditor),
    primaryLanguage: getValidData(auditData?.metadata?.primaryLanguage),
    workersLanguage: getValidData(auditData?.metadata?.workersLanguage),
  };
  const [formData, setFormData] = useState(initData);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setInitialData(initData);
    setFormData(initData);
  }, [auditData, factoryData]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const changes = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== initialData[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (Object.keys(changes).length > 0) {
      dispatch(
        updateAuditData({
          organisationId: auditData?.organisationId,
          supplierId: auditData?.supplierId,
          factoryId: auditData?.factoryId,
          auditId: auditData?._id,
          changes,
        })
      );
    }
    onClose();
  };

  return (
    <Box sx={{ px: 2, my: 1, py: 2 }}>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent={"space-between"} sx={{ mb: 1 }}>
          <Grid item>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: "#344054",
                display: "inline-block",
              }}
            >
              Edit Audit Information
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#585aeb",
                borderRadius: "8px",
                textTransform: "none",
              }}
              size="small"
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {Object.keys(initData).map((field, index) => (
            <Grid item xs={4} key={index}>
              <TextField
                fullWidth
                label={
                  field === "auditType"
                    ? "Auditor Scheme"
                    : field.replace(/([A-Z])/g, " $1").trim()
                }
                name={field}
                variant="outlined"
                value={formData[field]}
                onChange={handleChange}
                margin="normal"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderRadius: "8px", // Set the border-radius here
                    },
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </form>
    </Box>
  );
};

export default AuditInformationEditModal;
