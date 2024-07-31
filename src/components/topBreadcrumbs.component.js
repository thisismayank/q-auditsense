import React from "react";
import { Box, Breadcrumbs } from "@mui/material";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useLocation, useParams, Link } from "react-router-dom";
import { selectSupplierNameFromId } from "../selectors/supplier.selector";
import { useSelector } from "react-redux";
import {
  selectAuditPageFactoryDataTitle,
  selectFactoryNameFromId,
} from "../selectors/factory.selector";
import { selectAuditNameFromId } from "../selectors/audit.selector";

const TopBreadcrumbs = () => {
  const location = useLocation();

  const pathname = location.pathname;

  const basePath = pathname.split("/")[1];

  const params = useParams();

  const supplierName = useSelector((state) =>
    selectSupplierNameFromId(state, params.supplierId)
  );

  const factoryName = useSelector((state) =>
    selectFactoryNameFromId(state, params.factoryId)
  );

  const auditName = useSelector((state) =>
    selectAuditNameFromId(state, params.auditId)
  );

  const selectedAuditTitle = useSelector(selectAuditPageFactoryDataTitle);

  return (
    <Box sx={{ flex: 1, py: 1 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <Link
          to={`/${basePath}`}
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            fontSize: 14,
            textDecoration: "none",
            color: "inherit",
            textTransform: "none",
          }}
        >
          <img
            src={`/${basePath}.svg`}
            alt={`${basePath}`}
            style={{ width: 20, height: 20, marginRight: 4, paddingRight: 4 }}
          />{" "}
          {basePath === "factories"
            ? "Sites"
            : basePath[0].toUpperCase() + basePath.slice(1)}{" "}
          {basePath === "suppliers" || basePath === "factories"
            ? "List Page"
            : ""}
        </Link>

        {supplierName && (
          <Link
            to={`/suppliers/${params.supplierId}`}
            style={{
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              color: "inherit",
              textTransform: "none",
            }}
          >
            {supplierName}
          </Link>
        )}
        {factoryName && (
          <Link
            to={`/suppliers/${params.supplierId}/factory/${params.factoryId}`}
            style={{
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              color: "inherit",
              textTransform: "none",
            }}
          >
            {factoryName}
          </Link>
        )}
        {auditName && (
          <Link
            to={`/suppliers/${params.supplierId}/factory/${params.factoryId}/audit/${params.auditId}`}
            style={{
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              color: "inherit",
              textTransform: "none",
            }}
          >
            {console.log(selectedAuditTitle, ",", auditName)}
          </Link>
        )}
      </Breadcrumbs>
    </Box>
  );
};

export default TopBreadcrumbs;
