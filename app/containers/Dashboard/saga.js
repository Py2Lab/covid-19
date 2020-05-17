import { takeLatest, call, put } from 'redux-saga/effects';
import request from 'utils/request';
import * as constants from './constants';

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(constants.GET_COUNTRIES_INIT, getCountrisSaga);
  yield takeLatest(constants.SELECT_COUNTRY_INIT, selectCountrySaga);
}

export function* getCountrisSaga() {
  try {
    const requestURL = `https://api.covid19api.com/countries`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    if (response) {
      yield put({
        type: constants.GET_COUNTRIES_SUCCESS,
        response,
      });
    }
  } catch (error) {
    yield put({
      type: constants.GET_COUNTRIES_FAILED,
      error,
    });
  }
}

export function* selectCountrySaga(action) {
  try {
    const requestURL = `https://api.covid19api.com/dayone/country/${
      action.country
    }`;
    const response = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    if (response) {
      yield put({
        type: constants.SELECT_COUNTRY_SUCCESS,
        response,
      });
    }
  } catch (error) {
    yield put({
      type: constants.SELECT_COUNTRY_FAILED,
      error,
    });
  }
}
