import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { selectSupplierData } from "../../selectors/supplier.selector";
import SupplierInternalInformationEditModal from "./EditModals/editSupplierInternalInformation.component";
import EditIcon from "@mui/icons-material/Edit";
import { selectEditModeState } from "../../selectors/misc.selector";

const InternalInformation = () => {
  const selectedSupplierData = useSelector(selectSupplierData);
  const [supplierData, setSupplierData] = useState(selectedSupplierData);
  const [isEditingInternal, setIsEditingInternal] = useState(false);
  const editMode = useSelector(selectEditModeState);

  useEffect(() => {
    setSupplierData(selectedSupplierData);
  }, [selectedSupplierData]);
  const toggleEditInternal = () => {
    setIsEditingInternal(!isEditingInternal);
  };
  return (
    <>
      <Card
        style={{
          padding: "0px 32px",
          boxShadow:
            "0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",

          border: "1px solid rgba(234, 236, 240, 1)",
          borderRadius: "12px",
        }}
      >
        {supplierData && (
          <CardContent>
            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              sx={{ mb: 2 }}
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
                  Internal Information
                </Typography>
                {editMode && (
                  <EditIcon
                    fontSize={"2"}
                    sx={{ ml: 1, cursor: "pointer", color: "#585aeb" }}
                    onClick={toggleEditInternal}
                  />
                )}
              </Grid>
            </Grid>

            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  Product Support
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.productSupport?.name || "-"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  PS email
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.productSupport?.email || "-"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  Business Unit
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.businessUnit || "-"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  TMLs
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.TMLs || "-"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  Influence
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.influence || "-"}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              justifyContent="space-between"
              style={{ marginTop: 16 }}
            >
              <Grid item xs={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  Shared VBU
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.sharedVBU || "-"}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  Agreement Type
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.agreementType || "-"}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  CMA connection (for subcontractor)
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {supplierData?.metadata?.cmaConnection || "-"}
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
      <SupplierInternalInformationEditModal
        open={isEditingInternal}
        onClose={() => setIsEditingInternal(false)}
        internalData={selectedSupplierData}
      />
    </>
  );
};

export default InternalInformation;
