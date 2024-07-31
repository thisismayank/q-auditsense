import React from "react";
import { Routes, Route } from "react-router-dom";

import SupplierPage from "./supplier.page";

import Risks from "./risk.page";
import Insights from "./insight.page";
import SupplierDetails from "./supplierDetails.page";
import FacilityDetails from "./facilityDetails.page";
import AuditDetails from "./auditDetails.page";
import Factories from "./factory.page";
import QuestionnairePage from "./questionnaire.page";

const IndexPage = () => {
  return (
    <Routes>
      <Route path="/:organisationId" element={<QuestionnairePage />} />
      {/* <Route path="/suppliers" element={<SupplierPage />} /> */}

      {/* <Route path="/factories" element={<Factories />} />
      <Route path="/suppliers" element={<SupplierPage />} />
      <Route path="/suppliers/:supplierId" element={<SupplierDetails />} />
      <Route
        path="/suppliers/:supplierId/factory/:factoryId"
        element={<FacilityDetails />}
      />
      <Route
        path="/suppliers/:supplierId/audit/:auditId"
        element={<AuditDetails />}
      />
      <Route
        path="/suppliers/:supplierId/factory/:factoryId/audit/:auditId"
        element={<AuditDetails />}
      />
      <Route path="/risk" element={<Risks />} />

      <Route path="/insights" element={<Insights />} /> */}
    </Routes>
  );
};

export default IndexPage;
