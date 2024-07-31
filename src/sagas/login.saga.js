import { all, put, select, takeLatest } from "redux-saga/effects";
import {
  submitLoginRequest,
  loginSuccess,
  loginFailure,
  logout,
} from "../reducers/login.reducer";
import { selectEmail } from "../selectors/login.selector";
import * as API from "../utils/api";
import axios from "axios";
function* handleLogin(action) {
  try {
    const email = yield select(selectEmail);
    if (email) {
      const requestURL = API.USER.LOGIN;

      const headers = {
        "Content-Type": "application/json",
      };

      const body = {
        email,
        password: action.payload.password,
      };

      const response = yield axios.post(requestURL, body, { headers });

      if (response && response.status === 200 && response.data) {
        const {
          data: { success, results },
        } = response;

        if (success) {
          yield put(loginSuccess(results));
          localStorage.setItem("loginState", JSON.stringify(results));
        }
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      yield put(loginFailure("Session expired. Please log in again."));
      yield put(logout()); // Dispatch logout to reset state and storage
    } else {
      yield put(loginFailure(error.toString()));
    }
  }
}

function* watchLoginSaga() {
  yield takeLatest(submitLoginRequest.type, handleLogin);
}

export default function* rootSaga() {
  yield all([watchLoginSaga()]);
}
