import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { getValidData } from "../../../utils/lib";
import { updateSupplierData } from "../../../reducers/supplier.reducer";
// import { updateSupplier } from '../../actions/supplierActions'; // Ensure you have this action

const SupplierInformationEditModal = ({
  open = false,
  onClose,
  supplierData,
}) => {
  const initData = {
    supplierId: getValidData(supplierData?.metadata?.supplierId),
    companyAddress: getValidData(supplierData?.metadata?.companyAddress),
    facilityCount: getValidData(supplierData?.metadata?.facilityCount),
    contactPersonName: getValidData(
      supplierData?.metadata?.contactPerson?.name
    ),
    contactPersonPosition: getValidData(
      supplierData?.metadata?.contactPerson?.position
    ),
    contactPersonPhone: getValidData(
      supplierData?.metadata?.contactPerson?.phone
    ),
    contactPersonEmail: getValidData(
      supplierData?.metadata?.contactPerson?.email
    ),
    productCategories: getValidData(supplierData?.metadata?.productCategories),
    topProduct: getValidData(supplierData?.metadata?.topProduct),
    spend: getValidData(supplierData?.metadata?.spend),
    percentageOfBusinessFrom4imprint: getValidData(
      supplierData?.metadata?.percentageOfBusinessFrom4imprint
    ),
  };
  const [formData, setFormData] = useState(initData);

  // Store initial data to compare against
  const [initialData, setInitialData] = useState({});

  useEffect(() => {
    setInitialData(initData);
    setFormData(initData);
  }, [supplierData]);

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
        updateSupplierData({
          supplierId: supplierData?._id,
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
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Card
                sx={{
                  p: 4,
                  pb: 8,
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
                      id="edit-supplier-modal"
                      variant="h5"
                      sx={{
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#344054",
                        display: "inline-block",
                      }}
                    >
                      Edit General Supplier Information
                    </Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Supplier ID"
                      name="supplierId"
                      variant="outlined"
                      value={formData.supplierId}
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
                      label="Company Address"
                      name="companyAddress"
                      variant="outlined"
                      value={formData.companyAddress}
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
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item xs={5}>
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
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            label="Top Product"
                            name="topProduct"
                            variant="outlined"
                            value={formData.topProduct}
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
                    <Grid item xs={10}>
                      <TextField
                        fullWidth
                        label="Spend"
                        name="spend"
                        variant="outlined"
                        value={formData.spend}
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
                        label="Percentage of business from 4imprint"
                        name="percentageOfBusinessFrom4imprint"
                        variant="outlined"
                        value={formData.percentageOfBusinessFrom4imprint}
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

export default SupplierInformationEditModal;
