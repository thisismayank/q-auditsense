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
import {
  selectAuthToken,
  selectOrganisationId,
} from "../selectors/login.selector";
import * as API from "../utils/api";
import axios from "axios";
import { logout } from "../reducers/login.reducer";

function* getListOfFactoriesWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);
  const { limit, offset, page, search, supplierId, supplierFactoryList } =
    action.payload;

  const requestURL = search
    ? API.FACTORIES.SEARCH.replace("<ORGANISATION_ID>", organisationId)
    : supplierId
    ? API.FACTORIES.LIST.replace("<ORGANISATION_ID>", organisationId).replace(
        "<SUPPLIER_ID>",
        supplierId
      )
    : API.FACTORIES.GET_LIST_BY_ORGANISATION_ID.replace(
        "<ORGANISATION_ID>",
        organisationId
      );

  const headers = {
    "Content-Type": "application/json",
    Authorization: authToken,
  };

  const params = search ? { search } : { limit, offset };
  try {
    const response = yield axios.get(requestURL, { headers, params });

    if (response && response.status === 200 && response.data) {
      if (response.data.success) {
        if (!supplierFactoryList) {
          if (!search) {
            yield put(
              setListOfAllFactories({
                factories: response.data.results.factories,
                factoryCount: response.data.results.factoryCount,
              })
            );
          } else {
            yield put(
              setListOfAllFactories({
                searchResults: response.data.results.factories,
                searchCount: response.data.results.factoryCount,
              })
            );
          }

          yield put(
            setFactoriesDataCache({
              page: search ? search : page,
              results: response.data.results.factories,
            })
          );
        } else {
          yield put(
            setListOfAllFactories({
              factories: response.data.results.factories,
            })
          );
        }
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

function* updateFactoryDataWorker(action) {
  const authToken = yield select(selectAuthToken);
  const organisationId = yield select(selectOrganisationId);

  const requestURL = API.FACTORIES.UPDATE_BY_ID.replace(
    "<ORGANISATION_ID>",
    organisationId
  )
    .replace("<SUPPLIER_ID>", action.payload.supplierId)
    .replace("<FACTORY_ID>", action.payload.factoryId);

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

function* watchFactorySaga() {
  yield takeLatest(
    [getListOfAllFactories.type, getSearchResultOfFactories.type],
    getListOfFactoriesWorker
  );
}

function* watchFactoryByIdSaga() {
  yield takeLatest(getFactoryById.type, getFactoryByIdWorker);
}

function* watchUpdateFactoryDataSaga() {
  yield takeLatest(updateFactoryData.type, updateFactoryDataWorker);
}

export default function* rootSaga() {
  yield all([
    watchFactorySaga(),
    watchFactoryByIdSaga(),
    watchUpdateFactoryDataSaga(),
  ]);
}
