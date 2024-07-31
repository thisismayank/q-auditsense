import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectFactoryData } from "../../selectors/factory.selector";
import { selectAuditData } from "../../selectors/audit.selector";
import { getFactoryById } from "../../reducers/factory.reducer";
import { useParams } from "react-router-dom";
import moment from "moment";
import AuditInformationEditModal from "./EditModals/editAuditInformation.component";
import { selectEditModeState } from "../../selectors/misc.selector";
import EditIcon from "@mui/icons-material/Edit";

const AuditInformation = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const selectedAuditData = useSelector(selectAuditData);
  const selectedFactoryData = useSelector(selectFactoryData);
  const [factoryData, setFactoryData] = useState(selectedFactoryData);
  const [isEditingInternal, setIsEditingInternal] = useState(false);

  const editMode = useSelector(selectEditModeState);

  useEffect(() => {
    if (
      selectedAuditData &&
      ((selectedFactoryData?._id &&
        selectedAuditData?.factoryId !== selectedFactoryData?._id) ||
        !selectedFactoryData)
    ) {
      dispatch(
        getFactoryById({
          supplierId: params.supplierId,
          factoryId: selectedAuditData.factoryId,
        })
      );
    }
    setFactoryData(selectedFactoryData);
  }, [selectedFactoryData, selectedAuditData]);

  const toggleEditInternal = () => {
    setIsEditingInternal(!isEditingInternal);
  };

  return (
    factoryData &&
    (!editMode ? (
      <Box sx={{ px: 2, my: 1, py: 2 }}>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          sx={{ mb: 2, px: 4 }}
        >
          <Grid item>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 15,
                color: "#344054",
                display: "inline-block",
              }}
            >
              Audit Information
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

        {/* Company Address */}
        <Grid container spacing={2} sx={{ mb: 2, px: 4 }}>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Audit Scheme
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.auditType || "-"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Audit Start Date
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.auditStartDate
                ? moment(selectedAuditData.metadata.auditStartDate).format(
                    "MM/DD/YYYY"
                  )
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              End Date (Length)
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.auditEndDate
                ? `${moment(selectedAuditData.metadata.auditEndDate).format(
                    "MM/DD/YYYY"
                  )} (${selectedAuditData.metadata.auditLength} days)`
                : "-"}
            </Typography>
          </Grid>
        </Grid>
        {/* Company information */}
        <Grid container spacing={2} sx={{ mb: 2, px: 4 }}>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Audit Scheduler
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.auditScheduler || "-"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Audit Funder
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.auditFunder || "-"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Auditor Firm
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.auditFirm || "-"}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mb: 2, px: 4 }}>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Auditor Name
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.auditor || "-"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Language (Management)
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.primaryLanguage ?? "-"}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#8B8D97",
              }}
            >
              Language (Workers)
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: 15,
                color: "#344054",
              }}
            >
              {selectedAuditData?.metadata?.workersLanguage ?? "-"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    ) : (
      <AuditInformationEditModal
        open={isEditingInternal}
        onClose={() => setIsEditingInternal(false)}
        factoryData={selectedFactoryData}
        auditData={selectedAuditData}
      />
    ))
  );
};

export default AuditInformation;
