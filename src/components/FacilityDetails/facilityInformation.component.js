import React, { useEffect, useState } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectFactoryData } from "../../selectors/factory.selector";
import { Link, useParams } from "react-router-dom";
import { selectSupplierNameFromId } from "../../selectors/supplier.selector";
import FactoryInformationEditModal from "./EditModals/editFactoryInformation.component";
import { selectEditModeState } from "../../selectors/misc.selector";
import EditIcon from "@mui/icons-material/Edit";

const FacilityInformation = () => {
  const params = useParams();
  const selectedFactoryData = useSelector(selectFactoryData);
  const [factoryData, setFactoryData] = useState(selectedFactoryData);

  const [isEditingInternal, setIsEditingInternal] = useState(false);

  useEffect(() => {
    setFactoryData(selectedFactoryData);
  }, [selectedFactoryData]);

  const editMode = useSelector(selectEditModeState);

  const supplierName = useSelector((state) =>
    selectSupplierNameFromId(state, params.supplierId)
  );

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
                  General Site Information
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
            {/* +++++++++++++++++ */}
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
                  <Link
                    to={`/suppliers/${factoryData.supplierId}`}
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#3538CD",
                      display: "flex",
                      textDecoration: "none",
                    }}
                  >
                    {factoryData?.supplierName || supplierName}
                    <img
                      style={{ paddingLeft: 8 }}
                      src="/ne_arrow.svg"
                      alt="arrow icon"
                    />
                  </Link>
                </Typography>
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
                    Alias
                  </span>{" "}
                  <Typography
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#45464E",
                      display: "flex",
                      textDecoration: "none",
                    }}
                  >
                    {factoryData.metadata?.alias || "-"}
                  </Typography>
                </Typography>
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
                    Site ID:
                  </span>{" "}
                  <span
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      color: "#45464E",
                    }}
                  >
                    {factoryData.metadata?.factoryId || "-"}
                  </span>
                </Typography>
              </Grid>
            </Grid>
            {/* Company Address */}
            <Grid container spacing={1} sx={{ mb: 2 }}>
              <Grid item xs={9}>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#8B8D97",
                  }}
                >
                  {" "}
                  Site Address
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                    wordBreak: "break-word",
                  }}
                >
                  {factoryData.metadata.address}
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
                  {" "}
                  Site Size (ft<sup>2</sup>)
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: "#45464E",
                    wordBreak: "break-word",
                  }}
                >
                  {factoryData?.metadata?.factorySize || "-"}
                </Typography>
              </Grid>
            </Grid>
            {/* Company information */}
            <Grid container spacing={0} justifyContent="space-between">
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
                  {factoryData?.metadata?.contactPerson?.name}
                </Typography>
              </Grid>
              <Grid item xs={2.5}>
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
                  {factoryData.metadata.contactPerson.position}
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
                  {factoryData.metadata.contactPerson.phone}
                </Typography>
              </Grid>
              <Grid item xs={3.5}>
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
                  {factoryData.metadata.contactPerson.email}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        )}
      </Card>
      <FactoryInformationEditModal
        open={isEditingInternal}
        onClose={() => setIsEditingInternal(false)}
        internalData={{ ...selectedFactoryData, supplierName }}
      />
    </>
  );
};

export default FacilityInformation;
