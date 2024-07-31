import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  InputAdornment,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Paper,
  Modal,
} from "@mui/material";
import moment from "moment";

import UploadFileIcon from "@mui/icons-material/UploadFile";
import { getAuditById, getListOfAllAudits } from "../../reducers/audit.reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuditList,
  selectAuditListForFactory,
} from "../../selectors/audit.selector";
import { selectFactoryList } from "../../selectors/factory.selector";
import { getListOfAllFactories } from "../../reducers/factory.reducer";
import ListCard from "../listCard.component";
import AuditDocumentDrop from "../AuditDetails/auditDocumentDrop.component";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      color: "#344054",
      fontSize: "14px",
      borderRadius: "12px",
    },
  },
};

const FactoryAuditListCard = ({ selectAudits }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const [personName, setPersonName] = React.useState([]);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = (files) => {
    console.log(files);
    setFiles(files);
    setOpen(false);
  };
  const selectFactories = useSelector(selectFactoryList);
  const organisationId = params.organisationId;
  const supplierId = params.supplierId;
  const factoryId = params.factoryId;
  // useEffect(() => {
  //   if (selectFactories.length === 0) {
  //     dispatch(getListOfAllFactories());
  //   }
  // }, [selectFactories]);
  const factoryIdToFactoryName = selectFactories.reduce((acc, factory) => {
    acc[factory.factoryId] = factory.name;
    return acc;
  }, {});

  //   const handleChange = (event) => {
  //     setaudit(event.target.value);
  //   };
  const issuesColorScheme = (status) => {
    switch (status) {
      case "zt":
        return "#B42318";
      case "critical":
        return "#FF692E";
      case "major":
        return "#EAAA08";
      default:
        return "#667085";
    }
  };

  // const handleFilterChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(typeof value === "string" ? value.split(",") : value);
  // };
  const handleNaivgationToAuditDetails = (factoryId, auditId) => {
    dispatch(
      getAuditById({
        supplierId: params.supplierId,
        factoryId: factoryId,
        auditId: auditId,
      })
    );
    navigate(`${location.pathname}/audit/${auditId}`);
  };
  const handleUploadAudit = () => {};
  return (
    <>
      {/* DROPDOWN CODE */}
      {/* <FormControl
        sx={{
          mb: 2,
          p: 0,
          mr: 2,
          minWidth: 100,
          color: "#344054",
          fontSize: "14px",
        }}
        size="small"
      >
        <InputLabel sx={{ color: "#344054", fontSize: "14px" }}>
          audit
        </InputLabel>
        <Select
          value={audit}
          onChange={handleChange}
          autoWidth
          label="audit"
          sx={{
            p: 0,
            borderRadius: "12px",
            border: "1px solid var(--Gray-200, #EAECF0)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            color: "#344054",
            fontSize: "14px",
          }}
          MenuProps={MenuProps}
        >
          <MenuItem sx={{ color: "#344054", fontSize: "14px" }} value="">
            <em>None</em>
          </MenuItem>
          {facilities.map((audit) => (
            <MenuItem
              sx={{ color: "#344054", fontSize: "14px" }}
              value={audit.id}
            >
              {audit.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
      {/* FILTERS CODE */}
      {/* <FormControl
        sx={{ mb: 2, minWidth: 100, color: "#344054", fontSize: "14px" }}
        size="small"
      >
        <InputLabel
          shrink={personName.length > 0}
          sx={{
            color: "#344054",
            fontSize: "14px",
            // position: "relative",
            left: "32px", // Adjust this value to better align the label next to the icon
            top: "0px", // Adjust top to vertically center it when not shrunk
            "&.Mui-focused, &.MuiInputLabel-shrink": {
              transform: "translate(0, -1.5rem) scale(0)",
            },
          }}
        >
          Filters
        </InputLabel>
        <Select
          multiple
          value={personName}
          onChange={handleFilterChange}
          input={<OutlinedInput notched={false} label="Filters" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          IconComponent={() => null}
          MenuProps={MenuProps}
          sx={{
            borderRadius: "12px",
            border: "1px solid var(--Gray-200, #EAECF0)",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            color: "#344054",
            fontSize: "14px",
            "& .MuiOutlinedInput-input": {
              paddingLeft: "16px", // Increase padding to make room for the icon
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <img
                src="/filter.svg"
                alt="filter icon"
                sx={{ color: "#344054", position: "absolute", left: 8 }}
              />
            </InputAdornment>
          }
        >
          {selectAudits?.length > 0 &&
            selectAudits.map((audit) => (
              <MenuItem
                key={audit.auditId}
                value={factoryIdToFactoryName[audit.factoryId]}
              >
                <Checkbox
                  checked={
                    personName.indexOf(
                      factoryIdToFactoryName[audit.factoryId]
                    ) > -1
                  }
                  sx={{ color: "#344054" }}
                />
                <ListItemText
                  primary={factoryIdToFactoryName[audit.factoryId]}
                  primaryTypographyProps={{
                    style: { color: "#344054", fontSize: "14px" },
                  }}
                />
              </MenuItem>
            ))}
        </Select>
      </FormControl> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          my: 3,
        }}
      >
        <Button
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: "#344054",
            borderRadius: "8px",
            padding: "10px 14px",
            border: "1px solid var(--Gray-3000, #D0D5DD)",
            background: "var(--Base-White, #FFF)",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "none",
          }}
          onClick={handleOpen}
          startIcon={<UploadFileIcon sx={{ color: "#667085" }} />}
        >
          Upload Audit
        </Button>
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
            <AuditDocumentDrop
              organisationId={organisationId}
              supplierId={supplierId}
              factoryId={factoryId}
            />
          </Card>
        </Modal>
      </Box>
      {selectAudits?.length > 0 &&
        selectAudits.map((audit) => (
          <Paper
            elevation={1}
            sx={{
              py: 3,
              px: 4,
              my: 4,
              boxShadow: "none",
              height: "150px",
              overflowY: "scroll",
              borderRadius: "12px",
              border: "1px solid #EAECF0",
              background: "#FFF",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              cursor: "pointer",
            }}
            key={audit.auditId}
            onClick={() =>
              handleNaivgationToAuditDetails(audit.factoryId, audit.auditId)
            }
          >
            <Grid
              container
              spacing={0}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Grid item xs={1}>
                <Typography
                  sx={{
                    color: "#45464E",
                    color: "#3538CD",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {audit.year}
                </Typography>
                {audit?.state && audit.state === "test" && (
                  <Typography color="red" sx={{ fontSize: "10px" }}>
                    Internal - Not Approved
                  </Typography>
                )}
              </Grid>
              <Grid item xs={11}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#000",
                    display: "inline-block",
                    mr: 2,
                    mb: 2,
                  }}
                >
                  {factoryIdToFactoryName[audit.factoryId]}
                </Typography>

                <ListCard data={audit} type="audit" />
              </Grid>
            </Grid>
          </Paper>
        ))}
    </>
  );
};

export default FactoryAuditListCard;
