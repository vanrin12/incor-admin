import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on CREATE_INTRODUCE actions
function* createIntroduce(action) {
  try {
    /**
     * Example data
     * url: enpoint/createIntroduce
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_CREATE_INTRODUCE, action.data)
    );

    if (response.ok) {
      const { data } = response.data;
      // In case: createIntroduce request success
      yield put({ type: Types.CREATE_INTRODUCE_SUCCESS, data });
    } else {
      // In case: createIntroduce request failed
      yield put({
        type: Types.CREATE_INTRODUCE_FAILED,
        errors: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CREATE_INTRODUCE_FAILED, error });
  }
}

/*
  Starts createIntroduce on each dispatched `CREATE_INTRODUCE` action.
*/
function* createIntroduceSaga() {
  yield takeLatest(Types.CREATE_INTRODUCE, createIntroduce);
}

export default createIntroduceSaga;
