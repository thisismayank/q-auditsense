import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Card,
  Divider,
  CardContent,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getValidData } from "../../../utils/lib";
import { updateFactoryData } from "../../../reducers/factory.reducer";
import { selectSupplierNameFromId } from "../../../selectors/supplier.selector";
// import { updateSupplier } from '../../actions/supplierActions'; // Ensure you have this action

const FactoryInformationEditModal = ({
  open = false,
  onClose,
  internalData,
}) => {
  const initData = {
    factoryId: getValidData(internalData?.metadata?.factoryId),
    alias: getValidData(internalData?.metadata?.alias),
    parentCompany: getValidData(internalData?.metadata?.supplierName),
    supplierId: getValidData(internalData?.metadata?.supplierId),
    address: getValidData(internalData?.metadata?.address),
    contactPersonName: getValidData(
      internalData?.metadata?.contactPerson?.name
    ),
    contactPersonPosition: getValidData(
      internalData?.metadata?.contactPerson?.position
    ),
    contactPersonPhone: getValidData(
      internalData?.metadata?.contactPerson?.phone
    ),
    contactPersonEmail: getValidData(
      internalData?.metadata?.contactPerson?.email
    ),
    productCategories: getValidData(internalData?.metadata?.productCategories),
    productProduced: getValidData(internalData?.metadata?.productProduced),
    note: getValidData(internalData?.metadata?.note),
  };
  const [formData, setFormData] = useState(initData);

  // Store initial data to compare against
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setInitialData(initData);
    setFormData(initData);
  }, [internalData]);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
        updateFactoryData({
          organisationId: internalData?.organisationId,
          supplierId: internalData?.supplierId,
          factoryId: internalData?._id,
          changes,
        })
      );
    }
    onClose();
  };

  const supplierName = useSelector((state) =>
    selectSupplierNameFromId(state, internalData?.supplierId)
  );
  return (
    <Modal open={open} onClose={onClose}>
      <Card
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1300,
          p: 4,

          boxShadow:
            "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

          border: "1px solid rgba(234, 236, 240, 1)",
          borderRadius: "12px",
          py: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card
                sx={{
                  p: 4,
                  boxShadow:
                    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
                  border: "1px solid rgba(234, 236, 240, 1)",
                  borderRadius: "12px",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Grid item>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#344054",
                        display: "inline-block",
                      }}
                    >
                      Edit Site General Information
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  sx={{ mb: 2 }}
                >
                  <Grid item>
                    <Typography>
                      <span
                        style={{
                          fontWeight: 500,
                          fontSize: 16,
                          color: "#8B8D97",
                        }}
                      >
                        Suppliers:
                      </span>{" "}
                      <Typography
                        style={{
                          fontWeight: 600,
                          fontSize: 16,
                          color: "#3538CD",
                          display: "flex",
                          textDecoration: "none",
                        }}
                      >
                        {supplierName}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      label="Alias"
                      name="alias"
                      variant="outlined"
                      value={formData.alias}
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
                  <Grid item>
                    <TextField
                      label="Site ID"
                      name="factoryId"
                      variant="outlined"
                      value={formData.factoryId}
                      onChange={handleChange}
                      margin="normal"
                      disabled
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderRadius: "8px", // Set the border-radius here
                          },
                        },
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Site Address"
                      name="address"
                      variant="outlined"
                      value={formData.address}
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
                </Grid>

                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Contact Person"
                      name="contactPersonName"
                      variant="outlined"
                      value={formData.contactPersonName}
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
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Position"
                      name="contactPersonPosition"
                      variant="outlined"
                      value={formData.contactPersonPosition}
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
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="contactPersonPhone"
                      variant="outlined"
                      value={formData.contactPersonPhone}
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
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="contactPersonEmail"
                      variant="outlined"
                      value={formData.contactPersonEmail}
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
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={4}>
              <Card
                sx={{
                  p: 1,
                  pt: 4,
                  pb: 2,
                  boxShadow:
                    "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
                  border: "1px solid rgba(234, 236, 240, 1)",
                  borderRadius: "12px",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="space-between"
                  sx={{ mb: 2, ml: 2 }}
                >
                  <Grid item>
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#344054",
                        display: "inline-block",
                      }}
                    >
                      Edit Confidential Business Information
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    justifyContent="space-between"
                    sx={{ mt: 0 }}
                  >
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        label="Product Categories"
                        name="productCategories"
                        variant="outlined"
                        value={formData.productCategories}
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
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        label="Products Produced"
                        name="productProduced"
                        variant="outlined"
                        value={formData.productProduced}
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
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        label="4imprint Note"
                        name="note"
                        variant="outlined"
                        value={formData.note}
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
                  </Grid>
                </Grid>
              </Card>
            </Grid>
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

export default FactoryInformationEditModal;
