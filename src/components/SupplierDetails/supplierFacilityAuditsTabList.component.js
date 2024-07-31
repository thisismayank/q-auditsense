import React, { useEffect } from "react";

import { getListOfAllAudits } from "../../reducers/audit.reducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectAuditList } from "../../selectors/audit.selector";

import AuditList from "../auditList.component";

const SupplierFacilityAuditsTabList = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(
      getListOfAllAudits({
        limit: 10,
        offset: 0,
        supplierId: params.supplierId,
      })
    );
  }, [params.supplierId]);

  const selectAudits = useSelector(selectAuditList);

  return <AuditList selectAudits={selectAudits} />;
};

export default SupplierFacilityAuditsTabList;
