import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Button,
  Modal,
  Card,
} from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/login.reducer";
import { selectUserInfo } from "../selectors/login.selector";
import { setLeftSideNavigationSelected } from "../reducers/navigation.reducer";
import { selectLeftSideNavigationSelected } from "../selectors/navigation.selector";
import moment from "moment";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AuditDocumentDrop from "./AuditDetails/auditDocumentDrop.component";

const LeftSideNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const userInfo = useSelector(selectUserInfo);
  const selected = useSelector(selectLeftSideNavigationSelected);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const [open, setOpen] = useState(false);
  const handleNavigate = (path) => {
    dispatch(setLeftSideNavigationSelected(path));
    navigate(path);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (params["*"] !== "suppliers") {
      dispatch(setLeftSideNavigationSelected(`/${params["*"]}`));
    }
  }, [params]);
  return (
    <>
      <Box
        sx={{
          maxWidth: 100,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          padding: 2,
          borderRight: "1px solid #cccccc4a",
          borderBottom: "none",
          borderLeft: "none",
          borderTop: "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            py: 2,
            px: 1,
          }}
        >
          <img
            src="/logo.svg"
            alt="Logo"
            style={{ maxWidth: 40, height: 40 }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: 8,
            fontWeight: 600,
          }}
        >
          {moment().format("MMMM Do, YYYY")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            py: 2,
            px: 1,
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
          >
            <UploadFileIcon sx={{ color: "#667085" }} />
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
                organisationId={"organisationId"}
                supplierId={"supplierId"}
                factoryId={"factoryId"}
              />
            </Card>
          </Modal>
        </Box>
      </Box>
    </>
  );
};

export default LeftSideNavbar;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Divider,
//   Typography,
// } from "@mui/material";
// import WarehouseIcon from "@mui/icons-material/Warehouse";
// import IconButton from "@mui/material/IconButton";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../reducers/login.reducer";
// import { selectUserInfo } from "../selectors/login.selector";
// import { setLeftSideNavigationSelected } from "../reducers/navigation.reducer";
// import { selectLeftSideNavigationSelected } from "../selectors/navigation.selector";
// import moment from "moment";
// import FormProgressStepper from "../pages/formProgressStepper.component";

// const LeftSideNavbar = ({ activeStep, setActiveStep }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const params = useParams();

//   const userInfo = useSelector(selectUserInfo);
//   const selected = useSelector(selectLeftSideNavigationSelected);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const handleNavigate = (path) => {
//     dispatch(setLeftSideNavigationSelected(path));
//     navigate(path);
//   };
//   useEffect(() => {
//     if (params["*"] !== "suppliers") {
//       dispatch(setLeftSideNavigationSelected(`/${params["*"]}`));
//     }
//   }, [params]);
//   return (
//     <Box
//       sx={{
//         maxWidth: 250,
//         height: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         padding: 2,
//         borderRight: "1px solid #cccccc4a",
//         borderBottom: "none",
//         borderLeft: "none",
//         borderTop: "none",
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "flex-start",
//           justifyContent: "flex-start",
//           py: 2,
//           px: 1,
//         }}
//       >
//         <img src="/logo.svg" alt="Logo" style={{ maxWidth: 40, height: 40 }} />
//       </Box>

//       <FormProgressStepper
//         activeStep={activeStep}
//         setActiveStep={setActiveStep}
//       />
//       <br />
//       <Divider />
//       <br />
//       <Typography
//         sx={{
//           fontSize: 14,
//           fontWeight: 600,
//         }}
//       >
//         {moment().format("MMMM Do, YYYY")}
//       </Typography>
//     </Box>
//   );
// };

// export default LeftSideNavbar;
