import React from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSelector } from "react-redux";
import { selectFactoryData } from "../../selectors/factory.selector";

const FactoryDetails = () => {
  const factoryInfo = {
    name: "ABC Shenzhen Textile",
    address: "124 Remin Rd, Shenzhen, Guangdong, China",
    businessUnit: "Textile",
    employeeCount: 1232,
    auditDate: "6/23/2023",
  };

  const selectedFactoryData = useSelector(selectFactoryData);
  return (
    <List sx={{ width: "100%", pl: 3, pr: 1 }}>
      <ListItem>
        <ListItemText
          primary="Site Name"
          secondary={selectedFactoryData?.name || "-"}
          primaryTypographyProps={{
            style: {
              color: "#475467",
              fontSize: 16,
              fontWeight: 700,
            },
          }}
          secondaryTypographyProps={{
            style: {
              color: "#45464E",
              fontSize: 16,
              fontWeight: 400,
            },
          }}
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary="Address"
          secondary={selectedFactoryData?.metadata?.address || "-"}
          primaryTypographyProps={{
            style: {
              color: "#475467",
              fontSize: 16,
              fontWeight: 700,
            },
          }}
          secondaryTypographyProps={{
            style: {
              color: "#45464E",
              fontSize: 16,
              fontWeight: 400,
            },
          }}
        />
      </ListItem>

      {/* <ListItem>
        <ListItemText
          primary="Employee Count"
          secondary={selectedFactoryData?.employeeCount || "-"}
          primaryTypographyProps={{
            style: {
              color: "#475467",
              fontSize: 16,
              fontWeight: 700,
            },
          }}
          secondaryTypographyProps={{
            style: {
              color: "#45464E",
              fontSize: 16,
              fontWeight: 400,
            },
          }}
        />
      </ListItem> */}
      {/* <ListItem>
        <ListItemText
          primary="Audit Date"
          secondary={selectedFactoryData?.metadata?.auditEndDate || "-"}
          primaryTypographyProps={{
            style: {
              color: "#475467",
              fontSize: 16,
              fontWeight: 700,
            },
          }}
          secondaryTypographyProps={{
            style: {
              color: "#45464E",
              fontSize: 16,
              fontWeight: 400,
            },
          }}
        />
      </ListItem> */}
    </List>
  );
};

export default FactoryDetails;
