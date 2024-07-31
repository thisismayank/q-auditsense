import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { selectFactoryData } from "../../selectors/factory.selector";
import { selectEditModeState } from "../../selectors/misc.selector";

import EditIcon from "@mui/icons-material/Edit";
import FactoryInternalInformationEditModal from "./EditModals/editFactoryInternalInformation.component";

const FacilityInternalInformation = () => {
  const selectedFactoryData = useSelector(selectFactoryData);
  const [factoryData, setFactoryData] = useState(selectedFactoryData);
  const [isEditingInternal, setIsEditingInternal] = useState(false);

  const editMode = useSelector(selectEditModeState);

  useEffect(() => {
    setFactoryData(selectedFactoryData);
  }, [selectedFactoryData]);

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
        {factoryData && (
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
            {/* Actual information */}

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={3}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  Product Suppport
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                  }}
                >
                  {factoryData.metadata?.productSupport?.name || "-"}
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
                  {factoryData.metadata?.productSupport?.email || "-"}
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
                  {factoryData?.businessUnit || "-"}
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
                  {factoryData.metadata.tmls}
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
                  {factoryData.metadata?.influence || "-"}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}>
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
                  {factoryData.metadata?.sharedVBU || "-"}
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
                  {factoryData.metadata?.agreementType || "-"}
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
                  {factoryData?.metadata?.cmaConnection || "-"}
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
      <FactoryInternalInformationEditModal
        open={isEditingInternal}
        onClose={() => setIsEditingInternal(false)}
        internalData={selectedFactoryData}
      />
    </>
  );
};

export default FacilityInternalInformation;
