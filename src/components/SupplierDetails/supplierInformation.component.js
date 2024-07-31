import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSupplierData } from "../../selectors/supplier.selector";
import SupplierInformationEditModal from "./EditModals/editSupplierInformation.component";
import EditIcon from "@mui/icons-material/Edit";
import { selectEditModeState } from "../../selectors/misc.selector";

const SupplierInformation = () => {
  const supplierData = useSelector(selectSupplierData);

  // const [supplierData, setSupplierData] = useState(selectedSupplierData);
  // useEffect(() => {
  //   setSupplierData(selectedSupplierData);
  // }, [selectedSupplierData]);
  const [isEditing, setIsEditing] = useState(false);
  const editMode = useSelector(selectEditModeState);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Card
      style={{
        padding: "0px 32px",
        boxShadow:
          "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

        border: "1px solid rgba(234, 236, 240, 1)",
        borderRadius: "12px",
        minHeight: "262px",
      }}
    >
      <SupplierInformationEditModal
        open={isEditing}
        onClose={() => setIsEditing(false)}
        supplierData={supplierData}
      />

      {supplierData && (
        <CardContent>
          <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
            <Grid item>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#344054",
                  display: "inline-block",
                }}
              >
                General Supplier Information
              </Typography>
              {editMode && (
                <EditIcon
                  fontSize={"2"}
                  sx={{ ml: 1, cursor: "pointer", color: "#585aeb" }}
                  onClick={toggleEdit}
                />
              )}
            </Grid>
            <Grid item>
              <Typography>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  Supplier ID:
                </span>{" "}
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.supplierId}
                </span>
              </Typography>
            </Grid>
          </Grid>
          {/* Company Address */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#8B8D97",
                }}
              >
                {" "}
                Company Address
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#45464E",
                  wordBreak: "break-word",
                }}
              >
                {supplierData?.metadata?.companyAddress}
              </Typography>
            </Grid>
          </Grid>
          {/* Company information */}
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item xs={3}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#8B8D97",
                }}
              >
                Contact Person
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#45464E",
                  wordBreak: "break-word",
                }}
              >
                {supplierData?.metadata?.contactPerson?.name || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#8B8D97",
                }}
              >
                Position
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#45464E",
                  wordBreak: "break-word",
                }}
              >
                {supplierData?.metadata?.contactPerson?.position || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#8B8D97",
                }}
              >
                Phone
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#45464E",
                  wordBreak: "break-word",
                }}
              >
                {supplierData?.metadata?.contactPerson?.phone || "-"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#8B8D97",
                }}
              >
                Email
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  color: "#45464E",
                  wordBreak: "break-word",
                }}
              >
                {supplierData?.metadata?.contactPerson?.email || "-"}
              </Typography>
            </Grid>
          </Grid>

          {/* This part is only to ensure the container is of same height as the confidentialBusinessInformation component */}
          {/* Keeping it like this ensures no hardcoding of the height resulting in better responsive design */}
          {/* <Grid
            container
            spacing={2}
            justifyContent="space-between"
            sx={{ mt: "4px" }}
          >
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}></Grid>
            <Grid item xs={3}>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  visibility: "hidden",
                }}
              >
                ""
              </Typography>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  visibility: "hidden",
                }}
              >
                ""
              </Typography>
            </Grid>
          </Grid> */}
        </CardContent>
      )}
    </Card>
  );
};

export default SupplierInformation;
