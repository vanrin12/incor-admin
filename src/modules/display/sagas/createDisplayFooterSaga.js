import { call, put, takeLatest } from 'redux-saga/effects';

import { ROUTES, API } from 'utils/Apis';

import { Types } from '../redux';

// worker Saga: will be fired on CREATE_FOOTER actions
function* createFooter(action) {
  try {
    /**
     * Example data
     * url: enpoint/createFooter
     *
     */
    const response = yield call(() =>
      API.post(ROUTES.API_CREATE_FOOTER, action.data)
    );

    if (response.ok) {
      const { data } = response.data;
      // In case: createFooter request success
      yield put({ type: Types.CREATE_FOOTER_SUCCESS, data });
    } else {
      // In case: createFooter request failed
      yield put({
        type: Types.CREATE_FOOTER_FAILED,
        errors: response.data.status && response.data.status.msg,
      });
    }
  } catch (error) {
    // in case: server error
    yield put({ type: Types.CREATE_FOOTER_FAILED, error });
  }
}

/*
  Starts createFooter on each dispatched `CREATE_FOOTER` action.
*/
function* createFooterSaga() {
  yield takeLatest(Types.CREATE_FOOTER, createFooter);
}

export default createFooterSaga;
