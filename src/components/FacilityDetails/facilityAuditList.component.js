import React, { useEffect } from "react";

import { getListOfAllAudits } from "../../reducers/audit.reducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuditList,
  selectAuditListForFactory,
} from "../../selectors/audit.selector";

import AuditList from "../auditList.component";
import FactoryAuditList from "./factoryAuditHistoryListCard.component";
import FactoryAuditListCard from "./factoryAuditHistoryListCard.component";

const FacilityAuditList = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    if (selectAudits && selectAuditList.length === 0) {
      dispatch(
        getListOfAllAudits({
          limit: 10,
          offset: 0,
          supplierId: params.supplierId,
        })
      );
    }
  }, [params.supplierId]);

  const selectAudits = useSelector((state) =>
    selectAuditListForFactory(state, params.factoryId)
  );

  return <FactoryAuditListCard selectAudits={selectAudits} />;
};

export default FacilityAuditList;
