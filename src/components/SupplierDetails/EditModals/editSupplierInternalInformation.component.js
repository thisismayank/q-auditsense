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
import { updateSupplierData } from "../../../reducers/supplier.reducer";

const SupplierInternalInformationEditModal = ({
  open = false,
  onClose,
  internalData,
}) => {
  const initData = {
    productSupport: getValidData(internalData?.metadata?.productSupport?.name),
    psEmail: getValidData(internalData?.metadata?.productSupport?.email),
    businessUnit: getValidData(internalData?.metadata?.businessUnit),
    tmls: getValidData(internalData?.metadata?.TMLs),
    influence: getValidData(internalData?.metadata?.influence),
    sharedVBU: getValidData(internalData?.metadata?.sharedVBU),
    agreementType: getValidData(internalData?.metadata?.agreementType),
    cmaConnection: getValidData(internalData?.metadata?.cmaConnection),
  };
  const [formData, setFormData] = useState(initData);
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setInitialData(initData);
    setFormData(initData);
  }, [internalData]);

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
        updateSupplierData({
          supplierId: internalData?._id,
          changes,
        })
      );
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          p: 4,
          boxShadow:
            "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

          border: "1px solid rgba(234, 236, 240, 1)",
          borderRadius: "12px",
          py: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              fontSize: 16,
              color: "#344054",
              display: "inline-block",
            }}
          >
            Edit Supplier Internal Information
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {Object.keys(initData).map((field, index) => (
              <Grid item xs={12} sm={3} key={index}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, " $1").trim()}
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              type="button"
              onClick={onClose}
              sx={{
                mr: 2,
                borderRadius: "8px",
                textTransform: "none",
                color: "#585aeb",
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#585aeb",
                borderRadius: "8px",
                textTransform: "none",
              }}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Card>
    </Modal>
  );
};

export default SupplierInternalInformationEditModal;
