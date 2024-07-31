import { all, fork } from "@redux-saga/core/effects";

import loginSaga from "./login.saga";
import supplierSaga from "./supplier.saga";
import factorySaga from "./factory.saga";
import auditSaga from "./audit.saga";
import riskSaga from "./risk.saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(supplierSaga),
    fork(factorySaga),
    fork(auditSaga),
    fork(riskSaga),
  ]);
}
