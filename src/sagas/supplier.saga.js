import { all, put, select, takeLatest } from "redux-saga/effects";
import {
  getListOfAllSuppliers,
  getSearchResultOfSuppliers,
  getSupplierById,
  setListOfAllSuppliers,
  setSupplierData,
  setSuppliersDataCache,
  updateSupplierData,
} from "../reducers/supplier.reducer";
import {
  selectAuthToken,
  selectOrganisationId,
} from "../selectors/login.selector";

import * as API from "../utils/api";
import axios from "axios";
import { logout } from "../reducers/login.reducer";

function* getListOfSuppliersWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);
  const { limit, offset, page, search } = action.payload;

  const requestURL = search
    ? API.SUPPLIERS.SEARCH.replace("<ORGANISATION_ID>", organisationId)
    : API.SUPPLIERS.LIST.replace("<ORGANISATION_ID>", organisationId);

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  const params = search ? { search } : { limit, offset };

  try {
    const response = yield axios.get(requestURL, { headers, params });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        if (!search) {
          yield put(
            setListOfAllSuppliers({
              suppliers: response.data.results.suppliers,
              supplierCount: response.data.results.supplierCount,
              uiConfig: response.data.results.uiConfig,
            })
          );
        } else {
          yield put(
            setListOfAllSuppliers({
              searchResults: response.data.results.suppliers,
              searchCount: response.data.results.supplierCount,
            })
          );
        }

        yield put(
          setSuppliersDataCache({
            page: search ? search : page,
            results: response.data.results.suppliers,
          })
        );
      }
    } else if (response && response.status === 401) {
      yield put(logout());
    }
  } catch (error) {
    console.error("Failed to fetch suppliers:", error);
    if (error && error.response && error.response.status === 401) {
      yield put(logout());
    }
    // Handle errors here, possibly dispatching a failure action
  }
}

function* getSupplierByIdWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);
  const requestURL = API.SUPPLIERS.GET_BY_ID.replace(
    "<ORGANISATION_ID>",
    organisationId
  ).replace("<SUPPLIER_ID>", action.payload);

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  try {
    const response = yield axios.get(requestURL, { headers });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        yield put(setSupplierData(response.data.results));
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

function* updateSupplierDataWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);
  const requestURL = API.SUPPLIERS.UPDATE_BY_ID.replace(
    "<ORGANISATION_ID>",
    organisationId
  ).replace("<SUPPLIER_ID>", action.payload.supplierId);

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  const body = {
    ...action.payload.changes,
  };
  try {
    const response = yield axios.put(requestURL, body, { headers });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        yield put(setSupplierData(response.data.results));
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

function* watchSupplierSaga() {
  yield takeLatest(
    [getListOfAllSuppliers.type, getSearchResultOfSuppliers.type],
    getListOfSuppliersWorker
  );
}

function* watchSupplierByIdSaga() {
  yield takeLatest(getSupplierById.type, getSupplierByIdWorker);
}
function* watchUpdateSupplierDataSaga() {
  yield takeLatest(updateSupplierData.type, updateSupplierDataWorker);
}

export default function* rootSaga() {
  yield all([
    watchSupplierSaga(),
    watchSupplierByIdSaga(),
    watchUpdateSupplierDataSaga(),
  ]);
}
