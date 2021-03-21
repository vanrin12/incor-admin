import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on GET_VALUE_HEADER actions
function* getValueHeader(action) {
  try {
    /**
     * Example data
     * url: enpoint/getValueHeader
     *
     */
    const response = yield call(() =>
      API.get(ROUTES.API_GET_VALUE_HEADER, action.data)
    );

    if (response.ok) {
      const { data } = response.data;
      // In case: getValueHeader request success
      yield put({ type: Types.GET_VALUE_HEADER_SUCCESS, data });
    } else {
      // In case: getValueHeader request failed
      yield put({
        type: Types.GET_VALUE_HEADER_FAILED,
        errors: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.GET_VALUE_HEADER_FAILED, error });
  }
}

/*
  Starts getValueHeader on each dispatched `GET_VALUE_HEADER` action.
*/
function* getValueHeaderSaga() {
  yield takeLatest(Types.GET_VALUE_HEADER, getValueHeader);
}

export default getValueHeaderSaga;
