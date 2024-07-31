import { all, put, select, takeLatest } from "redux-saga/effects";

import {
  selectAuthToken,
  selectOrganisationId,
} from "../selectors/login.selector";
import * as API from "../utils/api";
import axios from "axios";
import {
  getListOfAllAudits,
  getAuditById,
  setAuditData,
  setListOfAllAudits,
  updateAuditData,
  setAuditIssueCAPData,
  uploadAuditReport,
  setUploadAuditReportFiles,
} from "../reducers/audit.reducer";
import { logout } from "../reducers/login.reducer";
import { selectSaveStatus } from "../selectors/misc.selector";
import { setFilesUploadedIds, setSaveStatus } from "../reducers/misc.reducer";

function* getListOfAuditsWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);
  const { limit, offset, supplierId } = action.payload;
  const requestURL = API.AUDITS.LIST.replace(
    "<ORGANISATION_ID>",
    organisationId
  ).replace("<SUPPLIER_ID>", supplierId);

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  const params = { limit, offset };

  try {
    const response = yield axios.get(requestURL, { headers, params });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        yield put(
          setListOfAllAudits({
            audits: response.data.results.audits,
            auditCount: response.data.results.auditCount,
          })
        );
      }
    }
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
    // Handle errors here, possibly dispatching a failure action
  }
}

function* getAuditByIdWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);

  const requestURL = API.AUDITS.GET_BY_ID.replace(
    "<ORGANISATION_ID>",
    organisationId
  )
    .replace("<SUPPLIER_ID>", action.payload.supplierId)
    .replace("<FACTORY_ID>", action.payload.factoryId)
    .replace("<AUDIT_ID>", action.payload.auditId);

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  try {
    const response = yield axios.get(requestURL, { headers });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        yield put(setAuditData(response.data.results.auditData));

        yield put(setAuditIssueCAPData(response.data.results.capDetails));
      }
    }
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
    // Handle errors here, possibly dispatching a failure action
  }
}

function* updateAuditDataWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);

  const requestURL = API.AUDITS.UPDATE_BY_ID.replace(
    "<ORGANISATION_ID>",
    organisationId
  )
    .replace("<SUPPLIER_ID>", action.payload.supplierId)
    .replace("<FACTORY_ID>", action.payload.factoryId)
    .replace("<AUDIT_ID>", action.payload.auditId);

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  const body = {
    ...action.payload.changes,
  };
  const params = {
    issueId: action.payload?.issueId || "",
  };
  try {
    const response = yield axios.put(requestURL, body, { headers, params });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        yield put(setAuditData(response.data.results.auditData));
        yield put(setAuditIssueCAPData(response.data.results.capDetails));

        yield put(setSaveStatus("saved"));
      }
    }
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
    // Handle errors here, possibly dispatching a failure action
  }
}

function* uploadAuditReportWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);
  const formData = new FormData();

  const requestURL = API.AUDITS.UPLOAD_REPORT.replace(
    "<ORGANISATION_ID>",
    organisationId
  )
    .replace("<SUPPLIER_ID>", action.payload.supplierId)
    .replace("<FACTORY_ID>", action.payload.factoryId)
    .replace("<AUDIT_ID>", action.payload.auditId);

  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: authToken,
  };
  if (action.payload.auditId === "none") {
    let fileUpload = {};

    for (let file of action.payload.file) {
      fileUpload[file.id] = false;

      const formData = new FormData();
      formData.append("file", file.file);
      try {
        const response = yield axios.post(requestURL, formData, {
          headers,
        });

        if (response && response.status === 200 && response.data) {
          if (response.data.success) {
            fileUpload[file.id] = true;
            // yield put(setUploadAuditReportFiles(response.data.results));
            // yield put(setAuditData(response.data.results.auditData));
            // yield put(setAuditIssueCAPData(response.data.results.capDetails));
          }
        }
      } catch (error) {
        console.error("Failed to fetch suppliers:", error);
        if (error && error.response && error.response.status === 401) {
          yield put(logout());
        }
        // Handle errors here, possibly dispatching a failure action
      }
    }
    yield put(setFilesUploadedIds(fileUpload));
  } else {
    formData.append("file", action.payload.file);

    try {
      const response = yield axios.post(requestURL, formData, {
        headers,
      });

      if (response && response.status === 200 && response.data) {
        if (response.data.success) {
          yield put(setUploadAuditReportFiles(response.data.results));
          // yield put(setAuditData(response.data.results.auditData));
          // yield put(setAuditIssueCAPData(response.data.results.capDetails));
        }
      }
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
      if (error && error.response && error.response.status === 401) {
        yield put(logout());
      }
      // Handle errors here, possibly dispatching a failure action
    }
  }
}

function* watchAuditSaga() {
  yield takeLatest(getListOfAllAudits.type, getListOfAuditsWorker);
}

function* watchAuditByIdSaga() {
  yield takeLatest(getAuditById.type, getAuditByIdWorker);
}

function* watchUpdateAuditDataSaga() {
  yield takeLatest(updateAuditData.type, updateAuditDataWorker);
}
function* watchUploadAuditReportSaga() {
  yield takeLatest(uploadAuditReport.type, uploadAuditReportWorker);
}
export default function* rootSaga() {
  yield all([
    watchAuditSaga(),
    watchAuditByIdSaga(),
    watchUpdateAuditDataSaga(),
    watchUploadAuditReportSaga(),
  ]);
}
