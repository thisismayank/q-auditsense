import { all, put, select, takeLatest } from "redux-saga/effects";
import {
  getListOfAllFactories,
  getSearchResultOfFactories,
  getFactoryById,
  setListOfAllFactories,
  setFactoryData,
  setFactoriesDataCache,
  updateFactoryData,
} from "../reducers/factory.reducer";
import { selectAuthToken, selectOrganisationId } from "../selectors/login.selector";
import * as API from "../utils/api";
import axios from "axios";
import { logout } from "../reducers/login.reducer";
import {
  getChartData,
  getFactoryData,
  setChartData,
} from "../reducers/risk.reducer";

function* getRiskChartDataWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);

  const requestURL = API.ORGANISATIONS.GET_RISK_CHART_DATA.replace(
    "<ORGANISATION_ID>",
    organisationId
  );

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  try {
    const response = yield axios.get(requestURL, { headers });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        yield put(setChartData(response.data.results));
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

function* getFactoryByIdWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);

  const requestURL = API.FACTORIES.GET_BY_ID.replace(
    "<ORGANISATION_ID>",
    organisationId
  )
    .replace("<SUPPLIER_ID>", action.payload.supplierId)
    .replace("<FACTORY_ID>", action.payload.factoryId);

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  try {
    const response = yield axios.get(requestURL, { headers });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        yield put(setFactoryData(response.data.results));
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

function* watchRiskChartDataSaga() {
  yield takeLatest(getChartData.type, getRiskChartDataWorker);
}

function* watchFactoryByIdSaga() {
  yield takeLatest(getFactoryData.type, getFactoryByIdWorker);
}

export default function* rootSaga() {
  yield all([watchRiskChartDataSaga()]);
}
